import React, { Component } from 'react';
import ThreeView from './ThreeView.js'
import { connect } from 'react-redux'

class ThreeViewContainer extends Component{
  render(){
    return(
      <div id="CanvasContainer">
        <ThreeView gallery={this.props.selectedGallery} artworks={this.props.selectedArtworks}/>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    selectedArtworks: state.selectedArtworks,
    selectedGallery: state.selectedGallery
  }
}

export default connect(mapStateToProps)(ThreeViewContainer)
