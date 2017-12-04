
<body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r75/three.js"></script>
<script src="http://alexan0308.github.io/threejs/examples/js/loaders/OBJLoader.js"></script>
<script src="http://alexan0308.github.io/threejs/examples/js/loaders/MTLLoader.js"></script>
<script src="http://alexan0308.github.io/threejs/examples/js/loaders/OBJMTLLoader.js"></script>


<script src="http://threejs.org/examples/js/controls/OrbitControls.js"></script>

<div id="workspace"></div>
<script>
//define global variables here
var container, renderer;
var camera, scene, projector, mouseVector, controls;
var mouseX, mouseY, draggable;
var pen, c_mesh, interactiveObj = [], rotateObj = [], groundRaycastObj = [];
var wallWidth = 1200;
var wallHeight = 400;
var chair_model, sofa_model;
var chair_selected = false;
var sofa_selected = false;

var raycaster;
var mouse = new THREE.Vector2(), INTERSECTED;
var radius = 100, theta = 0;
var oldIntersectPoint = new THREE.Vector3();
var newIntersectPoint = new THREE.Vector3();
var intersectOffset   = new THREE.Vector3();
var chairOldPosition = new THREE.Vector3();
var sofaOldPosition = new THREE.Vector3();

var chair_rotate = false;
var walls;
var mesh_box;
var wallright, wallleft, wallback, wallfront, ceiling, ground;
var strDownloadMime = "image/octet-stream";
var chairBox, sofaBox;
var wallrightBox, wallleftBox, wallbackBox, wallfrontBox;

init();
animate();

function init() {

    container = document.getElementById('workspace'); //document.createElement('div');

    document.body.appendChild(container);


    raycaster = new THREE.Raycaster();


    //walls
    walls = new THREE.Object3D();


    var groundGeo_2 = new THREE.PlaneGeometry(wallWidth, wallWidth); //for roof and floor
    var groundGeo = new THREE.PlaneGeometry(wallWidth, wallHeight);

    var wallTextureRight = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('textures/walls/rainbow.jpg')
    });
    wallTextureRight.map.needsUpdate = true;

    var wallTextureLeft = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('textures/walls/rainbow.jpg')
    });

    var wallTextureFront = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('textures/walls/wall4.jpg')
    });

    var wallTextureBack = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('textures/walls/wall3.png')
    });

    var floorTexture = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('textures/walls/floor.jpg')
    });
    floorTexture.map.needsUpdate = true;

    var ceilTexture = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('textures/walls/wall4.jpg')
    });

    ground = new THREE.Mesh(groundGeo_2, floorTexture);
    ground.overdraw = true;
    ground.position.set(0, 0, 0);
    ground.rotation.x = -Math.PI / 2;
    walls.add(ground);
    console.log(ground);

    wallleft = new THREE.Mesh(groundGeo, wallTextureLeft);
    wallleft.overdraw = true;
    wallleft.position.set(-wallWidth / 2, wallHeight / 2, 0);
    wallleft.rotation.y = Math.PI / 2;
    walls.add(wallleft);

    wallleftBox = new THREE.BoundingBoxHelper( wallleft );
    wallleftBox.update(wallleft);
        //wallleftBox.box.min.x -= 0.1;
    //wallleftBox.box.max.x += 0.1;
    //scene.add(wallleftBox);

    wallright = new THREE.Mesh(groundGeo, wallTextureRight);
    wallright.overdraw = true;
    wallright.position.set(wallWidth / 2, wallHeight / 2, 0);
    wallright.rotation.y = -Math.PI / 2;
    walls.add(wallright);

    wallrightBox = new THREE.BoundingBoxHelper( wallright );
    wallrightBox.update(wallright);
        //wallrightBox.box.min.x -= 0.1;
    //wallrightBox.box.max.x += 0.1;
    //scene.add(wallrightBox);

    wallback = new THREE.Mesh(groundGeo, wallTextureBack);
    wallback.overdraw = true;
    wallback.position.set(0, wallHeight / 2, -wallWidth / 2);
    walls.add(wallback);

    wallbackBox = new THREE.BoundingBoxHelper( wallback );
    wallbackBox.update(wallback);
    //scene.add(wallbackBox);

    wallfront = new THREE.Mesh(groundGeo, wallTextureFront);
    wallfront.overdraw = true;
    wallfront.position.set(0, wallHeight / 2, wallWidth / 2);
    wallfront.rotation.y = -Math.PI;
    walls.add(wallfront);

    wallfrontBox = new THREE.BoundingBoxHelper( wallfront );
    wallfrontBox.update(wallfront);
    //scene.add(wallfrontBox);



    ceiling = new THREE.Mesh(groundGeo_2, ceilTexture);
    ceiling.position.set(0, wallHeight, 0);
    ceiling.rotation.x = Math.PI / 2;
    walls.add(ceiling);

    scene.add(walls);

    groundRaycastObj.push(walls);

    //load bed texture
    var bed_texture = new THREE.ImageUtils.loadTexture("textures/cb-rochelle-gray_baked.png");
    var bedMaterial = new THREE.MeshBasicMaterial({
        map: bed_texture,
        side: THREE.DoubleSide
    });

    //load bed
    var loader = new THREE.JSONLoader();
    loader.load('js/sofa.js', function (geometry) {
        sofa_model = new THREE.Mesh(geometry, bedMaterial);
        for (var i = 0; i < sofa_model.children.length; i++) {
            sofa_model.children[i].material = material;
            sofa_model.children[i].userDataParent = sofa_model;
            sofa_model.children[i].name = 'sofa_model';
        }
        sofa_model.position.set(200,0, -200);
        sofa_model.rotation.set(0, 0, 0);
        sofa_model.scale.set(3, 3, 3);
        sofa_model.name = 'sofa_model';
        interactiveObj.push(sofa_model);
        scene.add(sofa_model);

    sofaBox = new THREE.BoundingBoxHelper( sofa_model );

        // comment next line out if you don't want to see the wireframe sofa boxHelper
        scene.add(sofaBox);

    });


     //load chair texture
    var chair_texture = new THREE.ImageUtils.loadTexture("textures/chair.png");
    var chairMaterial = new THREE.MeshBasicMaterial({
        map: chair_texture,
        side: THREE.DoubleSide
    });

    //load chair
    var loader = new THREE.JSONLoader();
    loader.load('js/chair_model.js', function (geometry) {
        chair_model = new THREE.Mesh(geometry, chairMaterial);
        for (var i = 0; i < chair_model.children.length; i++) {
            chair_model.children[i].material = material;
            chair_model.children[i].userDataParent = sofa_model;
            chair_model.children[i].name = 'chair_model';
        }
        chair_model.position.set(-300,0, -200);
        chair_model.rotation.set(0, 0, 0);
        chair_model.scale.set(3, 3, 3);
        chair_model.name = 'chair_model';
        interactiveObj.push(chair_model);
        scene.add(chair_model);

    chairBox = new THREE.BoundingBoxHelper( chair_model );

    // comment next line out if you don't want to see the wireframe chair boxHelper
        scene.add(chairBox);

    });



    //IE, Chrome, Safari, Opera
    document.addEventListener('mousewheel', onDocumentMouseWheel, false);
    //Firefox
    document.addEventListener('DOMMouseScroll', onDocumentMouseWheel, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    window.addEventListener('resize', onWindowResize, false);

}
function animate() {

    requestAnimationFrame(animate);

    chair_model.rotation.y += 0.02;

chairBox.update(chair_model);
sofaBox.update(sofa_model);
//wallrightBox.update(wallright);
//wallleftBox.update(wallleft);
//wallfrontBox.update(wallfront);
//wallbackBox.update(wallback);



    controls.update();

    // Render the frame
    //Don't render twice, it will slow down your animation!
    //render();
    renderer.render(scene, camera);

}

