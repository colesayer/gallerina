import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectScene, deselectScene, deleteScene } from '../../actions/scenes.js'
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

  handleDelete = () => {
    const params = {user: this.props.user.id, scene: this.props.scene.id}
    this.props.deleteScene(params)
  }

  render(){
    console.log("in scenecard:", this.props.scene)
    let border = "1px solid black"
    if(this.props.selectedScene.id === this.props.scene.id){
      border = "5px dashed red"
    } else {
      border = "1px solid black"
    }

    let bool = this.state.imageSelected

    return(
        <li style={{"border": `${border}`}}>
          <h1>{this.props.scene.name}</h1>
          <img src={this.props.scene.image} onClick={this.handleImageSelect} style={{"width": "150px", "margin": "0 auto", "border": "1px solid black"}}/>
          <div id="scene-buttons">
            <p>
            <button onClick={this.handleClick} style={{"margin": "0 auto"}}className="select-button">Load</button>
            </p>
            <p>
            <button onClick={this.handleDelete} className="link-button" style={{"color": "blue", "fontSize": "small", "marginBottom": "10px", "margin": "0 auto"}}>Delete</button>
            </p>
          </div>
          <Modal
            isOpen={bool}
            onRequestClose={this.handleImageClose}
            contentLabel="Modal"
            style={{overlay : {}, content : {postion: 'relative', margin: '0 auto'}}}
          >
            <button onClick={this.handleDownload} className="select-button" style={{"float": "right"}}>Download</button>
            <img src={this.props.scene.image}/>
          </Modal>
        </li>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    selectedScene: state.selectedScene,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectScene: selectScene,
    deselectScene: deselectScene,
    deleteScene: deleteScene
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SceneCard)
