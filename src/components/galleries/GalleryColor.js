import React, { Component } from 'react';
import { CompactPicker } from 'react-color'

class GalleryColor extends Component{

  handleChangeComplete = (color) => {
    this.props.onColorPick(color.hex)
  }

  render(){
    return(
      <div className="gallery-color-container">
        <CompactPicker color={this.props.color} onChangeComplete={this.handleChangeComplete}/>
      </div>
    )
  }
}

export default GalleryColor
