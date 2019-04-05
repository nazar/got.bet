import Victim from 'models/victim';

export const victimTypeDefs = `
  extend type Query {
    # get list of GoT Victims
    victims: [Victim!]
  }
  
  # types

  type Victim {
    id: ID!
    # the victims's full name
    name: String!
    # victim's status
    status: VictimStatus
    # display order - natural sorting
    displayOrder: Int!
  }
  
  type UserToken {
    token: String!
    user: User
  }
  
  # enums
  
  enum VictimStatus {
    alive
    dead
    wight
  }
  
`;

export const victimResolvers = {
  Query: {
    victims: async () => Victim.query().orderBy('createdAt', 'desc')
  }
};
