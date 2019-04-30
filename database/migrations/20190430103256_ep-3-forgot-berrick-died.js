const _ = require('lodash');

const createScoreHistory = require('../utils/createScoreHistory');
const setLateBets = require('../utils/setLateBets');
const setStatus = require('../utils/setStatus');
const updateScores = require('../utils/updateScores');

exports.up = async function(knex) {
  let victims = [
    { name: 'Beric Dondarrion', status: 'dead' }
  ];

  const cutoff = new Date('2019-04-29T02:00:00');
  const victimIds = await knex('victims').whereIn('name', _.map(victims, 'name')).then(res => _.map(res, 'id'));

  return setLateBets(knex, victimIds, cutoff)
    .then(() => setStatus(knex, victims))
    .then(() => updateScores(knex))
    .then(() => createScoreHistory(knex))
};

exports.down = function() {
  //no rez
};
