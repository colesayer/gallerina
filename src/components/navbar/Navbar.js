import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Navbar extends Component{


  render(){
    return(

        <div className="navbar">
          <div className="title-div">
            <h1>GALLERINA</h1>
          </div>
          <ul>
            <Link to="/logout"><li>Logout</li></Link>
            <Link to="/"><li>Home</li></Link>
            <Link to={"/3dview"}><li id="three-link">3dView</li></Link>
            <Link to={"/scenes"}><li>Scenes</li></Link>
            <Link to={"/artworks"}><li>Artworks</li></Link>
            <Link to={"/galleries"}><li>Galleries</li></Link>
          </ul>
        </div>


    )
  }
}

export default Navbar
