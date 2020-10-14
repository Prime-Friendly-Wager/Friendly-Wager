import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    width: '100%',
  },
});

function SimpleTable(props) {

  const classes = useStyles();
  
  return (
    <>
      {props.store.games[0]
        ?
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Game</TableCell>
                <TableCell align="right">Time</TableCell>
                <TableCell align="right">Spread</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.store.games.map((game, i) => {
                return (
                  <TableRow key={game.id} onClick={() => props.history.push(`/game-details/${game.id}`)}>
                    <TableCell align="right">{game.away_team} @ {game.home_team}</TableCell>
                    <TableCell align="right">{moment(game.date).format("ddd MMM D, h:mm a")}</TableCell>
                    <TableCell align="right">{game.home_team} {game.home_team_spread}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        :
        <Typography color="textPrimary">There aren't any games to display.</Typography>
      }
    </>
  );
}


export default connect(mapStoreToProps)(withRouter(SimpleTable));