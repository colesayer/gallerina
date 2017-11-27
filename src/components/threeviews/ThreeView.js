import React, { Component } from 'react';
import * as THREE from 'three';
import TrackballControls from '../../ref/trackball.js'
import { threeArtwork } from './ThreeArtwork.js'
import { threeGallery } from './ThreeGallery.js'

class ThreeView extends Component{

  componentDidMount(){

  //CREATE CANVAS
  this.canvas = document.createElement('div')
  this.canvas.setAttribute("id", "Canvas")

  this.canvasContainer = document.getElementById('CanvasContainer')
  this.canvasContainer.appendChild(this.canvas)

  this.canvasArea = this.canvas.getBoundingClientRect()


  //RENDERER
  const renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setClearColor(0xffffff, 1)
    renderer.setSize(this.canvasArea.width, this.canvasArea.height);
    renderer.domElement.style.zIndex = 5;
    this.canvas.appendChild(renderer.domElement);

  //CAMERA
  this.camera = new THREE.PerspectiveCamera(50, this.canvasArea.width / this.canvasArea.height, 1, 100000);
    this.camera.position.set(0, 0, 300)
    // this.camera.up = new THREE.Vector3(0,0,0)
    // this.camera.lookAt(new THREE.Vector3(0, 0, 0))


  //CONTROLS
  const controls = new TrackballControls(this.camera, this.canvas);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.0;
    controls.panSpeed = 1.0;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.3;





  //SCENE
  this.scene = new THREE.Scene();


  //LIGHT1
  const keyLight = new THREE.AmbientLight(0xffffff, 0.5)
    this.scene.add(keyLight);

  //LIGHT2
  const pointLight = new THREE.PointLight(0xffffff, 0.5)
    pointLight.position.set(0, 0, 500)
    this.scene.add(pointLight);



  //PAINTING OBJECTS

  this.props.artworks.forEach((artwork, idx) => {
    threeArtwork(artwork, idx, this.camera, this.canvas, this.scene)
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




  //RENDER LOOP
  requestAnimationFrame(renderScene.bind(this))

  function renderScene(){
    controls.update()
    renderer.render(this.scene, this.camera);
    requestAnimationFrame(renderScene.bind(this));

    }



  }

  render(){
    return(
      <div></div>
    )
  }
}

export default ThreeView

//FLOOR WORKING
// const theFloor = new THREE.Mesh( new THREE.PlaneGeometry( dimX, dimY), floorMaterial );
//     theFloor.position.y = 0;
//     theFloor.rotation.x = - Math.PI / 2;
//     //theFloor.side = THREE.DoubleSide;
//     this.scene.add( theFloor );
//
// const wallMaterial = new THREE.MeshLambertMaterial({color: "#42f45f" })
//
// var degra = (degree) => {
//   return degree*(Math.PI/180);



//   var loader = new THREE.TextureLoader();
// loader.load('texture.png', function ( texture ) {
//   var geometry = new THREE.SphereGeometry(1000, 20, 20);
//   var material = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5});
//   var mesh = new THREE.Mesh(geometry, material);
//   this.scene.add(mesh);
// });
