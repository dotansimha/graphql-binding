import { GraphQLResolveInfo, GraphQLSchema } from 'graphql';
import { IResolvers } from 'graphql-tools/dist/Interfaces';
import { BindingOptions, Options, QueryOrMutation } from './types';
export declare class Delegate {
    schema: GraphQLSchema;
    before: () => void;
    private fragmentReplacements;
    constructor({schema, fragmentReplacements, before}: BindingOptions);
    request<T = any>(query: string, variables?: {
        [key: string]: any;
    }): Promise<T>;
    delegate(operation: QueryOrMutation, fieldName: string, args: {
        [key: string]: any;
    }, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;
    delegateSubscription(fieldName: string, args?: {
        [key: string]: any;
    }, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;
    getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
    private delegateToSchema(operation, fieldName, args?, infoOrQuery?, options?);
}
