import React, { Component } from 'react';


class ArtworkUpdate extends Component{


  state = {
    artist: this.props.artwork.artist,
    title: this.props.artwork.title,
    date: this.props.artwork.date,
    materials: this.props.artwork.materials,
    dim_X: this.props.artwork.dim_x,
    dim_Y: this.props.artwork.dim_y
  }

  handleArtist = (e) => {
    this.setState({
      artist: e.target.value
    })
  }

  handleTitle = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  handleDate = (e) => {
    this.setState({
      date: e.target.value
    })
  }

  handleMaterials = (e) => {
    this.setState({
      materials: e.target.value
    })
  }

  handleDim_X = (e) => {
    this.setState({
      dim_X: e.target.value
    })
  }

  handleDim_Y = (e) => {
    this.setState({
      dim_Y: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    let artwork = {
      id: this.props.artwork.id,
      user_id: this.props.user.id,
      artist: this.state.artist,
      title: this.state.title,
      date: this.state.date,
      materials: this.state.materials,
      image_url: this.props.artwork.image_url,
      dim_x: this.state.dim_X,
      dim_y: this.state.dim_Y
      }

    this.props.onUpdate(artwork)
    this.props.onToggleUpdate(e)
  }


  render(){
    return(
      <li>
        <div className="ImagePreview">
        <img alt="successful upload" src={this.props.artwork.image_url} style={{"width": "150px", "margin": "0 auto"}}/>
        </div>

        <div id="artwork-form" className="artwork-text">
          <form onSubmit={this.handleSubmit} >
          <p>
          <label>Artist</label>
          <input type="text" onChange={this.handleArtist} value={this.state.artist} />
          </p>
          <p>
          <label>Title</label>
          <input type="text" onChange={this.handleTitle} value={this.state.title}/>
          </p>
          <p>
          <label>Date</label>
          <input type="text" onChange={this.handleDate} value={this.state.date}/>
          </p>
          <p>
          <label>Materials</label>
          <input type="text" onChange={this.handleMaterials} value={this.state.materials} />
          </p>
          <p>
          <label>Width in inches</label>
          <input type="number" onChange={this.handleDim_X} value={this.state.dim_X}/>
          </p>
          <p>
          <label>Height in inches</label>
          <input type="number" onChange={this.handleDim_Y} value={this.state.dim_Y}/>
          </p>

          <button className="link-button" onClick={this.props.onToggleUpdate} style={{"color": "blue", "fontSize": "small", "paddingRight": "10px"}}>{"<<Back"}</button>
          <input type="submit" value="Update" />

          </form>
        </div>
      </li>
    )
  }
}

export default ArtworkUpdate
