import { GraphQLSchema } from 'graphql'
import { Binding as BaseBinding } from './Binding'
import { BindingWithoutSchemaOptions } from './types'

export function makeBinding<T>(
  schema: GraphQLSchema,
): Constructor<BaseBinding> {
  return class Binding extends BaseBinding {
    constructor({ fragmentReplacements, before }: BindingWithoutSchemaOptions) {
      super({ schema, fragmentReplacements, before })
    }
  }
}

export interface Constructor<T> {
  new (options: BindingWithoutSchemaOptions): T
}
