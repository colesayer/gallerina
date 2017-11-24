import React, { Component } from 'react';
import * as THREE from 'three';
import TrackballControls from '../ref/trackball.js'


// var THREE = require("threejs-full-es6")
// import TransformControls from '../../node_modules/three/examples/js/controls/TransformControls'

var TransformControls = require('../../node_modules/three-transform-controls')(THREE);



class ThreeGallery extends Component{


  componentDidMount(){
    console.log("we're in")




  //CREATE CANVAS
  this.canvas = document.createElement('div')
  this.canvas.setAttribute("id", "Canvas")

  this.canvasContainer = document.getElementById('CanvasContainer')
  this.canvasContainer.appendChild(this.canvas)

  this.canvasArea = this.canvas.getBoundingClientRect()


  //FOR ROOM DIMS
  const dimX = 450
  const dimY = 873
  const dimZ = 1000

  //FOR PAINTING DIMS
  const ptgDimX = 48
  const ptgDimY = 72
  const ptgDimZ = 2


  //RENDERER
  const renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setClearColor(0xffffff, 1)
    renderer.setSize(this.canvasArea.width, this.canvasArea.height);
    renderer.domElement.style.zIndex = 5;
    this.canvas.appendChild(renderer.domElement);

  //CAMERA
  const camera = new THREE.PerspectiveCamera(50, this.canvasArea.width / this.canvasArea.height, 1, 100000);
    camera.position.set(0, 0, 300)
    // camera.up = new THREE.Vector3(0,0,0)
    // camera.lookAt(new THREE.Vector3(0, 0, 0))


  //CONTROLS
  const controls = new TrackballControls(camera, this.canvas);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.0;
    controls.panSpeed = 1.0;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.3;





  //SCENE
  const scene = new THREE.Scene();

  //LIGHT1
  const keyLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(keyLight);

  //LIGHT2
  const pointLight = new THREE.PointLight(0xffffff, 0.5)
    pointLight.position.set(0, 0, 500)
    scene.add(pointLight);



  //PAINTING OBJECT

  const paintingImageUrl = 'https://res.cloudinary.com/dwnehv6tb/image/upload/v1511464932/mw7ojvvgafovcvnewmuj.jpg'

  let paintingLoader = new THREE.TextureLoader()
    paintingLoader.load(paintingImageUrl, ( texture ) => {
      const x = (ptgDimX * 5)
      const y = (ptgDimY * 5)
      const z = (ptgDimZ * 5)
      let paintingGeometry = new THREE.BoxGeometry(x, y, z)
      let paintingMaterial = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5});
      let borderMaterial = new THREE.MeshBasicMaterial({color: "#ffffff"});

      let materials = [
        borderMaterial, borderMaterial, borderMaterial, borderMaterial, paintingMaterial, borderMaterial
      ]

//       "If you want the conceptual origin to be somewhere other than (0, 0, 0), put your mesh in an Object3D and translate it such that the conceptual center of the mesh is at the Object3D's origin."
// This advice saved me so much time. Thanks a ton eric-wieser!

      let paintingMesh = new THREE.Mesh(paintingGeometry, materials)
        paintingMesh.position.set(0, 250, 0)

      let paintingControls = new TransformControls(camera, this.canvas)
        paintingControls.attach(paintingMesh)

      let group = new THREE.Group()
        group.add(paintingMesh)
        group.add(paintingControls)


      scene.add(group)
    })


  const floorImageUrl = 'https://res.cloudinary.com/dwnehv6tb/image/upload/v1511459302/qsrgvseoqnusngtalbkc.jpg'

//FLOOR

const floorLoader = new THREE.TextureLoader();
  floorLoader.load(floorImageUrl, function (texture) {
    const floorGeometry = new THREE.PlaneGeometry( dimX, dimY)
    const floorMaterial = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5})
    const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
      floorMesh.position.y = 0;
      floorMesh.rotation.x = - Math.PI / 2;
    scene.add(floorMesh)
  })

  const wallMaterial = new THREE.MeshLambertMaterial({color: "#42f45f" })

  var degra = (degree) => {
    return degree*(Math.PI/180);
  }


  //LEFT WALL
  const leftWall = new THREE.Mesh( new THREE.PlaneGeometry( dimY, dimZ ), wallMaterial );
         leftWall.side = THREE.DoubleSide;
         leftWall.position.y =  (dimZ/2);
         leftWall.position.x = -(dimX/2);
         leftWall.rotation.y = degra(90);
         scene.add( leftWall );

   //RIGHT WALL
   const rightWall = new THREE.Mesh( new THREE.PlaneGeometry( dimY, dimZ), wallMaterial );
       rightWall.side = THREE.DoubleSide;
       rightWall.position.y =  (dimZ/2);
       rightWall.position.x =  (dimX/2);
       rightWall.rotation.y =  - Math.PI / 2;
       scene.add( rightWall );

    //FAR WALL
    const farWall = new THREE.Mesh( new THREE.PlaneGeometry( dimX, dimZ ), wallMaterial );
         farWall.side = THREE.DoubleSide;
         farWall.position.y =   (dimZ/2);
         farWall.position.x =   0;
         farWall.position.z =  -(dimY/2);
         farWall.rotation.x = - degra(0);
         scene.add( farWall );

    //NEAR WALL
    // const nearWall = new THREE.Mesh( new THREE.PlaneGeometry( dimX, dimZ), wallMaterial );
    //      nearWall.side = THREE.DoubleSide;
    //      nearWall.position.y =   (dimZ/2);
    //      nearWall.position.x =   0;
    //      nearWall.position.z =   (dimY/2);
    //      nearWall.rotation.x = - degra(0);
    //      scene.add( nearWall );



  //RENDER LOOP
  requestAnimationFrame(render);

  function render(){
    controls.update()
    renderer.render(scene, camera);
    requestAnimationFrame(render);

    }


  }

  render(){
    return(
      <div></div>
    )
  }
}

export default ThreeGallery

//FLOOR WORKING
// const theFloor = new THREE.Mesh( new THREE.PlaneGeometry( dimX, dimY), floorMaterial );
//     theFloor.position.y = 0;
//     theFloor.rotation.x = - Math.PI / 2;
//     //theFloor.side = THREE.DoubleSide;
//     scene.add( theFloor );
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
//   scene.add(mesh);
// });
