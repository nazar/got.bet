const _ = require('lodash');

module.exports = function setLateBets(knex, vitimIds, cutoff) {
  console.log('vitimIds', vitimIds)
  return knex('victims_users_bets')
    .update({ late: true })
    .where('created_at', '>', cutoff)
    .whereIn('victim_id', vitimIds)

    .then(() => {
      return knex('victims_users_bonus')
        .update({ late: true })
        .where('created_at', '>', cutoff)
        .whereIn('kills_night_king_id', vitimIds);
    })
};
