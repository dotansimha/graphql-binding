import {
  GraphQLResolveInfo,
  GraphQLObjectType,
  FieldNode,
  GraphQLSchema,
  SelectionSetNode,
  parse,
  validate,
} from 'graphql'
import { isScalar, getTypeForRootFieldName } from './utils'

export function buildInfo(
  rootFieldName: string,
  operation: 'query' | 'mutation',
  schema: GraphQLSchema,
  info?: GraphQLResolveInfo | string
): GraphQLResolveInfo {
  if (!info) {
    info = buildInfoForAllScalars(rootFieldName, schema, operation)
  } else if (typeof info === 'string') {
    info = buildInfoFromFragment(rootFieldName, schema, operation, info)
  }
  return info
}

export function buildInfoForAllScalars(
  rootFieldName: string,
  schema: GraphQLSchema,
  operation: 'query' | 'mutation',
): GraphQLResolveInfo {
  const fieldNodes: FieldNode[] = []
  const type = getTypeForRootFieldName(rootFieldName, operation, schema)

  if (type instanceof GraphQLObjectType) {
    const fields = type.getFields()
    const selections = Object.keys(fields)
      .filter(f => isScalar(fields[f].type))
      .map<FieldNode>(fieldName => {
        const field = fields[fieldName]
        return {
          kind: 'Field',
          name: { kind: 'Name', value: field.name },
        }
      })
    const fieldNode: FieldNode = {
      kind: 'Field',
      name: { kind: 'Name', value: rootFieldName },
      selectionSet: { kind: 'SelectionSet', selections },
    }

    fieldNodes.push(fieldNode)
  }

  const parentType =
    operation === 'query' ? schema.getQueryType() : schema.getMutationType()!

  return {
    fieldNodes,
    fragments: {},
    schema,
    fieldName: rootFieldName,
    returnType: type,
    parentType,
    path: undefined,
    rootValue: null,
    operation: {
      kind: 'OperationDefinition',
      operation,
      selectionSet: { kind: 'SelectionSet', selections: [] },
    },
    variableValues: {},
  }
}

export function buildInfoFromFragment(
  rootFieldName: string,
  schema: GraphQLSchema,
  operation: 'query' | 'mutation',
  query: string,
): GraphQLResolveInfo {
  const type = getTypeForRootFieldName(
    rootFieldName,
    operation,
    schema,
  ) as GraphQLObjectType
  const fieldNode: FieldNode = {
    kind: 'Field',
    name: { kind: 'Name', value: rootFieldName },
    selectionSet: extractQuerySelectionSet(query, type.name, schema),
  }

  return {
    fieldNodes: [fieldNode],
    fragments: {},
    schema,
    fieldName: rootFieldName,
    returnType: type,
    parentType: schema.getQueryType(),
    path: undefined,
    rootValue: null,
    operation: {
      kind: 'OperationDefinition',
      operation,
      selectionSet: { kind: 'SelectionSet', selections: [] },
    },
    variableValues: {},
  }
}

function extractQuerySelectionSet(
  query: string,
  typeName: string,
  schema: GraphQLSchema,
): SelectionSetNode {
  if (!query.startsWith('fragment')) {
    query = `fragment tmp on ${typeName} ${query}`
  }
  const document = parse(query)
  const errors = validate(schema, document).filter(
    e => e.message.match(/Fragment ".*" is never used./) === null,
  )
  if (errors.length > 0) {
    throw errors
  }

  const queryNode = document.definitions[0]
  if (!queryNode || queryNode.kind !== 'FragmentDefinition') {
    throw new Error(`Invalid query: ${query}`)
  }

  return queryNode.selectionSet
}
