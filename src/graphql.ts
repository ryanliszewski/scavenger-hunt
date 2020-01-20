import { ApolloServer, gql } from 'apollo-server-lambda'
import { ApolloGateway } from '@apollo/gateway'
import lambdaPlayground from 'graphql-playground-middleware-lambda'

const gateway = new ApolloGateway({
  serviceList: [
    {name: 'hello', url: 'https://o7bxii975m.execute-api.us-west-2.amazonaws.com/Prod/hello' },
    {name: 'goodbye', url: 'https://o7bxii975m.execute-api.us-west-2.amazonaws.com/Prod/goodbye' }
  ]
})

const createHandler = async () => {
  const { schema, executor } = await gateway.load()

  const server = new ApolloServer({
    schema,
    executor,
    playground: true,
    introspection: true,
    context: ({ event, context }) => ({
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
    }),
  })

  return server.createHandler({
    cors: {
      origin: '*',
      credentials: true,
    },
  })
}

exports.handler = async (event, context, callback) => {
  const handler = await createHandler()
  handler(event, context, callback)
}



exports.playgroundHandler = lambdaPlayground({
  endpoint: '/dev/graphql'
})