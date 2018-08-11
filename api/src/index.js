import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from 'prisma-binding';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import AuthPayload from './resolvers/AuthPayload';

const resolvers = {
  Query,
  Mutation,
  AuthPayload
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://eu1.prisma.sh/mario-lugo-28cf57/database/dev',
      secret: 'startlord',
      debug: true,
    }),
  }),
});

server.start(() => console.log(`Server is running on http://localhost:4000`))
