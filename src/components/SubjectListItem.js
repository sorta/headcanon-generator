import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SubjectList extends Component {
  static propTypes = {
    subject: PropTypes.shape({ name: PropTypes.string }),
    updateSubject: PropTypes.func,
    deleteSubject: PropTypes.func,
    index: PropTypes.string,
  };
  static defaultProps = {
    subject: { name: '' },
    updateSubject: () => {},
    deleteSubject: () => {},
    index: '',
  };

  handleChange = (event) => {
    const updatedSubject = {
      ...this.props.subject,
      [event.currentTarget.name]: event.currentTarget.value,
    };

    this.props.updateSubject(this.props.index, updatedSubject);
  };

  render() {
    if (!this.props.isManaging()) {
      return (
        <li key={this.props.index} className="SubjectListItem list-item control-row">
          <span className="SubjectList-item-text">{this.props.subject.name}</span>
        </li>
      );
    }

    return (
      <li key={this.props.index} className="SubjectListItem list-item control-row">
        <input name="name" type="text" placeholder="Subject Name" className="control-stretch"
          value={this.props.subject.name} onChange={this.handleChange}
        />
        <button
          className="DescriptorList-item-delete"
          onClick={() => this.props.deleteSubject(this.props.index)}
        >-</button>
      </li>
    );
  }
}

export default SubjectList;
