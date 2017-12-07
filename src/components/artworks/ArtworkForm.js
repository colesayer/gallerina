import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { createArtwork } from '../../actions/artworks.js'

const CLOUDINARY_UPLOAD_PRESET = 'ndhbgk9z'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dwnehv6tb/image/upload'


class ArtworkForm extends Component{

  state = {
    uploadFile: "",
    artist: "",
    title: "",
    date: "",
    materials: "",
    image_url: "",
    dim_X: "",
    dim_Y: ""
  }

  handleDrop = (files) => {
    this.setState({
      uploadFile: files[0]
    })
    this.handleImageUpload(files[0])
  }

  handleImageUpload = (file) => {

    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file)


    upload.end((err, response) => {
      if (err) {
        console.error(err)
      }

      if (response.body.secure_url !== ''){
        this.setState({
          image_url: response.body.secure_url
        })
      } else {
        console.log("not a successful upload")
      }
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const artwork = {user_id: this.props.user.id, artist: this.state.artist, title: this.state.title, date: this.state.date, materials: this.state.materials, image_url: this.state.image_url, dim_x: this.state.dim_X, dim_y: this.state.dim_Y}

    this.props.createArtwork(artwork)

    this.setState({
      artist: "",
      title: "",
      date: "",
      materials: "",
      image_url: "",
      dim_X: "",
      dim_Y: ""
    })

  }

// style={{"color": "blue"}}

// <div class="" aria-disabled="false" style="width: 200px; height: 200px; border-width: 2px; border-color: rgb(102, 102, 102); border-style: dashed; border-radius: 5px;"><p>Drop your files or click here to upload</p><input type="file" accept="image/*" autocomplete="off" style="display: none;"></div>

  render(){
    return(
        <div id="artwork-form">
        <h1>Upload A New Artwork</h1>
        <div className="file-upload">
          <Dropzone
            onDrop={this.handleDrop}
            multiple={false}
            accept="image/*"
            style={{"width": "200px", "height": "200px", "paddingTop": "25px", "borderWidth": "2px", "borderColor": "rgb(102, 102, 102)", "borderStyle": "dashed", "borderRadius": "5px", "margin": "0 auto"}}
            >
            <p>Drop your files or click here to upload</p>
          </Dropzone>
        </div>

        <div className="ImagePreview">
          {this.state.image_url === "" ? null :
          <div>
            <p>{this.state.uploadFile.name}</p>
            <img alt="successful upload" src={this.state.image_url} style={{"width": "150px", "margin": "0 auto"}}/>
          </div>}

        </div>
        <div>
          <form onChange={this.handleChange} onSubmit={this.handleSubmit} >
            <p>
            <label>Artist</label>
            <input type="text" name="artist" value={this.state.artist} />
            </p>
            <p>
            <label>Title</label>
            <input type="text" name="title" value={this.state.title}/>
            </p>
            <p>
            <label>Date</label>
            <input type="text" name="date" value={this.state.date}/>
            </p>
            <p>
            <label>Materials</label>
            <input type="text" name="materials" value={this.state.materials} />
            </p>
            <p>
            <label>Width in inches</label>
            <input type="number" name="dim_X" value={this.state.dim_X}/>
            </p>
            <p>
            <label>Height in inches</label>
            <input type="number" name="dim_Y" value={this.state.dim_Y}/>
            </p>
            <input type="submit" value="Save" />

          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createArtwork: createArtwork
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(ArtworkForm)
