/*#####SCENE#######*/

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    0.1,
    200
);
camera.position.z = 50;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/*#######LIGHT#########*/
var light = new THREE.AmbientLight(0x00ffff);
scene.add(light);

/*#####MESHES#######*/

// var geometry = new THREE.SphereGeometry(10, 32, 32);
// var material = new THREE.MeshPhongMaterial();
// var testMesh = new THREE.Mesh(geometry, material);
// scene.add(testMesh);
//
// /*######SKYBOX#######*/
var r = "/assets/images/";
var urls = [
    r + "waters.jpg",
    r + "waters.jpg",
    r + "waters.jpg",
    r + "waters.jpg",
    r + "waters.jpg",
    r + "waters.jpg"
];

var skyBox = new THREE.CubeTextureLoader().load(urls);
scene.background = skyBox;

/*#######WATER FLOW MAP###########*/
/*
source: https://github.com/mrdoob/three.js/blob/master/examples/webgl_water_flowmap.html
*/

// ground
// var groundGeometry = new THREE.PlaneBufferGeometry(20, 20, 10, 10);
// var groundMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
// var ground = new THREE.Mesh(groundGeometry, groundMaterial);
// ground.rotation.x = Math.PI * -0.5;
// scene.add(ground);
var textureLoader = new THREE.TextureLoader();
// textureLoader.load("textures/floors/FloorsCheckerboard_S_Diffuse.jpg", function(
//     map
// ) {
//     map.wrapS = THREE.RepeatWrapping;
//     map.wrapT = THREE.RepeatWrapping;
//     map.anisotropy = 16;
//     map.repeat.set(4, 4);
//     groundMaterial.map = map;
//     groundMaterial.needsUpdate = true;
// });

//water
var waterGeometry = new THREE.PlaneBufferGeometry(20, 20);
var flowMap = textureLoader.load(r + "Water_1_M_Flow.jpg");
water = new THREE.Water(waterGeometry, {
    scale: 2,
    textureWidth: 1024,
    textureHeight: 1024,
    flowMap: flowMap
});

water.position.y = 1;
water.rotation.x = Math.PI * -0.5;
scene.add(water);

/*######ORBIT CONTROLS###########*/

var orbit = new THREE.OrbitControls(camera, renderer.domElement);
orbit.enableZoom = false;

var render = function() {
    requestAnimationFrame(render);
    // testMesh.rotation.x += 0.005;
    // testMesh.rotation.y += 0.005;
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
