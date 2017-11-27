import React, { Component } from 'react';
import './App.css';
import { Route } from "react-router-dom"
// import ArtworkContainer from './components/artworks/ArtworkContainer.js'
import UserContainer from './components/users/UserContainer.js'
// import GalleryContainer from './components/galleries/GalleryContainer.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path= "/" component={UserContainer}/>
      </div>
    );
  }
}

export default App;
