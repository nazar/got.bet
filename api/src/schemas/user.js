import _ from 'lodash';
import { resolve } from 'bluebird';
import md5 from 'md5';

import User from 'models/user';
import getUsers from 'services/user/getUsers';
import getUsersSummary from 'services/user/getUsersSummary';

export const userTypeDefs = `
  extend type Query {
    # get user
    userByName(name: String!): User
    
    # get users
    users(search: SearchInput, page: PaginationInput, sort: UserSortInput): [User!]
    usersSummary(search: SearchInput): ListsSummary
    
    # check name validity, specifically if the username is taken 
    validName(name: String!): Boolean!
  }
  
  # types

  type User {
    id: ID!
    # the user's full name
    name: String!
    # link to user details 
    url: String
    # gravatar avatar link if email is available
    gravatarHash: String
    # user created timestamp
    createdAt: GraphQLDateTime
    
    # current bet scores
    scores: UserScores
    
    # associations
    company: Company
    bonus: VictimUserBonus
  }
  
  type UserScores {
    # correct bets 
    right: Int!
    # incorrect bets
    wrong: Int!
    # right - wrong bets
    total: Int!
    # total as percentage 
    totalPercent: Float!
  }
  
  # enums
  
  enum UserSortField {
    name
    joined
    score 
  }
  
  # inputs
  
  input SearchInput {
    # users by company
    company: String
    # users by name
    name: String
  }
  
  input UserSortInput {
    direction: SortDirection
    field: UserSortField
  }
`;

export const userResolvers = {
  User: {
    bonus: async (user, vars, context) => context.loaders.bonusByUserId.load(user.id),

    company: async (user, vars, context) => user.companyId && context.loaders.companiesById.load(user.companyId),
    gravatarHash: async (user) => {
      if (user.email) {
        const email = (user.email || '').trim().toLowerCase();
        return md5(email, { encoding: 'binary' });
      }
    }
  },
  Query: {
    userByName: async (obj, { name }) => User.query().where({ name }).first(),

    users: (obj, { search, page: { limit = 20, offset } = {}, sort } = {}) =>
      resolve(getUsers({ search, page: { limit, offset }, sort })),

    usersSummary: (obj, { search }) => resolve(getUsersSummary({ search })),

    validName: async (obj, { name }) => User.query()
      .where({ name })
      .limit(1)
      .then(v => _.isEmpty(v))
  }
};
