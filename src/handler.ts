import { GraphQLResolveInfo, ExecutionResult, GraphQLSchema } from 'graphql'
import { delegateToSchema } from 'graphql-tools'
import { FragmentReplacements } from './types'
import { buildInfo } from './info'

export class Handler<T extends object> implements ProxyHandler<T> {
  constructor(
    private schema: GraphQLSchema,
    private fragmentReplacements: FragmentReplacements,
    private operation: 'query' | 'mutation'
  ) {}

  get(target: T, rootFieldName: string) {
    return (
      args?: { [key: string]: any },
      info?: GraphQLResolveInfo | string
    ): Promise<ExecutionResult> => {
      const operation = this.operation
      info = buildInfo(rootFieldName, operation, this.schema, info)

      return delegateToSchema(
        this.schema,
        this.fragmentReplacements,
        operation,
        rootFieldName,
        args || {},
        {},
        info
      )
    }
  }
}
