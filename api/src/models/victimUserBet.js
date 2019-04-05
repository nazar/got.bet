import { compose, Model } from 'objection';

import setUpdatedAt from 'models/plugins/setUpdatedAt';
import setCreatedAt from 'models/plugins/setCreatedAt';

const mixins = compose(
  setCreatedAt,
  setUpdatedAt
);

export default class VictimUserBet extends mixins(Model) {
  static tableName = 'victims_users_bets';
}
