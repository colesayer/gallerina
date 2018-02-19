import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logoutUser} from '../../actions/users.js'

class Logout extends Component{

  componentDidMount(){
    localStorage.removeItem('jwtToken')
    this.props.logoutUser()
  }

  render(){
    return(
      <div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logoutUser: logoutUser
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(Logout)
