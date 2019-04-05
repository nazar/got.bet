import getCompanies from 'services/company/getCompanies';

export const companyTypeDefs = `
  extend type Query {
    # get list participating companies
    companies(page: PaginationInput): [Company!]
  }
  
  # types

  type Company {
    id: ID!
    # company name
    name: String!
    # company website
    url: String
  }
  
`;

export const companyResolvers = {
  Query: {
    companies: (obj, { page: { limit, offset } = {} }) => getCompanies({ limit, offset }),
  }
};
