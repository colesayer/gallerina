import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { fetchUser } from '../../actions/users.js'
import { fetchGalleries } from '../../actions/galleries.js'
import GalleryList from './GalleryList.js';
import GalleryForm from './GalleryForm.js';
import Modal from 'react-modal'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    padding               : '0'
  }
};

class GalleryContainer extends Component{

  state = {
      modalIsOpen: false
    };

  openModal = () => {
    this.setState({
      modalIsOpen: true
    })
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false
    })
  }
  componentDidMount(){
    if(!this.props.user.id)this.props.fetchUser()
    if(this.props.user.id)this.props.fetchGalleries(this.props.user.id)
  }
  render(){
    return(
      <div className="gallery-container">
        <div className="add-button">
          <button className="link-button" onClick={this.openModal} style={{cursor: 'pointer', "color": "blue", "fontSize": "small"}}>Click here to add a new gallery!</button>
        </div>
        {this.props.isLoading ? <p>Loading Galleries</p> : null}
        <div className="gallery-list">
          <GalleryList galleries={this.props.galleries}/>
        </div>



        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <GalleryForm user={this.props.user}/>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    user: state.user,
    galleries: state.galleries,
    isLoading: state.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchUser: fetchUser,
    fetchGalleries: fetchGalleries
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(GalleryContainer)
