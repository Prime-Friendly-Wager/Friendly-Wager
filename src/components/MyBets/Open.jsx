import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper} from '@material-ui/core'

function Open(props) {
 
  useEffect( () => {
    props.dispatch({type: 'GET_MY_OPEN_BETS'})
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableCell align="right">Date</TableCell>
          <TableCell align="right">Game</TableCell>
          <TableCell align="right">Bet</TableCell>
          <TableCell align="right">My Bet</TableCell>
          <TableCell align="right">Wager</TableCell>
        </TableHead>
        <TableBody>
          {props.store.betReducer.openBetReducer.map(bet => (
            <TableRow key={bet.id}>
              <TableCell align="right">{bet.date}</TableCell> 
              <TableCell align="right">{bet.away_team_name} @ {bet.home_team_name}</TableCell>
              <TableCell align="right">Spread</TableCell>
              <TableCell align="right">{bet.my_bet_team} {bet.proposers_spread}</TableCell>
              <TableCell align="right">{bet.wager}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default connect(mapStoreToProps)(Open);
