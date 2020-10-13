import React from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Button } from '@material-ui/core'
import moment from 'moment';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function Open(props) {

    //deleting bet
    const handleDelete = (id) => {
      console.log('deleting bet:', id);
      props.dispatch({ type: 'DELETE_BET', payload: id });
    }

  return (
    <>
      {props.store.betReducer.openBetReducer[0]
        ?
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Date</TableCell>
                <TableCell align="center">Game</TableCell>
                <TableCell align="left">My Bet</TableCell>
                <TableCell align="left">Wager</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
               {/* only displays your proposed bets */}
               {props.store.betReducer.openBetReducer.filter(bet => bet.proposers_id === props.store.user.id).map(bet => (
                <TableRow key={bet.id}>
                  <TableCell align="left">{moment(bet.date_played).format("M/D")}</TableCell> 
                  <TableCell align="left">{bet.away_team_abbr} @ {bet.home_team_abbr}</TableCell>
                  {/* checks if proposer is home team */}
                  {bet.proposers_team_is_home_team ? 
                    <TableCell align="left">{bet.home_team_name} {bet.home_team_spread}</TableCell> 
                    :
                    <TableCell align="left">{bet.away_team_name} {bet.away_team_spread}</TableCell>
                  }
                  <TableCell align="left">{bet.wager}</TableCell>
                  <TableCell align="left">
                      <DeleteForeverIcon color="secondary" onClick={() => handleDelete(bet.id)}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        :
        <Typography color="textPrimary">You haven't opened any bets yet.</Typography>
      }
    </>
  );
}

export default connect(mapStoreToProps)(Open);
