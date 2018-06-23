import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { allowEdit } from '../utils'

class AddDescriptorForm extends Component {
  static propTypes = {
    addDescriptor: PropTypes.func,
    isManaging: PropTypes.func,
  };

  static defaultProps = {
    addDescriptor: () => {},
    isManaging: () => false,
  };

  nameRef = React.createRef();

  createDescriptor = (ev) => {
    ev.preventDefault();
    const descriptor = {
      name: this.nameRef.current.value,
      isAvailable: true,
    };
    this.props.addDescriptor(descriptor);
    ev.currentTarget.reset();
  }

  render() {
    if (!this.props.isManaging() || !allowEdit) {
      return null;
    }

    return (
      <form className="AddDescriptorForm form-add control-row" onSubmit={this.createDescriptor}>
        <input name="name" ref={this.nameRef} type="text" placeholder="New Descriptor Name"
          required className="control-stretch"
        />
        <button type="submit">+</button>
      </form>
    );
  }
}

export default AddDescriptorForm;
