import React, { Component } from 'react';
import slugify from 'slugify';

import base from '../base';
import { arrand } from '../utils';

import AddFandomForm from './AddFandomForm';
import FandomList from './FandomList';
import AddDescriptorForm from './AddDescriptorForm';
import DescriptorList from './DescriptorList';
import Subjects from './Subjects';
import HeadCanon from './HeadCanon';

import Logo from './Logo';

const slugSetting = { lower: true, remove: /[$.#/[\]]/g };

class App extends Component {
  state = {
    fandoms: {},
    subjects: {},
    descriptors: {},
    selectedFandomKey: '',
    optionsOpen: false,
    descriptorAvailability: {},
    subjectAvailability: {},
    fandomAvailability: {},
    generated: {}
  };

  // lifecycle functions
  componentDidMount() {
    const sfkRef = localStorage.getItem('selectedFandomKey');
    if (sfkRef) { this.setState({ selectedFandomKey: sfkRef }); }
    const genRef = localStorage.getItem('generated');
    if (genRef) { this.setState({ generated: JSON.parse(genRef) }); }
    const optsOpen = localStorage.getItem('optionsOpen');
    if (optsOpen) { this.setState({ optionsOpen: JSON.parse(optsOpen) }); }
    const descAvRef = localStorage.getItem('descriptorAvailability');
    if (descAvRef) { this.setState({ descriptorAvailability: JSON.parse(descAvRef) }); }
    const subjAvRef = localStorage.getItem('subjectAvailability');
    if (subjAvRef) { this.setState({ subjectAvailability: JSON.parse(subjAvRef) }); }
    const fandAvRef = localStorage.getItem('fandomAvailability');
    if (fandAvRef) { this.setState({ fandomAvailability: JSON.parse(fandAvRef) }); }

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
    localStorage.setItem('optionsOpen', JSON.stringify(this.state.optionsOpen));
    localStorage.setItem('descriptorAvailability', JSON.stringify(this.state.descriptorAvailability));
    localStorage.setItem('subjectAvailability', JSON.stringify(this.state.subjectAvailability));
    localStorage.setItem('fandomAvailability', JSON.stringify(this.state.fandomAvailability));
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

  // availability functions
  setAvailability = (typeKey, itemKey, value) => {
    const stateKey = `${typeKey}Availability`;
    const availability = { ...this.state[stateKey] };
    const stateData = {};

    if (value === true) {
      delete availability[itemKey];
    } else {
      availability[itemKey] = false;
    }

    stateData[stateKey] = availability;

    this.setState(stateData);
  }

  // Headcanon functions
  generateHeadcanon = () => {
    const availableSubjects = Object.keys(this.state.subjects).filter((el, i, arr) => {
      const subj = this.state.subjects[el];
      // const fandom = this.state.fandoms[subj.fandomKey];
      return (
        !{}.hasOwnProperty.call(this.state.subjectAvailability, el)
        &&
        !{}.hasOwnProperty.call(this.state.fandomAvailability, subj.fandomKey)
      );
    });
    const availableDescriptors = Object.keys(this.state.descriptors).filter((el, i, arr) => {
      return !{}.hasOwnProperty.call(this.state.descriptorAvailability, el);
    });

    const generated = {};
    generated.subject = arrand(availableSubjects);
    generated.descriptor = arrand(availableDescriptors);

    // console.log('Gen: ', availableDescriptors, generated);
    this.setState({ generated });
  }

  // Options functions
  toggleOptions = () => {
    this.setState({ optionsOpen: !this.state.optionsOpen });
  }

  render() {
    const selectedFandom = this.state.fandoms[this.state.selectedFandomKey];
    const options2 = typeof selectedFandom === 'undefined' || typeof selectedFandom.name === 'undefined';
    const isManaging = () => { return this.props.uid !== null && this.props.uid === this.props.oid };

    const optionsClasses = ['options'];
    if (!options2) {
      optionsClasses.push('has-selected-fandom')
    }
    if (this.state.optionsOpen === true) {
      optionsClasses.push('is-open');
    }

    return (
      <div className="App App-main">
        <button className="btn btn-options" onClick={this.toggleOptions}>
          {this.state.optionsOpen ? 'vvv' : '^^^'}
        </button>
        <div className={optionsClasses.join(' ')}>
          <div className="fandoms">
            <h2 className="fandoms-header">Fandoms</h2>
            <AddFandomForm addFandom={this.addFandom} isManaging={isManaging} />
            <FandomList
              fandoms={this.state.fandoms}
              selectFandom={this.selectFandom}
              updateFandom={this.updateFandom}
              deleteFandom={this.deleteFandom}
              selectedFandomKey={this.state.selectedFandomKey}
              isManaging={isManaging}
              setAvailability={this.setAvailability}
              fandomAvailability={this.state.fandomAvailability}
            />
          </div>
          <Subjects
            fandom={selectedFandom}
            subjects={this.state.subjects}
            selectedFandomKey={this.state.selectedFandomKey}
            addSubject={this.addSubject}
            updateSubject={this.updateSubject}
            deleteSubject={this.deleteSubject}
            isManaging={isManaging}
            setAvailability={this.setAvailability}
            subjectAvailability={this.state.subjectAvailability}
            fandomAvailability={this.state.fandomAvailability}
          />
          <div className="descriptors">
            <h2 className="descriptors-header">Descriptors</h2>
            <AddDescriptorForm addDescriptor={this.addDescriptor} isManaging={isManaging} />
            <DescriptorList
              descriptors={this.state.descriptors}
              updateDescriptor={this.updateDescriptor}
              deleteDescriptor={this.deleteDescriptor}
              isManaging={isManaging}
              setAvailability={this.setAvailability}
              descriptorAvailability={this.state.descriptorAvailability}
            />
          </div>
        </div>
        <div className="action">
          <button className="btn btn-go" title="Generate Headcanon" onClick={this.generateHeadcanon}>
            <Logo className="btn-go-logo" />
          </button>
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
