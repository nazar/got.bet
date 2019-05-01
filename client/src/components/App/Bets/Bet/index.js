import _ from 'lodash';
import React from 'react';
import { Card, Container, Table, Icon, Transition, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Avatar from 'components/shared/Avatar';
import BetScoreHistory from 'components/shared/BetScoreHistory';
import PlayerImage from 'components/shared/PlayerImage';
import Section from 'components/shared/Section';
import TimeAgo from 'components/shared/TimeAgo';

import useQuery from 'hooks/useQuery';

import getBetQuery from './getBet.gql';
import './bet.styl';


export default function Bet({ match: { params: { username } } }) {
  const { loading, data: { userByName, victimsBetForUser } } = useQuery({
    query: getBetQuery,
    variables: { username }
  });

  return (
    <Container className="view-page bet">
      <Section loading={loading}>
        {() => (
          <>
            <UserInformation />

            <BetScoreHistory user={userByName} />

            <Header>Current Score {userByName.scores.right}</Header>

            <Table unstackable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>&nbsp;</Table.HeaderCell>
                  <Table.HeaderCell>Character</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Lives</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Dies</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Wights</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Transition.Group>
                  {_.map(victimsBetForUser, victimBet => (
                    <Table.Row key={`bet:${victimBet.id}`}>
                      <Table.Cell collapsing><PlayerImage avatar popup cover player={victimBet.victim} /></Table.Cell>
                      <Table.Cell>{victimBet.victim.name}</Table.Cell>
                      <Table.Cell textAlign="center"><Selection victimBet={victimBet} value="alive" /></Table.Cell>
                      <Table.Cell textAlign="center"><Selection victimBet={victimBet} value="dead" /></Table.Cell>
                      <Table.Cell textAlign="center"><Selection victimBet={victimBet} value="wight" /></Table.Cell>
                    </Table.Row>
                  ))}
                </Transition.Group>
              </Table.Body>
            </Table>

            <BonusSection />
          </>
        )}
      </Section>
    </Container>
  );

  function UserInformation() {
    return (
      <Header as="h1">
        <Avatar user={userByName} />
        <Header.Content>
          <User />
          <Header.Subheader>

            <Company />
            Bet about <TimeAgo noMargin plain date={userByName.createdAt} />
          </Header.Subheader>
        </Header.Content>
      </Header>
    );

    //

    function User() {
      const content = userByName.url
        ? <a href={userByName.url} target="_blank" rel="noopener noreferrer">{userByName.name}</a>
        : userByName.name;

      return (
        <strong>{content}</strong>
      );
    }

    function Company() {
      if (userByName.company) {
        return (
          <div>
            <Link to={`/companies/${userByName.company.name}`}>{userByName.company.name}</Link>
          </div>
        );
      } else {
        return null;
      }
    }
  }

  function Selection({ value, victimBet: { status } }) {
    if (value === status) {
      return <Icon name="circle" />;
    } else {
      return null;
    }
  }

  function BonusSection() {
    if (userByName.bonus) {
      const { bonus: { dennyPregz, killsNightKing, winsThrone } } = userByName;

      return (
        <Card.Group>
          <Card centered>
            <PlayerImage
              cover
              card
              player={{ name: 'Daenerys Targaryen' }}
              size="large"
              label={{ as: 'span', color: 'grey', corner: 'left', icon: 'child', size: 'big' }}
            />
            <Card.Content>
              <Card.Header>Is Daenerys Pregnant?</Card.Header>
            </Card.Content>
            <Card.Content extra>
              { dennyPregz ? 'Yes' : 'No' }
            </Card.Content>
          </Card>

          {killsNightKing && (
            <Card centered>
              <PlayerImage
                cover
                card
                player={killsNightKing}
                size="large"
                label={{ as: 'span', color: 'grey', corner: 'left', icon: 'chess knight', size: 'big' }}
              />
              <Card.Content>
                <Card.Header>{ killsNightKing.name }</Card.Header>
              </Card.Content>
              <Card.Content extra>
                Kills the Night King
              </Card.Content>
            </Card>
          )}

          {winsThrone && (
            <Card centered>
              <PlayerImage
                cover
                card
                player={winsThrone}
                size="large"
                label={{ as: 'span', color: 'grey', corner: 'left', icon: 'winner', size: 'big' }}
              />
              <Card.Content>
                <Card.Header>{ winsThrone.name }</Card.Header>
              </Card.Content>
              <Card.Content extra>
                Wins the Iron Throne
              </Card.Content>
            </Card>
          )}
        </Card.Group>
      );
    } else {
      return null;
    }
  }
}
