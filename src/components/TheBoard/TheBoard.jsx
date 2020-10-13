import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles, Typography } from '@material-ui/core';
import TabPanel from './TabPanel';
import convertDate from './check-week';

const styles = theme => ({
  heading: {
    padding: '1em',
    textAlign: 'center',
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: '10',
    backgroundColor: '#424242',
    height: '3em',
  },
  weekSpan: {
    marginLeft: '1em',
    fontSize: '.50em',
  },
  tabPanel: {
    marginTop: '5em',
  },
});

class TheBoard extends Component {

  componentDidMount() {
    const currentWeek = convertDate();
    this.props.dispatch({ type: 'FETCH_GAMES', payload: currentWeek });
  }

  render() {

    const { classes } = this.props;
    const currentWeek = this.props.store.games[0];

    return (
      <div>
        <div className={classes.heading}>
          <Typography variant="h4" color="textPrimary">The Board<span className={classes.weekSpan}>
            Week {currentWeek && currentWeek.week}
            </span>
          </Typography>
        </div>
        <div className={classes.tabPanel}>
        <TabPanel/>
        </div>
      </div>
    );
  }
}

const TheBoardStyled = withStyles(styles)(TheBoard);
export default connect(mapStoreToProps)(TheBoardStyled);
