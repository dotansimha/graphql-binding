import { GraphQLSchema } from 'graphql'
import { FragmentReplacements } from './types'
import { Handler, SubscriptionHandler } from './handler'

export function makeProxy<T extends object = any>({
  schema,
  fragmentReplacements,
  operation,
  before,
}: {
  schema: GraphQLSchema
  fragmentReplacements: FragmentReplacements
  operation: 'query' | 'mutation'
  before: () => void
}): T {
  return new Proxy(
    {} as T,
    new Handler<T>(schema, fragmentReplacements, operation, before),
  )
}

export function makeSubscriptionProxy<T extends object = any>({
  schema,
  fragmentReplacements,
  before,
}: {
  schema: GraphQLSchema
  fragmentReplacements: FragmentReplacements
  before: () => void
}): T {
  return new Proxy(
    {} as T,
    new SubscriptionHandler<T>(schema, fragmentReplacements, before),
  )
}
