import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import BetsTabPanel from './BetsTabPanel'


class MyBets extends Component {
  state = {
    heading: 'Class Component',
  };

  render() {
    return (
      <div>
        <BetsTabPanel />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(MyBets);
