import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import AddFandomForm from './AddFandomForm';
import FandomList from './FandomList';

class App extends Component {
  state = {
    fandoms: {},
  };

  addFandom = (fandom) => {
    const fandoms = { ...this.state.fandoms };
    fandoms[`fandom${Date.now()}`] = fandom;
    this.setState({ fandoms });
  }


  render() {
    return (
      <div className="App">
        <div className="fandoms">
          <AddFandomForm addFandom={this.addFandom} />
          <FandomList fandoms={this.state.fandoms} />
        </div>
      </div>
    );
  }
}

export default App;
