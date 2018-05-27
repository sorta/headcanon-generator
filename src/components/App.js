import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import slugify from 'slugify';
import base from '../base';

import AddFandomForm from './AddFandomForm';
import FandomList from './FandomList';
import AddDescriptorForm from './AddDescriptorForm';
import DescriptorList from './DescriptorList';
import Subjects from './Subjects';

const slugSetting = { lower: true, remove: /[$.#\/\[\]]/g };

class App extends Component {
  state = {
    fandoms: {},
    subjects: {},
    descriptors: {},
    selectedFandomKey: '',
    unavailableFandoms: {},
    unavailableFandomSubjects: {},
    unavailableDescriptors: {},
    generatedSubject: {},
    generatedDescriptor: {}
  };

  // lifecycle functions
  componentDidMount() {
    const sfkRef = localStorage.getItem('selectedFandomKey');
    if (sfkRef) { this.setState({ selectedFandomKey: sfkRef }); }

    this.fandom_ref = base.syncState('fandoms', {
      context: this,
      state: 'fandoms',
    });
    this.subject_ref = base.syncState('subjects', {
      context: this,
      state: 'subjects',
    });
    this.descriptor_ref = base.syncState('descriptors', {
      context: this,
      state: 'descriptors',
    });
  }

  componentDidUpdate() {
    localStorage.setItem('selectedFandomKey', this.state.selectedFandomKey);
  }

  componentWillUnmount() {
    base.removeBinding(this.fandom_ref);
    base.removeBinding(this.subject_ref);
    base.removeBinding(this.descriptor_ref);
  }

  // fandom functions
  addFandom = (fandom) => {
    const fandoms = { ...this.state.fandoms };
    fandoms[`f_${slugify(fandom.name, slugSetting)}_${Date.now()}`] = fandom;
    this.setState({ fandoms });
  }

  updateFandom = (key, updatedFandom) => {
    const fandoms = { ...this.state.fandoms };
    fandoms[key] = updatedFandom;
    this.setState({ fandoms });
  }

  selectFandom = (key) => {
    this.setState({ selectedFandomKey: key });
  }

  // subject functions
  addSubject = (fKey, subject) => {
    const fandoms = { ...this.state.fandoms };
    const subjects = { ...this.state.subjects };
    const sKey = `s_${fKey.split('_')[1]}_${slugify(subject.name, slugSetting)}_${Date.now()}`;

    // Create Subject state object
    subjects[sKey] = subject;

    // Add Subject key to fandom list of subjects
    fandoms[fKey].subjects = fandoms[fKey].subjects || [];
    fandoms[fKey].subjects.push(sKey);

    this.setState({ fandoms, subjects });
  }

  // descriptor functions
  addDescriptor = (descriptor) => {
    const descriptors = { ...this.state.descriptors };
    descriptors[`d_${slugify(descriptor.name, slugSetting)}_${Date.now()}`] = descriptor;
    this.setState({ descriptors });
  }

  // generateHeadcanon = () => {
  //   const availableSubjects = [];
  // }

  render() {
    return (
      <div className="App">
        <div className="fandoms">
          <h2 className="fandoms-header">Fandoms</h2>
          <AddFandomForm addFandom={this.addFandom} />
          <FandomList
            fandoms={this.state.fandoms}
            selectFandom={this.selectFandom}
            selectedFandomKey={this.state.selectedFandomKey}
          />
        </div>
        <Subjects
          fandom={this.state.fandoms[this.state.selectedFandomKey]}
          subjects={this.state.subjects}
          selectedFandomKey={this.state.selectedFandomKey}
          addSubject={this.addSubject}
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
