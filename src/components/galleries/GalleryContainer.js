import React, { Component } from 'react';
import { connect } from 'react-redux';
import GalleryList from './GalleryList.js';
import GalleryForm from './GalleryForm.js';

class GalleryContainer extends Component{
  render(){
    return(
      <div>
        {this.props.isLoading ? <p>Loading Galleries</p> : <p>Galleries</p>}
        <div className="gallery-list">
          <GalleryList galleries={this.props.galleries}/>
        </div>
        <div className="gallery-form">
          <GalleryForm user={this.props.user}/>
        </div>
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


export default connect(mapStateToProps)(GalleryContainer)
