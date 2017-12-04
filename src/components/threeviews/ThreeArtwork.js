import * as THREE from 'three'
var TransformControls = require('../../../node_modules/three-transform-controls')(THREE);


export function threeArtwork(artwork, idx, camera, canvas, scene, addToArray, addToPaintingBoxArray, addToControlsArray, wallDimX, wallDimY, wallDimZ){

  //FOR PAINTING DIMS
  const ptgDimX = (artwork.dim_x * 5)
  const ptgDimY = (artwork.dim_y * 5)
  const ptgDimZ = 10

  const paintingImageUrl = artwork.image_url

  let paintingLoader = new THREE.TextureLoader()
    paintingLoader.load(paintingImageUrl, ( texture ) => {
      let paintingGeometry = new THREE.BoxGeometry(ptgDimX, ptgDimY, ptgDimZ)
      let paintingMaterial = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5});
      let borderMaterial = new THREE.MeshLambertMaterial({color: "#ffffff"});

      let materials = [
        borderMaterial, borderMaterial, borderMaterial, borderMaterial, paintingMaterial, borderMaterial
      ]

      const positionWidth = () => {
      var wallX = (wallDimX * 5) / 2
      var minX = Math.ceil((-wallX) + (ptgDimX/2))
      var maxX = Math.floor(wallX - (ptgDimX/2))

      return Math.floor(Math.random() * (maxX - minX)) + minX

      }

      const positionDepth = () => {
      var wallY = (wallDimY * 5) / 2
      var minY = Math.ceil((-wallY) + (ptgDimZ/2))
      var maxY = Math.floor((wallY - (ptgDimZ/2)))

      return Math.floor(Math.random() * (maxY - minY)) + minY
      }

      const positionHeight = () => {
        var wallZ = (wallDimZ * 5)
        var minZ = Math.ceil((0 + (ptgDimY/2)))
        var maxZ = Math.floor((wallZ - (ptgDimY/2)))

        return Math.floor(Math.random() * (maxZ - minZ)) + minZ
      }


      let paintingMesh = new THREE.Mesh(paintingGeometry, materials)
      paintingMesh.position.set(

        positionWidth(), positionHeight(), positionDepth()
        // Math.random() * 950 - 475,
        // Math.random() * 800 - 400
      )
      // paintingMesh.castShadow = true
      paintingMesh.name = artwork

      //BOUNDING BOX
      // var paintingBox = new THREE.BoxHelper( paintingMesh );
      // scene.add(paintingBox)



      let paintingControls = new TransformControls(camera, canvas)
      paintingControls.attach(paintingMesh)
      // paintingControls.attach(paintingBox)
      paintingControls.name = "controls"
      paintingControls.visible = false

      console.log("in threeartwork", paintingControls)

      addToArray(paintingMesh)
      // addToPaintingBoxArray(paintingBox)
      addToControlsArray(paintingControls)

      let group = new THREE.Group()
      group.add(paintingMesh)
      group.add(paintingControls)
      // group.add(paintingBox)
      group.name = "artwork"


      console.log("IN ARTWORK", group)

      scene.add(group)
    })

}
