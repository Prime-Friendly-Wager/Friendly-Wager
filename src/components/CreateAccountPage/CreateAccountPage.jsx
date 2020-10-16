import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './CreateAccountPage.css'
import RegisterForm from './RegisterForm';
import { withStyles} from '@material-ui/core';

const styles = theme => ({

});

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  componentDidMount(){
    this.props.dispatch({type: 'TOGGLE_NAV'});
  }
  componentWillUnmount(){
    this.props.dispatch({type: 'TOGGLE_NAV'})
  }
  

  render() {

    const { classes } = this.props;

    return (
      <div class='container'>
        <br/>
        <br/>
        <br/>
        <center>
        <RegisterForm />
        </center>
        <center>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              this.props.history.push('/login');
            }}
          >
            Login
          </button>
        </center>
      </div>
    );
  }
}

const RegisterPageStyled = withStyles(styles)(RegisterPage);
export default connect(mapStoreToProps)(RegisterPageStyled);
