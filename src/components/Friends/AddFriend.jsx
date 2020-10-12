import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withStyles, TextField, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Button,
Typography, Container} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import { deepOrange } from '@material-ui/core/colors'

const styles = theme => ({
  rootContainer: {
    padding: 10,
  },
  mainDiv: {
    marginBottom: '3.5em',
  },
  avatar: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  textField: {
    align: "center"
  }
 
})

class AddFriend extends Component {

  componentDidMount(){
    this.props.dispatch({type: "GET_MEMBERS", payload: {search: 'All'}});
  }

  // function to handle searching for a member by name
  handleSearch = () => {
    let nameSearch = document.getElementById('friendSearch').value;
    if(nameSearch !== ''){
      this.props.dispatch({type: "GET_MEMBERS", payload: {search: nameSearch}})
    }
    if(nameSearch === ''){
      this.props.dispatch({type: "GET_MEMBERS", payload: {search: 'All'}})
    }
  }

  // function to add a friend
  addFriend = (id) => {
    this.props.dispatch({type: "ADD_FRIEND", payload: {friendId: id}})
  }

  render()
  {
    const {classes} = this.props;
    return (
      <Container className={classes.rootContainer} maxWidth="sm">
        <div className={classes.mainDiv}>
          <Button onClick={()=>this.props.history.goBack()}>
            <ArrowBackIcon fontSize="large"/>
          </Button>
          <Typography align="center" color="textPrimary" variant="h4">Add Friend</Typography>
          <center>
            <TextField className={classes.textField} margin="normal" id="friendSearch" label={<SearchIcon></SearchIcon>} variant="outlined" onChange={this.handleSearch}/>
          </center>
          <List>
            {this.props.store.memberReducer.map(member => (
              <ListItem key={member.id}>
                <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      {member.first_name[0].toUpperCase()}{member.last_name[0].toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                <ListItemText 
                primary={<Typography color="textPrimary">{member.first_name} {member.last_name}</Typography>}
                secondary={<Typography color="textSecondary">{member.username}</Typography>}/>
                <ListItemSecondaryAction><IconButton onClick={()=>this.addFriend(member.id)}><AddIcon/></IconButton></ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(AddFriend));
