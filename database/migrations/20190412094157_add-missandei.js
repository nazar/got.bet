const Bluebird = require('bluebird');

exports.up = function(knex) {
  return knex('victims')
    .insert({
      name: 'Missandei',
      display_order: 23.5
    })
    .returning('*')
    .then(([res]) => {
      //copy greyworm bets to Missandei since the same fate befalls those two
      return knex.raw(`
        INSERT INTO victims_users_bets (victim_id, user_id, status)
        SELECT :victimId AS victim_id,
               victims_users_bets.user_id,
               victims_users_bets.status
        FROM victims_users_bets
               JOIN victims ON victims.id = victims_users_bets.victim_id
        WHERE victims.name = 'Grey Worm'
        `, { victimId: res.id }
      )
    })
    .then(() => {
      return knex.raw(`
        WITH victim_stats_counts AS (
          SELECT victims_users_bets.victim_id,
                 CASE victims_users_bets.status WHEN 'dead' THEN victims_users_bets.count ELSE 0 END  AS dies,
                 CASE victims_users_bets.status WHEN 'alive' THEN victims_users_bets.count ELSE 0 END AS lives,
                 CASE victims_users_bets.status WHEN 'wight' THEN victims_users_bets.count ELSE 0 END AS wights
          FROM victims_users_bets
          GROUP BY victims_users_bets.victim_id, victims_users_bets.status
        ),
             victim_stats_objects AS (
               SELECT victim_stats_counts.victim_id,
                      jsonb_build_object(
                        'dies', sum(victim_stats_counts.dies),
                        'lives', sum(victim_stats_counts.lives),
                        'wights', sum(victim_stats_counts.wights)
                        ) stats
               FROM victim_stats_counts
               GROUP BY victim_stats_counts.victim_id
             )
        
        UPDATE victims
        SET stats = coalesce(victims.stats, '{}'::jsonb) || victim_stats_objects.stats
        FROM victim_stats_objects
        WHERE victims.id = victim_stats_objects.victim_id      
      `)
    })
};

exports.down = function(knex) {
  return Bluebird.resolve(knex('victims')
    .where({ name: 'Missandei' })
    .limit(1))
    .tap(([res]) => {
      return knex('victims_users_bets')
        .delete()
        .where({ 'victim_id': res.id });
    })
    .tap(([res]) => {
      return knex('victims')
        .delete()
        .where({ id: res.id })
    })
};