function render() {

    renderer.render(scene, camera);
}



function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    //controls.handleResize();

}

function onDocumentMouseDown(event) {
    draggable = true;
    event.preventDefault();

var testIntersects;
    testIntersects = raycaster.intersectObjects(groundRaycastObj, true);
    if (testIntersects.length > 0)
        oldIntersectPoint.copy(testIntersects[0].point);

    // find intersections
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(interactiveObj, true);
    if (intersects.length > 0) {
        controls.enabled=false;

        if (intersects[0].object.name == 'chair_model') {
            container.style.cursor = 'pointer';
            chair_selected = true;
        //oldIntersectPoint.copy(chair_model.position);
    chairBox.material.color.set('white');
        } else if (intersects[0].object.name == 'sofa_model') {
            container.style.cursor = 'pointer';
            sofa_selected = true;
        //oldIntersectPoint.copy(sofa_model.position);
    sofaBox.material.color.set('white');
        }
        else {
            chair_selected = false;
            sofa_selected = false;
        }
        draggable = false;
    }

}

function onDocumentMouseUp(event) {
    draggable = false;
    chair_selected = false;
    sofa_selected = false;
    chair_rotate = false;
    container.style.cursor = 'auto';
    controls.enabled=true;

oldIntersectPoint.set(0,0,0);
newIntersectPoint.set(0,0,0);
    intersectOffset.set(0,0,0);

chairBox.material.color.set('grey');
sofaBox.material.color.set('grey');
}


