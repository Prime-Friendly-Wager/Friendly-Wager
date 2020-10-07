import React from "react";
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    createBetBtn: {
      width: '50%',
      marginLeft: '25%',
      marginRight: '25%',
      marginTop: '2em',
    },
  });

function CreateBetForm(props) {

    const classes = useStyles();
    const gameDetails = props.store.gameDetails

  return (
    <FormControl component="fieldset">
      <RadioGroup row aria-label="position" name="position" defaultValue="top">
        <FormControlLabel
          value={gameDetails.away_team}
          control={<Radio color="primary" />}
          label={gameDetails.away_team + ' ' + gameDetails.away_team_spread}
          labelPlacement="top"
        />
        <FormControlLabel
          value={gameDetails.home_team}
          control={<Radio color="primary" />}
          label={gameDetails.home_team + ' ' + gameDetails.home_team_spread}
          labelPlacement="top"
        />
      </RadioGroup>
      <Button variant="contained" color="primary" className={classes.createBetBtn}>
          Create Bet
      </Button>
    </FormControl>
  );
}

export default connect(mapStoreToProps)(CreateBetForm);