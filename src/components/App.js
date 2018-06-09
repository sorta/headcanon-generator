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

  updateFandom = (fKey, fandom) => {
    const fandoms = { ...this.state.fandoms };
    fandoms[fKey] = fandom;
    this.setState({ fandoms });
  }

  deleteFandom = (fKey) => {
    const fandoms = { ...this.state.fandoms };
    const subjects = { ...this.state.subjects };

    // Remote any fandom subjects
    fandoms[fKey].subjects = fandoms[fKey].subjects || [];
    for (const sKey of fandoms[fKey].subjects) {
      subjects[sKey] = null;
    }

    // Remove fandom itself
    fandoms[fKey] = null;

    this.setState({ fandoms, subjects });
  }

  selectFandom = (fKey) => {
    this.setState({ selectedFandomKey: fKey });
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

  updateSubject = (sKey, subject) => {
    const subjects = { ...this.state.subjects };
    subjects[sKey] = subject;
    this.setState({ subjects });
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

  updateDescriptor = (dKey, descriptor) => {
    const descriptors = { ...this.state.descriptors };
    descriptors[dKey] = descriptor;
    this.setState({ descriptors });
  }

  deleteDescriptor = (dKey) => {
    const descriptors = { ...this.state.descriptors };
    descriptors[dKey] = null;
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
    const selectedFandom = this.state.fandoms[this.state.selectedFandomKey];
    const options3 = typeof selectedFandom === 'undefined' || typeof selectedFandom.name === 'undefined';

    return (
      <div className="App">
        <div className={options3 ? 'options' : 'options has-selected-fandom'}>
          <div className="fandoms">
            <h2 className="fandoms-header">Fandoms</h2>
            <AddFandomForm addFandom={this.addFandom} />
            <FandomList
              fandoms={this.state.fandoms}
              selectFandom={this.selectFandom}
              updateFandom={this.updateFandom}
              deleteFandom={this.deleteFandom}
              selectedFandomKey={this.state.selectedFandomKey}
            />
          </div>
          <Subjects
            fandom={selectedFandom}
            subjects={this.state.subjects}
            selectedFandomKey={this.state.selectedFandomKey}
            addSubject={this.addSubject}
            updateSubject={this.updateSubject}
            deleteSubject={this.deleteSubject}
          />
          <div className="descriptors">
            <h2 className="descriptors-header">Descriptors</h2>
            <AddDescriptorForm addDescriptor={this.addDescriptor} />
            <DescriptorList
              descriptors={this.state.descriptors}
              updateDescriptor={this.updateDescriptor}
              deleteDescriptor={this.deleteDescriptor}
            />
          </div>
        </div>
        <div className="action">
          <button className="btn btn-go" onClick={this.generateHeadcanon}>Go</button>
        </div>
        <HeadCanon
          fandoms={this.state.fandoms}
          subject={this.state.subjects[this.state.generated.subject]}
          descriptor={this.state.descriptors[this.state.generated.descriptor]}
        />
      </div>
    );
  }
}

export default App;
