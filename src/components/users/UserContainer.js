import React, { Component } from 'react';
import UserLogin from './UserLogin.js';
import { Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/users.js'
import { bindActionCreators } from 'redux';
import HomeContainer from '../HomeContainer.js'


class UserContainer extends Component{

  handleSubmit = (input) => {
    this.props.fetchUser(input)
  }

  render(){
    console.log("userContainer:", this.props.user)
    if(this.props.user.id){
      console.log("there is a user")
    } else {
      console.log("there is no user")
    }

    return(
      <div>
        {this.props.user.id ? (
          < Redirect to={`/users/${this.props.user.id}`}/>
        ) : (
          < Redirect to='/login'/>
        )}
        <Switch>
          <Route path={"/login"} render={() => (<UserLogin onSubmit={this.handleSubmit}/>)}/>
          <Route path={"/users/:id"} component={HomeContainer}/>
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
    fetchUser: fetchUser
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)
