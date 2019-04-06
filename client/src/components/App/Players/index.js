import _ from 'lodash';
import React from 'react';
import { Card, Container, Transition, Icon } from 'semantic-ui-react';

import PlayerImage from 'components/shared/PlayerImage';
import Section from 'components/shared/Section';

import useQuery from 'hooks/useQuery';
import playersQuery from './victims.gql';

export default function Players() {
  const { loading, data: { victims } } = useQuery({
    query: playersQuery
  });

  return (
    <Container className="view-page">
      <Section loading={loading}>
        <Card.Group>
          <Transition.Group>
            {_.map(victims, victim => <Victim victim={victim} />)}
          </Transition.Group>
        </Card.Group>
      </Section>
    </Container>
  );

  //

  function Victim({ victim }) {
    return (
      <Card>
        <PlayerImage cover card player={victim} size="large" />
        <Card.Content>
          <Card.Header>{victim.name}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="user" />
            10 Friends
          </a>
        </Card.Content>
      </Card>
    );
  }
}
