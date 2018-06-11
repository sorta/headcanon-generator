import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddSubjectForm extends Component {
  static propTypes = {
    addSubject: PropTypes.func,
    isManaging: PropTypes.func,
    selectedFandomKey: PropTypes.string,
  };
  static defaultProps = {
    addSubject: () => {},
    isManaging: () => false,
    selectedFandomKey: '',
  };

  nameRef = React.createRef();

  createSubject = (ev) => {
    ev.preventDefault();
    const subject = {
      name: this.nameRef.current.value,
      fandomKey: this.props.selectedFandomKey,
    };
    this.props.addSubject(this.props.selectedFandomKey, subject);
    ev.currentTarget.reset();
  }

  render() {
    if (!this.props.isManaging()) {
      return null;
    }

    return (
      <form className="AddSubjectForm form-add control-row" onSubmit={this.createSubject}>
        <input name="name" ref={this.nameRef} type="text" placeholder="New Subject Name"
          required className="control-stretch"
        />
        <button type="submit">+</button>
      </form>
    );
  }
}

export default AddSubjectForm;
