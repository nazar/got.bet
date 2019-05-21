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
     
     kills_night_king AS (
         SELECT id
         FROM victims
         WHERE name = 'Arya Stark'
     ),
     wins_iron_throne AS (
         SELECT id
         FROM victims
         WHERE name = 'Bran Stark'
     ),
     bonues_scores AS (
         SELECT users.id                                                                  AS user_id,
                CASE WHEN vub.denny_pregz = FALSE THEN 1 ELSE 0 END                       AS denny_preg,
                CASE WHEN vub.kills_night_king_id = kills_night_king.id THEN 2 ELSE 0 END AS kills_night_king,
                CASE WHEN vub.wins_throne_id = wins_iron_throne.id THEN 4 ELSE 0 END      AS wins_iron_throne
         FROM kills_night_king, wins_iron_throne, users
                                                      INNER JOIN victims_users_bonus vub ON users.id = vub.user_id
         WHERE vub.late = FALSE
     ),
     bonus_score AS (
         SELECT bonues_scores.user_id,
                coalesce(denny_preg, 0) + coalesce(kills_night_king, 0) + coalesce(wins_iron_throne) score
         FROM bonues_scores
     ),

     -- build the score object
     score AS (
         SELECT users.id,
                jsonb_build_object(
                  'right', COALESCE(scoreRight.score, 0) + COALESCE(bonus_score.score, 0),
                  'wrong', COALESCE(scoreWrong.score, 0),
                  'bonus', COALESCE(bonus_score.score, 0),
                  'total', COALESCE(scoreRight.score, 0) + COALESCE(bonus_score.score, 0),
                  'victims', scoreCount.countAll,
                  'totalPercent', (COALESCE(scoreRight.score, 0)::REAL / scoreCount.countAll) * 100
                ) AS score
         FROM scoreCount
                  INNER JOIN users ON scoreCount.user_id = users.id
                  LEFT JOIN bonus_score ON bonus_score.user_id = users.id
                  LEFT JOIN scoreRight ON scoreRight.id = users.id
                  LEFT JOIN scoreWrong ON scoreWrong.id = users.id
     )

UPDATE users
SET scores = coalesce(users.scores, '{}'::jsonb) || score.score
FROM score
WHERE score.id = users.id
`)
};
