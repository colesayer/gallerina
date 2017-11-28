import * as THREE from 'three'

export function threeGallery(x, y, z, floorImage, wallColor, scene, ){
  //FOR ROOM DIMS
  const dimX = (x * 5)
  const dimY = (y * 5)
  const dimZ = (z * 5)

  //FLOOR

  const floorImageUrl = floorImage

  const floorLoader = new THREE.TextureLoader();
    floorLoader.load(floorImageUrl, (texture) => {
      const floorGeometry = new THREE.PlaneGeometry( dimX, dimY)
      const floorMaterial = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5})
      const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
        floorMesh.position.y = 0;
        floorMesh.rotation.x = - Math.PI / 2;
        // floorMesh.receiveShadow = true
      scene.add(floorMesh)
    })

    const wallMaterial = new THREE.MeshLambertMaterial({color: `${wallColor}` })

    var degra = (degree) => {
      return degree*(Math.PI/180);
    }


    //LEFT WALL
    const leftWall = new THREE.Mesh( new THREE.PlaneGeometry( dimY, dimZ ), wallMaterial );
           leftWall.side = THREE.DoubleSide;
           leftWall.position.y =  (dimZ/2);
           leftWall.position.x = -(dimX/2);
           leftWall.rotation.y = degra(90);
          //  leftWall.receiveShadow = true
           scene.add( leftWall );

     //RIGHT WALL
     const rightWall = new THREE.Mesh( new THREE.PlaneGeometry( dimY, dimZ), wallMaterial );
         rightWall.side = THREE.DoubleSide;
         rightWall.position.y =  (dimZ/2);
         rightWall.position.x =  (dimX/2);
         rightWall.rotation.y =  - Math.PI / 2;
        //  rightWall.receiveShadow = true
         scene.add( rightWall );

      //FAR WALL
      const farWall = new THREE.Mesh( new THREE.PlaneGeometry( dimX, dimZ ), wallMaterial );
           farWall.side = THREE.DoubleSide;
           farWall.position.y =   (dimZ/2);
           farWall.position.x =   0;
           farWall.position.z =  -(dimY/2);
           farWall.rotation.x = - degra(0);
          //  farWall.receiveShadow = true
           scene.add( farWall );

      //NEAR WALL
      // const nearWall = new THREE.Mesh( new THREE.PlaneGeometry( dimX, dimZ), wallMaterial );
      //      nearWall.side = THREE.DoubleSide;
      //      nearWall.position.y =   (dimZ/2);
      //      nearWall.position.x =   0;
      //      nearWall.position.z =   (dimY/2);
      //      nearWall.rotation.x = - degra(0);
              // nearWall.receiveShadow = true
      //      scene.add( nearWall );

}
