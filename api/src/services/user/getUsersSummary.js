import User from 'models/user';
import summariser from 'services/summariser';

import getUsers from './getUsers';

export default function getUsersSummary({ search }) {
  const users = getUsers({ search });

  return summariser(User, users);
}
