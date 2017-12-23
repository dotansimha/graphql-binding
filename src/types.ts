import { GraphQLResolveInfo, GraphQLSchema, InlineFragmentNode } from 'graphql'

export interface FragmentReplacements {
  [typeName: string]: {
    [fieldName: string]: InlineFragmentNode
  }
}

export interface QueryMap {
  [rootField: string]: (
    args?: any,
    info?: GraphQLResolveInfo | string
  ) => Promise<any>
}

export interface BindingOptions {
  fragmentReplacements?: FragmentReplacements
  executableSchema: GraphQLSchema
}
