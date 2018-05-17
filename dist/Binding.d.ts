import { QueryMap, BindingOptions, SubscriptionMap, QueryOrMutation } from './types';
import { Delegate } from './Delegate';
export declare class Binding extends Delegate {
    query: QueryMap;
    mutation: QueryMap;
    subscription: SubscriptionMap;
    constructor({schema, fragmentReplacements, before}: BindingOptions);
    buildMethods(): any;
    buildQueryMethods(operation: QueryOrMutation): QueryMap;
    buildSubscriptionMethods(): SubscriptionMap;
}
