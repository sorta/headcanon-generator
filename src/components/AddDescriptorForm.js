import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    };
    this.props.addDescriptor(descriptor);
    ev.currentTarget.reset();
  }

  render() {
    if (!this.props.isManaging()) {
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
