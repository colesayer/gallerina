import React, { Component } from 'react';

class GalleryShow extends Component{
  render(){
    const { gallery } = this.props

    let border
    if(this.props.selectedGallery.id === this.props.gallery.id){
      border = "dashed"
    } else {
      border = "none"
    }

    return(
      <div style={{"borderStyle": `${border}`, "borderColor": "red", "borderRadius": "5px"}}>
        <li>
          <h3>{gallery.gallery_name}</h3>
          <p>Width: {gallery.dim_x}"</p>
          <p>Depth: {gallery.dim_y}"</p>
          <p>Height: {gallery.dim_z}"</p>

          <label>Floor Texture:</label>
          <p>
          <img src={gallery.floor_texture} alt={gallery.name} style={{"width": "150px"}}/>
          </p>

          <label>Wall Color:</label>

          <div id="wall-color" style={{"width": "50px", "height": "50px", "backgroundColor": `${gallery.wall_color}`, "borderWidth": "2px", "borderColor": "rgb(102, 102, 102)", "borderStyle": "dashed", "borderRadius": "5px", "margin": "0 auto" }}/>

          <p>
            <button onClick={this.props.onSelected}>Select</button>
            <button onClick={this.props.onToggleUpdate} className="link-button" style={{"color": "blue", "fontSize": "small", "paddingLeft": "10px"}}>Update</button>
            <button onClick={this.props.onDelete} className="link-button" style={{"color": "blue", "fontSize": "small", "paddingLeft": "10px"}}>Delete</button>
          </p>
        </li>
      </div>
    )
  }
}

export default GalleryShow
