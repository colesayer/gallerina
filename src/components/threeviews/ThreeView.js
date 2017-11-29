import React, { Component } from 'react';
import * as THREE from 'three';
import TrackballControls from '../../ref/trackball.js'
import { threeArtwork } from './ThreeArtwork.js'
import { threeGallery } from './ThreeGallery.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { saveScene, clearArtworkSelection } from '../../actions/threeviews.js'
import { threeSavedArtwork } from './ThreeSavedArtwork.js'

class ThreeView extends Component{

  constructor(props){
    super(props)

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
  }



  componentDidMount(){

  document.addEventListener("keydown", this.onKeyPressed.bind(this))
  document.addEventListener("keyup", this.onKeyUp.bind(this))

  this.selectedArtwork
  this.artworkArray = [];
  this.controlsArray = [];
  this.wallsArray = [];

  //CREATE CANVAS
  this.canvas = document.createElement('div')
  this.canvas.setAttribute("id", "Canvas")
  this.canvasContainer = document.getElementById('CanvasContainer')
  this.canvasContainer.appendChild(this.canvas)
  this.canvasArea = this.canvas.getBoundingClientRect()

  //RENDERER
  this.renderer = new THREE.WebGLRenderer({antialias: true})
  this.renderer.setClearColor(0xffffff, 1)
  this.renderer.setSize(this.canvasArea.width, this.canvasArea.height);
  this.renderer.domElement.style.zIndex = 5;
  this.canvas.appendChild(this.renderer.domElement);

  //CAMERA
  this.camera = new THREE.PerspectiveCamera(50, this.canvasArea.width / this.canvasArea.height, 1, 100000);
  this.camera.position.set(0, 500, 1500)

  //CONTROLS
  this.controls = new TrackballControls(this.camera, this.canvas);
  this.controls.rotateSpeed = 1.0;
  this.controls.zoomSpeed = 1.0;
  this.controls.panSpeed = 1.0;
  this.controls.noZoom = false;
  this.controls.noPan = false;
  this.controls.staticMoving = false;
  this.controls.dynamicDampingFactor = 0.3;

  //SCENE
  this.scene = new THREE.Scene();

  //LIGHT1
  const keyLight = new THREE.AmbientLight(0xffffff, 0.5)
    // keyLight.castShadow = true
    this.scene.add(keyLight);

  //LIGHT2
  const pointLight = new THREE.PointLight(0xffffff, 0.5)
    pointLight.position.set(0, 0, 300)
    // pointLight.castShadow = true
    this.scene.add(pointLight);



  //GALLERY OBJECT
  // const dim_x = (this.props.gallery.dim_x)
  // const dim_y = (this.props.gallery.dim_y)
  // const dim_z = (this.props.gallery.dim_z)

  const {
    dim_x,
    dim_y,
    dim_z,
    floor_texture,
    wall_color
  } = this.props.gallery

  threeGallery(dim_x, dim_y, dim_z, floor_texture, wall_color, this.scene, this.addToWallsArray)

  //New Paintings
  this.props.artworks.forEach((artwork, idx) => {
    console.log("in Painting Objects:", this.wallsArray)
    threeArtwork(artwork, idx, this.camera, this.canvas, this.scene, this.addToArray, this.addToControlsArray, dim_x, dim_y, dim_z )
  })

  //Saved Paintings
  this.props.scene.forEach(artwork => {
    threeSavedArtwork(artwork, this.camera, this.canvas, this.scene, this.addToArray, this.addToControlsArray)
  })


  var geometry = new THREE.SphereGeometry( 5, 32, 32 );
  var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
  var sphere = new THREE.Mesh( geometry, material );
  this.scene.add( sphere );






  this.start()

  }

  componentWillUnmount() {
    var filteredScene = this.scene.children.filter(child => (child.name === "artwork"))
    console.log("IN UNMOUNT", filteredScene)

    var paintingsToSave = []
    for(let i = 0; i < filteredScene.length; i++){
      paintingsToSave.push(filteredScene[i].children[0])
    }
    // var filteredPaintings = filteredScene.filter(child => (child.children[0].name === "painting"))
    // console.log("IN UNMOUNT", filteredPaintings)
    this.props.saveScene(paintingsToSave)
    this.props.clearArtworkSelection()
    this.stop()
    this.canvas.removeChild(this.renderer.domElement)
    this.canvasContainer.removeChild(this.canvas)
  }

start(){
  if (!this.frameId) {
  this.frameId = requestAnimationFrame(this.animate)
  }
}

stop(){
  cancelAnimationFrame(this.frameId)
}

animate(){
  // if(this.artworkArray)console.log(this.artworkArray)
  this.controls.update()
  this.renderer.render(this.scene, this.camera)
  this.frameId = window.requestAnimationFrame(this.animate)
}

addToArray = (obj) => {
  this.artworkArray.push(obj)
}

addToControlsArray = (obj) => {
  this.controlsArray.push(obj)
}

addToWallsArray = (obj) => {
  this.wallsArray.push(obj)
}

onKeyPressed = (e) => {
if (e.which === 67){
  this.camera.up.set( 0, 0, 0 );
  this.camera.position.set(0, 500, 1500)
  this.controls.reset()
  return
}
this.controlsArray.forEach(control => {
  switch(e.which){
    case 82:
      control.visible = true
      control.setMode("rotate")
      control.setSize(.5)
      control.setRotationSnap( THREE.Math.degToRad( 15 ) )
      break
    case 84:
      control.visible = true
      control.setSize(.5)
      control.setMode("translate")
      break
    // case 67:
    //   this.camera.up.set( 0, 0, 0 );
    //   this.camera.position.set(0, 500, 1500)
    //   this.controls.reset()
    //   break
  }
 })
 }

 onKeyUp = (e) => {
 this.controlsArray.forEach(control => {
   switch(e.which){
     case 82:
       control.visible = false
       break
     case 84:
       control.visible = false
       break
   }
  })
  }


  render(){
    return(
      <div>
      <p>"T" for translate controls || "R" for rotate controls || "C" to reset camera</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    scene: state.scene
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    saveScene: saveScene,
    clearArtworkSelection: clearArtworkSelection,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ThreeView)
