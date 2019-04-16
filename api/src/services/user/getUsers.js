import _ from 'lodash';
import { raw } from 'objection';

import User from 'models/user';

export default function getUsers(
  { search: { company, name } = {},
    page: { limit, offset } = {},
    sort: { field = 'createdAt', direction = 'desc' } = {}
  } = {}
) {
  return _.tap(User.query(), (query) => {
    name && query.where({ name });

    if (company) {
      query.join('companies', {
        'companies.id': 'users.companyId'
      })
        .where('companies.name', '=', company);
    }

    limit && query.limit(limit);
    offset && query.offset(offset);

    // sorting
    const sortingField = {
      score: raw("scores -> 'right'")
    }[field] || 'createdAt';

    query.orderBy(sortingField, direction);
  });
}
