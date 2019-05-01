import _ from 'lodash';
import React from 'react';
import { Header } from 'semantic-ui-react';
import { LineChart, Line, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

import useQuery from 'hooks/useQuery';
import userScoreHistoryQuery from './userScoreHistory.gql';

export default function BetScoreHistory({ user }) {
  const scoreHistory = useScoreHistory();
  const showHistory = _.get(scoreHistory, 'length') > 0;

  return (showHistory && (
    <div className="bet-score-history">
      <Header>Score History</Header>
      <ResponsiveContainer height={150} width="100%">
        <LineChart
          data={scoreHistory}
          margin={{ top: 16, bottom: 16 }}
        >
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="score" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )) || null;

  // implementation

  function useScoreHistory() {
    const { data: { scoreHistoryForUser } } = useQuery({
      query: userScoreHistoryQuery,
      variables: { userId: user.id }
    });

    return _.chain(scoreHistoryForUser)
      .orderBy('createdAt')
      .map(h => ({
        name: h.id,
        score: h.scores.right
      }))
      .value();
  }
}
