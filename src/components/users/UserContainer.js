import React, { Component } from 'react';
import UserLogin from './UserLogin.js';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/users.js'
import { bindActionCreators } from 'redux';

class UserContainer extends Component{

  handleSubmit = (input) => {
    this.props.fetchUser(input)
  }

  render(){
    return(
      <div>
        <UserLogin onSubmit={this.handleSubmit}/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchUser: fetchUser
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(UserContainer)
