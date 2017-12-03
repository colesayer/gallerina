import React, { Component } from 'react';
import ArtworkShow from './ArtworkShow.js'
import ArtworkUpdate from './ArtworkUpdate.js'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectArtwork, deselectArtwork, updateArtwork, deleteArtwork } from '../../actions/artworks.js'

class ArtworkCard extends Component{

  state = {
    selected: false,
    update: false
  }

  handleClick = () => {
    if(this.state.selected === false){
      this.setState({selected: true})
      this.props.selectArtwork(this.props.artwork)
    } else {
      this.setState({selected: false})
      this.props.deselectArtwork(this.props.artwork)
    }
  }

  toggleUpdate = () => {
    this.state.update === false? (this.setState({update: true})) : (this.setState({update: false}))
  }

  handleUpdate = (artwork) => {
    this.props.updateArtwork(artwork)
  }

  handleDelete = () => {
    let artwork = {...this.props.artwork, user_id: this.props.user.id}
    this.props.deleteArtwork(artwork)
  }

  render(){




    if(!this.state.update){
      return (<ArtworkShow artwork={this.props.artwork} selected={this.state.selected} onSelect={this.handleClick} onDelete={this.handleDelete} onToggleUpdate={this.toggleUpdate}/>)
    } else {
      return (<ArtworkUpdate artwork={this.props.artwork} user={this.props.user} onUpdate={this.handleUpdate} onToggleUpdate={this.toggleUpdate}/>)
    }
  }
}

const mapStateToProps = (state) => {
  return({
    user: state.user
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectArtwork: selectArtwork,
    deselectArtwork: deselectArtwork,
    updateArtwork: updateArtwork,
    deleteArtwork: deleteArtwork
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkCard)
