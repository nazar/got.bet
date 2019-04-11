import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Bet from 'components/App/Companies/View';
import List from 'components/App/Companies/List';

export default function Bets() {
  return (
    <Switch>
      <Route path="/companies/:company" component={Bet} />
      <Route exact path="/companies" component={List} />
    </Switch>
  );
}
