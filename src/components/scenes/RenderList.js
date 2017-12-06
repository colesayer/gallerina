import React, { Component } from 'react';
import RenderCard from './RenderCard.js'

class RenderList extends Component{
  render(){
    const renders = this.props.renders.map((render, idx) => <RenderCard key={idx} render={render}/>)
    return(
      <div>
        <ul>
          {renders}
        </ul>
      </div>
    )
  }
}

export default RenderList
