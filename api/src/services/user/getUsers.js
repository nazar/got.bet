import _ from 'lodash';

import User from 'models/user';

export default function getUsers({ search: { companyId, name } = {}, page: { limit, offset } = {} } = {}) {
  return _.tap(User.query(), (query) => {
    companyId && query.where({ companyId });
    name && query.where({ name });

    limit && query.limit(limit);
    offset && query.offset(offset);

    query.orderBy('createdAt', 'desc');
  });
}
