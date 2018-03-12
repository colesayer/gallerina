import React, { Component } from 'react';
import GalleryFloor from './GalleryFloor.js'
import GalleryColor from './GalleryColor.js'

var floorTextureUrls = [
  'http://res.cloudinary.com/dwnehv6tb/image/upload/v1511459302/qsrgvseoqnusngtalbkc.jpg',
  'http://res.cloudinary.com/dwnehv6tb/image/upload/v1511744553/TexturesCom_Carpet0013_1_seamless_S_v9nnbe.jpg',
  'http://res.cloudinary.com/dwnehv6tb/image/upload/v1511744552/TexturesCom_Carpet0004_1_seamless_S_hnxyi0.jpg',
  'http://res.cloudinary.com/dwnehv6tb/image/upload/v1511744552/parquet_fxyelv.jpg',
  'http://res.cloudinary.com/dwnehv6tb/image/upload/v1511744552/concrete_x6iixn.jpg',
  'http://res.cloudinary.com/dwnehv6tb/image/upload/v1511744552/43041019_m_xikgxe.jpg'
]

class GalleryUpdate extends Component{
  state= {
    gallery_name: this.props.gallery.gallery_name,
    dim_x: this.props.gallery.dim_x,
    dim_y: this.props.gallery.dim_y,
    dim_z: this.props.gallery.dim_z,
    floor_texture: this.props.gallery.floor_texture,
    wall_color: this.props.gallery.wall_color
  }

  handleGalleryName = (e) => {
    this.setState({
      gallery_name: e.target.value
    })
  }


  handleDimX = (e) => {
    this.setState({
      dim_x: e.target.value
    })
  }
  handleDimY = (e) => {
    this.setState({
      dim_y: e.target.value
    })
  }
  handleDimZ = (e) => {
    this.setState({
      dim_z: e.target.value
    })
  }

  handleColorChange = (color) => {
    this.setState({
      wall_color: color
    })
  }

  handleFloorTexture = (image) => {
    this.setState({
      floor_texture: image
    })
  }

  handleClick = (e) => {
    e.preventDefault()



    const gallery = {
      id: this.props.gallery.id,
      user_id: this.props.user.id,
      gallery_name: this.state.gallery_name,
      dim_x: this.state.dim_x,
      dim_y: this.state.dim_y,
      dim_z: this.state.dim_z,
      floor_texture: this.state.floor_texture,
      wall_color: this.state.wall_color
      }


    this.props.onUpdate(gallery)
    this.props.onCloseModal()
  }

  render(){
    const floorTexturePicker = floorTextureUrls.map((texture, idx) => (<GalleryFloor key={idx} image={texture} addFloor={this.handleFloorTexture} selectedFloor={this.state.floor_texture}/>))
    return(
        <li id="gallery-update">
        <p><strong>Update {this.props.gallery.gallery_name}</strong></p>
        <form onSubmit={this.handleSubmit}>
          <p>
          <label> Gallery Name: </label>
          </p>
          <p>
          <input type="text" onChange={this.handleGalleryName} value={this.state.gallery_name} required/>
          </p>

          <p>
          <label> Width in inches: </label>
          </p>
          <p>
          <input type="number" onChange={this.handleDimX} value={this.state.dim_x} required/>
          </p>

          <p>
          <label> Depth in inches: </label>
          </p>
          <p>
          <input type="number" onChange={this.handleDimY} value={this.state.dim_y} required/>
          </p>

          <p>
          <label> Height in inches: </label>
          </p>
          <p>
          <input type="number" onChange={this.handleDimZ} value={this.state.dim_z} required/>
          </p>

          <p>
          <label>Select Wall Color:</label>
          </p>
          <GalleryColor color={this.state.wall_color} onColorPick={this.handleColorChange} style={{"margin": "0 auto"}}/>


          <p>
          <label>Select Floor Texture:</label>
          </p>
          {floorTexturePicker}
            <button onClick={this.handleClick} className="select-button">Update</button>
          <p>
            <button className="link-button" onClick={this.props.onCloseModal} style={{"color": "blue", "fontSize": "small", "paddingRight": "10px"}}>{"<<Back"}</button>
          </p>
        </form>
        </li>
    )
  }
}


export default GalleryUpdate

// <input type="submit" className="select-button" value="Update" style={{"marginTop": "25px"}}/>
