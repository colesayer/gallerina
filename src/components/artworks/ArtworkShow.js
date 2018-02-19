import React, { Component } from 'react';

class ArtworkShow extends Component{

  handleClick = (e) => {
    e.preventDefault()
    this.props.onSelect(e)
  }

  render(){
    const { artwork } = this.props

    let border = "1px solid blue"
    if(this.props.selected || this.props.artworkInScene){
      border = "5px dashed red"
    } else {
      border = "1px solid blue"
    }

    return(
        <li style={{"border": `${border}`}}>
          <h1>{artwork.artist} </h1>
          <h3>{artwork.title} </h3>
          <p>{artwork.date} </p>
          <p>{artwork.materials}</p>
          <p>{artwork.dim_x}" x {artwork.dim_y}"</p>
          <img src={artwork.image_url} alt={artwork.title} style={{"width": "150px"}}/>
          <p>
            <button onClick={this.handleClick} className="select-button">Select</button>
            </p>
            <p>
            <button onClick={this.props.onToggleUpdate}className="link-button" style={{"color": "blue", "fontSize": "small", "marginBottom": "10px", "marginRight": "10px"}}>Update</button>
            <button onClick={this.props.onDelete} className="link-button" style={{"color": "blue", "fontSize": "small", "marginBottom": "10px", "marginLeft": "10px"}}>Delete</button>
          </p>

        </li>
    )
  }
}

export default ArtworkShow
