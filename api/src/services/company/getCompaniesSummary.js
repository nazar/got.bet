import Company from 'models/company';
import summariser from 'services/summariser';

import getCompanies from './getCompanies';

export default function getCompaniesSummary() {
  const users = getCompanies();

  return summariser(Company, users);
}
