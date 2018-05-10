import { GraphQLServer } from 'graphql-yoga'
import { Prisma } from './prisma'
import { addFragmentToInfo } from 'graphql-binding'

const binding = new Prisma({
  endpoint: 'https://eu1.prisma.sh/lol/session65/dev',
})

const resolvers = {
  Query: {
    users: async (parent, args, ctx, info) => {
      const result = await binding.query.users(args, addFragmentToInfo(
        info,
        'fragment X on User {id}',
      ) as any)
      console.log(result)
      return result
    },
  },
}

const typeDefs = `
type Query {
  users: [User!]!
}

type User {
  id: ID!
  name: String!
}
`

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))
