import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logoutUser} from '../../actions/users.js'

class Navbar extends Component{

  handleClick = (e) => {
    e.preventDefault()
    localStorage.removeItem('jwtToken')
    this.props.logoutUser()
  }

  render(){
    return(
      <div className="navbar">
        <h1 className="title">Gallerina</h1>
        <ul>
          <li><button className="link-button" onClick={this.handleClick}>Logout</button></li>
          <Link to="/"><li>Home</li></Link>
        </ul>


      </div>

    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logoutUser: logoutUser
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(Navbar)
