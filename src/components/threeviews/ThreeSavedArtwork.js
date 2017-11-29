import * as THREE from 'three'
var TransformControls = require('../../../node_modules/three-transform-controls')(THREE);


export function threeSavedArtwork(artwork, camera, canvas, scene, addToArray, addToControlsArray){

      let paintingControls = new TransformControls(camera, canvas)
      paintingControls.attach(artwork)
      paintingControls.visible = false

      let group = new THREE.Group()
      group.add(artwork)
      group.add(paintingControls)
      group.name = "artwork"

      addToArray(artwork)
      addToControlsArray(paintingControls)

      console.log("IN savedArtwork", group)

      scene.add(group)

}
