import { resolve } from 'bluebird';

import getCompanies from 'services/company/getCompanies';
import getCompaniesSummary from 'services/company/getCompaniesSummary';

export const companyTypeDefs = `
  extend type Query {
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
    companies: (obj, { page: { limit = 20, offset } = {} }) => resolve(getCompanies({ limit, offset })),

    companiesSummary: () => resolve(getCompaniesSummary())
  }
};
