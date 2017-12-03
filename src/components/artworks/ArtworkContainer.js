import React, { Component } from 'react';
import { fetchUser } from '../../actions/users.js'
import { fetchArtworks } from '../../actions/artworks.js'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ArtworkList from './ArtworkList.js';
import ArtworkForm from './ArtworkForm.js';

class ArtworkContainer extends Component {

  componentDidMount(){
    if(!this.props.user.id)this.props.fetchUser()
    if(this.props.user.id)this.props.fetchArtworks(this.props.user.id)
  }

  render(){
    return(
      <div>

        {this.props.isLoading ? <p>Loading Artworks</p> : <p>Artworks</p>}
        <div className="artwork-list">
          <ArtworkList artworks={this.props.artworks}/>
        </div>
        <div className="artwork-form">
          <ArtworkForm user={this.props.user} />
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
  return bindActionCreators({
    fetchArtworks: fetchArtworks,
    fetchUser: fetchUser
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkContainer)
