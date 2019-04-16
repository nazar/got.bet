import _ from 'lodash';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Table, Transition } from 'semantic-ui-react';

import useMedia, { tabletUp } from 'hooks/useMedia';

import Avatar from '../Avatar';
import LabelContent from '../LabelContent';
import Section from '../Section';
import TimeAgo from '../TimeAgo';
import UberPaginator from '../UberPaginator';
import UserScore from '../UserScore';

import Sorter from './components/Sorter';

export default function BetList({ usersSummaryQuery, usersQuery, variables, defaultSort, hideCompany }) {
  const [sort, setSort] = useState(desctructSort(defaultSort));

  const summaryQuery = {
    query: usersSummaryQuery,
    variables,
    dataKey: 'usersSummary'
  };

  const itemsQuery = {
    query: usersQuery,
    variables: { ...(variables || {}), ...sort },
    dataKey: 'users',
    fetchPolicy: 'network-only'
  };

  const wideList = useMedia(tabletUp);
  const ListComponent = wideList ? DesktopDisplay : MobileDisplay;

  return (
    <UberPaginator
      summaryQuery={summaryQuery}
      itemsQuery={itemsQuery}
    >
      {({ items: users, loading }) => (
        <>
          <Sorter sortOrder={defaultSort} onSort={handleSort} />
          <Section loading={loading}>
            <ListComponent users={users} />
          </Section>
        </>
      )}
    </UberPaginator>
  );

  function handleSort(order) {
    setSort(desctructSort(order));
  }

  function DesktopDisplay({ users }) {
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>&nbsp;</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            {!(hideCompany) && <Table.HeaderCell>Company</Table.HeaderCell>}
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
                {!(hideCompany) && <Table.Cell><Company user={user} /></Table.Cell>}
                <Table.Cell><TimeAgo date={user.createdAt} /></Table.Cell>
                <Table.Cell><UserScore user={user} /></Table.Cell>
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
              {!(hideCompany) && (
                <List.Item>
                  <Company label user={user} />
                </List.Item>
              )}
              <List.Item>
                <LabelContent
                  label="Placed bet"
                  content={<TimeAgo noMargin date={user.createdAt} />}
                />
              </List.Item>
            </List>
          ))}
        </Transition.Group>
      </List.List>
    );
  }

  function Company({ user }) {
    if (user.company && user.company.name) {
      return <Link to={`/companies/${user.company.name}`}>{user.company.name}</Link>;
    } else {
      return null;
    }
  }

  function desctructSort(order) {
    const [field, direction] = _.split(order, ':');
    return { sort: { field, direction } };
  }
}
