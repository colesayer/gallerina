import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectGallery, deselectGallery, deleteGallery } from '../../actions/galleries.js'
import GalleryUpdate from './GalleryUpdate.js'

class GalleryCard extends Component{

  state = {
    selected: false,
    update: false
  }

  handleClick = (e) => {
    e.preventDefault()
    if(this.state.selected === false){
      this.setState({selected: true})
      this.props.selectGallery(this.props.gallery)
    } else {
      this.setState({selected: false})
      this.props.deselectGallery()
    }
  }

  handleUpdate = (e) => {
    e.preventDefault()
    this.setState({update: true})
  }


  handleDelete = (e) => {
    e.preventDefault()
    let gallery = {...this.props.gallery, user_id: this.props.user.id}
    this.props.deleteGallery(gallery)
  }
  render(){

    let updateGallery
    if(this.state.update){
      updateGallery = <GalleryUpdate gallery={this.props.gallery}/>
    } else {
      updateGallery = <div></div>
    }

    let border
    if(this.state.selected){
      border = "dashed"
    } else {
      border = "none"
    }
    const { gallery } = this.props
    return(
      <div style={{"borderStyle": `${border}`, "borderColor": "red", "borderRadius": "5px"}}>
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

          <p>
            <button onClick={this.handleClick}>Select</button>
            <button onClick={this.handleUpdate} className="link-button" style={{"color": "blue", "fontSize": "small", "paddingLeft": "10px"}}>Update</button>
            <button onClick={this.handleDelete} className="link-button" style={{"color": "blue", "fontSize": "small", "paddingLeft": "10px"}}>Delete</button>
          </p>
        </li>
        {updateGallery}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectGallery: selectGallery,
    deselectGallery: deselectGallery,
    deleteGallery: deleteGallery
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(GalleryCard)
// <Link to={`galleries/${this.props.gallery.id}/update`}>Update</Link>
//
