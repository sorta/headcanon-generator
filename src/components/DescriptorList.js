import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DescriptorList extends Component {
  static propTypes = {
    descriptors: PropTypes.object,
  };
  static defaultProps = {
    descriptors: {},
  };

  render() {
    return (
      <ul className="DescriptorList">
        {Object.keys(this.props.descriptors).map(key => (
          <li key={key}>
            {this.props.descriptors[key].name}
          </li>
        ))}
      </ul>
    );
  }
}

export default DescriptorList;
