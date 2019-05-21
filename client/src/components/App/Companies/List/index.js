import _ from 'lodash';
import React from 'react';
import { Container, Header, Icon, List, Table, Transition } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import LabelContent from 'components/shared/LabelContent';
import Section from 'components/shared/Section';
import TimeAgo from 'components/shared/TimeAgo';
import UberPaginator from 'components/shared/UberPaginator';

import useMedia, { tabletUp } from 'hooks/useMedia';

import companiesQuery from './companies.gql';
import companiesSummaryQuery from './companiesSummary.gql';

export default function CompaniesList() {
  const summaryQuery = {
    query: companiesSummaryQuery,
    dataKey: 'companiesSummary'
  };

  const itemsQuery = {
    query: companiesQuery,
    dataKey: 'companies',
    fetchPolicy: 'network-only'
  };

  const wideList = useMedia(tabletUp);
  const ListComponent = wideList ? DesktopDisplay : MobileDisplay;

  return (
    <Container className="view-page companies-list">
      <CompanyListHeader />

      <UberPaginator
        summaryQuery={summaryQuery}
        itemsQuery={itemsQuery}
      >
        {({ items: companies, loading }) => (
          <Section loading={loading}>
            <ListComponent companies={companies} />
          </Section>
        )}
      </UberPaginator>
    </Container>
  );

  // implementation

  function CompanyListHeader() {
    return (
      <Header as="h1">
        <Icon name="building" />
        <Header.Content>
          Participating Companies
          <Header.Subheader>
            Click on each company to view betting pools
          </Header.Subheader>
        </Header.Content>
      </Header>
    );
  }

  function DesktopDisplay({ companies }) {
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Company</Table.HeaderCell>
            <Table.HeaderCell>Bets</Table.HeaderCell>
            <Table.HeaderCell>Joined</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Transition.Group>
            {_.map(companies, company => (
              <Table.Row key={`${company.id}`}>
                <Table.Cell><Link to={`/companies/${company.name}`}>{company.name}</Link></Table.Cell>
                <Table.Cell>{company.stats.users}</Table.Cell>
                <Table.Cell><TimeAgo date={company.createdAt} /></Table.Cell>
              </Table.Row>
            ))}
          </Transition.Group>
        </Table.Body>
      </Table>
    );
  }

  function MobileDisplay({ companies }) {
    return (
      <List.List>
        <Transition.Group>
          {_.map(companies, company => (
            <List verticalAlign="middle" className="mobile-list-item" key={`${company.id}`}>
              <List.Item>
                <LabelContent
                  label="Company"
                  content={<strong><Link to={`/companies/${company.name}`}>{company.name}</Link></strong>}
                />
              </List.Item>

              <List.Item>
                <LabelContent
                  label="Bets"
                  content={company.stats.users}
                />
              </List.Item>

              <List.Item>
                <LabelContent
                  label="Joined"
                  content={<TimeAgo date={company.createdAt} />}
                />
              </List.Item>
            </List>
          ))}
        </Transition.Group>
      </List.List>
    );
  }
}
