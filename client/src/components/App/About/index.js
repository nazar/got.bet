import React from 'react';
import { Container, Segment, Header } from 'semantic-ui-react';

export default function About() {
  return (
    <Container className="view-page">
      <Header>What's this About??</Header>

      <Segment placeholder size="big">
        <p>
          GoT Bet is a fun little site that lets you place *bets on who lives, who dies and who wights
          in the last season of Game of Thrones.
        </p>

        <p>
          The source code for this site is <a href="https://github.com/nazar/got.bet">here</a> and is
          released to the public domain and is built with React, Express, graphQL and a ❤️ for writing code.
        </p>

        <p>
          <i>* no money is involved; this is for funzies only.</i>
        </p>
      </Segment>
    </Container>
  );
}
