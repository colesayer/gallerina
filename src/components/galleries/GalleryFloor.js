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
      <div className="gallery-floor">
        <img onClick={this.handleClick} alt="floor texture" src={this.props.image} style={{"height": "75px", "borderStyle": `${border}`, "borderColor": "red", "margin": "0 auto"}}/>

      </div>

    )
  }
}

export default GalleryFloor
