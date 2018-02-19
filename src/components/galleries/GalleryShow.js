import React, { Component } from 'react';

class GalleryShow extends Component{
  render(){
    const { gallery } = this.props


    let border = "1px solid blue"
    if(this.props.selectedGallery.id === this.props.gallery.id){
      border = "5px dashed red"
    } else {
      border = "1px solid black"
    }

    return(
        <li style={{"border": `${border}`}}>
          <h1>{gallery.gallery_name}</h1>
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
            <button onClick={this.props.onSelected} className="select-button">Select</button>
          </p>
          <p>
            <button onClick={this.props.onToggleUpdate} className="link-button" style={{"color": "blue", "fontSize": "small", "marginBottom": "10px", "marginRight": "10px"}}>Update</button>
            <button onClick={this.props.onDelete} className="link-button" style={{"color": "blue", "fontSize": "small", "marginBottom": "10px", "marginLeft": "10px"}}>Delete</button>
          </p>
        </li>
    )
  }
}

export default GalleryShow
