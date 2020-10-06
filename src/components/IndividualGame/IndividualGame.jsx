import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name IndividualGame with the name for the new
// component.
class IndividualGame extends Component {
  state = {
    heading: 'Class Component',
  };

  componentDidMount() {
    this.props.dispatch({type: 'FETCH_GAME_DETAILS', payload: this.props.match.params.id })
  }

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
        {JSON.stringify(this.props.store.gameDetails)}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(IndividualGame);