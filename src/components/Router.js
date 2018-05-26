import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import App from './App';
// import Manager from './Manager';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      {/* <Route path="/manage/" component={Manager} /> */}
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
