import React from 'react';

import UsersList from 'components/shared/UsersList';

import usersQuery from 'queries/user/users.gql';
import usersSummaryQuery from 'queries/user/usersSummary.gql';


export default function CompanyBetList({ match: { params: { company } } }) {
  return (
    <UsersList
      usersQuery={usersQuery}
      usersSummaryQuery={usersSummaryQuery}
      variables={{ search: { company } }}
      CompanyComponent={Company}
    />
  );
}

function Company({ user }) {
  if (user.company && user.company.name) {
    if (user.company.url) {
      return <a href={user.company.url} target="_blank" rel="noopener noreferrer">{user.company.name}</a>;
    } else {
      return user.company.name;
    }
  } else {
    return null;
  }
}
