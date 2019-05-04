import UserScoreHistory from 'models/userScoreHistory';

export default function getUserScoreHistoryByCompanyId({ companyId }) {
  return UserScoreHistory
    .query()
    .join('users', {
      'users.id': 'users_score_history.userId'
    })
    .join('companies', {
      'companies.id': 'users.companyId'
    })
    .where('companies.id', '=', companyId);
}
