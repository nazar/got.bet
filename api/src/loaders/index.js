import _ from 'lodash';
import DataLoader from 'dataloader';

import Company from 'models/company';
import User from 'models/user';
import UserScoreHistory from 'models/userScoreHistory';
import Victim from 'models/victim';
import VictimUserBonus from 'models/victimUserBonus';

export default function(options = {}) {
  return {
    // ID loaders
    bonusByUserId: new DataLoader(ids => modelIdFetcher(VictimUserBonus, ids, 'userId'), options),
    companiesById: new DataLoader(ids => modelIdFetcher(Company, ids), options),
    usersById: new DataLoader(ids => modelIdFetcher(User, ids), options),
    usersScoreHistoryByUserId: new DataLoader(ids => hasManyFetcher(UserScoreHistory, ids, 'userId'), options),
    victimsById: new DataLoader(ids => modelIdFetcher(Victim, ids), options)
  };
}

// fetchers

function modelIdFetcher(Model, ids, idKey = 'id') {
  return Model.query()
    .whereIn(idKey, _.uniq(ids))
    .then(rows => reconcileOne(rows, ids, idKey));
}

function hasManyFetcher(Model, ids, fKey) {
  return Model.query()
    .whereIn(fKey, _.uniq(ids))
    .then(rows => reconcileMany(rows, ids, fKey));
}

// helpers

function reconcileOne(rows, ids, idKey = 'id') {
  const store = _.keyBy(rows, idKey);
  return _.map(ids, id => store[id]);
}

function reconcileMany(rows, ids, idKey = 'id') {
  const store = _.groupBy(rows, idKey);
  return _.map(ids, id => store[id]);
}
