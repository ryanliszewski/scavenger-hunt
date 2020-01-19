import { ApolloServer, gql } from 'apollo-server-lambda'
import lambdaPlayground from 'graphql-playground-middleware-lambda'


// Test schema and resolvers
const typeDefs = gql`
  type Query {
    hello: String
  }
`
const resolvers = {
  Query: {
    hello: () => 'Hello World'
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


exports.playgroundHandler = lambdaPlayground({
  endpoint: '/dev/graphql'
})