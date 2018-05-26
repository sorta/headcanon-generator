import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FandomList extends Component {
  static propTypes = {
    fandoms: PropTypes.object,
    selectFandom: PropTypes.func,
  };
  static defaultProps = {
    fandoms: {},
    selectFandom: () => {},
  };

  render() {
    return (
      <ul className="FandomList">
        {Object.keys(this.props.fandoms).map(key => (
          <li key={key}>
            <span>{this.props.fandoms[key].name}</span>
            <button onClick={() => this.props.selectFandom(key)}>E</button>
          </li>
        ))}
      </ul>
    );
  }
}

export default FandomList;
