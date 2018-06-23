import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { allowEdit } from '../utils'

class AddFandomForm extends Component {
  static propTypes = {
    addFandom: PropTypes.func,
    isManaging: PropTypes.func,
  };

  static defaultProps = {
    addFandom: () => {},
    isManaging: () => false,
  };

  nameRef = React.createRef();

  createFandom = (ev) => {
    ev.preventDefault();
    const fandom = {
      name: this.nameRef.current.value
    };
    this.props.addFandom(fandom);
    ev.currentTarget.reset();
  }

  render() {
    if (!this.props.isManaging() || !allowEdit) {
      return null;
    }

    return (
      <form className="AddFandomForm form-add control-row" onSubmit={this.createFandom}>
        <input name="name" ref={this.nameRef} type="text" placeholder="New Fandom Name"
          required className="control-stretch"
        />
        <button type="submit">+</button>
      </form>
    );
  }
}

export default AddFandomForm;
