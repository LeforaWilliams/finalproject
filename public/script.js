var fish;
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
loader.load("/assets/models/coral_fish/scene.gltf", function(model) {
    console.log("GLTFMODEL DATA ", model);
    model.scene.traverse(function(child) {
        if (child.isMesh) {
            fish = child;

            console.log("WE ARE HERE", fish);
            fish.scale.set(0.01, 0.01, 0.01);
            fish.position.set(0, -50, 0);
            scene.add(fish);
            scene.add(fish);
        }
    });

    // fish.scene.position.set(0, -40, 0);
    // model.scene.position.y = -2;
    // model.scene.position.x = -2;

    // model.scene.scale.x = 30;
    // model.scene.scale.y = 30;
    // model.scene.scale.z = 30;
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
