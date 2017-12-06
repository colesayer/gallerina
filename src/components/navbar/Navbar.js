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
          <div className="title-div">
            <h1 className="title">Gallerina</h1>
          </div>
          <ul>
            <li><button className="link-button" onClick={this.handleClick} style={{"color":"blue"}}>Logout</button></li>
            <Link to="/"><li>Home</li></Link>
            <Link to={"/3dview"}><li>3dView</li></Link>
            <Link to={"/scenes"}><li>Scenes</li></Link>
            <Link to={"/galleries"}><li>Galleries</li></Link>
            <Link to={"/artworks"}><li>Artworks</li></Link>
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
