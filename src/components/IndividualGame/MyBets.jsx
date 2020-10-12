import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import CreateBetForm from './CreateBetForm';

import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  createBetForm: {
    textAlign: 'center',
    marginBottom: '3.5em',
  },
});

function MyBets(props) {

  useEffect(() => {
    //both these dispatches are for 3.2
    props.dispatch({ type: 'FETCH_GAME_MY_BETS_OPEN', payload: props.match.params.id })
    props.dispatch({ type: 'FETCH_GAME_MY_BETS_ACTIVE', payload: props.match.params.id })
  }, [])

  const classes = useStyles();

  return (
    <div>
      <div>
        <h3>Open Bets</h3>
        {props.store.betReducer.openBetReducer[0] ?
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                {props.store.betReducer.openBetReducer.map((openBet, i) => {
                  return (
                    <TableRow key={openBet.id}>
                      <TableCell align="left">
                        You have {openBet.team_name} {openBet.proposers_spread}, {openBet.wager} units
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          :
          <Typography>You don't have any open bets for this game.</Typography>
        }
        <h3>Active Bets</h3>
        {props.store.betReducer.activeBetReducer[0] ?
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                {props.store.betReducer.activeBetReducer.map((activeBet, i) => {
                  return (
                    <TableRow key={activeBet.id}>
                      <TableCell align="left">
                        You have {activeBet.proposers_team} {activeBet.proposers_spread}, {activeBet.acceptors_name} has {activeBet.acceptors_team} {activeBet.acceptors_spread}, {activeBet.wager} units
                        </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          :
          <Typography>You don't have any active bets for this game.</Typography>
        }
        <h3>Create Bet</h3>
      </div>
      <div className={classes.createBetForm}>
        <CreateBetForm />
      </div>
    </div>
  );
}


export default connect(mapStoreToProps)(withRouter(MyBets));