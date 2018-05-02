import { GraphQLSchema } from 'graphql'
import { Binding as BaseBinding } from './Binding'

export function makeBinding<T>(schema: GraphQLSchema) {
  return class Binding extends BaseBinding {
    constructor({ fragmentReplacements, before }) {
      super({ schema, fragmentReplacements, before })
    }
  }
}
