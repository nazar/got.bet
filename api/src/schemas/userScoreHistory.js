export const userScoreHistoryTypeDefs = `
  # queries
  
  extend type Query {
    scoreHistoryForUser(userId: ID!): [UserScoreHistory!]
  }

  # types

  type UserScoreHistory {
    id: ID!
    userId: ID!
    createdAt: GraphQLDateTime
    
    scores: UserScores
    
    # associations
    
    user: User!
  }
`;

export const userScoreHistoryResolvers = {
  UserScoreHistory: {
    user: async (userScoreHistory, vars, context) =>
      context.loaders.usersById().load(userScoreHistory.userId)
  },

  Query: {
    scoreHistoryForUser: async (obj, { userId }, context) =>
      context.loaders.usersScoreHistoryByUserId.load(userId)
  }
};
