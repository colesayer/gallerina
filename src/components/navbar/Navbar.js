import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Navbar extends Component{


  render(){
    let navLinks
    if(localStorage.getItem('jwtToken')){
      navLinks =
      <div>
      <Link to="/logout" className="nav-link"><li>Logout</li></Link>
      <Link to={"/scenes"} className="nav-link"><li>Scenes</li></Link>
      <Link to="/" className="nav-link"><li>Home</li></Link>
      <Link to={"/3dview"} className="nav-button"><li id="three-link">3dView</li></Link>
      <Link to={"/artworks"} className="nav-button"><li>Artworks</li></Link>
      <Link to={"/galleries"} className="nav-button"><li>Galleries</li></Link>
      </div>
    } else {
      navLinks = null
    }
    return(

        <div className="navbar">
          <div className="title-div">
            <h1>GALLERINA</h1>
          </div>
          <div className="navbar-links-container">
            <ul>
              {navLinks}
            </ul>
          </div>
        </div>


    )
  }
}

const mapStateToProps = (state) => {
  return{
    user: state.user
  }
}

export default connect(mapStateToProps)(Navbar)
