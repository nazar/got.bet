import _ from 'lodash';
import React from 'react';
import { Container, Header, Table, Icon, Transition } from 'semantic-ui-react';

import Section from 'components/shared/Section';
import PlayerImage from 'components/shared/PlayerImage';

import useQuery from 'hooks/useQuery';

import getBetQuery from './getBet.gql';


export default function Bet({ match: { params: { username } } }) {
  const { loading, data: { userByName, victimsBetForUser } } = useQuery({
    query: getBetQuery,
    variables: { username }
  });

  return (
    <Container className="view-page">
      <Section loading={loading}>
        {() => (
          <>
            <Header>{userByName.name} Bet</Header>

            <Table unstackable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>&nbsp;</Table.HeaderCell>
                  <Table.HeaderCell>Character</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Lives</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Dies</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Wight</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Transition.Group>
                  {_.map(victimsBetForUser, victimBet => (
                    <Table.Row key={`bet:${victimBet.id}`}>
                      <Table.Cell collapsing><PlayerImage avatar popup player={victimBet.victim} /></Table.Cell>
                      <Table.Cell>{victimBet.victim.name}</Table.Cell>
                      <Table.Cell textAlign="center"><Selection victimBet={victimBet} value="alive" /></Table.Cell>
                      <Table.Cell textAlign="center"><Selection victimBet={victimBet} value="dead" /></Table.Cell>
                      <Table.Cell textAlign="center"><Selection victimBet={victimBet} value="wight" /></Table.Cell>
                    </Table.Row>
                  ))}
                </Transition.Group>
              </Table.Body>
            </Table>
          </>
        )}
      </Section>
    </Container>
  );

  function Selection({ value, victimBet: { status } }) {
    if (value === status) {
      return <Icon name="circle" />;
    } else {
      return null;
    }
  }
}
