import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import express from 'express';
import { connectDb } from './utils/database';
import { Query } from './resolvers/Query';
import { typeDefs } from './lib/schema';
dotenv.config();

const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.disable('x-powered-by');

app.use('/storybook', express.static('dist/storybook'));

app.use(express.static('dist/app'));
// app.use('/api', myRoute);

app.get('*', (_request, response) => {
  response.sendFile('index.html', { root: 'dist/app' });
});

const graphQLServer = new ApolloServer({
  typeDefs,
  resolvers: Query,
});

connectDb().then(
  () => {
    app.listen(port, async () => {
      console.log('---------------- Connected to MongoDB');
      console.log(`---------------- Frontend listening at http://localhost:3000`);
      console.log(`---------------- Backend listening at http://localhost:${port}`);
      console.log(`---------------- Storybook is at http://localhost:6006`);
    });

    graphQLServer.listen().then(({ url }) => {
      console.log(`---------------- GraphQL server is at ${url}`);
    });
  },
  (error) => console.error(error)
);
