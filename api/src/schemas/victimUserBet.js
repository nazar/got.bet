import { resolve } from 'bluebird';

import getBetsForUserByUsername from 'services/victimUserBet/getBetsForUserByUsername';
import placeYourBet from 'services/victimUserBet/placeYourBet';

export const victimUserBetTypeDefs = `
  extend type Query {
    # get list of GoT Victims
    victimsBetForUser(username: String!): [VictimUserBet!]
  }
  
  extend type Mutation {
    placeYourBet(bet: BetInput!): [VictimUserBet!]
  }
  
  # types

  type VictimUserBet {
    id: ID!
    victimId: ID!
    userId: ID!
    # victim's status
    status: VictimStatus
    # 0 for wrong and 1 for right answer
    score: Int!
    
    # associations
    
    user: User!
    victim: Victim!
  }
  
  # inputs
  
  input BetItem {
    id: ID!
    status: VictimStatus!
  }
  
  input BetInput {
    name: String!
    email: String
    nameUrl: String
    company: String
    companyUrl: String
    
    bet: [BetItem!]
    
    # bonus section
    dennyPregz: Boolean
    killsNightKingId: ID
    winsThroneId: ID
  }
`;

export const victimUserBetResolvers = {
  VictimUserBet: {
    user: async (victimUserBet, vars, context) => context.loaders.usersById.load(victimUserBet.userId),
    victim: async (victimUserBet, vars, context) => context.loaders.victimsById.load(victimUserBet.victimId)
  },
  Query: {
    victimsBetForUser: async (obj, { username }) => resolve(getBetsForUserByUsername({ username }))
  },
  Mutation: {
    placeYourBet: async (obj, { bet }) => resolve(placeYourBet({ bet }))
  }
};
