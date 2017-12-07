import React, { Component } from 'react';
import SceneCard from './SceneCard.js'

class SceneList extends Component{
  render(){
    const scenes = this.props.scenes.map((scene, idx) => <SceneCard key={idx} scene={scene}/>)
    return(
        <ul>
          {scenes}
        </ul>
    )
  }
}

export default SceneList
