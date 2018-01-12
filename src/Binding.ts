import { $$asyncIterator } from 'iterall'
import { buildInfo } from './info'
import { GraphQLResolveInfo, graphql, GraphQLSchema } from 'graphql'
import { delegateToSchema } from 'graphql-tools'
import { makeProxy, makeSubscriptionProxy } from './proxy'
import { QueryMap, BindingOptions, FragmentReplacements, SubscriptionMap, Operation } from './types'

export class Binding<TQueryMap extends object = QueryMap, TSubscriptionMap extends object = SubscriptionMap> {
  query: TQueryMap
  mutation: TQueryMap
  subscription: TSubscriptionMap
  schema: GraphQLSchema
  before: () => void

  private fragmentReplacements: FragmentReplacements

  constructor({ schema, fragmentReplacements, before, handler, subscriptionHandler }: BindingOptions) {
    this.fragmentReplacements = fragmentReplacements || {}
    this.schema = schema
    this.before = before || (() => undefined)

    this.query = makeProxy<TQueryMap>({
      schema: this.schema,
      fragmentReplacements: this.fragmentReplacements,
      operation: 'query',
      before: this.before,
      handler
    })
    this.mutation = makeProxy<TQueryMap>({
      schema: this.schema,
      fragmentReplacements: this.fragmentReplacements,
      operation: 'mutation',
      before: this.before,
      handler
    })
    this.subscription = makeSubscriptionProxy<TSubscriptionMap>({
      schema: this.schema,
      fragmentReplacements: this.fragmentReplacements,
      before: this.before,
      handler: subscriptionHandler
    })
  }

  public async request<T = any>(query: string, variables?: { [key: string]: any }): Promise<T> {
    this.before()
    return graphql(this.schema, query, null, null, variables).then(r => r.data![Object.keys(r.data!)[0]])
  }

  public async delegate(
    operation: Operation,
    fieldName: string,
    args: {
      [key: string]: any
    },
    context: {
      [key: string]: any
    },
    info?: GraphQLResolveInfo | string
  ) {
    this.before()

    info = buildInfo(fieldName, operation, this.schema, info)

    return delegateToSchema(
      this.schema,
      this.fragmentReplacements,
      operation,
      fieldName,
      args,
      context,
      info
    )
  }

  public async delegateSubscription(
    fieldName: string,
    args?: { [key: string]: any },
    infoOrQuery?: GraphQLResolveInfo | string
  ): Promise<AsyncIterator<any>> {
    this.before()

    const info = buildInfo(fieldName, 'subscription', this.schema, infoOrQuery)

    const iterator = await delegateToSchema(
      this.schema,
      this.fragmentReplacements,
      'subscription',
      fieldName,
      args || {},
      {},
      info
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
      }
    }
  }
}
