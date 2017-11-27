import * as THREE from 'three'
var TransformControls = require('../../../node_modules/three-transform-controls')(THREE);


export function threeArtwork(artwork, idx, camera, canvas, scene){
  console.log("in threeArtworks:", artwork)

  //FOR PAINTING DIMS
  const ptgDimX = artwork.dim_x
  const ptgDimY = artwork.dim_y
  const ptgDimZ = 2

  const paintingImageUrl = artwork.image_url

  let paintingLoader = new THREE.TextureLoader()
    paintingLoader.load(paintingImageUrl, ( texture ) => {
      const x = (ptgDimX * 5)
      const y = (ptgDimY * 5)
      const z = (ptgDimZ * 5)
      let paintingGeometry = new THREE.BoxGeometry(x, y, z)
      let paintingMaterial = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5});
      let borderMaterial = new THREE.MeshLambertMaterial({color: "#ffffff"});

      let materials = [
        borderMaterial, borderMaterial, borderMaterial, borderMaterial, paintingMaterial, borderMaterial
      ]

//       "If you want the conceptual origin to be somewhere other than (0, 0, 0), put your mesh in an Object3D and translate it such that the conceptual center of the mesh is at the Object3D's origin."
// This advice saved me so much time. Thanks a ton eric-wieser!

      let paintingMesh = new THREE.Mesh(paintingGeometry, materials)
        paintingMesh.position.set(
          Math.random() * 1000 - 500,
          Math.random() * 950 - 475,
          Math.random() * 800 - 400)

      let paintingControls = new TransformControls(camera, canvas)
        paintingControls.attach(paintingMesh)

      let group = new THREE.Group()
        group.add(paintingMesh)
        group.add(paintingControls)


      scene.add(group)
    })

}
