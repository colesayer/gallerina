import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectGallery } from '../../actions/galleries.js'

class GalleryCard extends Component{

  handleClick = () => {
    this.props.selectGallery(this.props.gallery)
  }
  render(){
    const { gallery } = this.props
    return(
      <div>
        <li>
          <h3>{gallery.gallery_name}</h3>
          <p>Width: {gallery.dim_x}"</p>
          <p>Depth: {gallery.dim_y}"</p>
          <p>Height: {gallery.dim_z}"</p>

          <label>Floor Texture:</label>
          <p>
          <img src={gallery.floor_texture} alt={gallery.name} style={{"width": "150px"}}/>
          </p>

          <label>Wall Color:</label>

          <div id="wall-color" style={{"width": "50px", "height": "50px", "backgroundColor": `${gallery.wall_color}`, "borderWidth": "2px", "borderColor": "rgb(102, 102, 102)", "borderStyle": "dashed", "borderRadius": "5px", "margin": "0 auto" }}/>

          <p><button onClick={this.handleClick}>Select</button></p>
          <hr></hr>
        </li>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectGallery: selectGallery
  }, dispatch)
}
export default connect(null, mapDispatchToProps)(GalleryCard)
