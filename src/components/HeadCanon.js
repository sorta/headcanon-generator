import React, { Component } from 'react';
import PropTypes from 'prop-types';

class HeadCanon extends Component {
  static propTypes = {
    subject: PropTypes.object,
    descriptor: PropTypes.object,
    fandoms: PropTypes.object,
  };
  static defaultProps = {
    subject: {},
    descriptor: {},
    fandoms: {},
  };

  render() {
    if (Object.keys(this.props.subject).length === 0 || Object.keys(this.props.descriptor).length === 0) {
      return null;
    }

    let subjectSection = (
      <h2 className="HeadCanon-item HeadCanon-Subject">{this.props.subject.name}</h2>
    );

    if ({}.hasOwnProperty.call(this.props.fandoms, this.props.subject.fandomKey)) {
      subjectSection = (
        <h2 className="HeadCanon-item HeadCanon-Subject"
          data-tooltip={`From "${this.props.fandoms[this.props.subject.fandomKey].name}"`}
        >{this.props.subject.name}</h2>
      );
    }

    return (
      <div className="HeadCanon">
        {subjectSection}
        &nbsp;
        <h2 className="HeadCanon-item HeadCanon-Verb">is</h2>
        &nbsp;
        <h2 className="HeadCanon-item HeadCanon-Descriptor">{this.props.descriptor.name}</h2>
      </div>
    );
  }
}

export default HeadCanon;
