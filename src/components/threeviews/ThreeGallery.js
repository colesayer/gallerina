import * as THREE from 'three';

export function threeGallery(gallery, scene, addToWallsArray, addToGalleryBoxArray){

  var galleryGroup = new THREE.Group()
  galleryGroup.name = gallery

  var boxGroup = new THREE.Group()
  boxGroup.name = "galleryBox"


  //FOR ROOM DIMS
  const dimX = (gallery.dim_x * 5)
  const dimY = (gallery.dim_y * 5)
  const dimZ = (gallery.dim_z * 5)

  //FLOOR
  const floorImageUrl = gallery.floor_texture
  const floorLoader = new THREE.TextureLoader();
    floorLoader.load(floorImageUrl, (texture) => {
      const floorGeometry = new THREE.PlaneGeometry( dimX, dimY)
      const floorMaterial = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5})
      const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
      floorMesh.position.y = 0;
      floorMesh.rotation.x = - Math.PI / 2;
      floorMesh.name="floor"
      // let floorBox = new THREE.BoxHelper( floorMesh );
      // scene.add(floorBox);
      galleryGroup.add(floorMesh)
      // addToGalleryBoxArray(floorBox)
      // boxGroup.add(floorBox)
    })

    const wallMaterial = new THREE.MeshLambertMaterial({color: `${gallery.wall_color}` })

    var degra = (degree) => {
      return degree*(Math.PI/180);
    }

    //LEFT WALL
    const leftWall = new THREE.Mesh( new THREE.PlaneGeometry( dimY, dimZ ), wallMaterial );
    leftWall.side = THREE.DoubleSide;
    leftWall.position.y =  (dimZ/2);
    leftWall.position.x = -(dimX/2);
    leftWall.rotation.y = degra(90);
    leftWall.name = "leftWall"
    // let leftWallBox = new THREE.BoxHelper( leftWall );
    galleryGroup.add(leftWall)
    // addToGalleryBoxArray(leftWallBox)
    // boxGroup.add(leftWallBox)

    //RIGHT WALL
    const rightWall = new THREE.Mesh( new THREE.PlaneGeometry( dimY, dimZ), wallMaterial );
    rightWall.side = THREE.DoubleSide;
    rightWall.position.y =  (dimZ/2);
    rightWall.position.x =  (dimX/2);
    rightWall.rotation.y =  - Math.PI / 2;
    rightWall.name = "rightWall"
    // let rightWallBox = new THREE.BoxHelper( rightWall );
    // scene.add(rightWallBox)
    galleryGroup.add(rightWall)
    // addToGalleryBoxArray(rightWallBox)
    // boxGroup.add(rightWallBox)

    //FAR WALL
    const farWall = new THREE.Mesh( new THREE.PlaneGeometry( dimX, dimZ ), wallMaterial );
    farWall.side = THREE.DoubleSide;
    farWall.position.y =   (dimZ/2);
    farWall.position.x =   0;
    farWall.position.z =  -(dimY/2);
    farWall.rotation.x = - degra(0);
    farWall.name = "farWall"
    // let farWallBox = new THREE.BoxHelper( farWall )
    // scene.add(farWallBox)
    galleryGroup.add(farWall)
    // addToGalleryBoxArray(farWallBox)
    // boxGroup.add(farWallBox)
    //NEAR WALL
    // const nearWall = new THREE.Mesh( new THREE.PlaneGeometry( dimX, dimZ), wallMaterial );
    //      nearWall.side = THREE.DoubleSide;
    //      nearWall.position.y =   (dimZ/2);
    //      nearWall.position.x =   0;
    //      nearWall.position.z =   (dimY/2);
    //      nearWall.rotation.x = - degra(0);
    // nearWall.receiveShadow = true
    //      scene.add( nearWall );








      addToWallsArray(galleryGroup)

      scene.add(galleryGroup)
      // scene.add(boxGroup)

}
