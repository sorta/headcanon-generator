import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import slugify from 'slugify';

import base from '../base';
import { arrand } from '../utils';

import AddFandomForm from './AddFandomForm';
import FandomList from './FandomList';
import AddDescriptorForm from './AddDescriptorForm';
import DescriptorList from './DescriptorList';
import Subjects from './Subjects';
import HeadCanon from './HeadCanon';

const slugSetting = { lower: true, remove: /[$.#/[\]]/g };

class App extends Component {
  state = {
    fandoms: {},
    subjects: {},
    descriptors: {},
    selectedFandomKey: '',
    unavailable: {},
    generated: {}
  };

  // lifecycle functions
  componentDidMount() {
    const sfkRef = localStorage.getItem('selectedFandomKey');
    if (sfkRef) { this.setState({ selectedFandomKey: sfkRef }); }

    const genRef = localStorage.getItem('generated');
    if (genRef) { this.setState({ generated: JSON.parse(genRef) }); }

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
    localStorage.setItem('generated', JSON.stringify(this.state.generated));
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

  deleteSubject = (sKey) => {
    const fandoms = { ...this.state.fandoms };
    const subjects = { ...this.state.subjects };
    const fKey = subjects[sKey].fandomKey;

    // Remove Subject from fandom sunject list
    fandoms[fKey].subjects = fandoms[fKey].subjects.filter(key => key !== sKey);

    // Remove Subject from Subjects object
    subjects[sKey] = null;

    this.setState({ fandoms, subjects });
  }

  // descriptor functions
  addDescriptor = (descriptor) => {
    const descriptors = { ...this.state.descriptors };
    descriptors[`d_${slugify(descriptor.name, slugSetting)}_${Date.now()}`] = descriptor;
    this.setState({ descriptors });
  }

  deleteDescriptor = (key) => {
    const descriptors = { ...this.state.descriptors };
    descriptors[key] = null;
    this.setState({ descriptors });
  }

  // Headcanon functions
  generateHeadcanon = () => {
    const availableSubjects = Object.keys(this.state.subjects);
    const availableDescriptors = Object.keys(this.state.descriptors);
    const generated = {};

    generated.subject = arrand(availableSubjects);
    generated.descriptor = arrand(availableDescriptors);

    console.log(generated, this.state.subjects[generated.subject], this.state.descriptors[generated.descriptor]);

    this.setState({ generated });
  }

  render() {
    return (
      <div className="App">
        <div className="options">
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
            deleteSubject={this.deleteSubject}
          />
          <div className="descriptors">
            <h2 className="descriptors-header">Descriptors</h2>
            <AddDescriptorForm addDescriptor={this.addDescriptor} />
            <DescriptorList
              descriptors={this.state.descriptors}
              deleteDescriptor={this.deleteDescriptor}
            />
          </div>
        </div>
        <div className="action"><button onClick={this.generateHeadcanon}>Go</button></div>
        <HeadCanon
          subject={this.state.subjects[this.state.generated.subject]}
          descriptor={this.state.descriptors[this.state.generated.descriptor]}
        />
      </div>
    );
  }
}

export default App;
