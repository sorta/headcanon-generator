import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FandomList extends Component {
  static propTypes = {
    fandoms: PropTypes.object,
  };
  static defaultProps = {
    fandoms: {},
  };

  render() {
    return (
      <ul className="FandomList">
        {Object.keys(this.props.fandoms).map(key => (
          <li key={key}>
            {this.props.fandoms[key].name}
          </li>
        ))}
      </ul>
    );
  }
}

export default FandomList;
