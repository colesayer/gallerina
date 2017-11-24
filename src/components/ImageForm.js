import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import request from 'superagent'

const CLOUDINARY_UPLOAD_PRESET = 'ndhbgk9z'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dwnehv6tb/image/upload'

class ImageForm extends Component{

  state = {
    uploadFile: "",
    uploadFileCloudinaryUrl: "",
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
        console.log("successful upload: ", response.body.secure_url)
        this.setState({
          uploadFileCloudinaryUrl: response.body.secure_url
        })
      } else {
        console.log("not a successful upload")
      }
    });
  }



  render(){
    return(
      <div>
        <div className="FileUpload">
          <Dropzone
            onDrop={this.handleDrop}
            multiple={false}
            accept="image/*"
            >
            <p>Drop your files or click here to upload</p>
          </Dropzone>
        </div>

        <div className="ImagePreview">
          {this.state.uploadFileCloudinaryUrl === "" ? null :
          <div>
            <p>{this.state.uploadFile.name}</p>
            <img src={this.state.uploadFileCloudinaryUrl}/>
          </div>}

        </div>
      </div>
    )
  }
}

export default ImageForm
