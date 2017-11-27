import React, {Component} from 'react';
import ArtworkContainer from './artworks/ArtworkContainer.js'
import GalleryContainer from './galleries/GalleryContainer.js'

class HomeContainer extends Component{
  render(){
    return(
      <div className="container">
        <GalleryContainer />
        <ArtworkContainer />
      </div>
    )
  }
}

export default HomeContainer

// <Route path={"/artworks"} component={ArtworkContainer}/>
// <Route path={"/galleries"} component={GalleryContainer}/>
