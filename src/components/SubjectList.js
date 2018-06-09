import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SubjectListItem from './SubjectListItem';

class SubjectList extends Component {
  static propTypes = {
    subjects: PropTypes.object,
    subjectKeys: PropTypes.array,
    updateSubject: PropTypes.func,
    deleteSubject: PropTypes.func,
  };
  static defaultProps = {
    subjects: {},
    subjectKeys: [],
    updateSubject: () => {},
    deleteSubject: () => {},
  };

  render() {
    if (Object.keys(this.props.subjects).length === 0) {
      return null;
    }

    return (
      <ul className="options-list SubjectList">
        {this.props.subjectKeys.sort().map(key => {
          if ({}.hasOwnProperty.call(this.props.subjects, key)) {
            return (
              <SubjectListItem
                key={key}
                index={key}
                subject={this.props.subjects[key]}
                updateSubject={this.props.updateSubject}
                deleteSubject={this.props.deleteSubject}
              />
            );
          } else {
            return null;
          }
        })}
      </ul>
    );
  }
}

export default SubjectList;
