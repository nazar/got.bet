import _ from 'lodash';
import Victim from 'models/victim';

export default function getVictims({ search: { valid } = {} } = {}) {
  return _.tap(Victim.query(), (query) => {
    valid && query.where('status', '=', 'alive');

    query.orderBy('displayOrder');
  });
}
