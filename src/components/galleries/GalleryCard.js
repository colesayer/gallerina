import React, { Component } from 'react';
import Modal from 'react-modal'
import GalleryUpdate from './GalleryUpdate.js'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectGallery, deselectGallery, updateGallery, deleteGallery } from '../../actions/galleries.js'


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class GalleryCard extends Component{

  state = {
    editModalIsOpen: false,
    deleteModalIsOpen: false
  }

  handleClick = () => {
    if(this.props.selectedGallery.id !== this.props.gallery.id){
      this.props.selectGallery(this.props.gallery)
    } else {
      this.props.deselectGallery()
    }
  }

  openEditModal = () => {
    this.setState({
      editModalIsOpen: true
    })
  }

  openDeleteModal = () => {
    this.setState({
      deleteModalIsOpen: true
    })
  }

  closeModal = () => {
    this.setState({
      editModalIsOpen: false,
      deleteModalIsOpen: false
    })
  }

  handleDelete = () => {
    let gallery = {...this.props.gallery, user_id: this.props.user.id}
    this.props.deleteGallery(gallery)
  }

  handleUpdate = (gallery) => {
    console.log("UPDATE", gallery)
    this.props.updateGallery(gallery)
  }

  render(){
    const { gallery } = this.props


    let border = "1px solid black"
    if(this.props.selectedGallery.id === this.props.gallery.id){
      border = "5px dashed red"
    } else {
      border = "1px solid black"
    }

    return(
      <li onClick={this.handleClick} style={{"border": `${border}`, backgroundColor: `${gallery.wall_color}`}}>
        <div className="gallery-list-wall">
          <h1>{gallery.gallery_name}</h1>
          <p style={{color: 'grey'}}> {gallery.dim_x}" x {gallery.dim_y}" x {gallery.dim_z}"</p>
          <button onClick={this.openEditModal} className="link-button" style={{"color": "blue", "fontSize": "small", "marginBottom": "10px", "marginRight": "10px"}}>Update</button>
          <button onClick={this.openDeleteModal} className="link-button" style={{"color": "blue", "fontSize": "small", "marginBottom": "10px", "marginLeft": "10px"}}>Delete</button>
        </div>


        <div className="gallery-list-floor" style={{backgroundImage: `url(${gallery.floor_texture})`}}>
        </div>

        <Modal
          isOpen={this.state.deleteModalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div>
            <h4>Are you sure you want to delete?</h4>
            <div>
              <button onClick={this.handleDelete} className="select-button">Delete</button>
              <button onClick={this.closeModal} className="select-button">Cancel</button>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={this.state.editModalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <GalleryUpdate gallery={gallery} onUpdate={this.handleUpdate} user={this.props.user} onCloseModal={this.closeModal}/>
        </Modal>

      </li>

    )
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
