import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  static propTypes = {
    authenticate: PropTypes.func,
    logout: PropTypes.func,
    uid: PropTypes.string,
  };
  static defaultProps = {
    authenticate: () => {},
    logout: () => {},
    uid: '',
  };

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
