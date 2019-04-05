exports.up = function(knex) {
  return knex.schema.createTable('companies', (table) => {
    table.increments().primary();

    table.string('name').notNullable();
    table.string('url');

    table.timestamps(true, true);
  })
    .then(() => {
      // create lowercase indexes manually
      return knex.raw(`
        CREATE UNIQUE INDEX companies_name ON companies (lower(name));      
      `)
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('companies');
};
