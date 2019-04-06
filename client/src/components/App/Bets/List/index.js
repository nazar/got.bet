import _ from 'lodash';
import React from 'react';
import { Container, Table, Transition } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import useQuery from 'hooks/useQuery';

import Avatar from 'components/shared/Avatar';
import Section from 'components/shared/Section';
import TimeAgo from 'components/shared/TimeAgo';

import usersQuery from './users.gql';


export default function List() {
  const { loading, data: { users } } = useQuery({
    query: usersQuery,
    fetchPolicy: 'network-only'
  });

  return (
    <Container className="view-page">
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
