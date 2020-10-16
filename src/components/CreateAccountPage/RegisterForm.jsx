import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Grid from '@material-ui/core/Grid';
import { withStyles, Typography } from '@material-ui/core';

class RegisterForm extends Component {
  state = {
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  

  registerUser = (event) => {
    event.preventDefault();
    if(this.state.password == this.state.confirmPassword){
    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        username: this.state.username,
        password: this.state.password,
      },
    
      
    })}
    else {
      this.props.dispatch({ type: 'CONFIRM_PASSWORD_ERROR' });
  }}; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
    
      <form onSubmit={this.registerUser}>
        <Typography style={{color: 'white'}} variant="h4">Register Account</Typography>
        {this.props.store.errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.registrationMessage}
          </h3>
        )}
         <Grid container spacing={1}>
         <Grid item xs={12}>
          <label htmlFor="first_name">
            <input
              placeholder="First Name"
              type="text"
              name="first_name"
              value={this.state.first_name}
              required
              onChange={this.handleInputChangeFor('first_name')}
            />
          </label>
        </Grid>
        <Grid item xs={12}>
    
          <label htmlFor="last_name">
            <input
              placeholder="Last name"
              type="text"
              name="last_name"
              value={this.state.last_name}
              required
              onChange={this.handleInputChangeFor('last_name')}
            />
          </label>
         
        </Grid>
        <Grid item xs={12}>
          <label htmlFor="username">
            <input
              placeholder="Email"
              type="text"
              name="username"
              value={this.state.username}
              required
              onChange={this.handleInputChangeFor('username')}
            />
          </label>
          </Grid>
       
          <Grid item xs={6}>
          <label htmlFor="password">
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={this.state.password}
              required
              onChange={this.handleInputChangeFor('password')}
            />
          </label>
          </Grid>
          <Grid item xs={6}>
          <label htmlFor="password">
            <input
              placeholder="Confirm Password"
              type="password"
              name="password"
              value={this.state.confirmPassword}
              required
              onChange={this.handleInputChangeFor('confirmPassword')}
            />
          </label>
          </Grid>
    
        </Grid>
        <div>
          <input className="btn" type="submit" name="submit" value="Register" />
        </div>
      </form>
     
      
 
    );
  }
}

export default connect(mapStoreToProps)(RegisterForm);
