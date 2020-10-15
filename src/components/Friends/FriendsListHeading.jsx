import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Typography, Container } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withRouter } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  headingContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '6.5em',
  },
  heading: {
    paddingRight: '20px'
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  addButton: {
    float: "right",
    color: 'white',
    fontSize: '2.5em',
    position: 'relative',
    top: '2px',
  },
  margin: {
    margin: theme.spacing(1),
  },

  search: {
    marginTop: '.5em',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: 300,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 300,
    },
  },
  breakDiv: {
    height: '1em',
    width: '100%',
    backgroundColor: '#303030',
  },
  mainContainer: {
    position: 'fixed',
    zIndex: '20',
    width: '100%',
    top: 0,
    backgroundColor: '#424242',
  },
}));


function FriendsListHeading(props) {
  const classes = useStyles();


  const handleSearch = (event) => {
    let nameSearch = event.target.value;
    console.log(nameSearch);
    if (nameSearch !== '') {
      props.dispatch({ type: "GET_FRIENDS_SEARCH", payload: { search: nameSearch, type: 'friend' } })
    }
    if (nameSearch === '') {
      props.dispatch({ type: "GET_FRIENDS" })
    }
  }

  return (
    <div className={classes.mainContainer}>
      <div className={classes.headingContainer}>
        <Typography variant="h4" color="textPrimary" className={classes.heading}>My Friends</Typography>
        <AddIcon className={classes.addButton} onClick={() => props.history.push("/friends/add")} />
      </div>
      <div className={classes.breakDiv}></div>
      <div className={classes.root}>
        <div className={classes.search}>
          <Autocomplete
            freeSolo
            //Change mapping for friends
            options={props.store.friendsList.map((option) => option.first_name + " " + option.last_name)}
            renderInput={(params) => (
              <TextField
                id="searchfriend"
                {...params}
                onChange={handleSearch}
                label="Search Friends"
                margin="normal"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default connect(mapStoreToProps)(withRouter(FriendsListHeading));
