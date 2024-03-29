import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import Loadable from 'react-loadable';

import Head from './Head';

const LoadableHome = Loadable({
  loader: () => import(/* webpackChunkName: 'home' */ './Home'),
  loading: () => <div>Loading...</div>
});

const LoadableAbout = Loadable({
  loader: () => import(/* webpackChunkName: 'about' */ './about/About'),
  loading: () => <div>Loading...</div>
});

const LoadableDashboard = Loadable({
  loader: () => import(/* webpackChunkName: 'about' */ './Dashboard'),
  loading: () => <div>Loading...</div>
});

const App = () => (
  <div className="app">
    <Head />

    <nav aria-label="main navigation">
      <NavLink exact to="/" activeClassName="active">
        Home
      </NavLink>{' '}
      <NavLink exact to="/about" activeClassName="active">
        About
      </NavLink>
      <NavLink exact to="/dashboard" activeClassName="active">
        Dashboard
      </NavLink>

    </nav>

    <main className="main">
      <Switch>
        <Route exact path="/" component={LoadableHome} />
        <Route path="/about" component={LoadableAbout} />
        <Route path="/dashboard" component={LoadableDashboard} />
      </Switch>
    </main>

    <footer />
  </div>
);

export default App;
