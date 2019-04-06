import _ from 'lodash';
import React from 'react';
import { Container, Table, Transition } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Avatar from 'components/shared/Avatar';
import Section from 'components/shared/Section';
import TimeAgo from 'components/shared/TimeAgo';
import UberPaginator from 'components/shared/UberPaginator';

import usersQuery from './users.gql';
import usersSummaryQuery from './usersSummary.gql';


export default function List() {
  const summaryQuery = {
    query: usersSummaryQuery,
    dataKey: 'usersSummary'
  };

  const itemsQuery = {
    query: usersQuery,
    dataKey: 'users',
    fetchPolicy: 'network-only'
  };

  return (
    <Container className="view-page">
      <UberPaginator
        summaryQuery={summaryQuery}
        itemsQuery={itemsQuery}
      >
        {({ items: users, loading }) => (
          <>
            <Section loading={loading}>
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>&nbsp;</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Company</Table.HeaderCell>
                    <Table.HeaderCell>Bet</Table.HeaderCell>
                    <Table.HeaderCell>Score</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Transition.Group>
                    {_.map(users, user => (
                      <Table.Row key={`${user.id}`}>
                        <Table.Cell collapsing><Avatar user={user} /></Table.Cell>
                        <Table.Cell><Link to={`/bets/${user.name}`}>{user.name}</Link></Table.Cell>
                        <Table.Cell><Company user={user} /></Table.Cell>
                        <Table.Cell><TimeAgo date={user.createdAt} /></Table.Cell>
                        <Table.Cell>-</Table.Cell>
                      </Table.Row>
                    ))}
                  </Transition.Group>
                </Table.Body>
              </Table>
            </Section>
          </>
        )}
      </UberPaginator>
    </Container>
  );

  function Company({ user }) {
    if (user.company) {
      if (user.company.url) {
        return <a href={user.company.url} target="_blank" rel="noopener noreferrer">{user.company.name}</a>;
      } else {
        return user.company.name;
      }
    } else {
      return null;
    }
  }
}
