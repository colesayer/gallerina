import React, { Component } from 'react';
import GalleryCard from './GalleryCard.js'

class GalleryList extends Component{
  render(){
    const galleries = this.props.galleries.map((gallery, idx) => <GalleryCard key={idx} gallery={gallery}/>)
    return(
      <div>
        <ul>
          {galleries}
        </ul>
      </div>
    )
  }
}

export default GalleryList
