module.exports = function updateScores(knex) {
  return knex.raw(`
-- the right score is calculated based on victims_users_bets.status matches
WITH scoreRight AS (
    SELECT users.id,
           count(vub.*) AS score
    FROM users
             INNER JOIN victims_users_bets vub ON users.id = vub.user_id
             INNER JOIN victims v ON vub.victim_id = v.id
    WHERE vub.status = v.status
      AND late = FALSE
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
           AND late = FALSE
         GROUP BY users.id
     ),
     scoreCount AS (
         SELECT victims_users_bets.user_id,
                count(*) countAll
         FROM victims_users_bets
         WHERE late = FALSE
         GROUP BY victims_users_bets.user_id
     ),
     -- build the score object
     score AS (
         SELECT users.id,
                jsonb_build_object(
                  'right', coalesce(scoreRight.score, 0),
                  'wrong', coalesce(scoreWrong.score, 0),
                  'total', coalesce(scoreRight.score, 0) - coalesce(scoreWrong.score, 0),
                  'victims', scoreCount.countAll,
                  'totalPercent', (coalesce(scoreRight.score, 0)::real / scoreCount.countAll) * 100
                    ) AS score
         FROM scoreCount
                  INNER JOIN users ON scoreCount.user_id = users.id
                  LEFT JOIN scoreRight ON scoreRight.id = users.id
                  LEFT JOIN scoreWrong ON scoreWrong.id = users.id
     )

UPDATE users
SET scores = coalesce(users.scores, '{}'::jsonb) || score.score
FROM score
WHERE score.id = users.id
`)
};
