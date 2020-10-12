import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import React, { useEffect } from 'react';
import OpenBetRow from './OpenBetRow';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@material-ui/core';

//2.1 
const useStyles = makeStyles({
  table: {
    width: '100%',
  },
});

function OpenBets(props) {

  const classes = useStyles();

  useEffect(() => {
    props.dispatch({ type: 'FETCH_ALL_OPEN_BETS' })
  }, []);

  return (
    <>
      {props.store.betReducer.openBetReducer[0]
        ?
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Friend</TableCell>
                <TableCell align="right">Game</TableCell>
                <TableCell align="right">Bet</TableCell>
                <TableCell align="right">Wager</TableCell>


              </TableRow>
            </TableHead>
            <TableBody>
              {props.store.betReducer.openBetReducer.map((bet, i) => {
                return (
                  <OpenBetRow key={bet.id} bet={bet} />
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        :
        <Typography>Your friends haven't opened any bets yet.</Typography>
      }
    </>
  );
}

export default connect(mapStoreToProps)(OpenBets);

