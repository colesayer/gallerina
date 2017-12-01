import React, { Component } from 'react';
import UserLogin from './UserLogin.js';
import UserSignUp from './UserSignUp.js'
import { Route, Redirect, Switch, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { loginUser, createUser } from '../../actions/users.js'
import { bindActionCreators } from 'redux';
import HomeContainer from '../HomeContainer.js'
import { authorize } from '../authorize.js'


class UserContainer extends Component{

  handleLogin = (input) => {
    this.props.loginUser(input)
  }

  handleSignUp = (input) => {
    this.props.createUser(input)
  }


  render(){
    const currentPath = this.props.match.url
    const AuthUserLogin = authorize(UserLogin)
    const AuthHomeContainer = authorize(HomeContainer)
    return(
      <div>
        <Switch>
          <Route path="/signup" render={(props) => <UserSignUp onSignUp={this.handleSignUp} {...props}/>}/>
          <Route path="/login" render={(props) => <AuthUserLogin onLogin={this.handleLogin} {...props}/>}/>
          <Route path="/" render={(props) => <AuthHomeContainer {...props}/>}/>
        </Switch>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loginUser: loginUser,
    createUser: createUser
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)
