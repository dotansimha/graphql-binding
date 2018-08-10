declare const __non_webpack_require__
const {
  isNonNullType,
  isListType,
  isScalarType,
  isInputType,
  isObjectType,
  isEnumType,
  GraphQLObjectType,
} = (isWebpack => {
  if (isWebpack) return require('graphql')

  const resolveCwd = require('resolve-cwd')
  const graphqlPackagePath = resolveCwd.silent('graphql')

  return require(graphqlPackagePath || 'graphql')
})(typeof __non_webpack_require__ !== 'undefined')

import {
  GraphQLSchema,
  GraphQLUnionType,
  GraphQLInterfaceType,
  GraphQLInputObjectType,
  GraphQLInputField,
  GraphQLField,
  GraphQLInputType,
  GraphQLOutputType,
  GraphQLWrappingType,
  GraphQLNamedType,
  GraphQLScalarType,
  GraphQLEnumType,
  GraphQLFieldMap,
  GraphQLObjectType as GraphQLObjectTypeRef,
} from 'graphql'

import { Generator } from './Generator'

export class TypescriptGenerator extends Generator {
  scalarMapping = {
    Int: 'number',
    String: 'string',
    ID: 'string | number',
    Float: 'number',
    Boolean: 'boolean',
    DateTime: 'Date | string',
    Json: 'any',
  }

  graphqlRenderers = {
    GraphQLUnionType: (type: GraphQLUnionType): string => {
      return `${this.renderDescription(type.description)}export type ${
        type.name
      } = ${type
        .getTypes()
        .map(t => t.name)
        .join(' | ')}`
    },

    GraphQLObjectType: (
      type:
        | GraphQLObjectTypeRef
        | GraphQLInputObjectType
        | GraphQLInterfaceType,
    ): string => {
      return (
        this.renderInterfaceOrObject(type, true) +
        '\n\n' +
        this.renderInterfaceOrObject(type, false)
      )
    },

    GraphQLInterfaceType: (
      type:
        | GraphQLObjectTypeRef
        | GraphQLInputObjectType
        | GraphQLInterfaceType,
    ): string => this.renderInterfaceOrObject(type),

    GraphQLInputObjectType: (
      type:
        | GraphQLObjectTypeRef
        | GraphQLInputObjectType
        | GraphQLInterfaceType,
    ): string => {
      const fieldDefinition = Object.keys(type.getFields())
        .map(f => {
          const field = type.getFields()[f]
          return `  ${this.renderFieldName(field)}: ${this.renderInputFieldType(
            field.type,
          )}`
        })
        .join('\n')

      let interfaces: GraphQLInterfaceType[] = []
      if (type instanceof GraphQLObjectType) {
        interfaces = (type as any).getInterfaces()
      }

      return this.renderInterfaceWrapper(
        type.name,
        type.description,
        interfaces,
        fieldDefinition,
      )
    },

    GraphQLScalarType: (type: GraphQLScalarType): string => {
      if (type.name === 'ID') {
        return this.graphqlRenderers.GraphQLIDType(type)
      }
      return `${
        type.description
          ? `/*
${type.description}
*/
`
          : ''
      }export type ${type.name} = ${this.scalarMapping[type.name] || 'string'}`
    },

    GraphQLIDType: (type: GraphQLScalarType): string => {
      return `${
        type.description
          ? `/*
${type.description}
*/
`
          : ''
      }export type ${type.name}_Input = ${this.scalarMapping[type.name] ||
        'string'}
export type ${type.name}_Output = string`
    },

    GraphQLEnumType: (type: GraphQLEnumType): string => {
      return `${this.renderDescription(type.description)}export type ${
        type.name
      } = ${type
        .getValues()
        .map(e => `  '${e.name}'`)
        .join(' |\n')}`
    },
  }
  constructor({
    schema,
    inputSchemaPath,
    outputBindingPath,
    isDefaultExport,
  }: {
    schema: GraphQLSchema
    inputSchemaPath: string
    outputBindingPath: string
    isDefaultExport: boolean
  }) {
    super({ schema, inputSchemaPath, outputBindingPath, isDefaultExport })
  }
  render() {
    return this.compile`\
${this.renderImports()}

export interface Query ${this.renderQueries()}

export interface Mutation ${this.renderMutations()}

export interface Subscription ${this.renderSubscriptions()}

export interface Node {
}

export interface Binding {
  query: Query
  mutation: Mutation
  subscription: Subscription
  request: <T = any>(query: string, variables?: {[key: string]: any}) => Promise<T>
  delegate(operation: 'query' | 'mutation', fieldName: string, args: {
      [key: string]: any;
  }, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;
  delegateSubscription(fieldName: string, args?: {
      [key: string]: any;
  }, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;
  getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new(...args): T
}

${this.renderExports()}

/**
 * Types
*/

${this.renderTypes()}`
  }
  renderExports() {
    return `export const Binding = makeBindingClass<BindingConstructor<Binding>>({ schema })`
  }
  renderQueries() {
    const queryType = this.schema.getQueryType()
    if (!queryType) {
      return '{}'
    }
    return this.renderMainMethodFields('query', queryType.getFields())
  }
  renderMutations() {
    const mutationType = this.schema.getMutationType()
    if (!mutationType) {
      return '{}'
    }
    return this.renderMainMethodFields('mutation', mutationType.getFields())
  }
  renderSubscriptions() {
    const subscriptionType = this.schema.getSubscriptionType()
    if (!subscriptionType) {
      return '{}'
    }
    return this.renderMainMethodFields(
      'subscription',
      subscriptionType.getFields(),
    )
  }
  getTypeNames() {
    const ast = this.schema
    // Create types
    return Object.keys(ast.getTypeMap())
      .filter(typeName => !typeName.startsWith('__'))
      .filter(typeName => typeName !== (ast.getQueryType() as any).name)
      .filter(
        typeName =>
          ast.getMutationType()
            ? typeName !== (ast.getMutationType()! as any).name
            : true,
      )
      .filter(
        typeName =>
          ast.getSubscriptionType()
            ? typeName !== (ast.getSubscriptionType()! as any).name
            : true,
      )
      .sort(
        (a, b) =>
          (ast.getType(a) as any).constructor.name <
          (ast.getType(b) as any).constructor.name
            ? -1
            : 1,
      )
  }
  renderTypes() {
    const typeNames = this.getTypeNames()
    return typeNames
      .map(typeName => {
        const type = this.schema.getTypeMap()[typeName]
        return this.graphqlRenderers[type.constructor.name]
          ? this.graphqlRenderers[type.constructor.name](type)
          : null
      })
      .join('\n\n')
  }

