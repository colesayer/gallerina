import React, { Component } from 'react';

class ArtworkShow extends Component{

  handleClick = (e) => {
    e.preventDefault()
    this.props.onSelect(e)
  }

  render(){
    const { artwork } = this.props

    let border
    if(this.props.selected || this.props.artworkInScene){
      border = "dashed"
    } else {
      border = "none"
    }

    return(
      <div style={{"borderStyle": `${border}`, "borderColor": "red", "borderRadius": "5px"}}>
        <li>
          <p>{artwork.artist} </p>
          <h3>{artwork.title} </h3>
          <p>{artwork.date} </p>
          <p>{artwork.materials}</p>
          <p>{artwork.dim_x}" x {artwork.dim_y}"</p>
          <img src={artwork.image_url} alt={artwork.title} style={{"width": "150px"}}/>
          <p>
            <button onClick={this.handleClick}>Select</button>
            <button onClick={this.props.onToggleUpdate}className="link-button" style={{"color": "blue", "fontSize": "small", "paddingLeft": "10px"}}>Update</button>
            <button onClick={this.props.onDelete} className="link-button" style={{"color": "blue", "fontSize": "small", "paddingLeft": "10px"}}>Delete</button>
          </p>

        </li>
      </div>
    )
  }
}

export default ArtworkShow
