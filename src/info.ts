import {
  GraphQLResolveInfo,
  GraphQLObjectType,
  FieldNode,
  GraphQLSchema,
  SelectionSetNode,
  parse,
  validate,
} from 'graphql'
import { Operation, InfoFieldSelection } from './types'
import { isScalar, getTypeForRootFieldName, isInfoFieldSelection } from './utils'

export function buildInfo(
  rootFieldName: string,
  operation: Operation,
  schema: GraphQLSchema,
  info?: GraphQLResolveInfo | string | InfoFieldSelection,
): GraphQLResolveInfo {
  if (!info) {
    info = buildInfoForAllScalars(rootFieldName, schema, operation)
  } else if (typeof info === 'string') {
    info = buildInfoFromFragment(rootFieldName, schema, operation, info)
  } else if (isInfoFieldSelection(info)) {
    info = buildInfoFromSelection(rootFieldName, schema, operation, info)
  }
  return info
}

export function buildInfoForAllScalars(
  rootFieldName: string,
  schema: GraphQLSchema,
  operation: Operation,
): GraphQLResolveInfo {
  const fieldNodes: FieldNode[] = []
  const type = getTypeForRootFieldName(rootFieldName, operation, schema)

  let selections: FieldNode[] | undefined
  if (type instanceof GraphQLObjectType) {
    const fields = type.getFields()
    selections = Object.keys(fields)
      .filter(f => isScalar(fields[f].type))
      .map<FieldNode>(fieldName => {
        const field = fields[fieldName]
        return {
          kind: 'Field',
          name: { kind: 'Name', value: field.name },
        }
      })
  }

  const fieldNode: FieldNode = {
    kind: 'Field',
    name: { kind: 'Name', value: rootFieldName },
    selectionSet: selections ? { kind: 'SelectionSet', selections } : undefined,
  }

  fieldNodes.push(fieldNode)

  const parentType = {
    query: () => schema.getQueryType(),
    mutation: () => schema.getMutationType()!,
    subscription: () => schema.getSubscriptionType()!,
  }[operation]()

  return {
    fieldNodes,
    fragments: {},
    schema,
    fieldName: rootFieldName,
    returnType: type,
    parentType,
    path: undefined,
    rootValue: undefined,
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
  operation: Operation,
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
    rootValue: undefined,
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

/**
 * Get the named fields from the selection of info's root field
 */
function getFieldsByName(name: string, info: GraphQLResolveInfo): FieldNode[] {
  const infoField = info.fieldNodes[0]
  const { selectionSet } = infoField
  if (!selectionSet) {
    throw new Error(`Field '${infoField.name.value}' have no selection.`)
  }

  const { selections } = selectionSet
  const found = selections.filter(
    field => field.kind === 'Field' && field.name.value === name,
  ) as FieldNode[]

  if (found.length > 0) return found

  throw new Error(
    `Field '${name}' not found in '${infoField.name.value}' selection`,
  )
}

function flatMap<T, U>(
  array: T[],
  mapper: (value: T, index: number, array: T[]) => U[],
): U[] {
  return ([] as U[]).concat(...array.map(mapper))
}

export function buildInfoFromSelection(
  rootFieldName: string,
  schema: GraphQLSchema,
  operation: Operation,
  selection: InfoFieldSelection,
): GraphQLResolveInfo {
  const { field: fieldName, info, required } = selection

  const fields = getFieldsByName(fieldName, info)
  const oldSelections = flatMap(fields, field => field.selectionSet ? field.selectionSet.selections : [])

  const newInfo = buildInfo(rootFieldName, operation, schema, required)
  const { selectionSet } = newInfo.fieldNodes[0]

  if (required) {
    selectionSet!.selections = selectionSet!.selections.concat(oldSelections)
  } else {
    selectionSet!.selections = oldSelections
  }

  return newInfo
}
