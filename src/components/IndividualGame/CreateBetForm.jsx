import React from "react";
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

function CreateBetForm(props) {

    const gameDetails = props.store.gameDetails

  return (
    <FormControl component="fieldset">
      <RadioGroup row aria-label="position" name="position" defaultValue="top">
        <FormControlLabel
          value={gameDetails.away_team}
          control={<Radio color="primary" />}
          label={gameDetails.away_team}
          labelPlacement="top"
        />
        <FormControlLabel
          value={gameDetails.home_team}
          control={<Radio color="primary" />}
          label={gameDetails.home_team}
          labelPlacement="top"
        />
      </RadioGroup>
    </FormControl>
  );
}

export default connect(mapStoreToProps)(CreateBetForm);