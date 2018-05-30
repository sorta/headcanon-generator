import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FandomList extends Component {
  static propTypes = {
    fandoms: PropTypes.object,
    selectFandom: PropTypes.func,
    deleteFandom: PropTypes.func,
    selectedFandomKey: PropTypes.string,
    index: PropTypes.string,
  };
  static defaultProps = {
    fandoms: {},
    selectFandom: () => {},
    deleteFandom: () => {},
    selectedFandomKey: '',
    index: '',
  };

  render() {
    const isSelected = this.props.index === this.props.selectedFandomKey;
    return (
      <li key={this.props.index}>
        <span>{this.props.fandoms[this.props.index].name}</span>
        <button onClick={() => this.props.deleteFandom(this.props.index)}>-</button>
        <button onClick={() => this.props.selectFandom(isSelected ? '' : this.props.index)}>
          {isSelected ? '<<' : '>>'}
        </button>
      </li>
    );
  }
}

export default FandomList;
