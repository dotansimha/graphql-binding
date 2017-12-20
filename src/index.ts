import { GraphQLSchema } from 'graphql'
import { FragmentReplacements } from './extractFragmentReplacements'
import { Handler } from './handler'

export {
  FragmentReplacements,
  extractFragmentReplacements,
} from './extractFragmentReplacements'

export function makeProxy<T extends object = any>({
  schema,
  fragmentReplacements,
  operation,
}: {
  schema: GraphQLSchema
  fragmentReplacements: FragmentReplacements
  operation: 'query' | 'mutation'
}): T {
  return new Proxy(
    {} as T,
    new Handler<T>(schema, fragmentReplacements, operation),
  )
}
