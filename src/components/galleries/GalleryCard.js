import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectGallery, deselectGallery, updateGallery, deleteGallery } from '../../actions/galleries.js'
import GalleryUpdate from './GalleryUpdate.js'
import GalleryShow from './GalleryShow.js'

class GalleryCard extends Component{

  state = {
    update: false
  }

  handleClick = (e) => {
    e.preventDefault()
    if(this.props.selectedGallery.id !== this.props.gallery.id){
      this.props.selectGallery(this.props.gallery)
    } else {
      this.props.deselectGallery()
    }
  }

  toggleUpdate = (e) => {
    e.preventDefault()
    this.state.update === false ? (this.setState({update: true})) : (this.setState({update: false}))
  }

  handleUpdate = (gallery) => {
    this.props.updateGallery(gallery)
  }


  handleDelete = (e) => {
    e.preventDefault()
    let gallery = {...this.props.gallery, user_id: this.props.user.id}
    this.props.deleteGallery(gallery)
  }

  render(){
    console.log("In galleryCard", "selectedGallery:", this.props.selectedGallery.id, "this gallery", this.props.gallery.id)
    if(!this.state.update){
      return <GalleryShow gallery={this.props.gallery} onSelected={this.handleClick} onDelete={this.handleDelete} onToggleUpdate={this.toggleUpdate} selected={this.state.selected} selectedGallery={this.props.selectedGallery}/>
    } else {
      return <GalleryUpdate gallery={this.props.gallery} onToggleUpdate={this.toggleUpdate} onUpdate={this.handleUpdate} user={this.props.user}/>
    }
  }
}

const mapStateToProps = (state) => {
  return{
    user: state.user,
    selectedGallery: state.selectedGallery
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectGallery: selectGallery,
    deselectGallery: deselectGallery,
    updateGallery: updateGallery,
    deleteGallery: deleteGallery
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryCard)
