var UPDATE_INTERVAL = 1000 / 60; // 60 FPS
var UPDATE_NOW = true;

var SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight,
    SCREEN_WIDTH_HALF = SCREEN_WIDTH / 2,
    SCREEN_HEIGHT_HALF = SCREEN_HEIGHT / 2;

var WORLD_SIZE_X = 150,
    WORLD_SIZE_Y = 50,
    WORLD_SIZE_Z = 150;

var NUM_FISH = 80;
var ORIGIN_IN_POND = new THREE.Vector3();
var ORIGIN_ABOVE_POND = new THREE.Vector3(0, 50, 0);
var FISH_START_Y_UP = -10;
var FISH_START_Y_DOWN = 0;

var JUMP_TIMER = false; // Should fish cycle up/down on a timer?
var FISH_START_IN_POND = true; // Should fish start down in the pond?
var FISH_IN_POND = FISH_START_IN_POND; // Are fish in pond now?

var GATHER_TIMEOUT = 5000; // Gather fish this long before jumping.
var JUMP_DOWN_TIMEOUT = 15000; // How long to wait before jumping down.
var JUMP_REPEAT_INTERVAL = 45000; // Cycle to start a new jump sequence.

// Start the update timer.
var intervalId = setInterval(function() {
    UPDATE_NOW = true;
}, UPDATE_INTERVAL);

document.addEventListener("mousemove", onDocumentMouseMove, false);
document.addEventListener(
    "click",
    function() {
        if (FISH_IN_POND) {
            Alt.CES.SwimUp();
        } else {
            Alt.CES.SwimDown();
        }
    },
    false
);

var camera, scene, renderer;
var boid, boids;
var stats;

var manager = new THREE.LoadingManager();
var loader = new THREE.OBJMTLLoader(manager);

camera = new THREE.PerspectiveCamera(
    75,
    SCREEN_WIDTH / SCREEN_HEIGHT,
    1,
    10000
);
camera.position.z = 200;

scene = new THREE.Scene();
scene.scale.set(30, 30, 30);

if (altspace.inClient) {
    renderer = altspace.getThreeJSRenderer();
    if (JUMP_TIMER) {
        setInterval(function() {
            fishJumpUp();
        }, JUMP_REPEAT_INTERVAL);
    }
    document.getElementById("info").style.visibility = "hidden";
} else {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    document.body.appendChild(renderer.domElement);

    stats = new Stats();
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.getElementById("container").appendChild(stats.domElement);
    window.addEventListener("resize", onWindowResize, false);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.damping = 0.2;
    //controls.addEventListener( 'change', render );
}

var controls = null;

//FISH COME IN HERE

var fishGroup = new THREE.Group();
scene.add(fishGroup);
fishGroup.position.y = FISH_START_IN_POND ? FISH_START_Y_DOWN : FISH_START_Y_UP;

var fishes = [];

