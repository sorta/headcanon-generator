import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Subjects extends Component {
  static propTypes = {
    fandoms: PropTypes.object,
    fandomSelected: PropTypes.string,
  };
  static defaultProps = {
    fandoms: {},
    fandomSelected: '',
  };

  render() {
    if (!{}.hasOwnProperty.call(this.props.fandoms, this.props.fandomSelected)) {
      return (
        <div className="Subjects">
          <p>None</p>
        </div>
      );
    }

    const currentFandom = this.props.fandoms[this.props.fandomSelected];
    const subjects = currentFandom.subjects || {};

    return (
      <div className="Subjects">
        { Object.keys(subjects).map(key => (
          <li key={key}>
            {subjects[key].name}
          </li>
        )) }
      </div>
    );
  }
}

export default Subjects;
