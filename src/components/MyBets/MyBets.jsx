import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import BetsTabPanel from './BetsTabPanel'
import {Typography} from '@material-ui/core'


class MyBets extends Component {

  componentDidMount(){
    this.props.dispatch({type: 'GET_MY_OVERALL_PLUS_MINUS'});
    this.props.dispatch({type: 'GET_MY_OPEN_BETS'});
    this.props.dispatch({type: 'GET_MY_ACTIVE_BETS'})
    this.props.dispatch({type: 'GET_MY_COMPLETED_BETS'});
  }


  render() {
    return (
      <div>
        <Typography color="textPrimary" variant="h4">My Bets</Typography>
        <Typography color="textPrimary" variant="h6">Overall (+/-) {this.props.store.betReducer.overallPlusMinusReducer.sum}</Typography>
        <BetsTabPanel />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(MyBets);
