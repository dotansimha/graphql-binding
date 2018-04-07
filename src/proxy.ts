import { GraphQLSchema } from 'graphql'
import { FragmentReplacements } from './types'
import { Handler, SubscriptionHandler } from './handler'

export type Operation = 'query' | 'mutation'
export type Before = () => void

export function makeProxy<T extends object = any>({
  schema,
  fragmentReplacements,
  operation,
  before,
  handler
}: {
  schema: GraphQLSchema
  fragmentReplacements: FragmentReplacements
  operation: Operation
  before: Before
  handler?: { new <T extends object>(schema: GraphQLSchema, fragmentReplacements: FragmentReplacements, operation: Operation, before: Before): ProxyHandler<T> }
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
  handler
}: {
  schema: GraphQLSchema
  fragmentReplacements: FragmentReplacements
  before: Before
  handler?: { new <T extends object>(schema: GraphQLSchema, fragmentReplacements: FragmentReplacements, before: Before): ProxyHandler<T> }
}): T {
  return new Proxy(
    {} as T,
    handler
      ? new handler<T>(schema, fragmentReplacements, before)
      : new SubscriptionHandler<T>(schema, fragmentReplacements, before),
  )
}
