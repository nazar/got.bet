import React from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';
import pluralize from 'pluralize';

import useQuery from 'hooks/useQuery';

import Section from 'components/shared/Section';
import UsersList from 'components/shared/UsersList';

import usersQuery from 'queries/user/users.gql';
import usersSummaryQuery from 'queries/user/usersSummary.gql';

import CompanyBetScoreHistory from './components/CompanyBetScoreHistory';

import companyQuery from './company.gql';


export default function CompanyBetList({ match: { params: { company: companyName } } }) {
  const { loading, data: { company } } = useQuery({
    query: companyQuery,
    variables: { name: companyName }
  });

  return (
    <Container className="view-page bet-list">
      <Section loading={loading}>
        {() => (
          <>
            <CompanyHeader />

            <CompanyBetScoreHistory company={company} />

            <UsersList
              hideCompany
              usersQuery={usersQuery}
              usersSummaryQuery={usersSummaryQuery}
              variables={{ search: { company: companyName } }}
              defaultSort="score:desc"
            />
          </>
        )}
      </Section>
    </Container>
  );

  //

  function CompanyHeader() {
    return (
      <Header as="h1">
        <Icon name="building" />
        <Header.Content>
          <CompanyName />
          <Header.Subheader>
            {company.stats.users} {pluralize('Participant', company.stats.users)}
          </Header.Subheader>
        </Header.Content>
      </Header>
    );
    //

    function CompanyName() {
      if (company.url) {
        return <a href={company.url} target="_blank" rel="noopener noreferrer">{company.name}</a>;
      } else {
        return company.name;
      }
    }
  }
}
