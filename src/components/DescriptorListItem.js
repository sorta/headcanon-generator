import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Descriptor extends Component {
  static propTypes = {
    descriptor: PropTypes.shape({
      name: PropTypes.string,
    }),
    descriptorAvailability: PropTypes.object,
    updateDescriptor: PropTypes.func,
    deleteDescriptor: PropTypes.func,
    setAvailability: PropTypes.func,
    isManaging: PropTypes.func,
    index: PropTypes.string,
  };
  static defaultProps = {
    descriptor: { name: '' },
    descriptorAvailability: {},
    updateDescriptor: () => {},
    deleteDescriptor: () => {},
    setAvailability: () => {},
    isManaging: () => false,
    index: '',
  };

  handleChange = (event) => {
    const target = event.currentTarget;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const updatedDescriptor = {
      ...this.props.descriptor,
      [target.name]: value,
    };

    this.props.updateDescriptor(this.props.index, updatedDescriptor);
  };

  // setAvailability = (typeKey, itemKey, value)
  toggleAvailability = (event) => {
    // console.log(event);
    this.props.setAvailability('descriptor', this.props.index, event.currentTarget.checked);
  };

  render() {
    if (!this.props.isManaging()) {
      return (
        <li key={this.props.index} className="DescriptorListItem list-item control-row">
          <span className="DescriptorList-item-text">
            {this.props.descriptor.name}
          </span>
        </li>
      );
    }

    return (
      <li key={this.props.index} className="DescriptorListItem list-item control-row">
        <input
          name="isAvailable"
          type="checkbox"
          checked={!({}.hasOwnProperty.call(this.props.descriptorAvailability, this.props.index))}
          onChange={this.toggleAvailability}
        />
        <input
          name="name"
          type="text"
          placeholder="Descriptor Name"
          className="control-stretch"
          value={this.props.descriptor.name}
          onChange={this.handleChange}
        />
        <button
          className="DescriptorListItem-delete"
          onClick={() => this.props.deleteDescriptor(this.props.index)}
        >-</button>
      </li>
    );
  }
}

export default Descriptor;
