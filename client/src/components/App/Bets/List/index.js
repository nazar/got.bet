import _ from 'lodash';
import React from 'react';
import { Container, Table, List, Transition } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import useMedia, { tabletUp } from 'hooks/useMedia';

import Avatar from 'components/shared/Avatar';
import Section from 'components/shared/Section';
import TimeAgo from 'components/shared/TimeAgo';
import UberPaginator from 'components/shared/UberPaginator';

import usersQuery from './users.gql';
import usersSummaryQuery from './usersSummary.gql';

import './betList.styl';


export default function BetList() {
  const summaryQuery = {
    query: usersSummaryQuery,
    dataKey: 'usersSummary'
  };

  const itemsQuery = {
    query: usersQuery,
    dataKey: 'users',
    fetchPolicy: 'network-only'
  };

  const wideList = useMedia(tabletUp);
  const ListComponent = wideList ? DesktopDisplay : MobileDisplay;

  return (
    <Container className="view-page bet-list">
      <UberPaginator
        summaryQuery={summaryQuery}
        itemsQuery={itemsQuery}
      >
        {({ items: users, loading }) => (
          <>
            <Section loading={loading}>
              <ListComponent users={users} />
            </Section>
          </>
        )}
      </UberPaginator>
    </Container>
  );

  function DesktopDisplay({ users }) {
    return (
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
    );
  }

  function MobileDisplay({ users }) {
    return (
      <List.List>
        <Transition.Group>
          {_.map(users, user => (
            <List verticalAlign="middle" className="mobile-list-item" key={`${user.id}`}>
              <List.Item>
                <Avatar user={user} />&nbsp;
                <strong><Link to={`/bets/${user.name}`}>{user.name}</Link></strong>
              </List.Item>
              <List.Item>
                <Company label user={user} />
              </List.Item>
              <List.Item>
                <strong>Bet</strong> <TimeAgo date={user.createdAt} />
              </List.Item>
            </List>
          ))}
        </Transition.Group>
      </List.List>
    );
  }

  function Company({ user, label }) {
    if (user.company) {
      const company = user.company
        ? <a href={user.company.url} target="_blank" rel="noopener noreferrer">{user.company.name}</a>
        : user.company.name;

      return (
        <>
          { label && <strong>Company </strong> }
          {company}
        </>
      );
    } else {
      return null;
    }
  }
}
