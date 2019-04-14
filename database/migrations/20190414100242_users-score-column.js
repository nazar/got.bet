exports.up = function(knex) {
  return knex.schema.table('users', (table) => {
    table.jsonb('scores');
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('scores');
  });
};
