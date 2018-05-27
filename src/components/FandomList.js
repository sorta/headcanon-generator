import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FandomListItem from './FandomListItem'

class FandomList extends Component {
  static propTypes = {
    fandoms: PropTypes.object,
    selectFandom: PropTypes.func,
    selectedFandomKey: PropTypes.string,
  };
  static defaultProps = {
    fandoms: {},
    selectFandom: () => {},
    selectedFandomKey: '',
  };

  render() {
    return (
      <ul className="FandomList">
        {Object.keys(this.props.fandoms).map(key => (
          <FandomListItem
            key={key}
            index={key}
            fandoms={this.props.fandoms}
            selectFandom={this.props.selectFandom}
            selectedFandomKey={this.props.selectedFandomKey}
          />
        ))}
      </ul>
    );
  }
}

export default FandomList;
