var fish, fish2, fish3, fish4, fish5, fish6, fish7, fish8, fish9, fish10, whale;

/*#####SCENE#######*/
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 100;
camera.position.x = 100;
camera.position.y = -80;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/*#######LIGHT#########*/
var light = new THREE.AmbientLight(0x0fffff);
scene.add(light);

/*#####MESHES#######*/

var geometry = new THREE.SphereGeometry(10, 16, 32);
var material = new THREE.MeshPhongMaterial();
var testMesh = new THREE.Mesh(geometry, material);
testMesh.position.y = -2;
scene.add(testMesh);

/*######CORAL FISH OBJECT########*/
var loader = new THREE.GLTFLoader();

/*########WHALE OBJECT###########*/
loader.load("/assets/models/blue_whale_-_textured/scene.gltf", function(m) {
    console.log("WHALE DATA", m);
    // m.scene &&
    m.scene.traverse(function(child) {
        // m.traverse(function(child) {
        // console.log("WHALE CHILD", child.isMesh);
        if (child.isMesh) {
            whale = child;
            whale.scale.set(0.01, 0.01, 0.01);
            whale.position.set(0, -70, 0);
            scene.add(whale);
        }
    });
});

loader.load("/assets/models/coral_fish/scene.gltf", function(model) {
    model.scene.traverse(function(child) {
        // console.log('FISH MESH CHILD',child.isMesh);
        if (child.isMesh) {
            console.log("FISH MESH CHILD IN IF", child);
            fish = child;
            fish2 = fish.clone();
            fish.scale.set(0.01, 0.01, 0.01);
            fish2.scale.set(0.01, 0.01, 0.01);

            fish.position.set(0, -50, 0);
            fish2.position.set(40, -80, -100);

            scene.add(fish);
            scene.add(fish2);
        }
    });
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

var groundGeometry = new THREE.PlaneBufferGeometry(400, 400, 100, 100);
var groundMaterial = new THREE.MeshBasicMaterial({ color: 0xccccff });
var ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.position.y = 12;
ground.rotation.x = Math.PI * -0.5;

scene.add(ground);

var textureLoader = new THREE.TextureLoader();
textureLoader.load("assets/images/night.jpg", function(map) {
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 16;
    map.repeat.set(4, 4);
    groundMaterial.map = map;
    groundMaterial.needsUpdate = true;
});

//water
var waterGeometry = new THREE.PlaneBufferGeometry(400, 400);
var flowMap = textureLoader.load(r + "Water_1_M_Flow.jpg");
water = new THREE.Water(waterGeometry, {
    scale: 2,
    textureWidth: 1024,
    textureHeight: 1024,
    flowMap: flowMap
});

water.position.y = 16;
water.rotation.x = Math.PI * 0.5;
scene.add(water);

/*######ORBIT CONTROLS###########*/

var orbit = new THREE.OrbitControls(camera, renderer.domElement);
orbit.enableZoom = false;

var render = function() {
    requestAnimationFrame(render);
    testMesh.rotation.x += 0.005;
    testMesh.rotation.y += 0.005;
    testMesh.position.z += 0.09;

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
