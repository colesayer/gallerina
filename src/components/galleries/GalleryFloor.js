import React, { Component } from 'react';

class GalleryFloor extends Component{

  handleClick = (e) => {
    e.preventDefault()
    this.props.addFloor(this.props.image)
  }
  render(){
    return(
      <div>
        <img alt="floor texture" src={this.props.image} style={{"width": "150px"}}/>
        <p>
        <button onClick={this.handleClick}>Select</button>
        </p>
      </div>

    )
  }
}

export default GalleryFloor
