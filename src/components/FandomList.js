import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FandomListItem from './FandomListItem'

class FandomList extends Component {
  static propTypes = {
    fandoms: PropTypes.object,
    selectFandom: PropTypes.func,
    updateFandom: PropTypes.func,
    deleteFandom: PropTypes.func,
    isManaging: PropTypes.func,
    selectedFandomKey: PropTypes.string,
    setAvailability: PropTypes.func,
    fandomAvailability: PropTypes.object,
  };
  static defaultProps = {
    fandoms: {},
    selectFandom: () => {},
    updateFandom: () => {},
    deleteFandom: () => {},
    isManaging: () => false,
    selectedFandomKey: '',
    setAvailability: () => {},
    fandomAvailability: {},
  };

  render() {
    if (Object.keys(this.props.fandoms).length === 0) {
      return null;
    }

    return (
      <ul className="options-list FandomList">
        {Object.keys(this.props.fandoms).map(key => {
          if (!{}.hasOwnProperty.call(this.props.fandoms, key)) {
            return null;
          }

          return <FandomListItem
            key={key}
            index={key}
            fandom={this.props.fandoms[key]}
            selectFandom={this.props.selectFandom}
            updateFandom={this.props.updateFandom}
            deleteFandom={this.props.deleteFandom}
            isManaging={this.props.isManaging}
            selectedFandomKey={this.props.selectedFandomKey}
            setAvailability={this.props.setAvailability}
            fandomAvailability={this.props.fandomAvailability}
          />
        })}
      </ul>
    );
  }
}

export default FandomList;
