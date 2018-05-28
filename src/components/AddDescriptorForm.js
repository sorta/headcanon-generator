import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddDescriptorForm extends Component {
  static propTypes = {
    addDescriptor: PropTypes.func,
  };

  static defaultProps = {
    addDescriptor: () => {},
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
    return (
      <form className="AddDescriptorForm" onSubmit={this.createDescriptor}>
        <input name="name" ref={this.nameRef} type="text" placeholder="Name" required />
        <button type="submit">+</button>
      </form>
    );
  }
}

export default AddDescriptorForm;
