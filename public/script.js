/*#####SCENE#######*/

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    0.1,
    200
);
camera.position.z = 30;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/*#######LIGHT#########*/
var light = new THREE.AmbientLight(0x0000ff);
scene.add(light);

/*#####MESHES#######*/

var geometry = new THREE.SphereGeometry(10, 32, 32);
var material = new THREE.MeshPhongMaterial();
var testMesh = new THREE.Mesh(geometry, material);
scene.add(testMesh);

/*######SKYBOX#######*/
var imagePrefix = "assets/images";
var urls = [
    "water-1.jpg",
    "water-1.jpg",
    "water-1.jpg",
    "water-1.jpg",
    "water-1.jpg",
    "water-1.jpg"
];

var skyBox = new THREE.CubeTextureLoader().setPath(imagePrefix).load(urls);
scene.background = skyBox;

var render = function() {
    requestAnimationFrame(render);
    testMesh.rotation.x += 0.005;
    testMesh.rotation.y += 0.005;
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
