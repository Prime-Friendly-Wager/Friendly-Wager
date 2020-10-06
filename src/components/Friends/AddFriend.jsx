import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class AddFriend extends Component {

  componentDidMount(){
    this.props.dispatch({type: "GET_USERS", payload: 'All'});
  }
  state = {
    search: '',
  };

  render() {
    return (
      <div>
        <h2>Add Friends</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AddFriend);
