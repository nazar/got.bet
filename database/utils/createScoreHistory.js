module.exports = function updateScores(knex) {
  return knex.raw(`
INSERT INTO users_score_history (user_id, scores, created_at)
SELECT id, scores, now()
FROM users    
`)
};