  renderArgs(args) {
    const hasArgs = args.length > 0
    return `args${hasArgs ? '' : '?'}: {${hasArgs ? ' ' : ''}${args
      .map(f => `${this.renderFieldName(f)}: ${this.renderFieldType(f)}`)
      .join(', ')}${args.length > 0 ? ' ' : ''}}`
  }

  renderMainMethodFields(
    operation: string,
    fields: GraphQLFieldMap<any, any>,
  ): string {
    const methods = Object.keys(fields)
      .map(f => {
        const field = fields[f]
        return `    ${field.name}: <T = ${this.renderFieldType(field, true)}${
          !isNonNullType(field.type) ? ' | null' : ''
        }>(${this.renderArgs(
          field.args,
        )}, info?: GraphQLResolveInfo | string, options?: Options) => ${
          operation === 'subscription'
            ? 'Promise<AsyncIterator<T>>'
            : this.renderFieldType(field, false)
        } `
      })
      .join(',\n')

    return `{\n${methods}\n  }`
  }

  getDeepType(type) {
    if (type.ofType) {
      return this.getDeepType(type.ofType)
    }

    return type
  }

  getInternalTypeName(type) {
    const deepType = this.getDeepType(type)
    // if (isListType(type)) {
    //   return `${deepType}Array`
    // }
    const name = String(deepType)
    return name === 'ID' ? 'ID_Output' : name
  }

