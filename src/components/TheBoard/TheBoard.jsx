import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import axios from 'axios';
import { withStyles } from '@material-ui/core';
import TabPanel from './TabPanel';
import LogOutButton from '../BottomNavBar/LogOutButton';

const styles = theme => ({
  container: {
    padding: '1em',
  },
  weekSpan: {
    marginLeft: '1em',
    fontSize: '.50em',
  },
});

class TheBoard extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_GAMES' });
  }

  render() {

    const { classes } = this.props;

    return (
      <div>
        <div className={classes.container}>
          <h1>The Board<span className={classes.weekSpan}>Week 3</span></h1>
        </div>
        <TabPanel />
        <button onClick={() => axios.get('/api/games/fromNflApi')}>API CALL - USE WITH CAUTION</button>
        <LogOutButton className="log-in" />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
const TheBoardStyled = withStyles(styles)(TheBoard);
export default connect(mapStoreToProps)(TheBoardStyled);
