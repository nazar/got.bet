import _ from 'lodash';
import React from 'react';
import { Card, Container, Transition } from 'semantic-ui-react';

import useQuery from 'hooks/useQuery';

import PlayerImage from 'components/shared/PlayerImage';
import Section from 'components/shared/Section';

import Stats from './components/Stats';

import playersQuery from './victims.gql';

export default function Players() {
  const { loading, data: { victims } } = useQuery({
    query: playersQuery,
    fetchPolicy: 'network-only'
  });

  return (
    <Container className="view-page">
      <Section loading={loading}>
        <Card.Group>
          <Transition.Group>
            {_.map(victims, victim => <Victim victim={victim} key={victim.id} />)}
          </Transition.Group>
        </Card.Group>
      </Section>
    </Container>
  );

  //

  function Victim({ victim, ...rest }) {
    return (
      <Card centered {...rest}>
        <PlayerImage cover card player={victim} size="large" />
        <Card.Content>
          <Card.Header>{victim.name}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Stats victim={victim} />
        </Card.Content>
      </Card>
    );
  }
}
