import React from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';

import UsersList from 'components/shared/UsersList';

import usersQuery from 'queries/user/users.gql';
import usersSummaryQuery from 'queries/user/usersSummary.gql';


export default function BetList() {
  return (
    <Container className="view-page">
      <BetListHeader />

      <UsersList
        defaultSort="createdAt:desc"
        usersQuery={usersQuery}
        usersSummaryQuery={usersSummaryQuery}
      />
    </Container>
  );

  function BetListHeader() {
    return (
      <Header as="h1">
        <Icon name="ticket" />
        <Header.Content>
          Bets
          <Header.Subheader>
            On Who Lives, Who Dies, Who Wights.
          </Header.Subheader>
        </Header.Content>
      </Header>
    );
  }
}
