import _ from 'lodash';
import bodyParser from 'body-parser';
import compression from 'compression';
import config from 'config';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import util from 'util';

import { ApolloServer } from 'apollo-server-express';
import { Model } from 'objection';

import schema from 'schemas';
import knex from 'services/knex';
import logger from 'services/logger';

import logging from 'middleware/logging';
import loader from 'loaders';

const app = express();

app.set('port', process.env.PORT || 3000);

// wire up express morgan with central logging system
app.use(logging());
// set up helmet, basic security checklist
app.use(
  helmet({
    dnsPrefetchControl: false,
    hsts: false // TODO need dev to run under https first
  })
);

// wire misc things

Model.knex(knex);

// set up basic middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(cookieParser());

// graphql endpoints
export const apolloServer = new ApolloServer({
  schema,
  introspection: config.get('graphql.playground'),
  playground: config.get('graphql.playground'),
  tracing: config.get('graphql.playground'),
  debug: true,
  context: ({ req, connection }) => ({
    req,                                             // req is from express
    loaders: loader({ cache: _.isNil(connection) })  // don't cache long-lived subscriptions
  }),
  formatError: (error) => {
    logger.error('graphQL Error:', util.inspect(error, { depth: 10 }));
    return error;
  },
  subscriptions: {
    path: '/api/graphql/subscriptions'
  }
});


apolloServer.applyMiddleware({
  app,
  path: '/api/graphql'
});


export default app;
