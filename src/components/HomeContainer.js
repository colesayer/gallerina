import React, {Component} from 'react';
import ArtworkContainer from './artworks/ArtworkContainer.js'
import GalleryContainer from './galleries/GalleryContainer.js'
import ThreeViewContainer from './threeviews/ThreeViewContainer.js'
import { Link, Route } from 'react-router-dom'


class HomeContainer extends Component{
  render(){
    const currentPath = this.props.match.url
    console.log(currentPath)
    return(
      <div className="container">
        <Link to={currentPath + "galleries"}>Galleries</Link>
        <Link to={currentPath + "artworks"}>Artworks</Link>
        <Link to={currentPath + "3dview"}>3dView</Link>

        <Route exact path={currentPath + "3dview"} component={ThreeViewContainer} />
        <Route exact path={currentPath + "galleries"} component={GalleryContainer} />
        <Route exact path={currentPath + "artworks"} component={ArtworkContainer} />


      </div>
    )
  }
}


export default HomeContainer

// <Route path={"/artworks"} component={ArtworkContainer}/>
// <Route path={"/galleries"} component={GalleryContainer}/>
