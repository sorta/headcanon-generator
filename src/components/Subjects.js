import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddSubjectForm from './AddSubjectForm';
import SubjectList from './SubjectList';

class Subjects extends Component {
  static propTypes = {
    fandom: PropTypes.object,
    subjects: PropTypes.object,
    addSubject: PropTypes.func,
    deleteSubject: PropTypes.func,
  };
  static defaultProps = {
    fandom: {},
    subjects: {},
    addSubject: () => {},
    deleteSubject: () => {},
  };

  render() {
    const currentFandom = this.props.fandom;

    if (typeof currentFandom === 'undefined' || typeof currentFandom.name === 'undefined') {
      return <div className="Subjects" />;
    }

    const subjectKeys = currentFandom.subjects || [];

    return (
      <div className="Subjects">
        <h3>{currentFandom.name}</h3>
        <AddSubjectForm
          addSubject={this.props.addSubject}
          selectedFandomKey={this.props.selectedFandomKey}
        />
        <SubjectList
          subjects={this.props.subjects}
          subjectKeys={subjectKeys}
          deleteSubject={this.props.deleteSubject}
        />
      </div>
    );
  }
}

export default Subjects;
