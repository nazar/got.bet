import _ from 'lodash';
import { makeExecutableSchema } from 'apollo-server';

import GraphQLJSON from 'graphql-type-json';
import { GraphQLDateTime } from 'graphql-iso-date';

import { companyTypeDefs, companyResolvers } from 'schemas/company';
import { userTypeDefs, userResolvers } from 'schemas/user';
import { victimTypeDefs, victimResolvers } from 'schemas/victim';
import { victimUserBetTypeDefs, victimUserBetResolvers } from 'schemas/victimUserBet';


const scalars = `
  scalar JSON
  scalar GraphQLDateTime
`;

// define base types here so that we can include Query, Mutation and Subscription
// in each typeDef file
const Query = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  type Subscription {
    _empty: String
  }
`;

// common definitions

const common = `
  type ListsSummary {
    count: Int!
  }
  
  input PaginationInput {
    offset: Int
    limit: Int
  }
`;

const ScalerResolvers = {
  JSON: GraphQLJSON,
  GraphQLDateTime
};

export default makeExecutableSchema({
  typeDefs: [
    Query,
    scalars,
    common,

    companyTypeDefs,
    userTypeDefs,
    victimTypeDefs,
    victimUserBetTypeDefs
  ],

  resolvers: _.merge(
    ScalerResolvers,

    companyResolvers,
    userResolvers,
    victimResolvers,
    victimUserBetResolvers
  )
});
