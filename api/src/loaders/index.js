import _ from 'lodash';
import DataLoader from 'dataloader';

import Company from 'models/company';
import User from 'models/user';
import Victim from 'models/victim';
import VictimUserBonus from 'models/victimUserBonus';

export default function(options = {}) {
  return {
    // ID loaders
    bonusByUserId: new DataLoader(ids => modelIdFetcher(VictimUserBonus, ids, 'userId'), options),
    companiesById: new DataLoader(ids => modelIdFetcher(Company, ids), options),
    usersById: new DataLoader(ids => modelIdFetcher(User, ids), options),
    victimsById: new DataLoader(ids => modelIdFetcher(Victim, ids), options)
  };
}

// fetchers

function modelIdFetcher(Model, ids, idKey = 'id') {
  return Model.query()
    .whereIn(idKey, _.uniq(ids))
    .then(rows => reconcileOne(rows, ids, idKey));
}

// helpers

function reconcileOne(rows, ids, idKey = 'id') {
  const store = _.keyBy(rows, idKey);
  return _.map(ids, id => store[id]);
}
