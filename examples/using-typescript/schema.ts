import { makeExecutableSchema } from 'graphql-tools-fork'

const schema = makeExecutableSchema({
  typeDefs: `
    type Query {
      hello: String
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'world',
    },
  },
})

export default schema
