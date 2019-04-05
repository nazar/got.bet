import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Bet from 'components/App/Bets/Bet';
import List from 'components/App/Bets/List';

export default function Bets() {
  return (
    <Switch>
      <Route path="/bets/:username" component={Bet} />
      <Route exact path="/bets" component={List} />
    </Switch>
  );
}