function onDocumentMouseMove(event) {

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;

    var deltaX = event.clientX - mouseX;
    var deltaY = event.clientY - mouseY;

    var testIntersects;

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(interactiveObj, true);

    if (intersects.length > 0) {
        container.style.cursor = 'pointer';
        //addRotationLine(intersects[0].object);

    } else {
        container.style.cursor = 'auto';
    }

    if (draggable) {

    } else if (chair_selected == true) {

            testIntersects = raycaster.intersectObjects(groundRaycastObj, true);
            if (testIntersects.length > 0) {

        var okToMove = true;

        chairOldPosition.copy(chair_model.position);

        newIntersectPoint.copy(testIntersects[0].point);

        intersectOffset.copy(newIntersectPoint);
            intersectOffset.sub(oldIntersectPoint);
        //uncomment below if you want more precision mouse movements of objects
        //intersectOffset.multiplyScalar(0.1);
        // store old intersect point for next frame
        oldIntersectPoint.copy(newIntersectPoint);

                    chair_model.position.add(intersectOffset);
        chair_model.updateMatrixWorld(true);
        //chairBox.updateMatrixWorld(true);
        chairBox.update(chair_model);

        // default
        chairBox.material.color.set('white');

        if( chairBox.box.intersectsBox(sofaBox.box) ) {
            okToMove = false;
            chairBox.material.color.set('red');
        }
        else if( chairBox.box.intersectsBox(wallrightBox.box) ) {
            okToMove = false;
            chairBox.material.color.set('red');
        }
        else if( chairBox.box.intersectsBox(wallleftBox.box) ) {
            okToMove = false;
            chairBox.material.color.set('red');
        }
        else if( chairBox.box.intersectsBox(wallfrontBox.box) ) {
            okToMove = false;
            chairBox.material.color.set('red');
        }
        else if( chairBox.box.intersectsBox(wallbackBox.box) ) {
            okToMove = false;
            chairBox.material.color.set('red');
        }

        // if NOT ok to move and chair is hitting something,
        if ( !okToMove ) {
            // put chair back where it was
            chair_model.position.copy(chairOldPosition);
        }


            }
            // clamp chair position to the ground
            chair_model.position.y = 0;

    } else if (chair_rotate == true) {
        rotate_object(chair_model, event);
    }
    else if (sofa_selected == true) {
        testIntersects = raycaster.intersectObjects(groundRaycastObj, true);
            if (testIntersects.length > 0) {

        var okToMove = true;

        sofaOldPosition.copy(sofa_model.position);

        newIntersectPoint.copy(testIntersects[0].point);

        intersectOffset.copy(newIntersectPoint);
            intersectOffset.sub(oldIntersectPoint);
        //uncomment below if you want more precision mouse movements of objects
        //intersectOffset.multiplyScalar(0.1);
                oldIntersectPoint.copy(newIntersectPoint);
                    sofa_model.position.add(intersectOffset);

        sofa_model.updateMatrixWorld(true);
        //sofaBox.updateMatrixWorld(true);
        sofaBox.update(sofa_model);

        // default
        sofaBox.material.color.set('white');

        if( sofaBox.box.intersectsBox(chairBox.box) ) {
            okToMove = false;
            sofaBox.material.color.set('red');
        }
        else if( sofaBox.box.intersectsBox(wallrightBox.box) ) {
            okToMove = false;
            sofaBox.material.color.set('red');
        }
        else if( sofaBox.box.intersectsBox(wallleftBox.box) ) {
            okToMove = false;
            sofaBox.material.color.set('red');
        }
        else if( sofaBox.box.intersectsBox(wallfrontBox.box) ) {
            okToMove = false;
            sofaBox.material.color.set('red');
        }
        else if( sofaBox.box.intersectsBox(wallbackBox.box) ) {
            okToMove = false;
            sofaBox.material.color.set('red');
        }

        // if NOT ok to move and sofa is hitting something,
        if ( !okToMove ) {
            // put sofa back where it was
            sofa_model.position.copy(sofaOldPosition);
        }

            }
            // clamp sofa position to the ground
            sofa_model.position.y = 0;
    }
    mouseX = event.clientX;
    mouseY = event.clientY;
    //render(); // no need to render
}

function onDocumentMouseWheel(event) {
    // This is automatically handled for you by orbitControls.js,
    // but you can't disable zoom on the controls - so don't type controls.enableZoom = false;

    //mouseDelta = (-event.wheelDeltaY || event.detail);
    //camera.position.z += mouseDelta * 1;
    //render(); // no need to render
}

function addRotationLine(objModel) {
    var material = new THREE.LineBasicMaterial({
        color: 0x0000ff,
        linewidth: 6
    });
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
            new THREE.Vector3(-10, 500, 0),
            new THREE.Vector3(1000, 500, 0)
    );
    var line = new THREE.Line(geometry, material);
    objModel.add(line);
}
function rotate_object(object, event) {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
    var deltaX = event.clientX - mouseX;
    var deltaY = event.clientY - mouseY;

    object.rotation.y += deltaX * 0.02;
    object.rotation.y += deltaY * 0.01;
}


</script>
</body>
</html>