  getPayloadType(operation: string) {
    if (operation === 'subscription') {
      return `Promise<AsyncIterator<T>>`
    }
    return `Promise<T>`
  }

  renderInterfaceOrObject(
    type: GraphQLObjectTypeRef | GraphQLInputObjectType | GraphQLInterfaceType,
    node = true,
  ): string {
    const fields = type.getFields()
    const fieldDefinition = Object.keys(fields)
      .filter(f => {
        const deepType = this.getDeepType(fields[f].type)
        return node ? !isObjectType(deepType) : true
      })
      .map(f => {
        const field = fields[f]
        return `  ${this.renderFieldName(field)}: ${this.renderFieldType(
          field,
          node,
        )}`
      })
      .join('\n')

    let interfaces: GraphQLInterfaceType[] = []
    if (type instanceof GraphQLObjectType) {
      interfaces = (type as any).getInterfaces()
    }

    return this.renderInterfaceWrapper(
      `${type.name}${node ? 'Node' : ``}`,
      type.description,
      interfaces,
      fieldDefinition,
      !node,
    )
  }

  renderFieldName(field: GraphQLInputField | GraphQLField<any, any>) {
    return `${field.name}${isNonNullType(field.type) ? '' : '?'}`
  }

  renderFieldType(field, node: boolean = true) {
    const { type } = field
    const deepType = this.getDeepType(type)
    const isList = isListType(type) || isListType(type.ofType)
    const isOptional = !isNonNullType(type)
    const isScalar = isScalarType(deepType) || isEnumType(deepType)
    const isInput = isInputType(deepType)

    let typeString = this.getInternalTypeName(type)

    if (isList || node) {
      if (!isScalar && !isInput) {
        typeString += 'Node'
      }

      if (isOptional) {
        typeString += ' | undefined'
      }
    }

    if (node && (!isInput || isScalar)) {
      if (isList) {
        return `${typeString}[]`
      } else {
        return typeString
      }
    }

    if (isList) {
      if (isOptional) {
        return `Promise<Array<${typeString}>>`
      } else {
        return `Promise<${typeString}[]>`
      }
    } else {
      return `(${
        field.args && field.args.length > 0 ? this.renderArgs(field.args) : ''
      }) => ${typeString}`
    }
  }

  renderInputFieldType(type: GraphQLInputType | GraphQLOutputType) {
    if (isNonNullType(type)) {
      return this.renderInputFieldType((type as GraphQLWrappingType).ofType)
    }
    if (isListType(type)) {
      const inputType = this.renderInputFieldType(
        (type as GraphQLWrappingType).ofType,
      )
      return `${inputType}[] | ${inputType}`
    }
    return `${(type as GraphQLNamedType).name}${
      (type as GraphQLNamedType).name === 'ID' ? '_Input' : ''
    }`
  }

  renderTypeWrapper(
    typeName: string,
    typeDescription: string | void,
    fieldDefinition: string,
  ): string {
    return `${this.renderDescription(
      typeDescription,
    )}export type ${typeName} = {
${fieldDefinition}
}`
  }

  renderInterfaceWrapper(
    typeName: string,
    typeDescription: string | void,
    interfaces: GraphQLInterfaceType[],
    fieldDefinition: string,
    promise?: boolean,
  ): string {
    const actualInterfaces = promise
      ? [
          {
            name: `Promise<${typeName}Node>`,
          },
        ].concat(interfaces)
      : interfaces

    return `${this.renderDescription(
      typeDescription,
    )}export interface ${typeName}${
      actualInterfaces.length > 0
        ? ` extends ${actualInterfaces.map(i => i.name).join(', ')}`
        : ''
    } {
${fieldDefinition}
}`
  }

  renderDescription(description?: string | void) {
    return `${
      description
        ? `/*
${description.split('\n').map(l => ` * ${l}\n`)}
 */
`
        : ''
    }`
  }
  renderImports() {
    return `\
import { makeBindingClass, Options } from 'graphql-binding'
import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import ${
      this.isDefaultExport ? '' : '* as '
    }schema from  '${this.getRelativeSchemaPath()}'`
  }
}
