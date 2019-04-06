exports.up = function(knex) {
  return knex.schema.table('victims', (table) => {
    table.jsonb('stats');
  });
};

exports.down = function(knex) {
  return knex.schema.table('victims', (table) => {
    table.dropColumn('stats');
  });
};
