exports.up = function(knex) {
  return knex.schema.createTable('victims_users_bonus', (table) => {
    table.increments().primary();

    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('users.id');

    table.boolean('denny_pregz').default(false);

    table.integer('kills_night_king_id').unsigned();
    table.foreign('kills_night_king_id').references('victims.id');

    table.integer('wins_throne_id').unsigned();
    table.foreign('wins_throne_id').references('victims.id');

    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('victims_users_bonus');
};
