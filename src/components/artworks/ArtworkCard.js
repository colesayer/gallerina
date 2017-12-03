import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectArtwork, deselectArtwork, deleteArtwork } from '../../actions/artworks.js'

class ArtworkCard extends Component{

  state = {
    selected: false
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

  handleDelete = () => {
    let artwork = {...this.props.artwork, user_id: this.props.user.id}
    this.props.deleteArtwork(artwork)
  }

  render(){
    let border
    if(this.state.selected){
      border = "dashed"
    } else {
      border = "none"
    }
    const { artwork } = this.props
    return(
      <div style={{"borderStyle": `${border}`, "borderColor": "red", "borderRadius": "5px"}}>
        <li>
          <p>{artwork.artist} </p>
          <h3>{artwork.title} </h3>
          <p>{artwork.date} </p>
          <p>{artwork.materials}</p>
          <img src={artwork.image_url} alt={artwork.title} style={{"width": "150px"}}/>
          <p>
            <button onClick={this.handleClick}>Select</button>
            <button onClick={this.handleDelete} className="link-button" style={{"color": "blue", "fontSize": "small", "paddingLeft": "10px"}}>Delete</button>
          </p>

        </li>
      </div>
    )
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
    deleteArtwork: deleteArtwork
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkCard)
