import { buildInfo } from './info'
import { GraphQLResolveInfo, graphql, GraphQLSchema } from 'graphql'
import { delegateToSchema } from 'graphql-tools'
import { makeProxy } from './proxy'
import { QueryMap, BindingOptions, FragmentReplacements } from './types'

export class Binding {
  query: QueryMap
  mutation: QueryMap

  private remoteSchema: GraphQLSchema
  private fragmentReplacements: FragmentReplacements

  constructor({ executableSchema, fragmentReplacements }: BindingOptions) {
    this.fragmentReplacements = fragmentReplacements || {}
    this.remoteSchema = executableSchema

    this.query = makeProxy<QueryMap>({
      schema: this.remoteSchema,
      fragmentReplacements: this.fragmentReplacements,
      operation: 'query'
    })
    this.mutation = makeProxy<QueryMap>({
      schema: this.remoteSchema,
      fragmentReplacements: this.fragmentReplacements,
      operation: 'mutation'
    })
  }

  async request<T = any>(
    query: string,
    variables?: { [key: string]: any }
  ): Promise<T> {
    return graphql(this.remoteSchema, query, null, null, variables).then(
      r => r.data![Object.keys(r.data!)[0]]
    )
  }

  async delegate(
    operation: 'query' | 'mutation',
    fieldName: string,
    args: {
      [key: string]: any
    },
    context: {
      [key: string]: any
    },
    info?: GraphQLResolveInfo | string
  ) {
    info = buildInfo(fieldName, operation, this.remoteSchema, info)

    return delegateToSchema(
      this.remoteSchema,
      this.fragmentReplacements,
      operation,
      fieldName,
      args,
      context,
      info
    )
  }
}
