import _ from 'lodash';

import Company from 'models/company';

export default function getCompanies({ limit, offset } = {}) {
  return _.tap(Company.query(), (query) => {
    limit && query.limit(limit);
    offset && query.offset(offset);

    query.orderBy('name');
  });
}
