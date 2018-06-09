import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FandomList extends Component {
  static propTypes = {
    fandom: PropTypes.shape({ name: PropTypes.string }),
    selectFandom: PropTypes.func,
    updateFandom: PropTypes.func,
    deleteFandom: PropTypes.func,
    selectedFandomKey: PropTypes.string,
    index: PropTypes.string,
  };
  static defaultProps = {
    fandom: { name: '' },
    selectFandom: () => {},
    updateFandom: () => {},
    deleteFandom: () => {},
    selectedFandomKey: '',
    index: '',
  };

  handleChange = (event) => {
    const updatedFandom = {
      ...this.props.fandom,
      [event.currentTarget.name]: event.currentTarget.value,
    };

    this.props.updateFandom(this.props.index, updatedFandom);
  };

  render() {
    const isSelected = this.props.index === this.props.selectedFandomKey;
    return (
      <li key={this.props.index} className="FandomListItem list-item control-row">
        {/* <span>{this.props.fandom.name}</span> */}
        <input name="name" type="text" placeholder="Fandom Name"
          value={this.props.fandom.name} onChange={this.handleChange}
        />
        <button onClick={() => this.props.deleteFandom(this.props.index)}>-</button>
        <button onClick={() => this.props.selectFandom(isSelected ? '' : this.props.index)}>
          {isSelected ? '<<' : '>>'}
        </button>
      </li>
    );
  }
}

export default FandomList;
