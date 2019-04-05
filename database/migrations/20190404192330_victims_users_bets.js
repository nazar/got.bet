exports.up = function(knex) {
  return knex.schema.createTable('victims_users_bets', (table) => {
    table.increments().primary();

    table.integer('victim_id').unsigned().notNullable();
    table.foreign('victim_id').references('victims.id');

    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('users.id');

    table.enu('status', ['alive', 'dead', 'wight']).notNullable().default('alive');
    table.integer('score').default(0);

    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('victims_users_bets');
};
