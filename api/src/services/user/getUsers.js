import _ from 'lodash';

import User from 'models/user';

export default function getUsers({ companyId, name, limit = 0, offset = 0 } = {}) {
  return _.tap(User.query(), (query) => {
    companyId && query.where({ companyId });
    name && query.where({ name });

    limit && query.limit(limit);
    offset && query.offset(offset);

    query.orderBy('createdAt', 'desc');
  });
}
