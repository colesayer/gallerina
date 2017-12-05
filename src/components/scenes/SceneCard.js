import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectScene, deselectScene } from '../../actions/scenes.js'

class SceneCard extends Component{

  handleClick = (e) => {
    e.preventDefault()

    if(this.props.selectedScene.id !== this.props.scene.id){
      this.props.selectScene(this.props.scene)
    } else {
      this.props.deselectScene()
    }

  }
  render(){
    console.log("in scenecard:", this.props.scene)
    let border
    if(this.props.selectedScene.id === this.props.scene.id){
      border = "dashed"
    } else {
      border = "none"
    }
    return(
      <div style={{"borderStyle": `${border}`, "borderColor": "red", "borderRadius": "5px"}}>
        <li>
          <h3>{this.props.scene.name}</h3>
          <button onClick={this.handleClick}>Select</button>
        </li>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    selectedScene: state.selectedScene
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectScene: selectScene,
    deselectScene: deselectScene
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SceneCard)
