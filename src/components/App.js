import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import base from '../base';

import AddFandomForm from './AddFandomForm';
import FandomList from './FandomList';
import AddDescriptorForm from './AddDescriptorForm';
import DescriptorList from './DescriptorList';
import Subjects from './Subjects';

class App extends Component {
  state = {
    fandoms: {},
    descriptors: {},
    fandomSelected: '',
  };

  componentDidMount() {
    this.fandom_ref = base.syncState('fandoms', {
      context: this,
      state: 'fandoms',
    });
    this.descriptor_ref = base.syncState('descriptors', {
      context: this,
      state: 'descriptors',
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.fandom_ref);
    base.removeBinding(this.descriptor_ref);
  }

  addFandom = (fandom) => {
    const fandoms = { ...this.state.fandoms };
    fandoms[`fandom${Date.now()}`] = fandom;
    this.setState({ fandoms });
  }

  selectFandom = (key) => {
    this.setState({ fandomSelected: key });
  }

  addDescriptor = (descriptor) => {
    const descriptors = { ...this.state.descriptors };
    descriptors[`descriptor${Date.now()}`] = descriptor;
    this.setState({ descriptors });
  }

  render() {
    return (
      <div className="App">
        <div className="fandoms">
          <AddFandomForm addFandom={this.addFandom} />
          <FandomList fandoms={this.state.fandoms} selectFandom={this.selectFandom} />
        </div>
        <Subjects
          fandoms={this.state.fandoms}
          fandomSelected={this.state.fandomSelected}
        />
        <div className="descriptors">
          <AddDescriptorForm addDescriptor={this.addDescriptor} />
          <DescriptorList descriptors={this.state.descriptors} />
        </div>
      </div>
    );
  }
}

export default App;
