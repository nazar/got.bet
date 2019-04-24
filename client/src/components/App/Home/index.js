import React from 'react';
import { Header, Button, Message, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Section from 'components/shared/Section';
import Nothing from 'components/shared/Nothing';

import './home.styl';

export default function Home() {
  return (
    <div className="home">
      <Section inverted placeholder padded="very" basic={false} className="hero">
        <Header as="h1" textAlign="center">Game of Thrones</Header>
        <Header as="h2" textAlign="center">Who Lives? Who Dies? Who Wights?</Header>

        <Button primary size="massive" as={Link} to="/place" style={{ marginTop: 40 }}>
          Place your bets.
        </Button>
      </Section>

      <Container>
        <Section placeholder textAlign="center">
          <Section size="big">
            <Message compact>
              <Message.Header>The Game is simple</Message.Header>
              <p>
                Select which Game of Thrones characters live, die or become wights by the end of season 8.
                Once a character dies or wights then they will be removed from the betting.
              </p>
              <p>
                She or he who predicts the most deaths and wights <Nothing plural />
              </p>
            </Message>
          </Section>
        </Section>
      </Container>
    </div>
  );
}
