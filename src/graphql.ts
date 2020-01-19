import { ApolloServer, gql } from 'apollo-server-lambda'

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
})

exports.handler = server.createHandler({
  cors: {
    origin: true,
    credentials: true
  }
})
