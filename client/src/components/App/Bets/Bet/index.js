import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Table, Icon, Transition, List } from 'semantic-ui-react';

import Company from 'components/shared/Company';
import Section from 'components/shared/Section';
import PlayerImage from 'components/shared/PlayerImage';

import useQuery from 'hooks/useQuery';
import Avatar from '../../../shared/Avatar';
import LabelContent from '../../../shared/LabelContent';
import TimeAgo from '../../../shared/TimeAgo';

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
            <UserInformation />

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

  function UserInformation() {
    return (
      <List verticalAlign="middle" className="mobile-list-item" key={`${userByName.id}`}>
        <List.Item>
          <Avatar user={userByName} />&nbsp;
          <User />
        </List.Item>
        <List.Item>
          <Company user={userByName} />
        </List.Item>
        <List.Item>
          <LabelContent
            label="Placed bet"
            content={<TimeAgo noMargin plain date={userByName.createdAt} />}
          />
        </List.Item>
      </List>
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
  }

  function Selection({ value, victimBet: { status } }) {
    if (value === status) {
      return <Icon name="circle" />;
    } else {
      return null;
    }
  }
}
