import React from 'react';
import { Header, Button, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Section from 'components/shared/Section';

import './home.styl';

export default function Home() {
  return (
    <div className="home">
      <Section inverted placeholder padded="very" basic={false} className="hero">
        <Header as="h1" textAlign="center">Game of Thrones</Header>
        <Header as="h2" textAlign="center">Who Lives? Who Dies? Who Wights?</Header>
      </Section>

      <Section placeholder textAlign="center">
        <Section size="big">
          <Message compact>
            <Message.Header>This is a simple game</Message.Header>
            <p>
              Select which Game of Thrones character lives, dies or becomes a wight by the end of season 8
            </p>
          </Message>
        </Section>

        <Button primary size="massive" as={Link} to="/place">
          Place your bets.
        </Button>
      </Section>
    </div>
  );
}
