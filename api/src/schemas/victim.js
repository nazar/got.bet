import { resolve } from 'bluebird';

import getVictims from 'services/victim/getVictims';

export const victimTypeDefs = `
  extend type Query {
    # get list of GoT Victims
    victims(search: VictimsSearchInput): [Victim!]
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
  
  
  # inputs
  
  input VictimsSearchInput {
    # returns only alive victims
    valid: Boolean!
  }
  
`;

export const victimResolvers = {
  Query: {
    victims: (obj, { search }) => resolve(getVictims({ search }))
  }
};
