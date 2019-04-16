module.exports = function updateScores(knex) {
  return knex.raw(`
WITH total AS (
  SELECT count(*) countAll
  FROM victims
),
     -- the right score is calculated based on victims_users_bets.status matches
     scoreRight AS (
       SELECT users.id,
              count(vub.*) AS score
       FROM users
              INNER JOIN victims_users_bets vub ON users.id = vub.user_id
              INNER JOIN victims v ON vub.victim_id = v.id
       WHERE vub.status = v.status
       GROUP BY users.id
     ),
     -- the wrong score is calculated based on victims_users_bets.status mismatches
     scoreWrong AS (
       SELECT users.id,
              count(vub.*) AS score
       FROM users
              INNER JOIN victims_users_bets vub ON users.id = vub.user_id
              INNER JOIN victims v ON vub.victim_id = v.id
       WHERE vub.status != v.status
       GROUP BY users.id
     ),
     -- build the score object
     score AS (
       SELECT users.id,
              jsonb_build_object(
                'right', coalesce(scoreRight.score, 0),
                'wrong', coalesce(scoreWrong.score, 0),
                'total', coalesce(scoreRight.score, 0) - coalesce(scoreWrong.score, 0),
                'victims', total.countAll,
                'totalPercent', (coalesce(scoreRight.score, 0)::real / total.countAll) * 100
                ) AS score
       FROM total,
            users
              LEFT JOIN scoreRight ON scoreRight.id = users.id
              LEFT JOIN scoreWrong ON scoreWrong.id = scoreRight.id
     )

UPDATE users
SET scores = coalesce(users.scores, '{}'::jsonb) || score.score
FROM score
WHERE score.id = users.id
`)
};
