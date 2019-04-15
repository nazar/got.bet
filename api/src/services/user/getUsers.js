import _ from 'lodash';
import { raw } from 'objection';

import User from 'models/user';

export default function getUsers(
  { search: { company, name } = {},
    page: { limit, offset } = {},
    sort: { field = 'joined', direction = 'desc' } = {}
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
    if (field === 'joined') {
      query.orderBy('createdAt', direction);
    } else if (field === 'name') {
      query.orderBy('name', direction);
    } else if (field === 'score') {
      query.orderBy(raw("scores ->> 'total'"), direction);
    } else {
      query.orderBy('createdAt', 'desc');
    }
  });
}
