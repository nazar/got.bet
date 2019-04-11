import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import About from 'components/App/About';
import Companies from 'components/App/Companies';
import Bets from 'components/App/Bets';
import Home from 'components/App/Home';
import Place from 'components/App/Place';
import Players from 'components/App/Players';

import Footer from './components/Footer';
import NavBar from './components/NavBar';

import './App.styl';

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Helmet
          title="GoT Bet"
        />

        <NavBar />

        <div className="App">
          <Switch>
            <Route path="/place" component={Place} />
            <Route path="/bets" component={Bets} />
            <Route path="/companies" component={Companies} />
            <Route path="/players" component={Players} />
            <Route path="/about" component={About} />
            <Route exact path="/" component={Home} />
          </Switch>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
