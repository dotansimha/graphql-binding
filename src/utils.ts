import {
  GraphQLOutputType,
  GraphQLScalarType,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLUnionType,
  GraphQLList,
  GraphQLSchema,
  getNamedType,
} from 'graphql'

export function isScalar(t: GraphQLOutputType): boolean {
  if (t instanceof GraphQLScalarType || t instanceof GraphQLEnumType) {
    return true
  }

  if (
    t instanceof GraphQLObjectType ||
    t instanceof GraphQLInterfaceType ||
    t instanceof GraphQLUnionType ||
    t instanceof GraphQLList
  ) {
    return false
  }

  const nnt = t as GraphQLOutputType
  if (nnt instanceof GraphQLNonNull) {
    if (
      nnt.ofType instanceof GraphQLScalarType ||
      nnt.ofType instanceof GraphQLEnumType
    ) {
      return true
    }
  }

  return false
}

export function getTypeForRootFieldName(
  rootFieldName: string,
  operation: 'query' | 'mutation',
  schema: GraphQLSchema,
): GraphQLOutputType {
  if (operation === 'mutation' && !schema.getMutationType()) {
    throw new Error(`Schema doesn't have mutation type`)
  }

  const rootFields =
    operation === 'query'
      ? schema.getQueryType().getFields()
      : schema.getMutationType()!.getFields()

  const rootField = rootFields[rootFieldName]

  if (!rootField) {
    throw new Error(`No such root field found: ${rootFieldName}`)
  }

  return getNamedType(rootField.type) as GraphQLOutputType
}
