import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import CreateBetForm from './CreateBetForm';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, Button, TableHead } from '@material-ui/core';

const useStyles = makeStyles({
  createBetForm: {
    textAlign: 'center',
    marginBottom: '3.5em',
  },
  text: {
    marginTop: '1em',
    marginBottom: '1em',
  },
  creatBet: {
    marginBottom: '1em',
  },
  openBets: {
    marginTop: '2em',
  },
});

function MyBets(props) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //deleting bet
  const handleDelete = (id) => {
    console.log('deleting bet:', id);
    props.dispatch({ type: 'DELETE_BET', payload: id });
    handleClose();
  }

  const game = props.store.games.filter(game => game.id == props.match.params.id)[0];

  return (
    <div>
      <div>
        <Typography variant="h5" color="textPrimary" className={classes.openBets}>Open Bets</Typography>
        {props.store.betReducer.openBetReducer.filter(bet =>
          (bet.proposers_id === props.store.user.id && bet.game_id === game.id)).length
          ?
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">My Bet</TableCell>
                  <TableCell align="center">Wager</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* only shows your open bets for this particular game */}
                {props.store.betReducer.openBetReducer.filter(bet =>
                  (bet.proposers_id === props.store.user.id && bet.game_id === game.id)).map(bet =>
                    (<TableRow key={bet.id}>
                      <TableCell align="left">
                        {/* determines if proposer has home team stats */}
                        {bet.proposers_team_is_home_team ?
                          <Typography variant="body2">{bet.home_team_name} {(bet.home_team_spread > 0) && '+'}{bet.home_team_spread}</Typography>
                          :
                          <Typography variant="body2">{bet.away_team_name} {(bet.away_team_spread > 0) && '+'}{bet.away_team_spread}</Typography>
                        }
                      </TableCell>
                      <TableCell align="center">
                        {bet.wager}
                      </TableCell>
                      <TableCell align="center">
                        <DeleteForeverIcon color="secondary" onClick={handleClickOpen} />
                      </TableCell>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">{`Delete open bet?`}</DialogTitle>
                        <DialogActions>
                          <Button onClick={handleClose} color="primary">
                            Cancel
                          </Button>
                          <Button onClick={() => handleDelete(bet.id)} color="primary" autoFocus>
                            Yes
                        </Button>
                        </DialogActions>
                      </Dialog>
                    </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          :
          <Typography color="textPrimary" className={classes.text}>You don't have any open bets for this game.</Typography>
        }
        <Typography variant="h5" color="textPrimary">Active Bets</Typography>
        {props.store.betReducer.activeBetReducer.filter(bet =>
          (bet.game_id === game.id)).length ?
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">My Bet</TableCell>
                  <TableCell align="left">Against</TableCell>
                  <TableCell align="center">Wager</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* filters only active bets for this game */}
                {props.store.betReducer.activeBetReducer.filter(bet =>
                  (bet.game_id === game.id)).map(bet => (
                    <TableRow key={bet.id}>
                      {bet.proposers_id === props.store.user.id ?
                    bet.proposers_team_is_home_team ?
                      //user is proposer and team is home
                      <>
                        <TableCell align="left">{bet.home_team_name} {(bet.home_team_spread > 0) && '+'}{bet.home_team_spread}</TableCell>
                        <TableCell align="left">{bet.acceptors_first_name} {bet.acceptors_last_name}</TableCell>
                      </>
                      :
                      //user is proposer and team is away
                      <>
                        <TableCell align="left">{bet.away_team_name} {(bet.away_team_spread > 0) && '+'}{bet.away_team_spread}</TableCell>
                        <TableCell align="left">{bet.acceptors_first_name} {bet.acceptors_last_name}</TableCell>
                      </>
                    :
                    bet.proposers_team_is_home_team ?
                      //user is acceptor and team is away
                      <>
                        <TableCell align="left">{bet.away_team_name} {(bet.away_team_spread > 0) && '+'}{bet.away_team_spread}</TableCell>
                        <TableCell align="left">{bet.proposers_first_name} {bet.proposers_last_name}</TableCell>
                      </>
                      :
                      //user is acceptor and team is home
                      <>
                        <TableCell align="left">{bet.home_team_name} {(bet.home_team_spread > 0) && '+'}{bet.home_team_spread}</TableCell>
                        <TableCell align="left">{bet.proposers_first_name} {bet.proposers_last_name}</TableCell>
                      </>
                  }
                  <TableCell align="center">{bet.wager}</TableCell>
                    </TableRow>
                  )
                  )}
              </TableBody>
            </Table>
          </TableContainer>
          :
          <Typography color="textPrimary" className={classes.text}>You don't have any active bets for this game.</Typography>
        }
        <Typography variant="h5" color="textPrimary" className={classes.text}>Create Bet</Typography>
      </div>
      <div className={classes.createBetForm}>
        <CreateBetForm />
      </div>
    </div>
  );
}

export default connect(mapStoreToProps)(withRouter(MyBets));