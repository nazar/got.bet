exports.up = function(knex) {
  return knex.schema.createTable('victims', (table) => {
    table.increments().primary();

    table.string('name').unsigned().notNullable().unique();
    table.enu('status', ['alive', 'dead', 'wight']).notNullable().default('alive');
    table.float('display_order').notNullable();

    table.timestamps(true, true);
  })
    .then(() => knex('victims')
      .insert(victims)
    );
};

exports.down = function(knex) {
  return knex.schema.dropTable('victims');
};

const victims = [
  {name: 'John Snow', display_order: 1},
  {name: 'Sansa Stark', display_order: 2},
  {name: 'Arya Stark', display_order: 3},
  {name: 'Bran Stark', display_order: 4},
  {name: 'Cersei Lannister', display_order: 5},
  {name: 'Jaime Lannister', display_order: 6},
  {name: 'Tyrion Lannister', display_order: 7},
  {name: 'Daenerys Targaryen', display_order: 8},
  {name: 'Yara Greyjoy', display_order: 9},
  {name: 'Theon Greyjoy', display_order: 10},
  {name: 'Melisandre', display_order: 11},
  {name: 'Jorah Mormont', display_order: 12},
  {name: 'The Hound', display_order: 13},
  {name: 'The Mountain', display_order: 14},
  {name: 'Samwell Tarley', display_order: 15},
  {name: 'Gilly', display_order: 16},
  {name: 'Sam (Child)', display_order: 17},
  {name: 'Lord Varys', display_order: 18},
  {name: 'Brienne of Tarth', display_order: 19},
  {name: 'Davos Seaworth', display_order: 20},
  {name: 'Bronn', display_order: 21},
  {name: 'Podrick Payne', display_order: 22},
  {name: 'Tormund Giantsbane', display_order: 23},
  {name: 'Grey Worm', display_order: 24},
  {name: 'Gendry', display_order: 25},
  {name: 'Beric Dondarrion', display_order: 26},
  {name: 'Euron Greyjoy', display_order: 27},
];
