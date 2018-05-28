import React, { Component } from 'react';
import PropTypes from 'prop-types';

class HeadCanon extends Component {
  static propTypes = {
    subject: PropTypes.object,
    descriptor: PropTypes.object,
  };
  static defaultProps = {
    subject: {},
    descriptor: {},
  };

  render() {
    if (Object.keys(this.props.subject).length === 0 || Object.keys(this.props.descriptor).length === 0) {
      return null;
    }

    return (
      <div className="HeadCanon">
        <h2>
          <span className="HeadCanon-Subject">{this.props.subject.name}</span>
          <span className="HeadCanon-Verb"> is </span>
          <span className="HeadCanon-Descriptor">{this.props.descriptor.name}</span>
        </h2>
      </div>
    );
  }
}

export default HeadCanon;
