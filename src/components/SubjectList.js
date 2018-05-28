import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SubjectList extends Component {
  static propTypes = {
    subjects: PropTypes.object,
    subjectKeys: PropTypes.array,
    deleteSubject: PropTypes.func,
  };
  static defaultProps = {
    subjects: {},
    subjectKeys: [],
    deleteSubject: () => {},
  };

  render() {
    if (Object.keys(this.props.subjects).length === 0) {
      return null;
    }

    return (
      <ul className="SubjectList">
        {this.props.subjectKeys.sort().map(key => {
          if ({}.hasOwnProperty.call(this.props.subjects, key)) {
            return (
              <li key={key} className="SubjectList-item">
                <span className="SubjectList-item-text">{this.props.subjects[key].name}</span>
                <button
                  className="DescriptorList-item-delete"
                  onClick={() => this.props.deleteSubject(key)}
                >
                  -
                </button>
              </li>
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
