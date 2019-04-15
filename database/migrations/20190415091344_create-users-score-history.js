exports.up = function(knex) {
  return knex.schema.createTable('users_score_history', (table) => {
    table.increments().primary();

    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('users.id');

    table.jsonb('scores').notNullable();

    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users_score_history');
};
