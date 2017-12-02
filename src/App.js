import React, { Component } from 'react';
import './App.css';
import { Route } from "react-router-dom"
import HomeContainer from './components/users/UserContainer.js'
import { authorize } from './components/authorize.js'


class App extends Component {
  componentDidMount(){
  }

  render() {
    const AuthHomeContainer = authorize(HomeContainer)

    return (
      <div className="App">
        <Route path= "/" render={(props) => <AuthHomeContainer {...props}/>}/>
      </div>
    );
  }
}

export default App;
