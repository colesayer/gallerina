import React, {Component} from 'react';
import ArtworkContainer from './artworks/ArtworkContainer.js'
import GalleryContainer from './galleries/GalleryContainer.js'
import ThreeViewContainer from './threeviews/ThreeViewContainer.js'
import SceneContainer from './scenes/SceneContainer.js'
import InstructionContainer from './instructions/InstructionContainer.js'
import Logout from './users/Logout.js'
import { Link, Route } from 'react-router-dom'


class HomeContainer extends Component{
  render(){
    const currentPath = this.props.match.url
    return(
      <div className="container">
          <Route exact path='/' component={InstructionContainer} />
          <Route exact path={currentPath + "3dview"} component={ThreeViewContainer} />
          <Route exact path={currentPath + "scenes"} component={SceneContainer} />
          <Route exact path={currentPath + "galleries"} render={(props) => <GalleryContainer {...props}/>} />
          <Route exact path={currentPath + "artworks"} component={ArtworkContainer} />
          <Route exact path={currentPath + "logout"} component={Logout} />
      </div>
    )
  }
}


export default HomeContainer

// <Route path={"/artworks"} component={ArtworkContainer}/>
// <Route path={"/galleries"} component={GalleryContainer}/>

// <div className="main-links">
//   <div className="galleries-link">
//     <Link to={currentPath + "galleries"}>Galleries</Link>
//   </div>
//   <div className="artworks-link">
//     <Link to={currentPath + "artworks"}>Artworks</Link>
//   </div>
//   <div className="threeview-link">
//     <Link to={currentPath + "3dview"}>3dView</Link>
//   </div>
// </div>

// <div id="filler">
// </div>
// <div id="filler2">
// </div>
// <div id="filler3">
// </div>
