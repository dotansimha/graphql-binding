import { buildInfo } from './info'
import { GraphQLResolveInfo, graphql, GraphQLSchema } from 'graphql'
import { delegateToSchema } from 'graphql-tools'
import { makeProxy, makeSubscriptionProxy } from './proxy'
import {
  QueryMap,
  BindingOptions,
  FragmentReplacements,
  SubscriptionMap,
  Operation,
} from './types'

export class Binding {
  query: QueryMap
  mutation: QueryMap
  subscription: SubscriptionMap
  schema: GraphQLSchema
  before: () => void

  private fragmentReplacements: FragmentReplacements

  constructor({ schema, fragmentReplacements, before }: BindingOptions) {
    this.fragmentReplacements = fragmentReplacements || {}
    this.schema = schema
    this.before = before || (() => undefined)

    this.query = makeProxy<QueryMap>({
      schema: this.schema,
      fragmentReplacements: this.fragmentReplacements,
      operation: 'query',
      before: this.before,
    })
    this.mutation = makeProxy<QueryMap>({
      schema: this.schema,
      fragmentReplacements: this.fragmentReplacements,
      operation: 'mutation',
      before: this.before,
    })
    this.subscription = makeSubscriptionProxy<SubscriptionMap>({
      schema: this.schema,
      fragmentReplacements: this.fragmentReplacements,
      before: this.before,
    })
  }

  async request<T = any>(
    query: string,
    variables?: { [key: string]: any },
  ): Promise<T> {
    return graphql(this.schema, query, null, null, variables).then(
      r => r.data![Object.keys(r.data!)[0]],
    )
  }

  async delegate(
    operation: Operation,
    fieldName: string,
    args: {
      [key: string]: any
    },
    context: {
      [key: string]: any
    },
    info?: GraphQLResolveInfo | string,
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
      info,
    )
  }
}
