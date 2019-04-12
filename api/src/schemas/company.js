import { resolve } from 'bluebird';

import Company from 'models/company';

import getCompanies from 'services/company/getCompanies';
import getCompaniesSummary from 'services/company/getCompaniesSummary';

export const companyTypeDefs = `
  extend type Query {
    # get company by name
    company(name: String!): Company 
      
    # get list participating companies
    companies(page: PaginationInput): [Company!]
    
    # returns company summary 
    companiesSummary: ListsSummary
  }
  
  # types

  type Company {
    id: ID!

    # company name
    name: String!

    # company website
    url: String

    # company created timestamp
    createdAt: GraphQLDateTime
    
    # company calculated statistics
    stats: CompanyStats
  }
  
  type CompanyStats {
    # the number of users in the company
    users: Int
  }
  
`;

export const companyResolvers = {
  Query: {
    company: (obj, { name }) => resolve(Company.query().where({ name }).limit(1).first()),
    companies: (obj, { page: { limit = 20, offset } = {} }) => resolve(getCompanies({ limit, offset })),
    companiesSummary: () => resolve(getCompaniesSummary())
  }
};
