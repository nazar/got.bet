export const userScoreHistoryTypeDefs = `
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
  }
};
