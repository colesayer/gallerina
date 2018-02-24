import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class InstructionContainer extends Component{
  render(){
    return(
      <div className="instruction-container">
        <ol>
          <li>Select a <Link to="/galleries">Gallery.</Link></li>
          <li>Choose some <Link to="/artworks">Artworks.</Link></li>
          <li>Curate your <Link to="/3dview">Show!</Link></li>
        </ol>
      </div>
    )
  }
}

export default InstructionContainer
