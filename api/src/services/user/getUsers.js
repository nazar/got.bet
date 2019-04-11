import _ from 'lodash';

import User from 'models/user';

export default function getUsers({ search: { company, name } = {}, page: { limit, offset } = {} } = {}) {
  return _.tap(User.query(), (query) => {
    name && query.where({ name });

    if (company) {
      query.join('companies', {
        'companies.id': 'users.companyId'
      })
        .where('companies.name', '=', company)
    }

    limit && query.limit(limit);
    offset && query.offset(offset);

    query.orderBy('createdAt', 'desc');
  });
}
