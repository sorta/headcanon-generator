import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DescriptorListItem from './DescriptorListItem'

class DescriptorList extends Component {
  static propTypes = {
    descriptors: PropTypes.object,
    descriptorAvailability: PropTypes.object,
    updateDescriptor: PropTypes.func,
    deleteDescriptor: PropTypes.func,
    setAvailability: PropTypes.func,
    isManaging: PropTypes.func,
  };
  static defaultProps = {
    descriptors: {},
    descriptorAvailability: {},
    updateDescriptor: () => {},
    deleteDescriptor: () => {},
    setAvailability: () => {},
    isManaging: () => false,
  };

  render() {
    return (
      <ul className="options-list DescriptorList">
        {Object.keys(this.props.descriptors).map(key => (
          <DescriptorListItem
            key={key}
            index={key}
            descriptor={this.props.descriptors[key]}
            updateDescriptor={this.props.updateDescriptor}
            deleteDescriptor={this.props.deleteDescriptor}
            setAvailability={this.props.setAvailability}
            descriptorAvailability={this.props.descriptorAvailability}
            isManaging={this.props.isManaging}
          />
        ))}
      </ul>
    );
  }
}

export default DescriptorList;
