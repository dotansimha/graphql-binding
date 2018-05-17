import { Generator } from './Generator';
import { GraphQLSchema, GraphQLUnionType, GraphQLInterfaceType, GraphQLInputObjectType, GraphQLInputField, GraphQLField, GraphQLInputType, GraphQLOutputType, GraphQLScalarType, GraphQLEnumType, GraphQLFieldMap, GraphQLObjectType as GraphQLObjectTypeRef } from 'graphql';
export declare class FlowGenerator extends Generator {
    scalarMapping: {
        Int: string;
        String: string;
        ID: string;
        Float: string;
        Boolean: string;
        DateTime: string;
    };
    graphqlRenderers: {
        GraphQLUnionType: (type: GraphQLUnionType) => string;
        GraphQLObjectType: (type: GraphQLObjectTypeRef | GraphQLInterfaceType | GraphQLInputObjectType) => string;
        GraphQLInterfaceType: (type: GraphQLObjectTypeRef | GraphQLInterfaceType | GraphQLInputObjectType) => string;
        GraphQLInputObjectType: (type: GraphQLObjectTypeRef | GraphQLInterfaceType | GraphQLInputObjectType) => string;
        GraphQLScalarType: (type: GraphQLScalarType) => string;
        GraphQLIDType: (type: GraphQLScalarType) => string;
        GraphQLEnumType: (type: GraphQLEnumType) => string;
    };
    constructor({schema, inputSchemaPath, outputBindingPath, isDefaultExport}: {
        schema: GraphQLSchema;
        inputSchemaPath: string;
        outputBindingPath: string;
        isDefaultExport: boolean;
    });
    render(): string;
    renderExports(): string;
    renderQueries(): string;
    renderMutations(): string;
    renderSubscriptions(): string;
    getTypeNames(): string[];
    renderTypes(): string;
    renderMainMethodFields(operation: string, fields: GraphQLFieldMap<any, any>): string;
    getPayloadType(operation: string, type: string): string;
    renderInterfaceOrObject(type: GraphQLObjectTypeRef | GraphQLInputObjectType | GraphQLInterfaceType): string;
    renderFieldName(field: GraphQLInputField | GraphQLField<any, any>): string;
    renderFieldType(type: GraphQLInputType | GraphQLOutputType): string;
    renderInputFieldType(type: GraphQLInputType | GraphQLOutputType): any;
    renderTypeWrapper(typeName: string, typeDescription: string | void, fieldDefinition: string): string;
    renderObjectWrapper(typeName: string, typeDescription: string | void, objects: GraphQLObjectTypeRef[], fieldDefinition: string): string;
    renderInterfaceWrapper(typeName: string, typeDescription: string | void, interfaces: GraphQLInterfaceType[], fieldDefinition: string): string;
    renderDescription(description?: string | void): string;
    renderImports(): string;
}
