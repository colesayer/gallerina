import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchArtworks } from '../../actions/artworks.js';
import ArtworkList from './ArtworkList.js';
import ArtworkForm from './ArtworkForm.js';

class ArtworkContainer extends Component {

  componentDidMount(){
    // this.props.fetchArtworks()
  }

  render(){
    console.log("in artworkcontainer", this.props.user)
    return(
      <div>
        {this.props.isLoading ? <p>Loading Artworks</p> : <p>Artworks</p>}
        <div className="artwork-list">
          <ArtworkList artworks={this.props.artworks}/>
        </div>
        <div className="artwork-form">
          <ArtworkForm user={this.props.user}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    user: state.user,
    artworks: state.artworks,
    isLoading: state.isLoading
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchArtworks: () => {
      dispatch(fetchArtworks())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkContainer)
