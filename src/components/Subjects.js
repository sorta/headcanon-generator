import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddSubjectForm from './AddSubjectForm';
import SubjectList from './SubjectList';

class Subjects extends Component {
  static propTypes = {
    fandoms: PropTypes.object,
    selectedFandomKey: PropTypes.string,
    addFandomSubject: PropTypes.func,
  };
  static defaultProps = {
    fandoms: {},
    selectedFandomKey: '',
    addFandomSubject: () => {},
  };

  render() {
    if (!{}.hasOwnProperty.call(this.props.fandoms, this.props.selectedFandomKey)) {
      return (
        <div className="Subjects" />
      );
    }

    const currentFandom = this.props.fandoms[this.props.selectedFandomKey];
    const subjects = currentFandom.subjects || {};

    return (
      <div className="Subjects">
        <h3>{currentFandom.name}</h3>
        <AddSubjectForm
          addFandomSubject={this.props.addFandomSubject}
          selectedFandomKey={this.props.selectedFandomKey}
        />
        <SubjectList subjects={subjects} />
      </div>
    );
  }
}

export default Subjects;
