import { GraphQLSchema, GraphQLResolveInfo, GraphQLOutputType } from 'graphql';
import { Operation } from '../types';
export declare function isScalar(t: GraphQLOutputType): boolean;
export declare function getTypeForRootFieldName(rootFieldName: string, operation: Operation, schema: GraphQLSchema): GraphQLOutputType;
export declare function forwardTo(bindingName: string): (parent: any, args: any, context: any, info: GraphQLResolveInfo) => any;
export declare function printDocumentFromInfo(info: GraphQLResolveInfo): string;
