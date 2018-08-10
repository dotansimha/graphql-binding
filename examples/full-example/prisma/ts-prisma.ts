import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { Options } from 'graphql-binding'
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding'

export interface Query {
    users: <T = UserNode[]>(args: { where: () => UserWhereInput | undefined, orderBy: UserOrderByInput | undefined, skip: Int | undefined, after: String | undefined, before: String | undefined, first: Int | undefined, last: Int | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<UserNode[]> ,
    cars: <T = CarNode[]>(args: { where: () => CarWhereInput | undefined, orderBy: CarOrderByInput | undefined, skip: Int | undefined, after: String | undefined, before: String | undefined, first: Int | undefined, last: Int | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<CarNode[]> ,
    bars: <T = BarNode[]>(args: { where: () => BarWhereInput | undefined, orderBy: BarOrderByInput | undefined, skip: Int | undefined, after: String | undefined, before: String | undefined, first: Int | undefined, last: Int | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<BarNode[]> ,
    user: <T = UserNode | undefined | null>(args: { where: () => UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where: () => UserWhereUniqueInput }) => User ,
    car: <T = CarNode | undefined | null>(args: { where: () => CarWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where: () => CarWhereUniqueInput }) => Car ,
    bar: <T = BarNode | undefined | null>(args: { where: () => BarWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where: () => BarWhereUniqueInput }) => Bar ,
    usersConnection: <T = UserConnectionNode>(args: { where: () => UserWhereInput | undefined, orderBy: UserOrderByInput | undefined, skip: Int | undefined, after: String | undefined, before: String | undefined, first: Int | undefined, last: Int | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where: () => UserWhereInput | undefined, orderBy: UserOrderByInput | undefined, skip: Int | undefined, after: String | undefined, before: String | undefined, first: Int | undefined, last: Int | undefined }) => UserConnection ,
    carsConnection: <T = CarConnectionNode>(args: { where: () => CarWhereInput | undefined, orderBy: CarOrderByInput | undefined, skip: Int | undefined, after: String | undefined, before: String | undefined, first: Int | undefined, last: Int | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where: () => CarWhereInput | undefined, orderBy: CarOrderByInput | undefined, skip: Int | undefined, after: String | undefined, before: String | undefined, first: Int | undefined, last: Int | undefined }) => CarConnection ,
    barsConnection: <T = BarConnectionNode>(args: { where: () => BarWhereInput | undefined, orderBy: BarOrderByInput | undefined, skip: Int | undefined, after: String | undefined, before: String | undefined, first: Int | undefined, last: Int | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where: () => BarWhereInput | undefined, orderBy: BarOrderByInput | undefined, skip: Int | undefined, after: String | undefined, before: String | undefined, first: Int | undefined, last: Int | undefined }) => BarConnection ,
    node: <T = NodeNode | undefined | null>(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { id: ID_Output }) => Node 
  }

export interface Mutation {
    createUser: <T = UserNode>(args: { data: () => UserCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { data: () => UserCreateInput }) => User ,
    createCar: <T = CarNode>(args: { data: () => CarCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { data: () => CarCreateInput }) => Car ,
    createBar: <T = BarNode>(args: { data: () => BarCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { data: () => BarCreateInput }) => Bar ,
    updateUser: <T = UserNode | undefined | null>(args: { data: () => UserUpdateInput, where: () => UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { data: () => UserUpdateInput, where: () => UserWhereUniqueInput }) => User ,
    updateCar: <T = CarNode | undefined | null>(args: { data: () => CarUpdateInput, where: () => CarWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { data: () => CarUpdateInput, where: () => CarWhereUniqueInput }) => Car ,
    updateBar: <T = BarNode | undefined | null>(args: { data: () => BarUpdateInput, where: () => BarWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { data: () => BarUpdateInput, where: () => BarWhereUniqueInput }) => Bar ,
    deleteUser: <T = UserNode | undefined | null>(args: { where: () => UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where: () => UserWhereUniqueInput }) => User ,
    deleteCar: <T = CarNode | undefined | null>(args: { where: () => CarWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where: () => CarWhereUniqueInput }) => Car ,
    deleteBar: <T = BarNode | undefined | null>(args: { where: () => BarWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where: () => BarWhereUniqueInput }) => Bar ,
    upsertUser: <T = UserNode>(args: { where: () => UserWhereUniqueInput, create: () => UserCreateInput, update: () => UserUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where: () => UserWhereUniqueInput, create: () => UserCreateInput, update: () => UserUpdateInput }) => User ,
    upsertCar: <T = CarNode>(args: { where: () => CarWhereUniqueInput, create: () => CarCreateInput, update: () => CarUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where: () => CarWhereUniqueInput, create: () => CarCreateInput, update: () => CarUpdateInput }) => Car ,
    upsertBar: <T = BarNode>(args: { where: () => BarWhereUniqueInput, create: () => BarCreateInput, update: () => BarUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where: () => BarWhereUniqueInput, create: () => BarCreateInput, update: () => BarUpdateInput }) => Bar ,
    updateManyUsers: <T = BatchPayloadNode>(args: { data: () => UserUpdateInput, where: () => UserWhereInput | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { data: () => UserUpdateInput, where: () => UserWhereInput | undefined }) => BatchPayload ,
    updateManyCars: <T = BatchPayloadNode>(args: { data: () => CarUpdateInput, where: () => CarWhereInput | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { data: () => CarUpdateInput, where: () => CarWhereInput | undefined }) => BatchPayload ,
    updateManyBars: <T = BatchPayloadNode>(args: { data: () => BarUpdateInput, where: () => BarWhereInput | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { data: () => BarUpdateInput, where: () => BarWhereInput | undefined }) => BatchPayload ,
    deleteManyUsers: <T = BatchPayloadNode>(args: { where: () => UserWhereInput | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where: () => UserWhereInput | undefined }) => BatchPayload ,
    deleteManyCars: <T = BatchPayloadNode>(args: { where: () => CarWhereInput | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where: () => CarWhereInput | undefined }) => BatchPayload ,
    deleteManyBars: <T = BatchPayloadNode>(args: { where: () => BarWhereInput | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => (args: { where: () => BarWhereInput | undefined }) => BatchPayload 
  }

export interface Subscription {
    user: <T = UserSubscriptionPayloadNode | undefined | null>(args: { where: () => UserSubscriptionWhereInput | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    car: <T = CarSubscriptionPayloadNode | undefined | null>(args: { where: () => CarSubscriptionWhereInput | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    bar: <T = BarSubscriptionPayloadNode | undefined | null>(args: { where: () => BarSubscriptionWhereInput | undefined }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> 
  }

export interface Exists {
  User: (where?: UserWhereInput) => Promise<boolean>
  Car: (where?: CarWhereInput) => Promise<boolean>
  Bar: (where?: BarWhereInput) => Promise<boolean>
}

export interface Node {}

export interface Prisma {
  query: Query
  mutation: Mutation
  subscription: Subscription
  exists: Exists
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
  new(options: BasePrismaOptions): T
}
/**
 * Type Defs
*/

const typeDefs = `type AggregateBar {
  count: Int!
}

type AggregateCar {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type Bar implements Node {
  id: ID!
  a: String
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  lol: String
}

type BarConnection {
  pageInfo: PageInfo!
  edges: [BarEdge]!
  aggregate: AggregateBar!
}

input BarCreateInput {
  a: String
  lol: String
  users: UserCreateManyWithoutBarsInput
}

input BarCreateManyWithoutUsersInput {
  create: [BarCreateWithoutUsersInput!]
  connect: [BarWhereUniqueInput!]
}

input BarCreateWithoutUsersInput {
  a: String
  lol: String
}

type BarEdge {
  node: Bar!
  cursor: String!
}

enum BarOrderByInput {
  id_ASC
  id_DESC
  a_ASC
  a_DESC
  lol_ASC
  lol_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type BarPreviousValues {
  id: ID!
  a: String
  lol: String
}

type BarSubscriptionPayload {
  mutation: MutationType!
  node: Bar
  updatedFields: [String!]
  previousValues: BarPreviousValues
}

input BarSubscriptionWhereInput {
  AND: [BarSubscriptionWhereInput!]
  OR: [BarSubscriptionWhereInput!]
  NOT: [BarSubscriptionWhereInput!]
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: BarWhereInput
}

input BarUpdateInput {
  a: String
  lol: String
  users: UserUpdateManyWithoutBarsInput
}

input BarUpdateManyWithoutUsersInput {
  create: [BarCreateWithoutUsersInput!]
  connect: [BarWhereUniqueInput!]
  disconnect: [BarWhereUniqueInput!]
  delete: [BarWhereUniqueInput!]
  update: [BarUpdateWithWhereUniqueWithoutUsersInput!]
  upsert: [BarUpsertWithWhereUniqueWithoutUsersInput!]
}

input BarUpdateWithoutUsersDataInput {
  a: String
  lol: String
}

input BarUpdateWithWhereUniqueWithoutUsersInput {
  where: BarWhereUniqueInput!
  data: BarUpdateWithoutUsersDataInput!
}

input BarUpsertWithWhereUniqueWithoutUsersInput {
  where: BarWhereUniqueInput!
  update: BarUpdateWithoutUsersDataInput!
  create: BarCreateWithoutUsersInput!
}

input BarWhereInput {
  AND: [BarWhereInput!]
  OR: [BarWhereInput!]
  NOT: [BarWhereInput!]
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  a: String
  a_not: String
  a_in: [String!]
  a_not_in: [String!]
  a_lt: String
  a_lte: String
  a_gt: String
  a_gte: String
  a_contains: String
  a_not_contains: String
  a_starts_with: String
  a_not_starts_with: String
  a_ends_with: String
  a_not_ends_with: String
  lol: String
  lol_not: String
  lol_in: [String!]
  lol_not_in: [String!]
  lol_lt: String
  lol_lte: String
  lol_gt: String
  lol_gte: String
  lol_contains: String
  lol_not_contains: String
  lol_starts_with: String
  lol_not_starts_with: String
  lol_ends_with: String
  lol_not_ends_with: String
  users_every: UserWhereInput
  users_some: UserWhereInput
  users_none: UserWhereInput
}

input BarWhereUniqueInput {
  id: ID
}

type BatchPayload {
  count: Long!
}

type Car implements Node {
  id: ID!
  name: String!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
}

type CarConnection {
  pageInfo: PageInfo!
  edges: [CarEdge]!
  aggregate: AggregateCar!
}

input CarCreateInput {
  name: String!
  users: UserCreateManyWithoutCarInput
}

input CarCreateOneWithoutUsersInput {
  create: CarCreateWithoutUsersInput
  connect: CarWhereUniqueInput
}

input CarCreateWithoutUsersInput {
  name: String!
}

type CarEdge {
  node: Car!
  cursor: String!
}

enum CarOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type CarPreviousValues {
  id: ID!
  name: String!
}

type CarSubscriptionPayload {
  mutation: MutationType!
  node: Car
  updatedFields: [String!]
  previousValues: CarPreviousValues
}

input CarSubscriptionWhereInput {
  AND: [CarSubscriptionWhereInput!]
  OR: [CarSubscriptionWhereInput!]
  NOT: [CarSubscriptionWhereInput!]
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CarWhereInput
}

input CarUpdateInput {
  name: String
  users: UserUpdateManyWithoutCarInput
}

input CarUpdateOneWithoutUsersInput {
  create: CarCreateWithoutUsersInput
  connect: CarWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: CarUpdateWithoutUsersDataInput
  upsert: CarUpsertWithoutUsersInput
}

input CarUpdateWithoutUsersDataInput {
  name: String
}

input CarUpsertWithoutUsersInput {
  update: CarUpdateWithoutUsersDataInput!
  create: CarCreateWithoutUsersInput!
}

input CarWhereInput {
  AND: [CarWhereInput!]
  OR: [CarWhereInput!]
  NOT: [CarWhereInput!]
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  users_every: UserWhereInput
  users_some: UserWhereInput
  users_none: UserWhereInput
}

input CarWhereUniqueInput {
  id: ID
}

scalar DateTime

enum Enum {
  VALUE_A
  VALUE_B
}

scalar Json

scalar Long

type Mutation {
  createUser(data: UserCreateInput!): User!
  createCar(data: CarCreateInput!): Car!
  createBar(data: BarCreateInput!): Bar!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateCar(data: CarUpdateInput!, where: CarWhereUniqueInput!): Car
  updateBar(data: BarUpdateInput!, where: BarWhereUniqueInput!): Bar
  deleteUser(where: UserWhereUniqueInput!): User
  deleteCar(where: CarWhereUniqueInput!): Car
  deleteBar(where: BarWhereUniqueInput!): Bar
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertCar(where: CarWhereUniqueInput!, create: CarCreateInput!, update: CarUpdateInput!): Car!
  upsertBar(where: BarWhereUniqueInput!, create: BarCreateInput!, update: BarUpdateInput!): Bar!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  updateManyCars(data: CarUpdateInput!, where: CarWhereInput): BatchPayload!
  updateManyBars(data: BarUpdateInput!, where: BarWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyCars(where: CarWhereInput): BatchPayload!
  deleteManyBars(where: BarWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  cars(where: CarWhereInput, orderBy: CarOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Car]!
  bars(where: BarWhereInput, orderBy: BarOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Bar]!
  user(where: UserWhereUniqueInput!): User
  car(where: CarWhereUniqueInput!): Car
  bar(where: BarWhereUniqueInput!): Bar
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  carsConnection(where: CarWhereInput, orderBy: CarOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CarConnection!
  barsConnection(where: BarWhereInput, orderBy: BarOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): BarConnection!
  node(id: ID!): Node
}

type Subscription {
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  car(where: CarSubscriptionWhereInput): CarSubscriptionPayload
  bar(where: BarSubscriptionWhereInput): BarSubscriptionPayload
}

type User implements Node {
  id: ID!
  name: String!
  optinalString: String
  boolOpt: Boolean
  bool: Boolean!
  nullableInt: Int
  int: Int!
  jason: Json
  nullableFloat: Float
  flotat: Float!
  intList: [Int!]!
  floatList: [Float!]!
  floatListOptional: [Float!]!
  enum: Enum
  enumList: [Enum!]!
  date: DateTime
  dateList: [DateTime!]!
  car(where: CarWhereInput): Car
  bars(where: BarWhereInput, orderBy: BarOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Bar!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreatedateListInput {
  set: [DateTime!]
}

input UserCreateenumListInput {
  set: [Enum!]
}

input UserCreatefloatListInput {
  set: [Float!]
}

input UserCreatefloatListOptionalInput {
  set: [Float!]
}

input UserCreateInput {
  name: String!
  optinalString: String
  boolOpt: Boolean
  bool: Boolean!
  nullableInt: Int
  int: Int!
  jason: Json
  nullableFloat: Float
  flotat: Float!
  enum: Enum
  date: DateTime
  intList: UserCreateintListInput
  floatList: UserCreatefloatListInput
  floatListOptional: UserCreatefloatListOptionalInput
  enumList: UserCreateenumListInput
  dateList: UserCreatedateListInput
  car: CarCreateOneWithoutUsersInput
  bars: BarCreateManyWithoutUsersInput
}

input UserCreateintListInput {
  set: [Int!]
}

input UserCreateManyWithoutBarsInput {
  create: [UserCreateWithoutBarsInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateManyWithoutCarInput {
  create: [UserCreateWithoutCarInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateWithoutBarsInput {
  name: String!
  optinalString: String
  boolOpt: Boolean
  bool: Boolean!
  nullableInt: Int
  int: Int!
  jason: Json
  nullableFloat: Float
  flotat: Float!
  enum: Enum
  date: DateTime
  intList: UserCreateintListInput
  floatList: UserCreatefloatListInput
  floatListOptional: UserCreatefloatListOptionalInput
  enumList: UserCreateenumListInput
  dateList: UserCreatedateListInput
  car: CarCreateOneWithoutUsersInput
}

input UserCreateWithoutCarInput {
  name: String!
  optinalString: String
  boolOpt: Boolean
  bool: Boolean!
  nullableInt: Int
  int: Int!
  jason: Json
  nullableFloat: Float
  flotat: Float!
  enum: Enum
  date: DateTime
  intList: UserCreateintListInput
  floatList: UserCreatefloatListInput
  floatListOptional: UserCreatefloatListOptionalInput
  enumList: UserCreateenumListInput
  dateList: UserCreatedateListInput
  bars: BarCreateManyWithoutUsersInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  optinalString_ASC
  optinalString_DESC
  boolOpt_ASC
  boolOpt_DESC
  bool_ASC
  bool_DESC
  nullableInt_ASC
  nullableInt_DESC
  int_ASC
  int_DESC
  jason_ASC
  jason_DESC
  nullableFloat_ASC
  nullableFloat_DESC
  flotat_ASC
  flotat_DESC
  enum_ASC
  enum_DESC
  date_ASC
  date_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type UserPreviousValues {
  id: ID!
  name: String!
  optinalString: String
  boolOpt: Boolean
  bool: Boolean!
  nullableInt: Int
  int: Int!
  jason: Json
  nullableFloat: Float
  flotat: Float!
  intList: [Int!]!
  floatList: [Float!]!
  floatListOptional: [Float!]!
  enum: Enum
  enumList: [Enum!]!
  date: DateTime
  dateList: [DateTime!]!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

input UserUpdatedateListInput {
  set: [DateTime!]
}

input UserUpdateenumListInput {
  set: [Enum!]
}

input UserUpdatefloatListInput {
  set: [Float!]
}

input UserUpdatefloatListOptionalInput {
  set: [Float!]
}

input UserUpdateInput {
  name: String
  optinalString: String
  boolOpt: Boolean
  bool: Boolean
  nullableInt: Int
  int: Int
  jason: Json
  nullableFloat: Float
  flotat: Float
  enum: Enum
  date: DateTime
  intList: UserUpdateintListInput
  floatList: UserUpdatefloatListInput
  floatListOptional: UserUpdatefloatListOptionalInput
  enumList: UserUpdateenumListInput
  dateList: UserUpdatedateListInput
  car: CarUpdateOneWithoutUsersInput
  bars: BarUpdateManyWithoutUsersInput
}

input UserUpdateintListInput {
  set: [Int!]
}

input UserUpdateManyWithoutBarsInput {
  create: [UserCreateWithoutBarsInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  delete: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutBarsInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutBarsInput!]
}

input UserUpdateManyWithoutCarInput {
  create: [UserCreateWithoutCarInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  delete: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutCarInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutCarInput!]
}

input UserUpdateWithoutBarsDataInput {
  name: String
  optinalString: String
  boolOpt: Boolean
  bool: Boolean
  nullableInt: Int
  int: Int
  jason: Json
  nullableFloat: Float
  flotat: Float
  enum: Enum
  date: DateTime
  intList: UserUpdateintListInput
  floatList: UserUpdatefloatListInput
  floatListOptional: UserUpdatefloatListOptionalInput
  enumList: UserUpdateenumListInput
  dateList: UserUpdatedateListInput
  car: CarUpdateOneWithoutUsersInput
}

input UserUpdateWithoutCarDataInput {
  name: String
  optinalString: String
  boolOpt: Boolean
  bool: Boolean
  nullableInt: Int
  int: Int
  jason: Json
  nullableFloat: Float
  flotat: Float
  enum: Enum
  date: DateTime
  intList: UserUpdateintListInput
  floatList: UserUpdatefloatListInput
  floatListOptional: UserUpdatefloatListOptionalInput
  enumList: UserUpdateenumListInput
  dateList: UserUpdatedateListInput
  bars: BarUpdateManyWithoutUsersInput
}

input UserUpdateWithWhereUniqueWithoutBarsInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutBarsDataInput!
}

input UserUpdateWithWhereUniqueWithoutCarInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutCarDataInput!
}

input UserUpsertWithWhereUniqueWithoutBarsInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutBarsDataInput!
  create: UserCreateWithoutBarsInput!
}

input UserUpsertWithWhereUniqueWithoutCarInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutCarDataInput!
  create: UserCreateWithoutCarInput!
}

input UserWhereInput {
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  optinalString: String
  optinalString_not: String
  optinalString_in: [String!]
  optinalString_not_in: [String!]
  optinalString_lt: String
  optinalString_lte: String
  optinalString_gt: String
  optinalString_gte: String
  optinalString_contains: String
  optinalString_not_contains: String
  optinalString_starts_with: String
  optinalString_not_starts_with: String
  optinalString_ends_with: String
  optinalString_not_ends_with: String
  boolOpt: Boolean
  boolOpt_not: Boolean
  bool: Boolean
  bool_not: Boolean
  nullableInt: Int
  nullableInt_not: Int
  nullableInt_in: [Int!]
  nullableInt_not_in: [Int!]
  nullableInt_lt: Int
  nullableInt_lte: Int
  nullableInt_gt: Int
  nullableInt_gte: Int
  int: Int
  int_not: Int
  int_in: [Int!]
  int_not_in: [Int!]
  int_lt: Int
  int_lte: Int
  int_gt: Int
  int_gte: Int
  nullableFloat: Float
  nullableFloat_not: Float
  nullableFloat_in: [Float!]
  nullableFloat_not_in: [Float!]
  nullableFloat_lt: Float
  nullableFloat_lte: Float
  nullableFloat_gt: Float
  nullableFloat_gte: Float
  flotat: Float
  flotat_not: Float
  flotat_in: [Float!]
  flotat_not_in: [Float!]
  flotat_lt: Float
  flotat_lte: Float
  flotat_gt: Float
  flotat_gte: Float
  enum: Enum
  enum_not: Enum
  enum_in: [Enum!]
  enum_not_in: [Enum!]
  date: DateTime
  date_not: DateTime
  date_in: [DateTime!]
  date_not_in: [DateTime!]
  date_lt: DateTime
  date_lte: DateTime
  date_gt: DateTime
  date_gte: DateTime
  car: CarWhereInput
  bars_every: BarWhereInput
  bars_some: BarWhereInput
  bars_none: BarWhereInput
}

input UserWhereUniqueInput {
  id: ID
}
`

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({typeDefs})

/**
 * Types
*/

export type Enum =   'VALUE_A' |
  'VALUE_B'

export type UserOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'optinalString_ASC' |
  'optinalString_DESC' |
  'boolOpt_ASC' |
  'boolOpt_DESC' |
  'bool_ASC' |
  'bool_DESC' |
  'nullableInt_ASC' |
  'nullableInt_DESC' |
  'int_ASC' |
  'int_DESC' |
  'jason_ASC' |
  'jason_DESC' |
  'nullableFloat_ASC' |
  'nullableFloat_DESC' |
  'flotat_ASC' |
  'flotat_DESC' |
  'enum_ASC' |
  'enum_DESC' |
  'date_ASC' |
  'date_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type BarOrderByInput =   'id_ASC' |
  'id_DESC' |
  'a_ASC' |
  'a_DESC' |
  'lol_ASC' |
  'lol_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type CarOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type MutationType =   'CREATED' |
  'UPDATED' |
  'DELETED'

export interface CarCreateInput {
  name: String
  users: UserCreateManyWithoutCarInput
}

export interface UserWhereInput {
  AND: UserWhereInput[] | UserWhereInput
  OR: UserWhereInput[] | UserWhereInput
  NOT: UserWhereInput[] | UserWhereInput
  id: ID_Input
  id_not: ID_Input
  id_in: ID_Input[] | ID_Input
  id_not_in: ID_Input[] | ID_Input
  id_lt: ID_Input
  id_lte: ID_Input
  id_gt: ID_Input
  id_gte: ID_Input
  id_contains: ID_Input
  id_not_contains: ID_Input
  id_starts_with: ID_Input
  id_not_starts_with: ID_Input
  id_ends_with: ID_Input
  id_not_ends_with: ID_Input
  name: String
  name_not: String
  name_in: String[] | String
  name_not_in: String[] | String
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  optinalString: String
  optinalString_not: String
  optinalString_in: String[] | String
  optinalString_not_in: String[] | String
  optinalString_lt: String
  optinalString_lte: String
  optinalString_gt: String
  optinalString_gte: String
  optinalString_contains: String
  optinalString_not_contains: String
  optinalString_starts_with: String
  optinalString_not_starts_with: String
  optinalString_ends_with: String
  optinalString_not_ends_with: String
  boolOpt: Boolean
  boolOpt_not: Boolean
  bool: Boolean
  bool_not: Boolean
  nullableInt: Int
  nullableInt_not: Int
  nullableInt_in: Int[] | Int
  nullableInt_not_in: Int[] | Int
  nullableInt_lt: Int
  nullableInt_lte: Int
  nullableInt_gt: Int
  nullableInt_gte: Int
  int: Int
  int_not: Int
  int_in: Int[] | Int
  int_not_in: Int[] | Int
  int_lt: Int
  int_lte: Int
  int_gt: Int
  int_gte: Int
  nullableFloat: Float
  nullableFloat_not: Float
  nullableFloat_in: Float[] | Float
  nullableFloat_not_in: Float[] | Float
  nullableFloat_lt: Float
  nullableFloat_lte: Float
  nullableFloat_gt: Float
  nullableFloat_gte: Float
  flotat: Float
  flotat_not: Float
  flotat_in: Float[] | Float
  flotat_not_in: Float[] | Float
  flotat_lt: Float
  flotat_lte: Float
  flotat_gt: Float
  flotat_gte: Float
  enum: Enum
  enum_not: Enum
  enum_in: Enum[] | Enum
  enum_not_in: Enum[] | Enum
  date: DateTime
  date_not: DateTime
  date_in: DateTime[] | DateTime
  date_not_in: DateTime[] | DateTime
  date_lt: DateTime
  date_lte: DateTime
  date_gt: DateTime
  date_gte: DateTime
  car: CarWhereInput
  bars_every: BarWhereInput
  bars_some: BarWhereInput
  bars_none: BarWhereInput
}

export interface UserCreateInput {
  name: String
  optinalString: String
  boolOpt: Boolean
  bool: Boolean
  nullableInt: Int
  int: Int
  jason: Json
  nullableFloat: Float
  flotat: Float
  enum: Enum
  date: DateTime
  intList: UserCreateintListInput
  floatList: UserCreatefloatListInput
  floatListOptional: UserCreatefloatListOptionalInput
  enumList: UserCreateenumListInput
  dateList: UserCreatedateListInput
  car: CarCreateOneWithoutUsersInput
  bars: BarCreateManyWithoutUsersInput
}

export interface CarUpdateWithoutUsersDataInput {
  name: String
}

export interface UserCreateintListInput {
  set: Int[] | Int
}

export interface BarCreateInput {
  a: String
  lol: String
  users: UserCreateManyWithoutBarsInput
}

export interface UserCreatefloatListInput {
  set: Float[] | Float
}

export interface BarSubscriptionWhereInput {
  AND: BarSubscriptionWhereInput[] | BarSubscriptionWhereInput
  OR: BarSubscriptionWhereInput[] | BarSubscriptionWhereInput
  NOT: BarSubscriptionWhereInput[] | BarSubscriptionWhereInput
  mutation_in: MutationType[] | MutationType
  updatedFields_contains: String
  updatedFields_contains_every: String[] | String
  updatedFields_contains_some: String[] | String
  node: BarWhereInput
}

export interface UserCreatefloatListOptionalInput {
  set: Float[] | Float
}

export interface UserUpsertWithWhereUniqueWithoutBarsInput {
  where: UserWhereUniqueInput
  update: UserUpdateWithoutBarsDataInput
  create: UserCreateWithoutBarsInput
}

export interface UserCreateenumListInput {
  set: Enum[] | Enum
}

export interface UserUpdateWithWhereUniqueWithoutBarsInput {
  where: UserWhereUniqueInput
  data: UserUpdateWithoutBarsDataInput
}

export interface UserCreatedateListInput {
  set: DateTime[] | DateTime
}

export interface UserWhereUniqueInput {
  id: ID_Input
}

export interface CarCreateOneWithoutUsersInput {
  create: CarCreateWithoutUsersInput
  connect: CarWhereUniqueInput
}

export interface BarWhereUniqueInput {
  id: ID_Input
}

export interface CarCreateWithoutUsersInput {
  name: String
}

export interface UserUpsertWithWhereUniqueWithoutCarInput {
  where: UserWhereUniqueInput
  update: UserUpdateWithoutCarDataInput
  create: UserCreateWithoutCarInput
}

export interface BarCreateManyWithoutUsersInput {
  create: BarCreateWithoutUsersInput[] | BarCreateWithoutUsersInput
  connect: BarWhereUniqueInput[] | BarWhereUniqueInput
}

export interface UserUpdateWithWhereUniqueWithoutCarInput {
  where: UserWhereUniqueInput
  data: UserUpdateWithoutCarDataInput
}

export interface BarCreateWithoutUsersInput {
  a: String
  lol: String
}

export interface CarUpdateInput {
  name: String
  users: UserUpdateManyWithoutCarInput
}

export interface CarUpsertWithoutUsersInput {
  update: CarUpdateWithoutUsersDataInput
  create: CarCreateWithoutUsersInput
}

export interface BarUpdateWithoutUsersDataInput {
  a: String
  lol: String
}

export interface UserCreateManyWithoutCarInput {
  create: UserCreateWithoutCarInput[] | UserCreateWithoutCarInput
  connect: UserWhereUniqueInput[] | UserWhereUniqueInput
}

export interface BarUpdateManyWithoutUsersInput {
  create: BarCreateWithoutUsersInput[] | BarCreateWithoutUsersInput
  connect: BarWhereUniqueInput[] | BarWhereUniqueInput
  disconnect: BarWhereUniqueInput[] | BarWhereUniqueInput
  delete: BarWhereUniqueInput[] | BarWhereUniqueInput
  update: BarUpdateWithWhereUniqueWithoutUsersInput[] | BarUpdateWithWhereUniqueWithoutUsersInput
  upsert: BarUpsertWithWhereUniqueWithoutUsersInput[] | BarUpsertWithWhereUniqueWithoutUsersInput
}

export interface UserCreateWithoutCarInput {
  name: String
  optinalString: String
  boolOpt: Boolean
  bool: Boolean
  nullableInt: Int
  int: Int
  jason: Json
  nullableFloat: Float
  flotat: Float
  enum: Enum
  date: DateTime
  intList: UserCreateintListInput
  floatList: UserCreatefloatListInput
  floatListOptional: UserCreatefloatListOptionalInput
  enumList: UserCreateenumListInput
  dateList: UserCreatedateListInput
  bars: BarCreateManyWithoutUsersInput
}

export interface CarSubscriptionWhereInput {
  AND: CarSubscriptionWhereInput[] | CarSubscriptionWhereInput
  OR: CarSubscriptionWhereInput[] | CarSubscriptionWhereInput
  NOT: CarSubscriptionWhereInput[] | CarSubscriptionWhereInput
  mutation_in: MutationType[] | MutationType
  updatedFields_contains: String
  updatedFields_contains_every: String[] | String
  updatedFields_contains_some: String[] | String
  node: CarWhereInput
}

export interface CarWhereInput {
  AND: CarWhereInput[] | CarWhereInput
  OR: CarWhereInput[] | CarWhereInput
  NOT: CarWhereInput[] | CarWhereInput
  id: ID_Input
  id_not: ID_Input
  id_in: ID_Input[] | ID_Input
  id_not_in: ID_Input[] | ID_Input
  id_lt: ID_Input
  id_lte: ID_Input
  id_gt: ID_Input
  id_gte: ID_Input
  id_contains: ID_Input
  id_not_contains: ID_Input
  id_starts_with: ID_Input
  id_not_starts_with: ID_Input
  id_ends_with: ID_Input
  id_not_ends_with: ID_Input
  name: String
  name_not: String
  name_in: String[] | String
  name_not_in: String[] | String
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  users_every: UserWhereInput
  users_some: UserWhereInput
  users_none: UserWhereInput
}

export interface UserUpdateWithoutBarsDataInput {
  name: String
  optinalString: String
  boolOpt: Boolean
  bool: Boolean
  nullableInt: Int
  int: Int
  jason: Json
  nullableFloat: Float
  flotat: Float
  enum: Enum
  date: DateTime
  intList: UserUpdateintListInput
  floatList: UserUpdatefloatListInput
  floatListOptional: UserUpdatefloatListOptionalInput
  enumList: UserUpdateenumListInput
  dateList: UserUpdatedateListInput
  car: CarUpdateOneWithoutUsersInput
}

export interface UserCreateManyWithoutBarsInput {
  create: UserCreateWithoutBarsInput[] | UserCreateWithoutBarsInput
  connect: UserWhereUniqueInput[] | UserWhereUniqueInput
}

export interface CarWhereUniqueInput {
  id: ID_Input
}

export interface UserCreateWithoutBarsInput {
  name: String
  optinalString: String
  boolOpt: Boolean
  bool: Boolean
  nullableInt: Int
  int: Int
  jason: Json
  nullableFloat: Float
  flotat: Float
  enum: Enum
  date: DateTime
  intList: UserCreateintListInput
  floatList: UserCreatefloatListInput
  floatListOptional: UserCreatefloatListOptionalInput
  enumList: UserCreateenumListInput
  dateList: UserCreatedateListInput
  car: CarCreateOneWithoutUsersInput
}

export interface UserUpdateWithoutCarDataInput {
  name: String
  optinalString: String
  boolOpt: Boolean
  bool: Boolean
  nullableInt: Int
  int: Int
  jason: Json
  nullableFloat: Float
  flotat: Float
  enum: Enum
  date: DateTime
  intList: UserUpdateintListInput
  floatList: UserUpdatefloatListInput
  floatListOptional: UserUpdatefloatListOptionalInput
  enumList: UserUpdateenumListInput
  dateList: UserUpdatedateListInput
  bars: BarUpdateManyWithoutUsersInput
}

export interface UserUpdateInput {
  name: String
  optinalString: String
  boolOpt: Boolean
  bool: Boolean
  nullableInt: Int
  int: Int
  jason: Json
  nullableFloat: Float
  flotat: Float
  enum: Enum
  date: DateTime
  intList: UserUpdateintListInput
  floatList: UserUpdatefloatListInput
  floatListOptional: UserUpdatefloatListOptionalInput
  enumList: UserUpdateenumListInput
  dateList: UserUpdatedateListInput
  car: CarUpdateOneWithoutUsersInput
  bars: BarUpdateManyWithoutUsersInput
}

export interface BarUpsertWithWhereUniqueWithoutUsersInput {
  where: BarWhereUniqueInput
  update: BarUpdateWithoutUsersDataInput
  create: BarCreateWithoutUsersInput
}

export interface UserUpdateintListInput {
  set: Int[] | Int
}

export interface BarWhereInput {
  AND: BarWhereInput[] | BarWhereInput
  OR: BarWhereInput[] | BarWhereInput
  NOT: BarWhereInput[] | BarWhereInput
  id: ID_Input
  id_not: ID_Input
  id_in: ID_Input[] | ID_Input
  id_not_in: ID_Input[] | ID_Input
  id_lt: ID_Input
  id_lte: ID_Input
  id_gt: ID_Input
  id_gte: ID_Input
  id_contains: ID_Input
  id_not_contains: ID_Input
  id_starts_with: ID_Input
  id_not_starts_with: ID_Input
  id_ends_with: ID_Input
  id_not_ends_with: ID_Input
  a: String
  a_not: String
  a_in: String[] | String
  a_not_in: String[] | String
  a_lt: String
  a_lte: String
  a_gt: String
  a_gte: String
  a_contains: String
  a_not_contains: String
  a_starts_with: String
  a_not_starts_with: String
  a_ends_with: String
  a_not_ends_with: String
  lol: String
  lol_not: String
  lol_in: String[] | String
  lol_not_in: String[] | String
  lol_lt: String
  lol_lte: String
  lol_gt: String
  lol_gte: String
  lol_contains: String
  lol_not_contains: String
  lol_starts_with: String
  lol_not_starts_with: String
  lol_ends_with: String
  lol_not_ends_with: String
  users_every: UserWhereInput
  users_some: UserWhereInput
  users_none: UserWhereInput
}

export interface UserUpdatefloatListInput {
  set: Float[] | Float
}

export interface UserUpdateManyWithoutBarsInput {
  create: UserCreateWithoutBarsInput[] | UserCreateWithoutBarsInput
  connect: UserWhereUniqueInput[] | UserWhereUniqueInput
  disconnect: UserWhereUniqueInput[] | UserWhereUniqueInput
  delete: UserWhereUniqueInput[] | UserWhereUniqueInput
  update: UserUpdateWithWhereUniqueWithoutBarsInput[] | UserUpdateWithWhereUniqueWithoutBarsInput
  upsert: UserUpsertWithWhereUniqueWithoutBarsInput[] | UserUpsertWithWhereUniqueWithoutBarsInput
}

export interface CarUpdateOneWithoutUsersInput {
  create: CarCreateWithoutUsersInput
  connect: CarWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: CarUpdateWithoutUsersDataInput
  upsert: CarUpsertWithoutUsersInput
}

export interface UserUpdatedateListInput {
  set: DateTime[] | DateTime
}

export interface UserUpdateenumListInput {
  set: Enum[] | Enum
}

export interface UserUpdatefloatListOptionalInput {
  set: Float[] | Float
}

export interface BarUpdateInput {
  a: String
  lol: String
  users: UserUpdateManyWithoutBarsInput
}

export interface UserSubscriptionWhereInput {
  AND: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  OR: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  NOT: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  mutation_in: MutationType[] | MutationType
  updatedFields_contains: String
  updatedFields_contains_every: String[] | String
  updatedFields_contains_some: String[] | String
  node: UserWhereInput
}

export interface BarUpdateWithWhereUniqueWithoutUsersInput {
  where: BarWhereUniqueInput
  data: BarUpdateWithoutUsersDataInput
}

export interface UserUpdateManyWithoutCarInput {
  create: UserCreateWithoutCarInput[] | UserCreateWithoutCarInput
  connect: UserWhereUniqueInput[] | UserWhereUniqueInput
  disconnect: UserWhereUniqueInput[] | UserWhereUniqueInput
  delete: UserWhereUniqueInput[] | UserWhereUniqueInput
  update: UserUpdateWithWhereUniqueWithoutCarInput[] | UserUpdateWithWhereUniqueWithoutCarInput
  upsert: UserUpsertWithWhereUniqueWithoutCarInput[] | UserUpsertWithWhereUniqueWithoutCarInput
}

export interface NodeNode {
  id: ID_Output
}

export interface BarPreviousValuesNode {
  id: ID_Output
  a?: String | undefined
  lol?: String | undefined
}

export interface BarPreviousValues extends Promise<BarPreviousValuesNode> {
  id: () => ID_Output
  a: () => String
  lol: () => String
}

export interface BarSubscriptionPayloadNode {
  mutation: MutationType
  updatedFields?: String[]
}

export interface BarSubscriptionPayload extends Promise<BarSubscriptionPayloadNode> {
  mutation: () => MutationType
  node: () => Bar
  updatedFields: () => String
  previousValues: () => BarPreviousValues
}

export interface UserPreviousValuesNode {
  id: ID_Output
  name: String
  optinalString?: String | undefined
  boolOpt?: Boolean | undefined
  bool: Boolean
  nullableInt?: Int | undefined
  int: Int
  jason?: Json | undefined
  nullableFloat?: Float | undefined
  flotat: Float
  intList: Int[]
  floatList: Float[]
  floatListOptional: Float[]
  enum?: Enum | undefined
  enumList: Enum[]
  date?: DateTime | undefined
  dateList: DateTime[]
}

export interface UserPreviousValues extends Promise<UserPreviousValuesNode> {
  id: () => ID_Output
  name: () => String
  optinalString: () => String
  boolOpt: () => Boolean
  bool: () => Boolean
  nullableInt: () => Int
  int: () => Int
  jason: () => Json
  nullableFloat: () => Float
  flotat: () => Float
  intList: () => Int
  floatList: () => Float
  floatListOptional: () => Float
  enum: () => Enum
  enumList: () => Enum
  date: () => DateTime
  dateList: () => DateTime
}

export interface BarNode extends Node {
  id: ID_Output
  a?: String | undefined
  lol?: String | undefined
}

export interface Bar extends Promise<BarNode>, Node {
  id: () => ID_Output
  a: () => String
  users: Promise<UserNode[]>
  lol: () => String
}

export interface BarConnectionNode {

}

export interface BarConnection extends Promise<BarConnectionNode> {
  pageInfo: () => PageInfo
  edges: Promise<BarEdgeNode[]>
  aggregate: () => AggregateBar
}

export interface AggregateBarNode {
  count: Int
}

export interface AggregateBar extends Promise<AggregateBarNode> {
  count: () => Int
}

export interface CarEdgeNode {
  cursor: String
}

export interface CarEdge extends Promise<CarEdgeNode> {
  node: () => Car
  cursor: () => String
}

export interface CarNode extends Node {
  id: ID_Output
  name: String
}

export interface Car extends Promise<CarNode>, Node {
  id: () => ID_Output
  name: () => String
  users: Promise<UserNode[]>
}

export interface AggregateUserNode {
  count: Int
}

export interface AggregateUser extends Promise<AggregateUserNode> {
  count: () => Int
}

export interface BatchPayloadNode {
  count: Long
}

export interface BatchPayload extends Promise<BatchPayloadNode> {
  count: () => Long
}

export interface PageInfoNode {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String | undefined
  endCursor?: String | undefined
}

export interface PageInfo extends Promise<PageInfoNode> {
  hasNextPage: () => Boolean
  hasPreviousPage: () => Boolean
  startCursor: () => String
  endCursor: () => String
}

export interface UserSubscriptionPayloadNode {
  mutation: MutationType
  updatedFields?: String[]
}

export interface UserSubscriptionPayload extends Promise<UserSubscriptionPayloadNode> {
  mutation: () => MutationType
  node: () => User
  updatedFields: () => String
  previousValues: () => UserPreviousValues
}

export interface UserNode extends Node {
  id: ID_Output
  name: String
  optinalString?: String | undefined
  boolOpt?: Boolean | undefined
  bool: Boolean
  nullableInt?: Int | undefined
  int: Int
  jason?: Json | undefined
  nullableFloat?: Float | undefined
  flotat: Float
  intList: Int[]
  floatList: Float[]
  floatListOptional: Float[]
  enum?: Enum | undefined
  enumList: Enum[]
  date?: DateTime | undefined
  dateList: DateTime[]
}

export interface User extends Promise<UserNode>, Node {
  id: () => ID_Output
  name: () => String
  optinalString: () => String
  boolOpt: () => Boolean
  bool: () => Boolean
  nullableInt: () => Int
  int: () => Int
  jason: () => Json
  nullableFloat: () => Float
  flotat: () => Float
  intList: () => Int
  floatList: () => Float
  floatListOptional: () => Float
  enum: () => Enum
  enumList: () => Enum
  date: () => DateTime
  dateList: () => DateTime
  car: (args: { where: () => CarWhereInput | undefined }) => Car
  bars: Promise<BarNode[]>
}

export interface CarSubscriptionPayloadNode {
  mutation: MutationType
  updatedFields?: String[]
}

export interface CarSubscriptionPayload extends Promise<CarSubscriptionPayloadNode> {
  mutation: () => MutationType
  node: () => Car
  updatedFields: () => String
  previousValues: () => CarPreviousValues
}

export interface CarPreviousValuesNode {
  id: ID_Output
  name: String
}

export interface CarPreviousValues extends Promise<CarPreviousValuesNode> {
  id: () => ID_Output
  name: () => String
}

export interface UserConnectionNode {

}

export interface UserConnection extends Promise<UserConnectionNode> {
  pageInfo: () => PageInfo
  edges: Promise<UserEdgeNode[]>
  aggregate: () => AggregateUser
}

export interface UserEdgeNode {
  cursor: String
}

export interface UserEdge extends Promise<UserEdgeNode> {
  node: () => User
  cursor: () => String
}

export interface CarConnectionNode {

}

export interface CarConnection extends Promise<CarConnectionNode> {
  pageInfo: () => PageInfo
  edges: Promise<CarEdgeNode[]>
  aggregate: () => AggregateCar
}

export interface AggregateCarNode {
  count: Int
}

export interface AggregateCar extends Promise<AggregateCarNode> {
  count: () => Int
}

export interface BarEdgeNode {
  cursor: String
}

export interface BarEdge extends Promise<BarEdgeNode> {
  node: () => Bar
  cursor: () => String
}

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

export type DateTime = Date | string

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point). 
*/
export type Float = number

export type Long = string

export type Json = any

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string