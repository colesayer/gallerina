import React, { Component } from 'react';

class InstructionContainer extends Component{
  render(){
    return(
      <div className="instruction-container">
        <ol>
          <li>Select a Gallery.</li>
          <li>Choose some artworks.</li>
          <li>Curate your show!</li>
        </ol>
      </div>
    )
  }
}

export default InstructionContainer
