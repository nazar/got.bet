import { compose, Model } from 'objection';

import setCreatedAt from 'models/plugins/setCreatedAt';

const mixins = compose(
  setCreatedAt
);

export default class UserScoreHistory extends mixins(Model) {
  static tableName = 'users_score_history';
}
