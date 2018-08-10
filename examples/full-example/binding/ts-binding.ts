import { makeBindingClass, Options } from 'graphql-binding'
import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import * as schema from  '../schema'

export interface Query {
    users: <T = UserNode[]>(args: { where?: () => UserWhereInput | undefined, orderBy?: UserOrderByInput | undefined, skip?: Int | undefined, after?: String | undefined, before?: String | undefined, first?: Int | undefined, last?: Int | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<UserNode[]> ,
    as: <T = ANode[]>(args: { where?: () => AWhereInput | undefined, orderBy?: AOrderByInput | undefined, skip?: Int | undefined, after?: String | undefined, before?: String | undefined, first?: Int | undefined, last?: Int | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<ANode[]> ,
    bs: <T = BNode[]>(args: { where?: () => BWhereInput | undefined, orderBy?: BOrderByInput | undefined, skip?: Int | undefined, after?: String | undefined, before?: String | undefined, first?: Int | undefined, last?: Int | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<BNode[]> ,
    user: <T = UserNode | undefined | null>(args: { where: () => UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where: () => UserWhereUniqueInput }) => User ,
    a: <T = ANode | undefined | null>(args: { where: () => AWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where: () => AWhereUniqueInput }) => A ,
    b: <T = BNode | undefined | null>(args: { where: () => BWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where: () => BWhereUniqueInput }) => B ,
    usersConnection: <T = UserConnectionNode>(args: { where?: () => UserWhereInput | undefined, orderBy?: UserOrderByInput | undefined, skip?: Int | undefined, after?: String | undefined, before?: String | undefined, first?: Int | undefined, last?: Int | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where?: () => UserWhereInput | undefined, orderBy?: UserOrderByInput | undefined, skip?: Int | undefined, after?: String | undefined, before?: String | undefined, first?: Int | undefined, last?: Int | undefined }) => UserConnection ,
    asConnection: <T = AConnectionNode>(args: { where?: () => AWhereInput | undefined, orderBy?: AOrderByInput | undefined, skip?: Int | undefined, after?: String | undefined, before?: String | undefined, first?: Int | undefined, last?: Int | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where?: () => AWhereInput | undefined, orderBy?: AOrderByInput | undefined, skip?: Int | undefined, after?: String | undefined, before?: String | undefined, first?: Int | undefined, last?: Int | undefined }) => AConnection ,
    bsConnection: <T = BConnectionNode>(args: { where?: () => BWhereInput | undefined, orderBy?: BOrderByInput | undefined, skip?: Int | undefined, after?: String | undefined, before?: String | undefined, first?: Int | undefined, last?: Int | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where?: () => BWhereInput | undefined, orderBy?: BOrderByInput | undefined, skip?: Int | undefined, after?: String | undefined, before?: String | undefined, first?: Int | undefined, last?: Int | undefined }) => BConnection ,
    node: <T = NodeNode | undefined | null>(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { id: ID_Output }) => Node 
  }

export interface Mutation {
    createUser: <T = UserNode>(args: { data: () => UserCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { data: () => UserCreateInput }) => User ,
    createA: <T = ANode>(args: { data: () => ACreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { data: () => ACreateInput }) => A ,
    createB: <T = BNode>(args: { data: () => BCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { data: () => BCreateInput }) => B ,
    updateUser: <T = UserNode | undefined | null>(args: { data: () => UserUpdateInput, where: () => UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { data: () => UserUpdateInput, where: () => UserWhereUniqueInput }) => User ,
    updateA: <T = ANode | undefined | null>(args: { data: () => AUpdateInput, where: () => AWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { data: () => AUpdateInput, where: () => AWhereUniqueInput }) => A ,
    updateB: <T = BNode | undefined | null>(args: { data: () => BUpdateInput, where: () => BWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { data: () => BUpdateInput, where: () => BWhereUniqueInput }) => B ,
    deleteUser: <T = UserNode | undefined | null>(args: { where: () => UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where: () => UserWhereUniqueInput }) => User ,
    deleteA: <T = ANode | undefined | null>(args: { where: () => AWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where: () => AWhereUniqueInput }) => A ,
    deleteB: <T = BNode | undefined | null>(args: { where: () => BWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where: () => BWhereUniqueInput }) => B ,
    upsertUser: <T = UserNode>(args: { where: () => UserWhereUniqueInput, create: () => UserCreateInput, update: () => UserUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where: () => UserWhereUniqueInput, create: () => UserCreateInput, update: () => UserUpdateInput }) => User ,
    upsertA: <T = ANode>(args: { where: () => AWhereUniqueInput, create: () => ACreateInput, update: () => AUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where: () => AWhereUniqueInput, create: () => ACreateInput, update: () => AUpdateInput }) => A ,
    upsertB: <T = BNode>(args: { where: () => BWhereUniqueInput, create: () => BCreateInput, update: () => BUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where: () => BWhereUniqueInput, create: () => BCreateInput, update: () => BUpdateInput }) => B ,
    updateManyUsers: <T = BatchPayloadNode>(args: { data: () => UserUpdateInput, where?: () => UserWhereInput | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { data: () => UserUpdateInput, where?: () => UserWhereInput | undefined }) => BatchPayload ,
    updateManyAs: <T = BatchPayloadNode>(args: { data: () => AUpdateInput, where?: () => AWhereInput | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { data: () => AUpdateInput, where?: () => AWhereInput | undefined }) => BatchPayload ,
    updateManyBs: <T = BatchPayloadNode>(args: { data: () => BUpdateInput, where?: () => BWhereInput | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { data: () => BUpdateInput, where?: () => BWhereInput | undefined }) => BatchPayload ,
    deleteManyUsers: <T = BatchPayloadNode>(args: { where?: () => UserWhereInput | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where?: () => UserWhereInput | undefined }) => BatchPayload ,
    deleteManyAs: <T = BatchPayloadNode>(args: { where?: () => AWhereInput | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where?: () => AWhereInput | undefined }) => BatchPayload ,
    deleteManyBs: <T = BatchPayloadNode>(args: { where?: () => BWhereInput | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where?: () => BWhereInput | undefined }) => BatchPayload 
  }

export interface Subscription {
    user: <T = UserSubscriptionPayloadNode | undefined | null>(args: { where?: () => UserSubscriptionWhereInput | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    a: <T = ASubscriptionPayloadNode | undefined | null>(args: { where?: () => ASubscriptionWhereInput | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    b: <T = BSubscriptionPayloadNode | undefined | null>(args: { where?: () => BSubscriptionWhereInput | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> 
  }

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

export const Binding = makeBindingClass<BindingConstructor<Binding>>({ schema })

/**
 * Types
*/

export type MutationType =   'CREATED' |
  'UPDATED' |
  'DELETED'

export type AOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type UserOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type BOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export interface UserCreateInput {
  name: String
}

export interface UserWhereUniqueInput {
  id?: ID_Input
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | UserWhereInput
  OR?: UserWhereInput[] | UserWhereInput
  NOT?: UserWhereInput[] | UserWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
}

export interface AWhereUniqueInput {
  id?: ID_Input
}

export interface ASubscriptionWhereInput {
  AND?: ASubscriptionWhereInput[] | ASubscriptionWhereInput
  OR?: ASubscriptionWhereInput[] | ASubscriptionWhereInput
  NOT?: ASubscriptionWhereInput[] | ASubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: AWhereInput
}

export interface BWhereUniqueInput {
  id?: ID_Input
}

export interface BWhereInput {
  AND?: BWhereInput[] | BWhereInput
  OR?: BWhereInput[] | BWhereInput
  NOT?: BWhereInput[] | BWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
}

export interface ACreateInput {
  name: String
}

export interface BCreateInput {
  name: String
}

export interface UserUpdateInput {
  name?: String
}

export interface AUpdateInput {
  name?: String
}

export interface BSubscriptionWhereInput {
  AND?: BSubscriptionWhereInput[] | BSubscriptionWhereInput
  OR?: BSubscriptionWhereInput[] | BSubscriptionWhereInput
  NOT?: BSubscriptionWhereInput[] | BSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: BWhereInput
}

export interface UserSubscriptionWhereInput {
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  NOT?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: UserWhereInput
}

export interface AWhereInput {
  AND?: AWhereInput[] | AWhereInput
  OR?: AWhereInput[] | AWhereInput
  NOT?: AWhereInput[] | AWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
}

export interface BUpdateInput {
  name?: String
}

/*
 * An object with an ID

 */
export interface NodeNode {
  id: ID_Output
}

/*
 * An edge in a connection.

 */
export interface AEdgeNode {
  cursor: String
}

/*
 * An edge in a connection.

 */
export interface AEdge extends Promise<AEdgeNode> {
  node: () => A
  cursor: () => String
}

export interface BatchPayloadNode {
  count: Long
}

export interface BatchPayload extends Promise<BatchPayloadNode> {
  count: () => Long
}

export interface BPreviousValuesNode {
  id: ID_Output
  name: String
}

export interface BPreviousValues extends Promise<BPreviousValuesNode> {
  id: () => ID_Output
  name: () => String
}

/*
 * A connection to a list of items.

 */
export interface AConnectionNode {

}

/*
 * A connection to a list of items.

 */
export interface AConnection extends Promise<AConnectionNode> {
  pageInfo: () => PageInfo
  edges: Promise<AEdgeNode[]>
  aggregate: () => AggregateA
}

export interface AggregateANode {
  count: Int
}

export interface AggregateA extends Promise<AggregateANode> {
  count: () => Int
}

export interface ANode extends Node {
  id: ID_Output
  name: String
}

export interface A extends Promise<ANode>, Node {
  id: () => ID_Output
  name: () => String
}

/*
 * An edge in a connection.

 */
export interface BEdgeNode {
  cursor: String
}

/*
 * An edge in a connection.

 */
export interface BEdge extends Promise<BEdgeNode> {
  node: () => B
  cursor: () => String
}

export interface UserNode extends Node {
  id: ID_Output
  name: String
}

export interface User extends Promise<UserNode>, Node {
  id: () => ID_Output
  name: () => String
}

export interface AggregateUserNode {
  count: Int
}

export interface AggregateUser extends Promise<AggregateUserNode> {
  count: () => Int
}

export interface AggregateBNode {
  count: Int
}

export interface AggregateB extends Promise<AggregateBNode> {
  count: () => Int
}

export interface ASubscriptionPayloadNode {
  mutation: MutationType
  updatedFields?: String | undefined[]
}

export interface ASubscriptionPayload extends Promise<ASubscriptionPayloadNode> {
  mutation: () => MutationType
  node?: () => A
  updatedFields?: Promise<Array<String | undefined>>
  previousValues?: () => APreviousValues
}

export interface UserSubscriptionPayloadNode {
  mutation: MutationType
  updatedFields?: String | undefined[]
}

export interface UserSubscriptionPayload extends Promise<UserSubscriptionPayloadNode> {
  mutation: () => MutationType
  node?: () => User
  updatedFields?: Promise<Array<String | undefined>>
  previousValues?: () => UserPreviousValues
}

export interface APreviousValuesNode {
  id: ID_Output
  name: String
}

export interface APreviousValues extends Promise<APreviousValuesNode> {
  id: () => ID_Output
  name: () => String
}

export interface UserPreviousValuesNode {
  id: ID_Output
  name: String
}

export interface UserPreviousValues extends Promise<UserPreviousValuesNode> {
  id: () => ID_Output
  name: () => String
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfoNode {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String | undefined
  endCursor?: String | undefined
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo extends Promise<PageInfoNode> {
  hasNextPage: () => Boolean
  hasPreviousPage: () => Boolean
  startCursor?: () => String
  endCursor?: () => String
}

/*
 * An edge in a connection.

 */
export interface UserEdgeNode {
  cursor: String
}

/*
 * An edge in a connection.

 */
export interface UserEdge extends Promise<UserEdgeNode> {
  node: () => User
  cursor: () => String
}

/*
 * A connection to a list of items.

 */
export interface UserConnectionNode {

}

/*
 * A connection to a list of items.

 */
export interface UserConnection extends Promise<UserConnectionNode> {
  pageInfo: () => PageInfo
  edges: Promise<UserEdgeNode[]>
  aggregate: () => AggregateUser
}

/*
 * A connection to a list of items.

 */
export interface BConnectionNode {

}

/*
 * A connection to a list of items.

 */
export interface BConnection extends Promise<BConnectionNode> {
  pageInfo: () => PageInfo
  edges: Promise<BEdgeNode[]>
  aggregate: () => AggregateB
}

export interface BSubscriptionPayloadNode {
  mutation: MutationType
  updatedFields?: String | undefined[]
}

export interface BSubscriptionPayload extends Promise<BSubscriptionPayloadNode> {
  mutation: () => MutationType
  node?: () => B
  updatedFields?: Promise<Array<String | undefined>>
  previousValues?: () => BPreviousValues
}

export interface BNode extends Node {
  id: ID_Output
  name: String
}

export interface B extends Promise<BNode>, Node {
  id: () => ID_Output
  name: () => String
}

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number