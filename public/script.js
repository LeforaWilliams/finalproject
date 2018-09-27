var rfish2,
    rfish3,
    whale,
    raycaster,
    coral,
    coral2,
    octo,
    pomfish,
    stats,
    fishPivot;
var coralfish = [];
var coralfish2 = [];
var blueFish = [];

// var keyboard = new THREEx.KeyboardState();

var mouse = new THREE.Vector2(),
    INTERSECTED;

var clock = new THREE.Clock();
var chaseCameraActive = true;

/*#####SCENE#######*/
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 200;
camera.position.x = 100;
camera.position.y = -90;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/*#######LIGHT#########*/
var light = new THREE.AmbientLight(0x0ffffff);
scene.add(light);

/*##########################################################MESHES######################################################*/

/*##########EXTERNAL OBJECT LOADER##############*/
var loader = new THREE.GLTFLoader();

/*########WHALE OBJECT###########*/
// function addChild(child) {
//     child.scale.set(50, 50, 50);
//     child.position.set(-30, -150, -80);
//     scene.add(child);
// }
//
// function allDes(node) {
//     for (let i = 0; i < node.children.length; i++) {
//         let child = node.children[i];
//         addChild(child);
//
//         allDes(child);
//     }
// }

loader.load("/assets/models/blue_whale_-_textured/scene.gltf", function(m) {
    m.scene.traverse(function(child) {
        allDes(child);
    });
});

/*######CORAL FISH OBJECT########*/
fishPivot = new THREE.Object3D();
scene.add(fishPivot);
loader.load("/assets/models/coral_fish/scene.gltf", function(model) {
    model.scene.traverse(function(child) {
        if (child.isMesh) {
            for (var i = 0; i < 30; i++) {
                coralfish[i] = child.clone();
                var scale = Math.floor(Math.random() * 10) / 1000;
                coralfish[i].scale.set(scale, scale, scale);
                coralfish[i].position.x = Math.floor(Math.random() * -1000);
                coralfish[i].position.y = Math.floor(Math.random() * -1000);
                coralfish[i].position.z = Math.floor(Math.random() * -1000);

                fishPivot.add(coralfish[i]);
                // scene.add(coralfish[i]);
            }
        }
    });
});

/*###### SECOND CORAL FISH OBJECT########*/
loader.load("/assets/models/coral_fish/scene.gltf", function(model) {
    model.scene.traverse(function(child) {
        if (child.isMesh) {
            for (var i = 0; i < 30; i++) {
                coralfish2[i] = child.clone();
                var scale = Math.floor(Math.random() * 10) / 1000;
                coralfish2[i].scale.set(scale, scale, scale);
                coralfish2[i].position.x = Math.floor(Math.random() * 1000);
                coralfish2[i].position.y = Math.floor(Math.random() * -1000);
                coralfish2[i].position.z = Math.floor(Math.random() * 1000);

                scene.add(coralfish2[i]);
            }
        }
    });
});

/*######CORAL 2 OBJECT########*/
loader.load("/assets/models/coral1/scene.gltf", function(model) {
    model.scene.traverse(function(child) {
        if (child.isMesh) {
            coral2 = child;
            coral2.scale.set(1.5, 1.5, 1.5);

            coral2.position.set(-100, -300, 0);
            // coral2.rotation.x = 0.5;
            coral2.rotation.y = 0.5;
            // coral2.flipY = 0.5;
            scene.add(coral2);
        }
    });
});

/*######REGULAR FISH OBJECT########*/
var bluePivot = new THREE.Object3D();
scene.add(bluePivot);
loader.load("/assets/models/fish/scene.gltf", function(model) {
    model.scene.traverse(function(child) {
        // console.log('FISH MESH CHILD',child.isMesh);
        if (child.isMesh) {
            for (var i = 0; i < 10; i++) {
                blueFish[i] = model.scene.clone();
                blueFish[i].scale.set(40, 15, 15);
                blueFish[i].position.x = Math.floor(Math.random() * 1050) - 200;
                blueFish[i].position.y = Math.floor(Math.random() * -500);
                blueFish[i].position.z = Math.floor(Math.random() * 100);

                bluePivot.add(blueFish[i]);
            }
            // rfish = child;
            // console.log("REG FISH VERTICIES", rfish.geometry);
            //
            // rfish2 = model.scene.clone();
            //
            // rfish.scale.set(40, 15, 15);
            // rfish2.scale.set(40, 15, 15);
            //
            // rfish.position.set(-60, -200, -150);
            // rfish2.position.set(90, -80, 40);
            //
            // scene.add(model.scene);
            // scene.add(rfish2);
        }
    });
});

/*######################TURTLE###################*/
var turtle;

loader.load("/assets/models/sea_turtle.gltf", function(model) {
    turtle = model.scene;
    turtle.scale.set(1, 0.7, 0.9);

    turtle.position.set(-100, -65, 1);
    turtle.rotation.z = 200;
    turtle.rotation.x = 150;
    scene.add(turtle);
});

/*######################BUCKLE WHALE###################*/
var buckle;
loader.load("/assets/models/bucklewhale.glb", function(model) {
    console.log("BUCKLE WHALE DATA", model.scene);
    buckle = model.scene;
    buckle.scale.set(400, 400, 400);

    scene.add(buckle);
});

/*#####################STINGRAY###################*/
var stingray;
loader.load("/assets/models/stingray.glb", function(model) {
    stingray = model.scene;
    stingray.scale.set(100, 100, 100);
    scene.add(stingray);
});

