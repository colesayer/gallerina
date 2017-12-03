import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { createGallery } from '../../actions/galleries.js'
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

class GalleryForm extends Component{

  state= {
    gallery_name: "",
    dim_x: "",
    dim_y: "",
    dim_z: "",
    floor_texture: 'http://res.cloudinary.com/dwnehv6tb/image/upload/v1511459302/qsrgvseoqnusngtalbkc.jpg',
    wall_color: "#fff"
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

  handleSubmit = (e) => {
    e.preventDefault()

    const gallery = {user_id: this.props.user.id, gallery_name: this.state.gallery_name, dim_x: this.state.dim_x, dim_y: this.state.dim_y, dim_z: this.state.dim_z, floor_texture: this.state.floor_texture, wall_color: this.state.wall_color}

    this.props.createGallery(gallery)

    this.setState({
      gallery_name: "",
      dim_x: "",
      dim_y: "",
      dim_z: "",
      floor_texture: "http://res.cloudinary.com/dwnehv6tb/image/upload/v1511459302/qsrgvseoqnusngtalbkc.jpg",
      wall_color: "#fff"
    })
  }



  render(){
    const floorTexturePicker = floorTextureUrls.map((texture, idx) => (<GalleryFloor key={idx} image={texture} addFloor={this.handleFloorTexture} selectedFloor={this.state.floor_texture}/>))
    return(

      <div>
        <p><strong>Create A New Gallery</strong></p>
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

          <input type="submit" value="Save"/>
        </form>

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createGallery: createGallery
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(GalleryForm)
