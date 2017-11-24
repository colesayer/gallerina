import React, { Component } from 'react';
import ThreeGallery from './ThreeGallery.js'
import GalleryForm from './GalleryForm.js'
import ImageForm from './ImageForm.js'
class GalleryContainer extends Component{
  render(){
    return(
      <div>
        <div id="CanvasContainer">
          <ThreeGallery />
        </div>
        <GalleryForm />
        <ImageForm />
      </div>

    )
  }

}

export default GalleryContainer
