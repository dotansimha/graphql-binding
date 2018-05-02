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
  GraphQLResolveInfo,
} from 'graphql'
import { Operation } from './types'

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
  operation: Operation,
  schema: GraphQLSchema,
): GraphQLOutputType {
  if (operation === 'mutation' && !schema.getMutationType()) {
    throw new Error(`Schema doesn't have mutation type`)
  }

  if (operation === 'subscription' && !schema.getSubscriptionType()) {
    throw new Error(`Schema doesn't have subscription type`)
  }

  const rootType =
    {
      query: () => schema.getQueryType(),
      mutation: () => schema.getMutationType()!,
      subscription: () => schema.getSubscriptionType()!,
    }[operation]() || undefined!

  const rootField = rootType.getFields()[rootFieldName]

  if (!rootField) {
    throw new Error(`No such root field found: ${rootFieldName}`)
  }

  return getNamedType(rootField.type) as GraphQLOutputType
}

export function forwardTo(bindingName: string) {
  return (parent: any, args: any, context: any, info: GraphQLResolveInfo) => {
    let message = `Forward to '${bindingName}.${info.parentType.name.toLowerCase()}.${
      info.fieldName
    }' failed. `
    if (context[bindingName]) {
      if (
        context[bindingName][info.parentType.name.toLowerCase()][info.fieldName]
      ) {
        return context[bindingName][info.parentType.name.toLowerCase()][
          info.fieldName
        ](args, info)
      } else {
        message += `Field '${info.parentType.name.toLowerCase()}.${
          info.fieldName
        }' not found on binding '${bindingName}'.`
      }
    } else {
      message += `Binding '${bindingName}' not found.`
    }

    throw new Error(message)
  }
}
