import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name OpenBets with the name for the new component.
const useStyles = makeStyles({
  table: {
    width: '100%',
  },
});

function OpenBets(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const [heading, setHeading] = useState('Functional Component');
  const classes = useStyles();
  return (
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
        {/* {props.store.games.map((game, i) => {
          return (
            <TableRow key={game.id} onClick={() => props.history.push(`/game-details/${game.id}`)}>
              <TableCell align="right">{game.away_team} @ {game.home_team}</TableCell>
              <TableCell align="right">{moment(game.date).format("ddd MMM D, h:mm a")}</TableCell>
              <TableCell align="right">{game.home_team} {game.home_team_spread}</TableCell>
            </TableRow>
          )
        })} */}
      </TableBody>
    </Table>
  </TableContainer>
 
  );
}

export default connect(mapStoreToProps)(OpenBets);
