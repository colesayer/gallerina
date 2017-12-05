import React, { Component } from 'react';
import * as THREE from 'three';
import TrackballControls from '../../ref/trackball.js'
import { threeArtwork } from './ThreeArtwork.js'
import { threeGallery } from './ThreeGallery.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { saveArtworks, clearArtworkSelection, saveScene } from '../../actions/threeviews.js'
import { threeSavedArtwork } from './ThreeSavedArtwork.js'

class ThreeView extends Component{

  constructor(props){
    super(props)

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
  }



  componentDidMount(){

  console.log("in threeView", this.props.artworks)

  document.addEventListener("keydown", this.onKeyPressed.bind(this))
  document.addEventListener("keyup", this.onKeyUp.bind(this))

  this.artworkArray = [];
  this.paintingBoxArray = [];
  this.galleryBoxArray = [];
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
  // this.renderer.preserveDrawingBuffer = true
  this.canvas.appendChild(this.renderer.domElement);

  //CAMERA
  this.camera = new THREE.PerspectiveCamera(60, this.canvasArea.width / this.canvasArea.height, 10, 100000);
  this.camera.position.set(0, 500, 1500)

  //RAYCASTER
  this.raycaster = new THREE.Raycaster()

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

  //PHYSICS


  //GALLERYOBJECT
  threeGallery(this.props.gallery, this.scene, this.addToWallsArray, this.addToGalleryBoxArray)


  //MAKE New Paintings
  this.props.artworks.forEach((artwork, idx) => {
    console.log("in Painting Objects:", this.wallsArray)
    threeArtwork(artwork, idx, this.camera, this.canvas, this.scene, this.addToArray, this.addToPaintingBoxArray, this.addToControlsArray, this.props.gallery.dim_x, this.props.gallery.dim_y, this.props.gallery.dim_z )
  })

  //LOAD Saved Paintings
  this.props.savedArtworks.forEach(artwork => {
    threeSavedArtwork(artwork, this.camera, this.canvas, this.scene, this.addToArray, this.addToControlsArray)
  })


  //CONSTRAIN PAINTING IN SPACE
  this.canvas.onmousemove = mouseMoveFxn.bind(this)
    function mouseMoveFxn(event) {
    event.preventDefault()

    if(this.artworkArray.length > 0 && this.wallsArray.length > 0){
      var walls = this.wallsArray[0].children

      var leftWall = walls[0]
      var rightWall = walls[1]
      var farWall = walls[2]
      var floor = walls[3]

      var leftWallBox = new THREE.Box3().setFromObject(leftWall)
      var rightWallBox = new THREE.Box3().setFromObject(rightWall)
      var farWallBox = new THREE.Box3().setFromObject(farWall)
      var floorBox = new THREE.Box3().setFromObject(floor)

    for(let i = 0; i < this.artworkArray.length; i++){
      var painting = this.artworkArray[i]
      var controls = this.controlsArray[i]
      var bbox = new THREE.Box3().setFromObject(painting)

      var offsetX = ((bbox.max.x - bbox.min.x) / 2)
      var offsetY = ((bbox.max.y - bbox.min.y) / 2)
      var offsetZ = ((bbox.max.z - bbox.min.z) / 2)

      if(bbox.intersectsBox(leftWallBox)){
          controls.detach()
          painting.position.set(((leftWall.position.x + offsetX) + 1), painting.position.y, painting.position.z)
          // painting.position.set(paintingOldPosition)
          controls.attach(painting)
          console.log("HIT")
        } else if(bbox.intersectsBox(rightWallBox)){
          controls.detach()
          painting.position.set(((rightWall.position.x - offsetX) - 1), painting.position.y, painting.position.z)
          controls.attach(painting)
        } else if(bbox.intersectsBox(farWallBox)){
          controls.detach()
          painting.position.set(painting.position.x, painting.position.y, ((farWall.position.z + offsetZ) + 1))
          controls.attach(painting)
        } else if(bbox.intersectsBox(floorBox)){
          controls.detach()
          painting.position.set(painting.position.x, ((floor.position.y + offsetY)+ 1), painting.position.z)
          controls.attach(painting)
        }
      // }
      }
    }
  }




  this.start()
  }

  componentWillUnmount() {
    var filteredArtworks = this.scene.children.filter(child => (child.name === "artwork"))
    var paintingsToSave = []
    for(let i = 0; i < filteredArtworks.length; i++){
      paintingsToSave.push(filteredArtworks[i].children[0])
    }

    var galleryToSave = this.scene.children[2].name.id

    var artworksToSave = []
    for(let i = 0; i < filteredArtworks.length; i++){
      var artwork = {gallery_id: galleryToSave, artwork_id: filteredArtworks[i].children[0].name.id, positionX: filteredArtworks[i].children[0].position.x, positionY: filteredArtworks[i].children[0].position.y, positionZ: filteredArtworks[i].children[0].position.z}
      artworksToSave.push(artwork)
    }

    console.log("IN UNMOUNT", "Scene to Save:", artworksToSave)



    this.props.saveScene(artworksToSave)
    this.props.saveArtworks(paintingsToSave)
    this.props.clearArtworkSelection()
    this.stop()
    // this.canvas.removeChild(this.renderer.domElement)
    // this.canvasContainer.removeChild(this.canvas)
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
  this.controls.update()
  this.renderer.render(this.scene, this.camera)
  this.frameId = window.requestAnimationFrame(this.animate)
}

addToArray = (obj) => {
  this.artworkArray.push(obj)
}

addToPaintingBoxArray = (obj) => {
  this.paintingBoxArray.push(obj)
}

addToGalleryBoxArray = (obj) => {
  this.galleryBoxArray.push(obj)
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
        this.controls.enabled = false
        break
      case 84:
        control.visible = true
        control.setSize(.5)
        control.setMode("translate")
        this.controls.enabled = false
        break
      default:
        break
    }
   })
 }

 onKeyUp = (e) => {
   this.controlsArray.forEach(control => {
     switch(e.which){
       case 82:
         control.visible = false
         this.controls.enabled = true
         break
       case 84:
         control.visible = false
         this.controls.enabled = true
         break
       default:
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
    savedArtworks: state.savedArtworks
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    saveArtworks: saveArtworks,
    clearArtworkSelection: clearArtworkSelection,
    saveScene: saveScene,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ThreeView)
