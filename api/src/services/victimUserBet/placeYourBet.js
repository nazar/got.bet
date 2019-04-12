import _ from 'lodash';
import { transaction } from 'objection';
import * as yup from 'yup';

import Company from 'models/company';
import User from 'models/user';
import VictimUserBet from 'models/victimUserBet';
import VictimUserBonus from 'models/victimUserBonus';


export default function placeYourBet({ bet }) {
  let trx;

  let company;
  let user;
  let victimUserBet;

  const payload = validationSchema.cast(bet, { stripUnknown: true });

  return transaction
    .start(Company.knex())
    .then(res => (trx = res))
    .then(createCompany)
    .then(createUser)
    .then(placeBet)
    .then(saveBonusSection)
    .then(updateCompanyStats)
    .then(updateVictimStats)
    .then(() => trx.commit())
    .tapCatch(() => trx.rollback())
    .then(() => victimUserBet);

  // implementation

  function createCompany() {
    if (payload.company) {
      const { company: name, companyUrl: url } = payload;
      // try and lookup the company or create it
      return Company
        .query(trx)
        .where({ name })
        .then(([res]) => {
          if (res) {
            company = res;
          } else {
            return Company
              .query(trx)
              .insert({
                name,
                url
              })
              .returning('*')
              .first()
              .then(res2 => (company = res2));
          }
        });
    }
  }

  function createUser() {
    const { name, nameUrl: url, email } = payload;
    const companyId = _.get(company, 'id');

    return User
      .query(trx)
      .insert({
        companyId,
        name,
        url,
        email
      })
      .returning('*')
      .first()
      .then(res => (user = res));
  }

  function placeBet() {
    const betPayload = _.map(payload.bet, b => ({
      victimId: b.id,
      userId: user.id,
      status: b.status
    }));

    return VictimUserBet
      .query(trx)
      .insert(betPayload)
      .returning('*')
      .then(res => (victimUserBet = res));
  }

  function saveBonusSection() {
    const { dennyPregz, killsNightKingId, winsThroneId } = payload;

    return VictimUserBonus
      .query(trx)
      .insert({
        userId: user.id,
        dennyPregz,
        killsNightKingId,
        winsThroneId
      });
  }

  function updateCompanyStats() {
    if (company) {
      return trx.raw(`
WITH userCounts AS (
  SELECT company_id,
         jsonb_build_object('users', count(*)) AS stats
  FROM users
  WHERE company_id = :companyId
  GROUP BY company_id
)

UPDATE companies
SET stats = userCounts.stats
FROM userCounts
WHERE companies.id = userCounts.company_id      
    `, { companyId: company.id });
    }
  }


  function updateVictimStats() {
    return trx.raw(`
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
`);
  }
}

const validationSchema = yup.object({
  name: yup.string()
    .min(3)
    .max(30)
    .required()
    .default('')
    .test(
      'valid_chars',
      '${value} is not a valid name. Only charaters and _ are allowed', // eslint-disable-line
      value => !(_.isNull(value.match(/^[A-Za-z_\-\s]+$/)))
    ),
  email: yup.string().email(),
  nameUrl: yup.string().url().default(''),
  company: yup.string().default(''),
  companyUrl: yup.string().url().default(''),

  bet: yup.array().of(yup.object({
    id: yup.number().required(),
    status: yup.string().oneOf(['alive', 'dead', 'wight'])
  })),

  dennyPregz: yup.boolean().default(false),
  killsNightKingId: yup.number(),
  winsThroneId: yup.number()
});
