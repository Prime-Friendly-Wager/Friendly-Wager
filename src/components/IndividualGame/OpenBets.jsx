import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import React from 'react';
import { withRouter } from 'react-router-dom';
import OpenBetRow from './OpenBetRow';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    width: '100%',
  },
  conditionalText: {
    marginTop: '3em',
  },
  tableContainer: {
    marginTop: '3em',
  },
});

function OpenBets(props) {

  const classes = useStyles();

  return (
    <>
      {props.store.betReducer.openBetReducer.filter(bet => 
             (bet.proposers_id !== props.store.user.id && bet.game_id === props.store.gameDetails.id)).length
        ?
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Friend</TableCell>
                <TableCell align="right">Bet</TableCell>
                <TableCell align="right">Wager</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
             {/* only displays bets you didn't propose and belong to this game  */}
             {props.store.betReducer.openBetReducer.filter(bet => 
             (bet.proposers_id !== props.store.user.id && bet.game_id === props.store.gameDetails.id)).map(bet => (
                <OpenBetRow key={bet.id} bet={bet} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        :
        <Typography color="textPrimary" className={classes.conditionalText}>There aren't any open bets for this game.</Typography>
      }
    </>
  );
}

export default connect(mapStoreToProps)(withRouter(OpenBets));