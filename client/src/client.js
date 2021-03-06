import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';


const link = new HttpLink({ uri: '/api/graphql' });
const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache
});

export default client;
