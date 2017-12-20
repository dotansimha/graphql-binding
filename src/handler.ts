import { GraphQLResolveInfo, ExecutionResult, GraphQLSchema } from 'graphql'
import { delegateToSchema } from 'graphql-tools'
import { FragmentReplacements } from './extractFragmentReplacements'
import { buildInfoForAllScalars, buildInfoFromFragment } from './info'

export class Handler<T extends object> implements ProxyHandler<T> {
  constructor(
    private schema: GraphQLSchema,
    private fragmentReplacements: FragmentReplacements,
    private operation: 'query' | 'mutation',
  ) {}

  get(target: T, rootFieldName: string) {
    return (
      args?: { [key: string]: any },
      info?: GraphQLResolveInfo | string,
    ): Promise<ExecutionResult> => {
      const operation = this.operation
      if (!info) {
        info = buildInfoForAllScalars(rootFieldName, this.schema, operation)
      } else if (typeof info === 'string') {
        info = buildInfoFromFragment(
          rootFieldName,
          this.schema,
          operation,
          info,
        )
      }

      return delegateToSchema(
        this.schema,
        this.fragmentReplacements,
        operation,
        rootFieldName,
        args || {},
        {},
        info,
      )
    }
  }
}
