import { raw } from 'objection';
import VictimUserBet from 'models/victimUserBet';

export default function getBetsForUserByUsername({ username }) {
  return VictimUserBet
    .query()
    .join('users', {
      'users.id': 'victims_users_bets.userId',
      'users.name': raw('?', [username])
    });
}
