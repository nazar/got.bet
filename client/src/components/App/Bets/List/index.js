import React from 'react';

import UsersList from 'components/shared/UsersList';

import usersQuery from 'queries/user/users.gql';
import usersSummaryQuery from 'queries/user/usersSummary.gql';


export default function BetList() {
  return (
    <UsersList
      usersQuery={usersQuery}
      usersSummaryQuery={usersSummaryQuery}
    />
  );
}
