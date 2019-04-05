import React from 'react';
import { Container, Segment, Header } from 'semantic-ui-react';

export default function About() {
  return (
    <Container className="view-page">
      <Header>What's this About??</Header>

      <Segment placeholder size="large">
        <p>
          GoT Bet is a fun little site that lets you place *bets on who lives, who dies and who wights
          in the last season of Game of Thrones.
        </p>

        <p>
          The source code for this site is <a href="https://github.com/nazar/git.bet">here</a> and is
          released to the public domain.
        </p>

        <p>
          * no real money is involved; this is for funzies only.
        </p>
      </Segment>
    </Container>
  );
}
