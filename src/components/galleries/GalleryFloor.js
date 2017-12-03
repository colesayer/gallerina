import React, { Component } from 'react';

class GalleryFloor extends Component{

  state = {
    selected: false,
  }

  handleClick = (e) => {
    e.preventDefault()
    this.props.addFloor(this.props.image)
  }

  render(){
    let border
    if(this.props.image === this.props.selectedFloor){
        border = "dashed"
      } else {
        border = "none"
      }
    return(
      <div>
        <img onClick={this.handleClick} alt="floor texture" src={this.props.image} style={{"width": "150px", "borderStyle": `${border}`, "borderColor": "red", "margin": "0 auto"}}/>

      </div>

    )
  }
}

export default GalleryFloor

// <p>
// <button onClick={this.handleClick} className="select-button">Select</button>
// </p>

// , "width": "200px", "height": "200px"
