import { GraphQLSchema } from 'graphql'
import { FragmentReplacements } from './types'
import { Handler, SubscriptionHandler } from './handler'

export function makeProxy<T extends object = any>({
  schema,
  fragmentReplacements,
  operation,
  before,
  handler
}: {
  schema: GraphQLSchema
  fragmentReplacements: FragmentReplacements
  operation: 'query' | 'mutation'
  before: () => void,
  handler?: { new<T extends object>(schema, fragmentReplacements, operation, before): ProxyHandler<T> }
}): T {
  return new Proxy(
    {} as T,
    handler
      ? new handler<T>(schema, fragmentReplacements, operation, before)
      : new Handler<T>(schema, fragmentReplacements, operation, before),
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
