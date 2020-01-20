import { ApolloServer, gql } from 'apollo-server-lambda'

// Test schema and resolvers
const typeDefs = gql`
  type Query {
    hello: String
  }
`
const resolvers = {
  Query: {
    hello: () => 'Goodbye World'
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
})

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
})