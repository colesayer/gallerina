import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { fetchUser } from '../../actions/users.js'
import { fetchGalleries } from '../../actions/galleries.js'
import GalleryList from './GalleryList.js';
import GalleryForm from './GalleryForm.js';

class GalleryContainer extends Component{
  componentDidMount(){
    if(!this.props.user.id)this.props.fetchUser()
    if(this.props.user.id)this.props.fetchGalleries(this.props.user.id)
  }
  render(){
    return(
      <div id="list-form">
        {this.props.isLoading ? <p>Loading Galleries</p> : null}
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchUser: fetchUser,
    fetchGalleries: fetchGalleries
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(GalleryContainer)
