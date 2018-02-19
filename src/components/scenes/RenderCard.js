import React, { Component } from 'react';

class RenderCard extends Component{

  componentDidMount(){
  }
  render(){
    console.log(this.props.render)
    const render = this.props.render
    // var image = new Image();
    // image.src = this.props.render
    return(
      <div>
        <img src={render} style={{"width": "200px"}}/>
      </div>
    )
  }
}

export default RenderCard
