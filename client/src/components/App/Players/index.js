import _ from 'lodash';
import React, { useState } from 'react';
import { Card, Container, Header, Icon } from 'semantic-ui-react';

import useQuery from 'hooks/useQuery';

import PlayerImage from 'components/shared/PlayerImage';
import Section from 'components/shared/Section';

import Sorter from './components/Sorter';
import Stats from './components/Stats';

import playersQuery from './victims.gql';

export default function Players() {
  const [sortOrder, setSortOrder] = useState('none');

  const { loading, data: { victims } } = useQuery({
    query: playersQuery,
    fetchPolicy: 'network-only'
  });

  const sortedVictims = sort();

  return (
    <Container className="view-page">
      <PlayersHeader />

      <Section loading={loading}>
        <Sorter sortOrder={sortOrder} onSort={order => setSortOrder(order)} />
        <Card.Group>
          {_.map(sortedVictims, victim => <Victim victim={victim} key={victim.id} />)}
        </Card.Group>
      </Section>
    </Container>
  );

  //

  function PlayersHeader() {
    return (
      <Header as="h1">
        <Icon name="chess queen" />
        <Header.Content>
          The Players
          <Header.Subheader>
            Who Wins? Who Dies? Who Wights?
          </Header.Subheader>
        </Header.Content>
      </Header>
    );
  }

  function Victim({ victim, ...rest }) {
    const statusOverride = victim.name === 'The Mountain' ? 'Alive?' : null;

    const color = {
      alive: 'teal',
      dead: 'red',
      wight: 'blue'
    }[victim.status];

    return (
      <Card centered {...rest}>
        <PlayerImage
          cover
          card
          player={victim}
          size="large"
          label={{ color, content: _.capitalize(statusOverride || victim.status), ribbon: true }}
        />
        <Card.Content>
          <Card.Header>{victim.name}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Stats victim={victim} />
        </Card.Content>
      </Card>
    );
  }

  function sort() {
    if (sortOrder === 'none') {
      return victims;
    } else {
      const [field, direction] = _.split(sortOrder, ':');

      return _.orderBy(victims, [`stats.${field}`], [direction]);
    }
  }
}
