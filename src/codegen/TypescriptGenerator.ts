import {
  GraphQLSchema,
  GraphQLUnionType,
  GraphQLInterfaceType,
  GraphQLInputObjectType,
  GraphQLInputField,
  GraphQLField,
  GraphQLInputType,
  GraphQLOutputType,
  GraphQLScalarType,
  GraphQLEnumType,
  GraphQLFieldMap,
  GraphQLObjectType,
  getNamedType,
  isNonNullType,
  isListType,
  isObjectType,
} from 'graphql'

import { Generator } from './Generator'
import { Maybe } from './types'

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
        .join('\n')

      let interfaces: GraphQLInterfaceType[] = []
      if (isObjectType(type)) {
        interfaces = type.getInterfaces()
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
  new(...args: any[]): T
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
      .filter(typeName =>
        ast.getQueryType() ? typeName !== ast.getQueryType()!.name : true,
      )
      .filter(typeName =>
        ast.getMutationType() ? typeName !== ast.getMutationType()!.name : true,
      )
      .filter(typeName =>
        ast.getSubscriptionType()
          ? typeName !== ast.getSubscriptionType()!.name
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

        return `    ${field.name}: <T = ${this.renderFieldType(
          field.type,
        )}>(args${hasArgs ? '' : '?'}: {${hasArgs ? ' ' : ''}${field.args
          .map(
            f => `${this.renderFieldName(f)}: ${this.renderFieldType(f.type)}`,
          )
          .join(', ')}${
          field.args.length > 0 ? ' ' : ''
        }}, info?: GraphQLResolveInfo | string, options?: Options) => ${this.getPayloadType(
          operation,
          isNonNullType(field.type),
        )} `
      })
      .join(',\n')

    return `{\n${methods}\n  }`
  }

  getPayloadType(operation: string, nonNullType: boolean) {
    if (operation === 'subscription') {
      return `Promise<AsyncIterator<T${nonNullType ? '' : ' | null'}>>`
    }

    return `Promise<T${nonNullType ? '' : ' | null'}>`
  }

  renderInterfaceOrObject(
    type: GraphQLObjectType | GraphQLInputObjectType | GraphQLInterfaceType,
  ): string {
    const fieldDefinition = Object.keys(type.getFields())
      .map(f => {
        const field = type.getFields()[f]
        return `  ${this.renderFieldName(field)}: ${this.renderFieldType(
          field.type,
        )}`
      })
      .join('\n')

    let interfaces: GraphQLInterfaceType[] = []
    if (isObjectType(type)) {
      interfaces = type.getInterfaces()
    }

    return this.renderInterfaceWrapper(
      type.name,
      type.description,
      interfaces,
      fieldDefinition,
    )
  }

  renderFieldName(field: GraphQLInputField | GraphQLField<any, any>) {
    return isNonNullType(field.type) ? field.name : `${field.name}?`
  }

  renderFieldType(type: GraphQLInputType | GraphQLOutputType): string {
    /* Render list type */
    if (isListType(type)) {
      return `Array<${this.renderFieldType(type.ofType)}> | null`
    }

    /* Render non nullable type */
    if (isNonNullType(type)) {
      return `${this.renderFieldType(type.ofType)}`.replace(/ \| null$/, '')
    }

    /* Render nullable type */
    const ofType = getNamedType(type)
    return `${ofType.name === 'ID' ? 'ID_Output' : ofType.name} | null`
  }

  renderInputFieldType(type: GraphQLInputType | GraphQLOutputType): string {
    /* Render list type */
    if (isListType(type)) {
      const typeName = this.renderFieldType(type.ofType)
      return `${typeName}[] | ${typeName} | null`
    }

    /* Render non nullable type */
    if (isNonNullType(type)) {
      return `${this.renderFieldType(type.ofType)}`.replace(/ \| null$/, '')
    }

    /* Render nullable type */
    const ofType = getNamedType(type)
    return `${ofType.name === 'ID' ? 'ID_Input' : ofType.name} | null`
  }

  renderTypeWrapper(
    typeName: string,
    typeDescription: Maybe<string>,
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
    typeDescription: Maybe<string>,
    interfaces: GraphQLInterfaceType[],
    fieldDefinition: string,
  ): string {
    return `${this.renderDescription(
      typeDescription,
    )}export interface ${typeName}${
      interfaces.length > 0
        ? ` extends ${interfaces.map(i => i.name).join(', ')}`
        : ''
    } {
${fieldDefinition}
}`
  }

  renderDescription(description: Maybe<string>) {
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
