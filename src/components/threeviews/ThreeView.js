import React, { Component } from 'react';
import * as THREE from 'three';
import TrackballControls from '../../ref/trackball.js'
import { threeArtwork } from './ThreeArtwork.js'
import { threeGallery } from './ThreeGallery.js'

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

  //CREATE CANVAS
  this.canvas = document.createElement('div')
  this.canvas.setAttribute("id", "Canvas")

  this.canvasContainer = document.getElementById('CanvasContainer')
  this.canvasContainer.appendChild(this.canvas)

  this.canvasArea = this.canvas.getBoundingClientRect()

  this.selectedArtwork
  this.artworkArray = [];
  this.controlsArray = [];
  this.INTERSECTED


  //RENDERER
  this.renderer = new THREE.WebGLRenderer({antialias: true})
    this.renderer.setClearColor(0xffffff, 1)
    this.renderer.setSize(this.canvasArea.width, this.canvasArea.height);
    this.renderer.domElement.style.zIndex = 5;
    // this.renderer.shadowMapEnabled = true
    // this.renderer.shadowMapType = THREE.PCFSoftShadowMap;
    this.canvas.appendChild(this.renderer.domElement);

  //CAMERA
  this.camera = new THREE.PerspectiveCamera(50, this.canvasArea.width / this.canvasArea.height, 1, 100000);
    this.camera.position.set(0, 500, 1500)
    // {x: 9.498041602691048, y: 289.94291071603584, z: 1365.8826499929608}
    // this.camera.up = new THREE.Vector3(0,0,0)
    // this.camera.lookAt(new THREE.Vector3(0, 0, 0))


  //CONTROLS
  this.controls = new TrackballControls(this.camera, this.canvas);
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.0;
    this.controls.panSpeed = 1.0;
    this.controls.noZoom = false;
    this.controls.noPan = false;
    this.controls.staticMoving = false;
    this.controls.dynamicDampingFactor = 0.3;

    //RotateControl
    var plane;
    var selectedObject;
    var projector = new THREE.Projector();
    var offset = new THREE.Vector3();


    plane = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000, 18, 18), new THREE.MeshBasicMaterial() );
    plane.visible = false;

    // this.canvas.onmousemove = mouseMoveFxn.bind(this)
    // function mouseMoveFxn(event) {
    //   event.preventDefault()
    //
    //   var boundingRect = this.canvas.getBoundingClientRect();
    //   var x = (event.clientX - boundingRect.left)
    //   var y = (event.clientY - boundingRect.top)
    //
    //   var mouse_x = ( (x / this.canvasArea.width) * 2 - 1);
    //   var mouse_y = - ( y / this.canvasArea.height) * 2 + 1;
    //
    //   var vector = new THREE.Vector3( mouse_x, mouse_y, 0.5)
    //   vector.unproject(this.camera)
    //
    //   var raycaster = new THREE.Raycaster( this.camera.position, vector.sub( this.camera.position ).normalize() );
    //
    //     var intersects = raycaster.intersectObjects(this.artworkArray, true)
    //     if ( intersects.length > 0 ) {
    //       if ( this.INTERSECTED != intersects[ 0 ].object ) {
    //         if (this.INTERSECTED) this.INTERSECTED.parent.children[1].visible = this.INTERSECTED.current
    //
    //          this.INTERSECTED = intersects[0].object
    //          this.INTERSECTED.current = this.INTERSECTED.parent.children[1].visible
    //          this.INTERSECTED.parent.children[1].visible = true
    //
    //
    //
    //         //  if (this.INTERSECTED) this.INTERSECTED.parent.children[1].visible = true
    //       //    this.INTERSECTED.parent.children[1].visible = true
    //         // this.INTERSECTED.current = true
    //         // this.INTERSECTED.current = (this.INTERSECTED.parent.children[1].visible === false) ? (this.INTERSECTED.parent.children[1].visible = true) : (this.INTERSECTED.parent.children[1].visible = false)
    //       // plane.position.copy( intersects[0].object.position);
    //       // plane.lookAt( this.camera.position );
    //       // console.log()
    //       // intersects[0].object.parent.children[1].visible = true
    //       // console.log("if", this.INTERSECTED)
    //     }
    //     } else {
    //       if ( this.INTERSECTED ) this.INTERSECTED.parent.children[1].visible = this.INTERSECTED.current
    //
		// 			this.INTERSECTED = null;
    //       // console.log("else", this.INTERSECTED)
    //   }
    // }
    //
    // this.canvas.onmousedown = mouseDownFxn.bind(this)
    // function mouseDownFxn(event) {
    //   event.preventDefault()
    //
    //   var boundingRect = this.canvas.getBoundingClientRect();
    //
    //   var x = (event.clientX - boundingRect.left)
    //   var y = (event.clientY - boundingRect.top)
    //
    //   var mouse_x = ( (x / this.canvasArea.width) * 2 - 1);
    //   var mouse_y = - ( y / this.canvasArea.height) * 2 + 1;
    //
    //
    //   var vector = new THREE.Vector3(mouse_x, mouse_y, 0.5);
    //   vector.unproject(this.camera);
    //   var raycaster = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize());
    //   var intersects = raycaster.intersectObjects(this.artworkArray, true)
    //
    //   if (intersects.length > 0) {
    //     // intersects[0].object.rotation.y += Math.PI/2
    //     console.log(intersects[0])
    //     // intersects = raycaster.intersectObject(plane);
    //     // offset.copy(intersects[0].point).sub(plane.position)
    //   }
    // }

    // this.canvas.onmouseup = mouseUpFxn.bind(this)
    // function mouseUpFxn(event) {
    //   event.preventDefault()
    //   this.controls.enabled = true;
    //   selectedObject = null;
    // }





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



  //PAINTING OBJECTS

  this.props.artworks.forEach((artwork, idx) => {
    threeArtwork(artwork, idx, this.camera, this.canvas, this.scene, this.addToArray, this.addToControlsArray )
    console.log("in painting Objs", this.artworkArray)
  })

  //GALLERY OBJECT
  const dimX = (this.props.gallery.dim_x)
  const dimY = (this.props.gallery.dim_y)
  const dimZ = (this.props.gallery.dim_z)

  const {
    dim_x,
    dim_y,
    dim_z,
    floor_texture,
    wall_color
  } = this.props.gallery

  threeGallery(dimX, dimY, dimZ, floor_texture, wall_color, this.scene)

  this.start()

  }

  componentWillUnmount() {
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

onKeyPressed = (e) => {
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
    case 67:
      this.camera.up.set( 0, 0, 0 );
      this.camera.position.set(0, 500, 1500)
      break
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

export default ThreeView
