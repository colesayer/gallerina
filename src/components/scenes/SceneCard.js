import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectScene, deselectScene } from '../../actions/scenes.js'
import Modal from 'react-modal'

class SceneCard extends Component{

  state = {
    imageSelected: false
  }

  handleClick = (e) => {
    e.preventDefault()

    if(this.props.selectedScene.id !== this.props.scene.id){
      this.props.selectScene(this.props.scene)
    } else {
      this.props.deselectScene()
    }
  }

  handleImageSelect = () => {
    this.setState({imageSelected: true})
  }

  handleImageClose = () => {
    this.setState({imageSelected: false})
  }

  handleDownload = () => {
    var link = document.createElement('a');
    link.href = this.props.scene.image
    link.download = 'Render.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link)
  }

  render(){
    console.log("in scenecard:", this.props.scene)
    let border
    if(this.props.selectedScene.id === this.props.scene.id){
      border = "dashed"
    } else {
      border = "none"
    }

    let bool = this.state.imageSelected

    return(
      <div style={{"borderStyle": `${border}`, "borderColor": "red", "borderRadius": "5px"}}>
        <li>
          <h3>{this.props.scene.name}</h3>
          <img src={this.props.scene.image} onClick={this.handleImageSelect} style={{"width": "150px", "margin": "0 auto", "border": "1px solid black"}}/>
          <p><button onClick={this.handleClick} style={{"margin": "0 auto"}}>Load Scene</button></p>
          <Modal
            isOpen={bool}
            onRequestClose={this.handleImageClose}
            contentLabel="Modal"
            style={{overlay : {}, content : {postion: 'relative', margin: '0 auto'}}}
          >
            <button onClick={this.handleDownload} style={{"float": "right"}}>Download</button>
            <img src={this.props.scene.image}/>
          </Modal>
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
