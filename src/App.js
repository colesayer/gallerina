import React, { Component } from 'react';
import './App.css';
import GalleryContainer from './components/GalleryContainer.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <GalleryContainer />
      </div>
    );
  }
}

export default App;
