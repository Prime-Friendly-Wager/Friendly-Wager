import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles } from '@material-ui/core';
import TabPanel from './TabPanel';

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
  // this component doesn't do much to start, just renders some user info to the DOM
  render() {

    const { classes } = this.props;

    return (
      <div>
        <div className={classes.container}>
          <h1>The Board<span className={classes.weekSpan}>week 1</span></h1>
        </div>
        <TabPanel />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
const TheBoardStyled = withStyles(styles)(TheBoard);
export default connect(mapStoreToProps)(TheBoardStyled);
