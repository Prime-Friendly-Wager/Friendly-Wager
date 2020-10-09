import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper} from '@material-ui/core'


function History(props) {
  
  useEffect( () => {
    props.dispatch({type: 'GET_MY_COMPLETED_BETS'})
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableCell align="right">Date</TableCell>
          <TableCell align="right">Game</TableCell>
          <TableCell align="right">Bet</TableCell>
          <TableCell align="right">My Bet</TableCell>
          <TableCell align="right">W/L</TableCell>
          <TableCell align="right">Wager</TableCell>
        </TableHead>
        <TableBody>
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default connect(mapStoreToProps)(History);
