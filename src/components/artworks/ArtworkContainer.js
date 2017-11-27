import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import ArtworkList from './ArtworkList.js';
import ArtworkForm from './ArtworkForm.js';

class ArtworkContainer extends Component {

  componentDidMount(){
    // this.props.fetchArtworks()
  }

  render(){
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

// function mapDispatchToProps(dispatch){
//   return {
//     fetchArtworks: () => {
//       dispatch(fetchArtworks())
//     }
//   }
// }

export default connect(mapStateToProps)(ArtworkContainer)
