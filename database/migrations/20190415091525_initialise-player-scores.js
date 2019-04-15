const updateScores = require('../utils/updateScores');
const createScoreHistory = require('../utils/createScoreHistory');

exports.up = function(knex) {
  return updateScores(knex)
    .then(() => createScoreHistory(knex));
};

exports.down = function(knex) {
  return knex('users')
    .update({
      scores: null
    })
    .then(() => knex('users_score_history').truncate())
};
