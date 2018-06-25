import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { allowEdit } from '../utils'

class SubjectListItem extends Component {
  static propTypes = {
    subject: PropTypes.shape({
      name: PropTypes.string,
      fandomKey: PropTypes.string,
    }),
    updateSubject: PropTypes.func,
    deleteSubject: PropTypes.func,
    index: PropTypes.string,
    setAvailability: PropTypes.func,
    subjectAvailability: PropTypes.object,
    fandomAvailability: PropTypes.object,
    isManaging: PropTypes.func,
  };
  static defaultProps = {
    subject: { name: '', fandomKey: '' },
    updateSubject: () => {},
    deleteSubject: () => {},
    index: '',
    setAvailability: () => {},
    subjectAvailability: {},
    fandomAvailability: {},
    isManaging: () => false,
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
    let availCheckbox = null;
    if (!({}.hasOwnProperty.call(this.props.fandomAvailability, this.props.subject.fandomKey))) {
      availCheckbox = (
        <input
          id={`isAvailable_subj_${this.props.index}`}
          name="isAvailable"
          type="checkbox"
          className="cb-fake"
          checked={!({}.hasOwnProperty.call(this.props.subjectAvailability, this.props.index))}
          onChange={this.toggleAvailability}
        />
      );
    }

    if (!this.props.isManaging() || !allowEdit) {
      return (
        <li key={this.props.index} className="SubjectListItem list-item control-row">
          {availCheckbox}
          <label
            htmlFor={`isAvailable_subj_${this.props.index}`}
            className={availCheckbox === null ? "SubjectListItem-text strike" : "SubjectListItem-text"}
          >
            {this.props.subject.name}
          </label>
        </li>
      );
    }

    return (
      <li key={this.props.index} className="SubjectListItem list-item control-row">
        {availCheckbox}
        <label htmlFor={`isAvailable_subj_${this.props.index}`}></label>
        <input name="name" type="text" placeholder="Subject Name" className="control-stretch"
          value={this.props.subject.name} onChange={this.handleChange}
        />
        <button
          className="SubjectListItem-delete"
          onClick={() => this.props.deleteSubject(this.props.index)}
        >-</button>
      </li>
    );
  }
}

export default SubjectListItem;
