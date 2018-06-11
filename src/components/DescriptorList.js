import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DescriptorListItem from './DescriptorListItem'

class DescriptorList extends Component {
  static propTypes = {
    descriptors: PropTypes.object,
    updateDescriptor: PropTypes.func,
    deleteDescriptor: PropTypes.func,
    isManaging: PropTypes.func,
  };
  static defaultProps = {
    descriptors: {},
    updateDescriptor: () => {},
    deleteDescriptor: () => {},
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
            isManaging={this.props.isManaging}
          />
        ))}
      </ul>
    );
  }
}

export default DescriptorList;
