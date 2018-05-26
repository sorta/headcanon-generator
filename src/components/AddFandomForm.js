import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddFandomForm extends Component {
  static propTypes = {
    addFandom: PropTypes.func,
  };

  nameRef = React.createRef();

  createFandom = (ev) => {
    ev.preventDefault();
    const fandom = {
      name: this.nameRef.current.value,
    };
    this.props.addFandom(fandom);
    ev.currentTarget.reset();
  }

  render() {
    return (
      <form className="AddFandomForm" onSubmit={this.createFandom}>
        <input name="name" ref={this.nameRef} type="text" placeholder="Name" />
        <button type="submit">+ Add Fandom</button>
      </form>
    );
  }
}

export default AddFandomForm;
