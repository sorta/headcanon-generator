import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import slugify from 'slugify';
import base from '../base';

import AddFandomForm from './AddFandomForm';
import FandomList from './FandomList';
import AddDescriptorForm from './AddDescriptorForm';
import DescriptorList from './DescriptorList';
import Subjects from './Subjects';

const slugSetting = { lower: true };

class App extends Component {
  state = {
    fandoms: {},
    descriptors: {},
    fandomIndex: '',
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
    fandoms[slugify(fandom.name, slugSetting)] = fandom;
    this.setState({ fandoms });
  }

  updateFandom = (key, updatedFandom) => {
    const fandoms = { ...this.state.fandoms };
    fandoms[key] = updatedFandom;
    this.setState({ fandoms });
  }

  addFandomSubject = (fkey, subject) => {
    const fandoms = { ...this.state.fandoms };
    fandoms[fkey].subjects = fandoms[fkey].subjects || {};
    fandoms[fkey].subjects[slugify(subject.name, slugSetting)] = subject;
    this.setState({ fandoms });
  }

  selectFandom = (key) => {
    this.setState({ fandomIndex: key });
  }

  addDescriptor = (descriptor) => {
    const descriptors = { ...this.state.descriptors };
    descriptors[slugify(descriptor.name, slugSetting)] = descriptor;
    this.setState({ descriptors });
  }

  render() {
    return (
      <div className="App">
        <div className="fandoms">
          <h2 className="fandoms-header">Fandoms</h2>
          <AddFandomForm addFandom={this.addFandom} />
          <FandomList fandoms={this.state.fandoms} selectFandom={this.selectFandom} />
        </div>
        <Subjects
          fandoms={this.state.fandoms}
          fandomIndex={this.state.fandomIndex}
          addFandomSubject={this.addFandomSubject}
        />
        <div className="descriptors">
          <h2 className="descriptors-header">Descriptors</h2>
          <AddDescriptorForm addDescriptor={this.addDescriptor} />
          <DescriptorList descriptors={this.state.descriptors} />
        </div>
      </div>
    );
  }
}

export default App;
