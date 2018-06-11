import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddSubjectForm from './AddSubjectForm';
import SubjectList from './SubjectList';

class Subjects extends Component {
  static propTypes = {
    fandom: PropTypes.object,
    subjects: PropTypes.object,
    addSubject: PropTypes.func,
    updateSubject: PropTypes.func,
    deleteSubject: PropTypes.func,
    isManaging: PropTypes.func,
  };
  static defaultProps = {
    fandom: {},
    subjects: {},
    addSubject: () => {},
    updateSubject: () => {},
    deleteSubject: () => {},
    isManaging: () => false,
  };

  render() {
    const currentFandom = this.props.fandom;

    if (typeof currentFandom === 'undefined' || typeof currentFandom.name === 'undefined') {
      return null;
    }

    const subjectKeys = currentFandom.subjects || [];

    return (
      <div className="Subjects">
        <h2>{currentFandom.name}</h2>
        <AddSubjectForm
          addSubject={this.props.addSubject}
          selectedFandomKey={this.props.selectedFandomKey}
          isManaging={this.props.isManaging}
        />
        <SubjectList
          subjects={this.props.subjects}
          subjectKeys={subjectKeys}
          updateSubject={this.props.updateSubject}
          deleteSubject={this.props.deleteSubject}
          isManaging={this.props.isManaging}
        />
      </div>
    );
  }
}

export default Subjects;
