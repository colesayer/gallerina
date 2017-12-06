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
          <img src={this.props.scene.image} style={{"width": "150px", "margin": "0 auto", "border": "1px solid black"}}/>
          <p><button onClick={this.handleClick} style={{"margin": "0 auto"}}>Load Scene</button></p>
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
