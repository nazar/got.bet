exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments().primary();

    table.integer('company_id');
    table.foreign('company_id').references('companies.id');

    table.string('name').notNullable().unique();
    table.string('email');
    table.string('url');

    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
