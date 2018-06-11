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
  };
  static defaultProps = {
    fandom: { name: '' },
    selectFandom: () => {},
    updateFandom: () => {},
    deleteFandom: () => {},
    isManaging: () => false,
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
    let itemContent = (
      <div className="control-row">
        <span className="control-stretch">{this.props.fandom.name}</span>
        <button onClick={() => this.props.selectFandom(isSelected ? '' : this.props.index)}>
          {isSelected ? '<<' : '>>'}
        </button>
      </div>
    );

    if (this.props.isManaging()) {
      itemContent = (
        <div className="control-row">
          <input name="name" type="text" placeholder="Fandom Name" className="control-stretch"
            value={this.props.fandom.name} onChange={this.handleChange}
          />
          <button onClick={() => this.props.deleteFandom(this.props.index)}>-</button>
          <button onClick={() => this.props.selectFandom(isSelected ? '' : this.props.index)}>
            {isSelected ? '<<' : '>>'}
          </button>
        </div>
      );
    }

    return (
      <li key={this.props.index} className="FandomListItem list-item">
        {itemContent}
      </li>
    );
  }
}

export default FandomList;
