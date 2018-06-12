import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SubjectList extends Component {
  static propTypes = {
    subject: PropTypes.shape({ name: PropTypes.string }),
    updateSubject: PropTypes.func,
    deleteSubject: PropTypes.func,
    index: PropTypes.string,
    setAvailability: PropTypes.func,
    subjectAvailability: PropTypes.object,
  };
  static defaultProps = {
    subject: { name: '' },
    updateSubject: () => {},
    deleteSubject: () => {},
    index: '',
    setAvailability: () => {},
    subjectAvailability: {},
  };

  handleChange = (event) => {
    const updatedSubject = {
      ...this.props.subject,
      [event.currentTarget.name]: event.currentTarget.value,
    };

    this.props.updateSubject(this.props.index, updatedSubject);
  };

  toggleAvailability = (event) => {
    this.props.setAvailability('subject', this.props.index, event.currentTarget.checked);
  };

  render() {
    if (!this.props.isManaging()) {
      return (
        <li key={this.props.index} className="SubjectListItem list-item control-row">
          {/*<span className="SubjectList-item-text">{this.props.subject.name}</span>*/}

          <input
            id={`isAvailable_subj_${this.props.index}`}
            name="isAvailable"
            type="checkbox"
            className="cb-fake"
            checked={!({}.hasOwnProperty.call(this.props.subjectAvailability, this.props.index))}
            onChange={this.toggleAvailability}
          />
          <label
            htmlFor={`isAvailable_subj_${this.props.index}`}
            className="SubjectList-item-text"
          >
            {this.props.subject.name}
          </label>
        </li>
      );
    }

    return (
      <li key={this.props.index} className="SubjectListItem list-item control-row">
        <input
          id={`isAvailable_subj_${this.props.index}`}
          name="isAvailable"
          type="checkbox"
          className="cb-fake"
          checked={!({}.hasOwnProperty.call(this.props.subjectAvailability, this.props.index))}
          onChange={this.toggleAvailability}
        />
        <label htmlFor={`isAvailable_subj_${this.props.index}`}></label>
        <input name="name" type="text" placeholder="Subject Name" className="control-stretch"
          value={this.props.subject.name} onChange={this.handleChange}
        />
        <button
          className="SubjectList-item-delete"
          onClick={() => this.props.deleteSubject(this.props.index)}
        >-</button>
      </li>
    );
  }
}

export default SubjectList;
