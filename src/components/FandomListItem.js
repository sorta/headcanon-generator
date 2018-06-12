import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FandomList extends Component {
  static propTypes = {
    fandom: PropTypes.shape({ name: PropTypes.string }),
    selectFandom: PropTypes.func,
    updateFandom: PropTypes.func,
    deleteFandom: PropTypes.func,
    isManaging: PropTypes.func,
    selectedFandomKey: PropTypes.string,
    index: PropTypes.string,
    setAvailability: PropTypes.func,
    fandomAvailability: PropTypes.object,
  };
  static defaultProps = {
    fandom: { name: '' },
    selectFandom: () => {},
    updateFandom: () => {},
    deleteFandom: () => {},
    isManaging: () => false,
    selectedFandomKey: '',
    index: '',
    setAvailability: () => {},
    fandomAvailability: {},
  };

  handleChange = (event) => {
    const updatedFandom = {
      ...this.props.fandom,
      [event.currentTarget.name]: event.currentTarget.value,
    };

    this.props.updateFandom(this.props.index, updatedFandom);
  };

  toggleAvailability = (event) => {
    this.props.setAvailability('fandom', this.props.index, event.currentTarget.checked);
  };

  render() {
    const isSelected = this.props.index === this.props.selectedFandomKey;

    if (!this.props.isManaging()) {
      return (
        <li key={this.props.index} className="FandomListItem list-item control-row">
          <input
            id={`isAvailable_fand_${this.props.index}`}
            name="isAvailable"
            type="checkbox"
            className="cb-fake"
            checked={!({}.hasOwnProperty.call(this.props.fandomAvailability, this.props.index))}
            onChange={this.toggleAvailability}
          />
          <label
            htmlFor={`isAvailable_fand_${this.props.index}`}
            className="FandomListItem-text control-stretch"
          >
            {this.props.fandom.name}
          </label>
          <button onClick={() => this.props.selectFandom(isSelected ? '' : this.props.index)}>
            {isSelected ? '<<' : '>>'}
          </button>
        </li>
      );
    }

    return (
      <li key={this.props.index} className="FandomListItem list-item control-row">
        <input
          id={`isAvailable_fand_${this.props.index}`}
          name="isAvailable"
          type="checkbox"
          className="cb-fake"
          checked={!({}.hasOwnProperty.call(this.props.fandomAvailability, this.props.index))}
          onChange={this.toggleAvailability}
        />
        <label htmlFor={`isAvailable_fand_${this.props.index}`}></label>
        <input name="name" type="text" placeholder="Fandom Name" className="control-stretch"
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
