import React, { Component } from 'react';
import ArtworkCard from './ArtworkCard.js'

class ArtworkList extends Component {
  render(){
    const artworks = this.props.artworks.map((artwork, idx) => <ArtworkCard key={idx} artwork={artwork}/>)
    return (
      <div>
        <ul>
          {artworks}
        </ul>
      </div>
    )
  }
}

export default ArtworkList
