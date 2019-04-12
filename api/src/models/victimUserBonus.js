import { compose, Model } from 'objection';

import setCreatedAt from 'models/plugins/setCreatedAt';

const mixins = compose(
  setCreatedAt
);

export default class VictimUserBonus extends mixins(Model) {
  static tableName = 'victims_users_bonus';
}
