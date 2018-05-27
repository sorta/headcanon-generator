import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SubjectList extends Component {
  static propTypes = {
    subjects: PropTypes.object,
    subjectKeys: PropTypes.array,
  };
  static defaultProps = {
    subjects: {},
    subjectKeys: [],
  };

  render() {
    if (Object.keys(this.props.subjects).length === 0) {
      return null;
    }

    return (
      <ul className="SubjectList">
        {this.props.subjectKeys.sort().map(key => {
          if ({}.hasOwnProperty.call(this.props.subjects, key)) {
            return <li key={key}>{this.props.subjects[key].name}</li>;
          } else {
            return null;
          }
        })}
      </ul>
    );
  }
}

export default SubjectList;
