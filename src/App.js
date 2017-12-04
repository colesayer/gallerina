import React, { Component } from 'react';
import './App.css';
import { Route } from "react-router-dom"
import HomeContainer from './components/users/UserContainer.js'
import Navbar from './components/navbar/Navbar.js'
import { authorize } from './components/authorize.js'


class App extends Component {
  
  componentWillReceiveProps() {
    window.previousLocation = this.props.location
  }

  render() {
    const AuthHomeContainer = authorize(HomeContainer)

    return (
      <div className="App">
        <Navbar />
        <Route path= "/" render={(props) => <AuthHomeContainer {...props}/>}/>
      </div>
    );
  }
}

export default App;
