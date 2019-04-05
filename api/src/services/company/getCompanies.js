import _ from 'lodash';

import Company from 'models/company';

export default function getCompanies({ limit = 20, offset = 0 } = {}) {
  return _.tap(Company.query(), (query) => {
    limit && query.limit(limit);
    offset && query.offset(offset);
  });
}
