import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddSubjectForm extends Component {
  static propTypes = {
    addFandomSubject: PropTypes.func,
    selectedFandomKey: PropTypes.string,
  };
  static defaultProps = {
    addFandomSubject: () => {},
    selectedFandomKey: '',
  };

  nameRef = React.createRef();

  createSubject = (ev) => {
    ev.preventDefault();
    const subject = {
      name: this.nameRef.current.value,
    };
    this.props.addFandomSubject(this.props.selectedFandomKey, subject);
    ev.currentTarget.reset();
  }

  render() {
    return (
      <form className="AddSubjectForm" onSubmit={this.createSubject}>
        <input name="name" ref={this.nameRef} type="text" placeholder="Name" required />
        <button type="submit">+ Add Subject</button>
      </form>
    );
  }
}

export default AddSubjectForm;
