import _ from 'lodash';
import { transaction } from 'objection';
import * as yup from 'yup';

import Company from 'models/company';
import User from 'models/user';
import VictimUserBet from 'models/victimUserBet';

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
      value => !(_.isNull(value.match(/^[A-Za-z_]+$/)))
    ),
  email: yup.string().email(),
  nameUrl: yup.string().url().default(''),
  company: yup.string().default(''),
  companyUrl: yup.string().url().default(''),

  bet: yup.array().of(yup.object({
    id: yup.number().required(),
    status: yup.string().oneOf(['alive', 'dead', 'wight'])
  }))
});