/*######################STRIPEFISH ###################*/
var stripefish;
loader.load("/assets/models/stripefish.glb", function(model) {
    stripefish = model.scene;
    stripefish.scale.set(100, 100, 100);
    scene.add(stripefish);
});

/*######################SILVER FISH###################*/
var silverfish;
loader.load("/assets/models/silverfish.glb", function(model) {
    silverfish = model.scene;
    silverfish.scale.set(100, 100, 100);
    scene.add(silverfish);
});

// /*######SKYBOX#######*/
var r = "/assets/images/";
var urls = [
    r + "nacht.jpg",
    r + "nacht.jpg",
    r + "nacht.jpg",
    r + "space.jpg",
    r + "nacht.jpg",
    r + "nacht.jpg"
];

var skyBox = new THREE.CubeTextureLoader().load(urls);
// scene.background = skyBox;
scene.background = new THREE.Color(0x121a25);

/*#######WATER FLOW MAP###########*/
/*
source: https://github.com/mrdoob/three.js/blob/master/examples/webgl_water_flowmap.html
*/

var groundGeometry = new THREE.PlaneBufferGeometry(3000, 3000, 100, 100);
var groundMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
var ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.position.y = 48;
ground.rotation.x = Math.PI * -0.5;

scene.add(ground);

var textureLoader = new THREE.TextureLoader();
textureLoader.load("assets/images/night.jpg", function(map) {
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 16;
    map.repeat.set(1, 1);
    groundMaterial.map = map;
    groundMaterial.needsUpdate = true;
});

//water
var waterGeometry = new THREE.PlaneBufferGeometry(3000, 3000);
var flowMap = textureLoader.load(r + "Water_1_M_Flow.jpg");
water = new THREE.Water(waterGeometry, {
    scale: 1,
    textureWidth: 1024,
    textureHeight: 1024,
    flowMap: flowMap
});

water.position.y = 54;
water.rotation.x = Math.PI * 0.5;
scene.add(water);

/*#####MOUSE OVER###########*/
raycaster = new THREE.Raycaster();
document.addEventListener("mousemove", onDocumentMouseMove, false);

function onDocumentMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

/*######ORBIT CONTROLS###########*/

var orbit = new THREE.OrbitControls(camera, renderer.domElement);
orbit.enableZoom = true;

//####################CAMERA CHASEEE
function animate() {
    requestAnimationFrame(animate);
    render();
    update();
}

function update() {
    var delta = clock.getDelta(); // seconds.
    var moveDistance = 200 * delta; // 200 pixels per second
    var rotateAngle = (Math.PI / 2) * delta; // pi/2 radians (90 degrees) per second

    // local transformations

    var relativeCameraOffset = new THREE.Vector3(0, 50, 200);

    var cameraOffset = relativeCameraOffset.applyMatrix4(fishPivot.matrixWorld);

    chaseCamera.position.x = cameraOffset.x;
    chaseCamera.position.y = cameraOffset.y;
    chaseCamera.position.z = cameraOffset.z;
    chaseCamera.lookAt(fishPivot.position);

    //camera.updateMatrix();
    //camera.updateProjectionMatrix();

    if (keyboard.pressed("1")) {
        chaseCameraActive = true;
    }
    if (keyboard.pressed("2")) {
        chaseCameraActive = false;
    }
}

/*##############RENDER FUNCTION ###################*/
var render = function() {
    // THREE.GLTFLoader.Shaders.update(scene, camera);
    requestAnimationFrame(render);

    // for (var i = 0; i < coralfish.length; i++) {
    //     coralfish[i].position.z += Math.PI * -0.09;
    //     coralfish[i].position.x += Math.PI * -0.09;
    // coralfish[i].position.y += Math.PI * 0.06;}

    //RAYCASTER CODE- CURRENTLY NOT WORKING
    // raycaster.setFromCamera(mouse, camera);
    // var intersects = raycaster.intersectObjects(scene.testMesh);
    // if (intersects.length > 0) {
    //     if (INTERSECTED != intersects[0].object) {
    //         if (INTERSECTED)
    //             INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
    //         INTERSECTED = intersects[0].object;
    //         INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
    //         INTERSECTED.material.emissive.setHex(0xff0000);
    //     }
    // }

    var timer = 0.0001 * Date.now();
    for (var i = 0; i < coralfish.length; i++) {
        var f = coralfish[i];
        f.position.x = -300 * Math.cos(timer + i);
        f.position.y = -100 * Math.sin(timer + i * 0.05);
        // f.position.z = -300 * Math.sin(timer + i * 1.1);
        f.rotation.y += 0.00001;
    }
    // If rotation reaches certain point -- chnange to negative else poistiove, do the same the otehr way round, do this to control their movement
    //
    fishPivot.rotation.y += 0.001;
    // fishPivot.rotation.z += 0.009; //Don'T think I want this makes fish move through the water
    fishPivot.rotation.x += 0.00003;
    fishPivot.position.z += 0.001;
    // fishPivot.rotation.y += 0.001;
    // fishPivot.position.y = -100 * Math.sin(timer * 1.1);
    fishPivot.position.x = 0.01;

    // turtle.position.x -= 0.005;
    // turtle.position.y -= 0.005;
    renderer.render(scene, camera);
};
render();

/*#######RESPONSIVE###########*/
window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
