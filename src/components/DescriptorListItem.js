import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Descriptor extends Component {
  static propTypes = {
    descriptor: PropTypes.shape({ name: PropTypes.string }),
    updateDescriptor: PropTypes.func,
    deleteDescriptor: PropTypes.func,
    isManaging: PropTypes.func,
    index: PropTypes.string,
  };
  static defaultProps = {
    descriptor: { name: '' },
    updateDescriptor: () => {},
    deleteDescriptor: () => {},
    isManaging: () => false,
    index: '',
  };

  handleChange = (event) => {
    const updatedDescriptor = {
      ...this.props.descriptor,
      [event.currentTarget.name]: event.currentTarget.value,
    };

    this.props.updateDescriptor(this.props.index, updatedDescriptor);
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
        <input name="name" type="text" placeholder="Descriptor Name" className="control-stretch"
          value={this.props.descriptor.name} onChange={this.handleChange}
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
