import _ from 'lodash';
import React from 'react';

import './stats.styl';

export default function Stats({ victim }) {
  const stats = _.chain([
    { stat: 'Lives', count: _.get(victim, 'stats.lives') || 0 },
    { stat: 'Dies', count: _.get(victim, 'stats.dies') || 0 },
    { stat: 'Wights', count: _.get(victim, 'stats.wights') || 0 }
  ])
    .orderBy('count', 'desc')
    .value();

  const maxCounts = _.maxBy(stats, s => s.count);
  const totalCounts = _.get(maxCounts, 'count') || 1;

  return (
    <div className="player-stats-table">
      <table>
        {_.map(stats, stat => (
          <tr key={stat.stat}>
            <td className="collapsing">{stat.stat}</td>
            <td className="bar-container" valign="middle">
              <div className="bar" style={{ width: `${(stat.count / totalCounts) * 100}%` }}>&nbsp;</div>
            </td>
            <td className="collapsing">{stat.count}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
