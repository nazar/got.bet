exports.up = function(knex) {
  return knex.schema.table('victims_users_bets', (table) => {
    table.boolean('late').default(false)
  })
    .then(() => {
      return knex.schema.table('victims_users_bonus', (table) => {
        table.boolean('late').default(false)
      })
    })
};

exports.down = function(knex) {
  return knex.schema.table('victims_users_bets', (table) => {
    table.dropColumn('late');
  })
    .then(() => {
      return knex.schema.table('victims_users_bonus', (table) => {
        table.dropColumn('late');
      })
    })
};
