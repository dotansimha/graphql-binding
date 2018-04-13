import { $$asyncIterator } from 'iterall'
import { buildInfo } from './info'
import {
  GraphQLResolveInfo,
  graphql,
  GraphQLSchema,
  buildSchema,
  GraphQLUnionType,
  GraphQLInterfaceType,
} from 'graphql'
import { delegateToSchema, makeRemoteExecutableSchema } from 'graphql-tools'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { makeProxy, makeSubscriptionProxy } from './proxy'
import {
  QueryMap,
  BindingOptions,
  FragmentReplacements,
  SubscriptionMap,
  Operation,
} from './types'

export class Binding<
  TQueryMap extends object = QueryMap,
  TSubscriptionMap extends object = SubscriptionMap
> {
  query: TQueryMap
  mutation: TQueryMap
  subscription: TSubscriptionMap
  schema: GraphQLSchema
  before: () => void

  private fragmentReplacements: FragmentReplacements

  constructor({
    schema,
    fragmentReplacements,
    before,
    handler,
    subscriptionHandler,
    link,
    typeDefs,
  }: BindingOptions) {
    this.fragmentReplacements = fragmentReplacements || {}
    if (schema) {
      this.schema = schema
    } else if (typeDefs && link) {
      this.schema = makeRemoteExecutableSchema({ schema: typeDefs, link })
    } else {
      throw new Error(`Please either provide a schema or typeDefs and link`)
    }

    this.before = before || (() => undefined)

    this.query = makeProxy<TQueryMap>({
      schema: this.schema,
      fragmentReplacements: this.fragmentReplacements,
      operation: 'query',
      before: this.before,
      handler,
    })
    this.mutation = makeProxy<TQueryMap>({
      schema: this.schema,
      fragmentReplacements: this.fragmentReplacements,
      operation: 'mutation',
      before: this.before,
      handler,
    })
    this.subscription = makeSubscriptionProxy<TSubscriptionMap>({
      schema: this.schema,
      fragmentReplacements: this.fragmentReplacements,
      before: this.before,
      handler: subscriptionHandler,
    })
  }

  public async request<T = any>(
    query: string,
    variables?: { [key: string]: any },
  ): Promise<T> {
    this.before()
    return graphql(this.schema, query, null, null, variables).then(
      r => r.data as any,
    )
  }

  public async delegate(
    operation: Operation,
    fieldName: string,
    args: {
      [key: string]: any
    },
    info?: GraphQLResolveInfo | string,
    context?: {
      [key: string]: any
    },
  ) {
    this.before()

    info = buildInfo(fieldName, operation, this.schema, info)

    return delegateToSchema(
      this.schema,
      this.fragmentReplacements,
      operation,
      fieldName,
      args,
      context || {},
      info,
    )
  }

  public async delegateSubscription(
    fieldName: string,
    args?: { [key: string]: any },
    infoOrQuery?: GraphQLResolveInfo | string,
    context?: { [key: string]: any },
  ): Promise<AsyncIterator<any>> {
    this.before()

    const info = buildInfo(fieldName, 'subscription', this.schema, infoOrQuery)

    const iterator = await delegateToSchema(
      this.schema,
      this.fragmentReplacements,
      'subscription',
      fieldName,
      args || {},
      context || {},
      info,
    )

    return {
      async next() {
        const { value } = await iterator.next()
        const data = { [info.fieldName]: value.data[fieldName] }
        return { value: data, done: false }
      },
      return() {
        return Promise.resolve({ value: undefined, done: true })
      },
      throw(error) {
        return Promise.reject(error)
      },
      [$$asyncIterator]() {
        return this
      },
    }
  }

  getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers {
    const typeMap = this.schema.getTypeMap()

    if (filterSchema && typeof filterSchema === 'string') {
      filterSchema = buildSchema(filterSchema)
    }
    const filterTypeMap =
      filterSchema instanceof GraphQLSchema
        ? filterSchema.getTypeMap()
        : typeMap
    const filterType = typeName => typeName in filterTypeMap

    const resolvers = {}
    Object.keys(typeMap)
      .filter(filterType)
      .forEach(typeName => {
        const type = typeMap[typeName]
        if (
          type instanceof GraphQLUnionType ||
          type instanceof GraphQLInterfaceType
        ) {
          resolvers[typeName] = {
            __resolveType: type.resolveType,
          }
        }
      })

    return resolvers
  }
}
