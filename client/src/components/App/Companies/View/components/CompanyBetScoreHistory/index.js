import _ from 'lodash';
import React from 'react';
import { Header } from 'semantic-ui-react';
import { LineChart, Line, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Color from 'color';

import useQuery from 'hooks/useQuery';

import scoreHistoryForCompanyQuery from './scoreHistoryForCompany.gql';

export default function CompanyBetScoreHistory({ company }) {
  const scoreHistory = useScoreHistory();
  const showHistory = _.get(scoreHistory, 'length') > 0;

  const lines = linesFromScoreHistory();
  const linesHeight = lines.length * 30;
  const height = _.clamp(linesHeight, 200, linesHeight);

  return (showHistory && (
    <div className="bet-score-history">
      <Header>Score History</Header>
      <ResponsiveContainer height={height} width="100%">
        <LineChart
          data={scoreHistory}
          margin={{ top: 16, bottom: 16 }}
        >
          <YAxis type="number" />
          <Legend />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          {lines}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )) || null;

  // implementation

  function linesFromScoreHistory() {
    const colorMap = _.chain(scoreHistory)
      .last()
      .omit('id')
      .toPairs()
      .reduce((result, [p], index) => {
        return _.tap(result, (r) => {
          r[p] = Color('#ff0000').rotate((29 * index) * -1).string();
        });
      }, {})
      .value();

    return _.chain(scoreHistory)
      .last()
      .omit('id')
      .map((score, name) => ({ score, name }))
      .orderBy(['score'], ['desc'])
      .map(({ name }) => <Line type="step" connectNulls dataKey={name} stroke={colorMap[name]} />)
      .value();
  }

  function useScoreHistory() {
    const { data: { scoreHistoryForCompany } } = useQuery({
      query: scoreHistoryForCompanyQuery,
      variables: { companyId: company.id }
    });

    return _.chain(scoreHistoryForCompany)
      .orderBy('createdAt')
      .groupBy('createdAt')
      .map((userScores, date) => {
        return _.tap({}, (r) => {
          r.id = new Date(date);

          _.each(userScores, (userScore) => {
            r[userScore.user.name] = userScore.scores.right;
          });
        });
      })
      .value();
  }
}
