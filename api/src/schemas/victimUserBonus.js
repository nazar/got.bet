export const victimUserBonusTypeDefs = `
  # types

  type VictimUserBonus {
    id: ID!
    userId: ID!
    # Is Danearys pregnant
    dennyPregz: Boolean
    
    # who kill night king
    killsNightKingId: Int
    
    # who wins the iron throne (and looses everything in the process)
    winsThroneId: Int
    
    # associations
    
    killsNightKing: Victim
    winsThrone: Victim
  }
`;

export const victimUserBonusResolvers = {
  VictimUserBonus: {
    killsNightKing: async (victimUserBonus, vars, context) =>
      context.loaders.victimsById.load(victimUserBonus.killsNightKingId),

    winsThrone: async (victimUserBonus, vars, context) =>
      context.loaders.victimsById.load(victimUserBonus.winsThroneId)
  }
};
