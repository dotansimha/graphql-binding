import { makeBinding } from 'graphql-binding'
import { GraphQLResolveInfo } from 'graphql'
import schema from  './schema'

interface BindingInstance {
  query: {
    hello: (args?: {}, info?: GraphQLResolveInfo | string, context?: { [key: string]: any }) => Promise<String | null> 
  }
  mutation: {}
  subscription: {}
}

interface BindingConstructor<T> {
  new(...args): T
}

export const Binding = makeBinding<BindingConstructor<BindingInstance>>(schema)

/**
 * Types
*/

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

/**
 * Type Defs
*/

const typeDefs = `type Query {
  hello: String
}
`