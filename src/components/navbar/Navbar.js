import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Navbar extends Component{
  state = {
    selectGallery: true,
    selectArtworks: false,
    curateShow: false
  }

  render(){
    let showBackground = ""
    let galleryBackground = ""
    let artworkBackground = ""

    if(this.props.selectedGallery.id && this.props.selectedArtworks.length > 0 || this.props.selectedGallery.id && this.props.savedArtworks.length > 0){
      console.log("time to curate")
      showBackground = "yellow"
    } else if(!this.props.selectedGallery.id){
      console.log("time to choose a gallery")
      galleryBackground = "yellow"
    } else if(this.props.selectedGallery.id && this.props.selectedArtworks.length === 0){
      console.log("time to pick an artwork")
      artworkBackground = "yellow"
    }

    let navLinks
    if(localStorage.getItem('jwtToken')){
      navLinks =
      <div>
      <Link to="/logout" className="nav-link"><li>Logout</li></Link>
      <Link to={"/scenes"} className="nav-link"><li>Scenes</li></Link>
      <Link to="/" className="nav-link"><li>Home</li></Link>
      <Link to={"/3dview"} className="nav-button" style={{borderColor: `${showBackground}`}}><li id="three-link">Show</li></Link>
      <Link to={"/artworks"} className="nav-button" style={{borderColor: `${artworkBackground}`}}><li>Artworks</li></Link>
      <Link to={"/galleries"} className="nav-button" style={{borderColor: `${galleryBackground}`}}><li>Galleries</li></Link>
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
    user: state.user,
    selectedArtworks: state.selectedArtworks,
    savedArtworks: state.savedArtworks,
    selectedGallery: state.selectedGallery
  }
}

export default connect(mapStateToProps)(Navbar)
