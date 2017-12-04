import React, { Component } from 'react';
import ArtworkShow from './ArtworkShow.js'
import ArtworkUpdate from './ArtworkUpdate.js'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectArtwork, deselectArtwork, updateArtwork, deleteArtwork, removeArtworkFromScene } from '../../actions/artworks.js'

class ArtworkCard extends Component{

  state = {
    selected: false,
    inScene: false,
    update: false,
  }

  handleClick = () => {
    if(this.state.selected === false && this.state.inScene === false){
      this.setState({selected: true})
      this.props.selectArtwork(this.props.artwork)
    } else {
      this.setState({selected: false})
      this.props.deselectArtwork(this.props.artwork)
      this.props.removeArtworkFromScene(this.props.artwork)
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

  componentWillReceiveProps(nextprops){
    if(this.props.scene !== nextprops.scene){
      let artworkInSceneById = nextprops.scene.map(artwork => (artwork.name.id))
      if(artworkInSceneById.includes(this.props.artwork.id)){
        this.setState({inScene: true})
      } else {
        this.setState({inScene: false})
      }
    }
  }


  // shouldComponentUpdate(nextProps, nextState){
  //   console.log("should componentUpdate")
  //   console.log("thisProps:", this.props)
  //   console.log("nextProps:", nextProps)
  //   console.log("thisState:", this.state)
  //   console.log("nextState:", nextState)
  //   return this.state.selected !== nextState.selected ||
  //   this.state.inScene !== nextState.inScene ||
  //   this.state.update !== nextState.update ||
  //   this.props.scene !== nextProps.scene
  // }

  render(){
    // let artworkInSceneById = this.props.scene.map(artwork => (artwork.name.id))
    // console.log("artworkInSceneById", artworkInSceneById)



    if(!this.state.update){
      return (<ArtworkShow artwork={this.props.artwork} selected={this.state.selected} onSelect={this.handleClick} onDelete={this.handleDelete} onToggleUpdate={this.toggleUpdate} artworkInScene={this.state.inScene}/>)
    } else {
      return (<ArtworkUpdate artwork={this.props.artwork} user={this.props.user} onUpdate={this.handleUpdate} onToggleUpdate={this.toggleUpdate}/>)
    }
  }
}

const mapStateToProps = (state) => {
  return({
    user: state.user,
    scene: state.scene,
    selectedGallery: state.selectedGallery
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectArtwork: selectArtwork,
    deselectArtwork: deselectArtwork,
    updateArtwork: updateArtwork,
    deleteArtwork: deleteArtwork,
    removeArtworkFromScene: removeArtworkFromScene
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkCard)
