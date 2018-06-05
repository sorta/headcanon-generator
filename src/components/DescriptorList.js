import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DescriptorList extends Component {
  static propTypes = {
    descriptors: PropTypes.object,
    deleteDescriptor: PropTypes.func,
  };
  static defaultProps = {
    descriptors: {},
    deleteDescriptor: () => {},
  };

  render() {
    return (
      <ul className="options-list DescriptorList">
        {Object.keys(this.props.descriptors).map(key => (
          <li key={key} className="DescriptorList-item">
            <span className="DescriptorList-item-text">{this.props.descriptors[key].name}</span>
            <button className="DescriptorList-item-delete" onClick={() => this.props.deleteDescriptor(key)}>-</button>
          </li>
        ))}
      </ul>
    );
  }
}

export default DescriptorList;