function init(fishModels) {
    boids = [];

    for (var i = 0; i < NUM_FISH; i++) {
        boid = boids[i] = new Boid();

        boid.setAvoidWalls(true);
        boid.setWorldSize(WORLD_SIZE_X, WORLD_SIZE_Y, WORLD_SIZE_Z);
        boid.setWorldOrigin(
            FISH_START_IN_POND ? ORIGIN_IN_POND : ORIGIN_ABOVE_POND
        );

        boid.position.x =
            Math.random() * (WORLD_SIZE_X * 2 - WORLD_SIZE_X) +
            boid.worldOrigin.x;
        boid.position.y =
            Math.random() * (WORLD_SIZE_Y * 2 - WORLD_SIZE_Y) +
            boid.worldOrigin.y;
        boid.position.z =
            Math.random() * (WORLD_SIZE_Z * 2 - WORLD_SIZE_Z) +
            boid.worldOrigin.z;
        boid.velocity.x = Math.random() * 2 - 1;
        boid.velocity.y = Math.random() * 2 - 1;
        boid.velocity.z = Math.random() * 2 - 1;

        var fishModel = fishModels[i % 4];

        fishModel.scale.x = 0.4;
        fishModel.scale.y = 0.4;
        fishModel.scale.z = 0.4;
        fishModel.rotation.y = -3.14 / 2;

        var clone = fishModel.clone();
        var fish = new THREE.Group();
        fish.add(clone);
        fishGroup.add(fish);
        fishes.push(fish);
    }
    animate();
}
//Think I don't need it because I already load functions//
// loader.load("models/fish-green.obj", "models/fish-green.mtl", function(
//     fishGreen
// ) {
//     loader.load("models/fish-red.obj", "models/fish-red.mtl", function(
//         fishRed
//     ) {
//         loader.load(
//             "models/fish-purple.obj",
//             "models/fish-purple.mtl",
//             function(fishPurple) {
//                 loader.load(
//                     "models/fish-blue.obj",
//                     "models/fish-blue.mtl",
//                     function(fishBlue) {
//                         var fishModels = [
//                             fishGreen,
//                             fishRed,
//                             fishPurple,
//                             fishBlue
//                         ];
//                         init(fishModels);
//                     }
//                 );
//             }
//         );
//     });
// });

// function onWindowResize() {
//     if (!(altspace && altspace.inClient)) {
//         camera.aspect = window.innerWidth / window.innerHeight;
//         camera.updateProjectionMatrix();
//
//         renderer.setSize(window.innerWidth, window.innerHeight);
//     }
// }

function onDocumentMouseMove(event) {
    var vector = new THREE.Vector3(
        event.clientX - SCREEN_WIDTH_HALF,
        -event.clientY + SCREEN_HEIGHT_HALF,
        0
    );

    if (!boids) {
        // Return if we haven't finished initialiazing.
        return;
    }

    for (var i = 0, il = boids.length; i < il; i++) {
        boid = boids[i];

        vector.z = boid.position.z;

        boid.repulse(vector);
    }
}

function fishJumpUp() {
    console.log("fish swim up");

    var vector = ORIGIN_ABOVE_POND.clone();

    for (var i = 0, il = boids.length; i < il; i++) {
        boid = boids[i];

        vector.z = boid.position.z;

        boid.setGoal(vector);
    }

    setTimeout(function() {
        for (var i = 0, il = boids.length; i < il; i++) {
            boid = boids[i];

            boid.setWorldOrigin(ORIGIN_ABOVE_POND);

            // Remove attractor.
            boid.setGoal(null);
            FISH_IN_POND = false;
        }

        if (JUMP_TIMER) {
            setTimeout(function() {
                fishJumpDown();
            }, JUMP_DOWN_TIMEOUT);
        }
    }, GATHER_TIMEOUT);
}

function fishJumpDown() {
    console.log("fish swim down");

    var vector = ORIGIN_IN_POND;

    for (var i = 0, il = boids.length; i < il; i++) {
        boid = boids[i];

        vector.z = boid.position.z;

        boid.setGoal(vector);
    }

    setTimeout(function() {
        for (var i = 0, il = boids.length; i < il; i++) {
            boid = boids[i];

            boid.setWorldOrigin(ORIGIN_IN_POND);

            // Remove attractor.
            boid.setGoal(null);
            FISH_IN_POND = true;
        }
    }, GATHER_TIMEOUT);
}

//

function animate() {
    requestAnimationFrame(animate);

    if (UPDATE_NOW) {
        UPDATE_NOW = false;

        if (controls) controls.update();
        render();
    }

    if (stats) stats.update();
}

function render() {
    for (var i = 0, imax = fishes.length; i < imax; i++) {
        boid = boids[i];
        boid.run(boids);

        fish = fishes[i];
        fish.position.copy(boids[i].position);

        fish.rotation.y = Math.atan2(-boid.velocity.z, boid.velocity.x);
        fish.rotation.z = Math.asin(boid.velocity.y / boid.velocity.length());
    }

    renderer.render(scene, camera);
}
