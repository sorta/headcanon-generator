import React, { Component } from 'react';

class Login extends Component {
  render() {
    let headerText = 'Login';
    let actions = (
      <button className="btn-login github" onClick={() => this.props.authenticate('Github')}>Log In With Github</button>
    );

    if (this.props.uid) {
      headerText = 'You are logged in';
      actions = (
        <button className="btn-logout" onClick={this.props.logout}>Log Out</button>
      );
    }

    return (
      <div className="App App-login">
        <h1 className="header-login">{headerText}</h1>
        {actions}
      </div>
    );
  }
}

export default Login;
