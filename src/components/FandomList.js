import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FandomListItem from './FandomListItem'

class FandomList extends Component {
  static propTypes = {
    fandoms: PropTypes.object,
    selectFandom: PropTypes.func,
    updateFandom: PropTypes.func,
    deleteFandom: PropTypes.func,
    selectedFandomKey: PropTypes.string,
  };
  static defaultProps = {
    fandoms: {},
    selectFandom: () => {},
    updateFandom: () => {},
    deleteFandom: () => {},
    selectedFandomKey: '',
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
            selectedFandomKey={this.props.selectedFandomKey}
          />
        })}
      </ul>
    );
  }
}

export default FandomList;
