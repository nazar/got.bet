import _ from 'lodash';
import React from 'react';
import { Popup, Table } from 'semantic-ui-react';

export default function UserScore({ user }) {
  const scores = _.get(user, 'scores');

  return (scores && (
    <Popup
      trigger={<Score />}
    >
      <Table definition compact basic collapsing unstackable size="small">
        <Table.Header>
          <Table.Row>
            <Table.Cell colSpan={2}>Scores so far</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Correct</Table.Cell>
            <Table.Cell>{scores.right - scores.bonus}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Incorrect</Table.Cell>
            <Table.Cell>{scores.wrong}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Bonus</Table.Cell>
            <Table.Cell>{scores.bonus}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Final Score</Table.Cell>
            <Table.Cell>{scores.right}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell />
            <Table.Cell>{_.round(scores.totalPercent)}%</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Popup>
  )) || '-';

  //

  function Score(props) {
    return (
      <span {...props} style={{ textDecoration: 'underline' }}>
        {scores.right}
      </span>
    );
  }
}
