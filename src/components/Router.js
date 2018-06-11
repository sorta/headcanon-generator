import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import base, { firebaseApp, firebase } from '../base';
import NotFound from './NotFound';
import App from './App';
import Login from './Login';

class Router extends Component {
  state = {
    uid: null,
    oid: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user }, true);
      }
    })
  }

  authHandler = async (authData, skipPush=false) => {
    const existingOwner = await base.fetch('oid', { context: this });
    if (!existingOwner || Object.keys(existingOwner).length === 0) {
      await base.post('oid', { data: authData.user.uid });
    }

    const newOwner = existingOwner || authData.user.uid;
    this.setState({ uid: authData.user.uid, oid: newOwner });
  };

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null });
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={(props) => (
              <App {...props}
                uid={this.state.uid}
                oid={this.state.oid}
              />
            )}
          />
          <Route path="/login/" render={(props) => (
              <Login {...props}
                uid={this.state.uid}
                authenticate={this.authenticate}
                logout={this.logout}
              />
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
