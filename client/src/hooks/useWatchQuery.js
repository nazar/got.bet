import { useEffect, useState } from 'react';

import client from 'client';

export default function useWatchQuery({ query, variables }) {
  const watchKey = variables ? JSON.stringify(variables) : null;

  const [queryResult, setQueryResult] = useState({
    data: {},
    loading: true,
    errors: {}
  });

  useEffect(() => {
    const observer = client.watchQuery({ query, variables });

    const subscription = observer.subscribe({
      next: res => setQueryResult(res)
    });

    return () => subscription.unsubscribe();
  }, [watchKey]);

  return queryResult;
}
