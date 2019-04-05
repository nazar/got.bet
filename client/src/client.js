import _ from 'lodash';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';

import { getAuthHeader, getToken, isLoggedIn } from 'services/token';
import { defaults, resolvers, typeDefs } from 'schemas';

const authLink = setContext((__, { headers }) => ({
  headers: _.merge({}, headers, getAuthHeader())
}));

const httpLink = new HttpLink({ uri: '/api/graphql' });
const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  defaults,
  resolvers,
  typeDefs
});

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_WEBSOCKET_URI,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: isLoggedIn() ? getToken() : void (0)
    }
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  authLink.concat(stateLink).concat(httpLink)
);

const client = new ApolloClient({
  link,
  cache
});

export default client;
