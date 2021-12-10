import { Generator } from './Generator'

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
  GraphQLObjectType,
  isNonNullType,
  isListType,
} from 'graphql'

import { Maybe } from './types'

export class FlowGenerator extends Generator {
  scalarMapping = {
    Int: 'number',
    String: 'string',
    ID: 'string | number',
    Float: 'number',
    Boolean: 'boolean',
    DateTime: 'Date | string',
  }

  graphqlRenderers = {
    GraphQLUnionType: (type: GraphQLUnionType): string => {
      return `${this.renderDescription(type.description)} export type ${
        type.name
      } = {| ${type
        .getTypes()
        .map(t => t.name)
        .join(', \n')}
        |}
        `
    },
    GraphQLObjectType: (
      type: GraphQLObjectType | GraphQLInputObjectType | GraphQLInterfaceType,
    ): string => this.renderInterfaceOrObject(type),
    GraphQLInterfaceType: (
      type: GraphQLObjectType | GraphQLInputObjectType | GraphQLInterfaceType,
    ): string => this.renderInterfaceOrObject(type),
    GraphQLInputObjectType: (
      type: GraphQLObjectType | GraphQLInputObjectType | GraphQLInterfaceType,
    ): string => {
      const fieldDefinition = Object.keys(type.getFields())
        .map(f => {
          const field = type.getFields()[f]
          return `  ${this.renderFieldName(field)}: ${this.renderInputFieldType(
            field.type,
          )}`
        })
        .join(',\n')

      let interfaces: GraphQLInterfaceType[] = []
      if (type instanceof GraphQLObjectType) {
        interfaces = (type as any).getInterrfaces()
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
      } export type ${type.name} = ${this.scalarMapping[type.name] ||
        'string'} `
    },

    GraphQLIDType: (type: GraphQLScalarType): string => {
      return `${
        type.description
          ? `/*
${type.description}
*/
`
          : ''
      } export type ${type.name}_Input = ${this.scalarMapping[type.name] ||
        'string'}
export type ${type.name}_Output = string`
    },

    GraphQLEnumType: (type: GraphQLEnumType): string => {
      return `${this.renderDescription(type.description)} export type ${
        type.name
      } =
${type
        .getValues()
        .map(e => `    | '${e.name}'`)
        .join('\n')}
  `
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
// @flow
${this.renderImports()}

export interface Query ${this.renderQueries()}

export interface Mutation ${this.renderMutations()}

export interface Subscription ${this.renderSubscriptions()}

export interface Binding {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
  request(query: string, variables?: {[key: string]: any}): Promise<any>;
  delegate(operation: 'query' | 'mutation', fieldName: string, args: {
      [key: string]: any;
  }, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;
  delegateSubscription(fieldName: string, args?: {
      [key: string]: any;
  }, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;
  getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new(...args): T;
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
      .filter(typeName =>
        ast.getMutationType()
          ? typeName !== (ast.getMutationType()! as any).name
          : true,
      )
      .filter(typeName =>
        ast.getSubscriptionType()
          ? typeName !== (ast.getSubscriptionType()! as any).name
          : true,
      )
      .sort((a, b) => {
        const typeA = ast.getType(a)!
        const typeB = ast.getType(b)!
        /**
         * Firstly sorted by constructor type alphabetically,
         * secondly sorted by their name alphabetically.
         */
        const constructorOrder = typeA.constructor.name.localeCompare(
          typeB.constructor.name,
        )
        switch (constructorOrder) {
          case 0:
            return typeA.name.localeCompare(typeB.name)

          default:
            return constructorOrder
        }
      })
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

  renderMainMethodFields(
    operation: string,
    fields: GraphQLFieldMap<any, any>,
  ): string {
    const methods = Object.keys(fields)
      .map(f => {
        const field = fields[f]
        const hasArgs = field.args.length > 0
        return `    ${field.name}(args${hasArgs ? '' : '?'}: {${
          hasArgs ? ' ' : ''
        }${field.args
          .map(
            f => `${this.renderFieldName(f)}: ${this.renderFieldType(f.type)}`,
          )
          .join(', ')}${
          field.args.length > 0 ? ' ' : ''
        }}, info?: GraphQLResolveInfo | string, options?: Options): ${this.getPayloadType(
          operation,
          `${this.renderFieldType(field.type)}${
            !isNonNullType(field.type) ? ' | null' : ''
          }`,
        )}; `
      })
      .join('\n')

    return `{\n${methods}\n  }`
  }

  getPayloadType(operation: string, type: string) {
    if (operation === 'subscription') {
      return `Promise<AsyncIterator<${type}>>`
    }
    return `Promise<${type}>`
  }

  renderInterfaceOrObject(
    type: GraphQLObjectType | GraphQLInputObjectType | GraphQLInterfaceType,
  ): string {
    const fieldDefinition: string = Object.keys(type.getFields())
      .map(f => {
        const field = type.getFields()[f]
        return `   ${this.renderFieldName(field)}: ${this.renderFieldType(
          field.type,
        )},`
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
  }

  renderFieldName(field: GraphQLInputField | GraphQLField<any, any>): string {
    return `${field.name}${isNonNullType(field.type) ? '' : '?'}`
  }

  renderFieldType(type: GraphQLInputType | GraphQLOutputType): string {
    if (isNonNullType(type)) {
      return `${this.renderFieldType((type as GraphQLWrappingType).ofType)}`
    }
    if (isListType(type)) {
      return `${this.renderFieldType((type as GraphQLWrappingType).ofType)}[]`
    }
    return `${(type as GraphQLNamedType).name}${
      (type as GraphQLNamedType).name === 'ID' ? '_Output' : ''
    }`
  }

  renderInputFieldType(type: GraphQLInputType | GraphQLOutputType) {
    if (isNonNullType(type)) {
      return `${this.renderInputFieldType(
        (type as GraphQLWrappingType).ofType,
      )}`
    }
    if (isListType(type)) {
      const inputType = this.renderInputFieldType(
        (type as GraphQLWrappingType).ofType,
      )
      return `Array< ${inputType} > | ${inputType}`
    }
    return `${(type as GraphQLNamedType).name}${
      (type as GraphQLNamedType).name === 'ID' ? '_Input' : ''
    }`
  }

  renderTypeWrapper(
    typeName: string,
    typeDescription: Maybe<string>,
    fieldDefinition: string,
  ): string {
    return `${this.renderDescription(
      typeDescription,
    )} export type ${typeName} = { ${fieldDefinition} }`
  }

  renderObjectWrapper(
    typeName: string,
    typeDescription: Maybe<string>,
    objects: GraphQLObjectType[],
    fieldDefinition: string,
  ): string {
    return `${this.renderDescription(
      typeDescription,
    )} export type ${typeName} = {
    `
  }

  renderInterfaceWrapper(
    typeName: string,
    typeDescription: Maybe<string>,
    interfaces: GraphQLInterfaceType[],
    fieldDefinition: string,
  ): string {
    return `${this.renderDescription(
      typeDescription,
    )} export type ${typeName} = {| ${
      interfaces.length > 0
        ? `...${interfaces.map(i => i.name).join(',\n')},\n `
        : ''
    }
${fieldDefinition}
|}`
  }

  renderDescription(description: Maybe<string>): string {
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
import { IResolvers } from '@graphql-tools/utils'
import ${
      this.isDefaultExport ? '' : '* as '
    }schema from  '${this.getRelativeSchemaPath()}'`
  }
}
