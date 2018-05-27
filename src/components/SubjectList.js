import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SubjectList extends Component {
  static propTypes = {
    subjects: PropTypes.object,
  };
  static defaultProps = {
    subjects: {},
  };

  render() {
    return (
      <ul className="SubjectList">
        {Object.keys(this.props.subjects).map(key => (
          <li key={key}>
            {this.props.subjects[key].name}
          </li>
        ))}
      </ul>
    );
  }
}

export default SubjectList;
