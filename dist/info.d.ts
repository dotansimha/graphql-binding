import { GraphQLSchema, GraphQLResolveInfo, GraphQLOutputType, GraphQLObjectType as GraphQLObjectTypeRef, GraphQLScalarType as GraphQLScalarTypeRef, DocumentNode } from 'graphql';
import { Operation } from './types';
export declare function buildInfo(rootFieldName: string, operation: Operation, schema: GraphQLSchema, info?: GraphQLResolveInfo | string | DocumentNode): GraphQLResolveInfo;
export declare function buildInfoForAllScalars(rootFieldName: string, schema: GraphQLSchema, operation: Operation): GraphQLResolveInfo;
export declare function buildInfoFromFragment(rootFieldName: string, schema: GraphQLSchema, operation: Operation, query: string): GraphQLResolveInfo;
/**
 * Generates a sub info based on the provided path. If provided path is not included in the selection set, the function returns null.
 * @param info GraphQLResolveInfo
 * @param path string
 * @param fragment string | undefined
 */
export declare function makeSubInfo(info: GraphQLResolveInfo, path: string, fragment?: string): GraphQLResolveInfo | null;
export declare function getDeepType(type: GraphQLOutputType): GraphQLObjectTypeRef | GraphQLScalarTypeRef;
export declare function addPath(prev: any, key: any): {
    prev: any;
    key: any;
};
