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
    displayOrder: Float!
    # voting statistics
    stats: VictimStats
  }
  
  type VictimStats {
    lives: Int
    dies: Int
    wights: Int
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
    victims: async () => Victim.query().orderBy('displayOrder', 'asc')
  }
};
