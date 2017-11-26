import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectArtwork } from '../../actions/artworks.js'

class ArtworkCard extends Component{

  handleClick = () => {
    this.props.selectArtwork(this.props.artwork)
  }

  render(){
    const { artwork } = this.props
    return(
      <div>
        <li>
          <p>{artwork.artist} </p>
          <h3>{artwork.title} </h3>
          <p>{artwork.date} </p>
          <p>{artwork.materials}</p>
          <img src={artwork.image_url} alt={artwork.title} style={{"width": "150px"}}/>
          <p><button onClick={this.handleClick}>Select</button></p>
          <hr></hr>

        </li>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectArtwork: selectArtwork
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(ArtworkCard)
