import _ from 'lodash';
import md5 from 'md5';

import User from 'models/user';
import getUsers from 'services/user/getUsers';

export const userTypeDefs = `
  extend type Query {
    # get user
    userByName(name: String!): User!
    
    # get users
    users(search: SearchInput, page: PaginationInput): [User!]
    
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
    
    # associations
    company: Company
  }
  
  # inputs
  
  input SearchInput {
    # users by company
    companyId: ID
    # users by name
    name: String
  }
`;

export const userResolvers = {
  User: {
    company: (user, vars, context) => user.companyId && context.loaders.companiesById.load(user.companyId),
    gravatarHash: (user) => {
      if (user.email) {
        const email = (user.email || '').trim().toLowerCase();
        return md5(email, { encoding: 'binary' });
      }
    }
  },
  Query: {
    userByName: (obj, { name }) => User.query().where({ name }).first(),

    users: (obj, { search: { companyId, name } = {}, page: { limit, offset } = {} }) =>
      getUsers({ companyId, name, limit, offset }),

    validName: (obj, { name }) => User.query()
      .where({ name })
      .limit(1)
      .then(v => _.isEmpty(v))
  }
};
