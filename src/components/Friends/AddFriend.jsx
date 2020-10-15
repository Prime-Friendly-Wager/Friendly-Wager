import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles, TextField, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Button, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import { deepOrange } from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const styles = theme => ({
  rootContainer: {
    padding: 10,
  },
  mainDiv: {
    marginBottom: '3.5em',
  },
  avatar: {
    color: 'white',
    backgroundColor: '#606060',
  },
  textField: {
    align: "center"
  },
  conditionalText: {
    marginTop: '1.5em',
    paddingLeft: '24px',
    paddingRight: '24px',
  },
  backButton: {
    fontSize: '3em',
    position: 'relative',
    paddingLeft: '.25em',
  },
  heading: {
    textAlign: 'center',
    display: 'flex',
    height: '5em',
    paddingTop: '.75em',
    paddingBottom: '.75em',
    position: 'fixed',
    width: '100%',
    top: 0,
    backgroundColor: '#424242',
    zIndex: '20',
  },
  searchAbility: {
    marginTop: '7em',
  },
  addFriendText: {
    marginLeft: '1em',
    color: 'white',
    marginTop: '.5em',
  },
});

class AddFriend extends Component {
  state = {
    open: false
  }


  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      open: false
    })
  };

  componentDidMount() {
    this.props.dispatch({ type: "GET_MEMBERS", payload: { search: 'All' } });
  }

  // function to handle searching for a member by name
  handleSearch = () => {
    let nameSearch = document.getElementById('friendSearch').value;
    console.log(nameSearch);
    if (nameSearch !== '') {
      this.props.dispatch({ type: "GET_MEMBERS", payload: { search: nameSearch, type: 'members' } })
    }
    if (nameSearch === '') {
      this.props.dispatch({ type: "GET_MEMBERS", payload: { search: 'All', type: 'members' } })
    }
  }

  // function to add a friend
  addFriend = (id) => {
    this.setState({
      open: true
    })
    this.props.dispatch({ type: "ADD_FRIEND", payload: { friendId: id } })
  }

  render() {
    const { classes } = this.props;
    const item = this.props.store.memberReducer;
    return (
      <>
        <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="success">
            Added to Friends List!
      </Alert>
        </Snackbar>
        <div className={classes.mainDiv}>
          <div className={classes.heading}>
            <Button onClick={() => this.props.history.goBack()}>
              <ArrowBackIcon className={classes.backButton} />
            </Button>
            <Typography variant="h4" className={classes.addFriendText}>Add Friends</Typography>
          </div>
          <div className={classes.searchAbility}>
            <SearchIcon fontSize="large" /><TextField id="friendSearch" label="Search" variant="outlined" onChange={this.handleSearch} />
          </div>
          {this.props.store.memberReducer[0]
            ?
            <List>
              {this.props.store.memberReducer.map(member => (
                <ListItem key={member.id}>
                  <ListItemAvatar><Avatar className={classes.avatar}>{member.first_name[0].toUpperCase()}</Avatar></ListItemAvatar>
                  <ListItemText primary={<Typography color="textPrimary">{member.first_name} {member.last_name}</Typography>}
                    secondary={<Typography color="textSecondary">{member.username}</Typography>} />
                  <ListItemSecondaryAction><IconButton onClick={() => this.addFriend(member.id)}><AddIcon /></IconButton></ListItemSecondaryAction>
                </ListItem>

              ))}
            </List>

            :
            <Typography color="textPrimary" className={classes.conditionalText}>There aren't any users to add.</Typography>
          }
        </div>
      </>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(AddFriend));