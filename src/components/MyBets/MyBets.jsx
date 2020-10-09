import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import BetsTabPanel from './BetsTabPanel'


class MyBets extends Component {

  componentDidMount(){

  }


  render() {
    return (
      <div>
        <h2>My Bets</h2>
        <BetsTabPanel />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(MyBets);
