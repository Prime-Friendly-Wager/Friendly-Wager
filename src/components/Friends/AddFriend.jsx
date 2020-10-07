import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withStyles, TextField} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  mainDiv: {
    margin: 10
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

  render()
  {
    const {classes} = this.props;
    let nonFriendMembers = [];
    for(let i = 0; i < this.props.store.memberReducer.length; i++){
      for(let j = 0; j < this.props.store.friendsList.length; i++){
        if(this.props.store.memberReducer[i] !== this.props.store.friendsList[i]){
          nonFriendMembers.push(this.props.store.memberReducer[i])
        }
      }
    }
    console.log(nonFriendMembers)
    return (
      <div className={classes.mainDiv}>
        <h2>Add Friends</h2>
        <SearchIcon fontSize="large"/><TextField id="friendSearch" label="Search" variant="outlined"/>
        {this.props.store.memberReducer &&
          nonFriendMembers.map(member => (
            <h3>{member.first_name}</h3>
          ))}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(AddFriend));
