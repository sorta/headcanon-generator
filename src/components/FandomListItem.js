import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { allowEdit } from '../utils'

class FandomListItem extends Component {
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
    const checkboxID = `isAvailable_fand_${this.props.index}`;
    const editMode = allowEdit && this.props.isManaging();
    const innerElements = [
      <input
        id={checkboxID}
        key={`${checkboxID}_input`}
        name="isAvailable"
        type="checkbox"
        className="cb-fake"
        checked={!({}.hasOwnProperty.call(this.props.fandomAvailability, this.props.index))}
        onChange={this.toggleAvailability}
      />
    ];

    if (editMode) {
      innerElements.push(
        <label htmlFor={checkboxID} key={`${checkboxID}_label`}></label>,
        <input
          key={`nameInput_fand_${this.props.index}`}
          name="name"
          type="text"
          placeholder="Fandom Name"
          className="control-stretch"
          value={this.props.fandom.name}
          onChange={this.handleChange}
        />,
        <button
          key={`deleteBtn_fand_${this.props.index}`}
          className="FandomListItem-delete"
          onClick={() => this.props.deleteFandom(this.props.index)}
        >-</button>
      );
    } else {
      innerElements.push(
        <label htmlFor={checkboxID} className="FandomListItem-text control-stretch" key={`${checkboxID}_label`}>
          {this.props.fandom.name}
        </label>
      );
    }

    innerElements.push(
      <button
        key={`selectBtn_fand_${this.props.index}`}
        className="FandomListItem-select"
        onClick={() => this.props.selectFandom(isSelected ? '' : this.props.index)}
      >
        {isSelected ? '<<' : '>>'}
      </button>
    );

    return (
      <li key={this.props.index} className="FandomListItem list-item control-row">
        {innerElements}
      </li>
    );
  }
}

export default FandomListItem;
