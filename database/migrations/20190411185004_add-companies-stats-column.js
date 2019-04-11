exports.up = function(knex) {
  return knex.schema.table('companies', (table) => {
    table.jsonb('stats');
  })
    // update company stats and set users counters for existing users
    .then(() => {
      return knex.raw(`
        WITH userCounts AS (
          SELECT company_id,
                 jsonb_build_object('users', count(*)) AS stats
          FROM users
          WHERE company_id IS NOT NULL
          GROUP BY company_id
        )
        
        UPDATE companies
        SET stats = userCounts.stats
        FROM userCounts
        WHERE companies.id = userCounts.company_id      
      `)
    })
};

exports.down = function(knex) {
  return knex.schema.table('companies', (table) => {
    table.dropColumn('stats');
  });
};
