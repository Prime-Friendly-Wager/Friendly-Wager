import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper} from '@material-ui/core';
import moment from 'moment';


function History(props) {
  
  // useEffect( () => {
  //   props.dispatch({type: 'GET_MY_COMPLETED_BETS'})
  // }, [])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableCell align="left">Date</TableCell>
          <TableCell align="left">Game</TableCell>
          <TableCell align="left">Against</TableCell>
          <TableCell align="left">My Bet</TableCell>
          <TableCell align="left">W/L</TableCell>
          <TableCell align="left">Wager</TableCell>
        </TableHead>
        <TableBody>
          {props.store.betReducer.completedBetReducer.map(bet => (
            <TableRow key={bet.id}>
              <TableCell align="left">{moment(bet.date).format("M/D")}</TableCell>
              <TableCell align="left">{bet.home_team_name} @ {bet.away_team_name}</TableCell>
              <TableCell align="left">{bet.opponent}</TableCell>
              <TableCell align="left">{bet.my_bet_team} {bet.proposers_spread}</TableCell>
              <TableCell align="left">{bet.winner}</TableCell>
              <TableCell align="left">{bet.wager}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default connect(mapStoreToProps)(History);
