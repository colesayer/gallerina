import React, { Component } from 'react';
import './App.css';
import { Route, Link} from "react-router-dom"
// import ArtworkContainer from './components/artworks/ArtworkContainer.js'
import UserContainer from './components/users/UserContainer.js'
import HomeContainer from './components/users/UserContainer.js'
// import GalleryContainer from './components/galleries/GalleryContainer.js'
import { authorize } from './components/authorize.js'


class App extends Component {
  componentDidMount(){
  }

  render() {
    const AuthUserContainer = authorize(UserContainer)
    const AuthHomeContainer = authorize(HomeContainer)

    return (
      <div className="App">
        <Route path= "/" render={(props) => <AuthHomeContainer {...props}/>}/>
      </div>
    );
  }
}

export default App;
