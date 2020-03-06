const { makeExecutableSchema } = require('graphql-tools-fork')

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

module.exports = schema
