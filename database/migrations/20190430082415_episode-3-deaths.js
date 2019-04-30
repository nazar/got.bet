const _ = require('lodash');

const createScoreHistory = require('../utils/createScoreHistory');
const setLateBets = require('../utils/setLateBets');
const setStatus = require('../utils/setStatus');
const updateScores = require('../utils/updateScores');

exports.up = async function(knex) {
  let victims = [
    { name: 'Melisandre', status: 'dead' },
    { name: 'Theon Greyjoy', status: 'dead' },
    { name: 'Jorah Mormont', status: 'dead' }
  ];

  const cutoff = new Date('2019-04-29T02:00:00');
  const arya = await knex('victims').where({ name: 'Arya Stark' }).limit(1).first();
  const victimIds = await knex('victims').whereIn('name', _.map(victims, 'name')).then(res => _.map(res, 'id'));

  return knex('victims_users_bonus')
    .update({ late: true })
    .where({ kills_night_king_id: arya.id })
    .where('created_at', '>', cutoff)

    .then(() => {
      return setLateBets(knex, victimIds, cutoff)
        .then(() => setStatus(knex, victims))
        .then(() => updateScores(knex))
        .then(() => createScoreHistory(knex))

    })
};

exports.down = function() {
  //no rez
};
