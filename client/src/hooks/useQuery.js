import _ from 'lodash';
import { useEffect, useState } from 'react';

import client from 'client';
import { cachedQuery } from 'services/apollo';

export default function useQuery({ query, variables }) {
  const data = cachedQuery({ query, variables });

  const [queryResult, setQueryResult] = useState({
    data,
    loading: _.isEmpty(data),
    errors: {}
  });

  const watchKey = variables ? JSON.stringify(variables) : null;

  useEffect(() => {
    client.query({
      query,
      variables
    })
      .then(res => setQueryResult(res));
  }, [watchKey]);

  return queryResult;
}
