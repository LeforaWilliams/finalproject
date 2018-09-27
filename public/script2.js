var fish,
    fish2,
    fish3,
    fish4,
    fish5,
    fish6,
    fish7,
    fish8,
    fish9,
    fish10,
    rfish,
    rfish2,
    rfish3,
    whale,
    raycaster,
    coral,
    coral2,
    octo,
    pomfish,
    stats;
var coralfish = [];

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

/*#####MESHES#######*/

/*##########EXTERNAL OBJECT LOADER##############*/
var loader = new THREE.GLTFLoader();

/*########WHALE OBJECT###########*/
function addChild(child) {
    // if (child.isMesh) {
    child.scale.set(50, 50, 50);
    child.position.set(-30, -150, -80);
    scene.add(child);
    // }
}

function allDes(node) {
    for (let i = 0; i < node.children.length; i++) {
        let child = node.children[i];
        addChild(child);
        // console.log("CHILD in allDes", child);

        allDes(child);
    }
}

loader.load("/assets/models/blue_whale_-_textured/scene.gltf", function(m) {
    // m.scene &&
    m.scene.traverse(function(child) {
        // m.traverse(function(child) {
        // console.log("WHALE CHILD", child.isMesh);
        // if (child.isMesh) {
        //     whale = child;
        //     whale.scale.set(1000, 1000, 1000);
        //     whale.position.set(-15, -10, -4);
        //     scene.add(whale);
        // }
        allDes(child);
    });
});

/*######CORAL FISH OBJECT########*/
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

                scene.add(coralfish[i]);
            }
            //             // fish = child;
            //             // fish2 = fish.clone();
            //             // fish3 = fish.clone();
            //             //
            //             // fish.scale.set(0.01, 0.01, 0.01);
            //             // fish2.scale.set(0.01, 0.01, 0.01);
            //             // fish3.scale.set(0.01, 0.01, 0.01);
            //             //
            //             // fish.position.set(0, -50, 0);
            //             // fish2.position.set(40, -80, -100);
            //             // fish3.position.set(-40, -200, -100);
            //             //
            //             // scene.add(fish);
            //             // scene.add(fish2);
            //             // scene.add(fish3);
        }
    });
});

// /*######CORAL OBJECT########*/
// loader.load("/assets/models/coral/scene.gltf", function(model) {
//     model.scene.traverse(function(child) {
//         if (child.isMesh) {
//             coral = child;
//             // fish2 = fish.clone();
//             coral.scale.set(1.3, 1.3, 1.3);
//             // fish2.scale.set(0.01, 0.01, 0.01);
//
//             coral.position.set(0, -50, 0);
//             // fish2.position.set(40, -80, -100);
//
//             scene.add(coral);
//             // scene.add(fish2);
//         }
//     });
// });

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
loader.load("/assets/models/fish/scene.gltf", function(model) {
    // console.log("REG FISH MODEL", model);
    // console.log(
    //     "IN REG FISH- Searching for geo in entire scene",
    //     scene.children
    // );
    model.scene.traverse(function(child) {
        // console.log('FISH MESH CHILD',child.isMesh);
        if (child.isMesh) {
            console.log("REG FISH VERTICIES", child.geometry);
            rfish = child;
            rfish2 = rfish.clone();

            rfish.scale.set(40, 15, 15);
            rfish2.scale.set(0.01, 0.01, 0.01);

            rfish.position.set(-60, -200, -150);
            rfish2.position.set(90, -80, 40);

            scene.add(model.scene);
            scene.add(rfish2);
        }
    });
});
/*#############Pom Fish MESH#################*/
function addPomChild(child) {
    // if (child.isMesh) {
    child.scale.set(50, 50, 50);
    child.position.set(-30, -150, -80);
    scene.add(child);
    // }
}
loader.load("/assets/models/pomacanthus_paru/scene.gltf", function(model) {
    model.scene.traverse(function(child) {
        // console.log('FISH MESH CHILD',child.isMesh);
        if (child.isMesh) {
            // console.log("FISH MESH CHILD IN IF", child);
            pomfish = child;

            // pomfish.scale.set(40, 15, 15);
            //
            // pomfish.position.set(-60, -200, -150);
            allDes(child);
            // scene.add(pomfish);
        }
    });
});

loader.load("/assets/models/octopus/scene.gltf", function(model) {
    model.scene.traverse(function(child) {
        // console.log('FISH MESH CHILD',child.isMesh);
        if (child.isMesh) {
            // console.log("FISH MESH CHILD IN IF", child);
            octo = child;

            octo.scale.set(40, 15, 15);
            //
            octo.position.set(-60, -200, -150);
            // allDes(child);
            scene.add(octo);
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

// STATS
stats = new Stats();
stats.domElement.style.position = "absolute";
stats.domElement.style.bottom = "0px";
stats.domElement.style.zIndex = 100;
// container.appendChild(stats.domElement);

//CAMERA CHASEEE
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

    var cameraOffset = relativeCameraOffset.applyMatrix4(testMesh.matrixWorld);

    chaseCamera.position.x = cameraOffset.x;
    chaseCamera.position.y = cameraOffset.y;
    chaseCamera.position.z = cameraOffset.z;
    chaseCamera.lookAt(testMesh.position);

    //camera.updateMatrix();
    //camera.updateProjectionMatrix();

    if (keyboard.pressed("1")) {
        chaseCameraActive = true;
    }
    if (keyboard.pressed("2")) {
        chaseCameraActive = false;
    }

    stats.update();
}

/*#########################################SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM #############################################################################*/
/*#########################################SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM #############################################################################*/
/*#########################################SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM #############################################################################*/
/*#########################################SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM #############################################################################*/
/*#########################################SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM #############################################################################*/
/*#########################################SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM #############################################################################*/
/*#########################################SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM #############################################################################*/

var Boid = function() {
    var vector = new THREE.Vector3(),
        _acceleration,
        _width,
        _height,
        _depth,
        _goal,
        _neighborhoodRadius = 10,
        _maxSpeed = 0.7,
        _maxSteerForce = 0.05,
        _avoidWalls = false;

    this.worldOrigin = new THREE.Vector3();

    this.position = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    _acceleration = new THREE.Vector3();

    this.setGoal = function(target) {
        _goal = target;
    };

    this.setWorldOrigin = function(originVector) {
        this.worldOrigin = originVector;
    };

    this.setAvoidWalls = function(value) {
        _avoidWalls = value;
    };

    this.setWorldSize = function(width, height, depth) {
        _width = width;
        _height = height;
        _depth = depth;
    };

    this.run = function(boids) {
        if (_avoidWalls) {
            vector.set(
                this.worldOrigin.x - _width,
                this.position.y,
                this.position.z
            );
            vector = this.avoid(vector);
            vector.multiplyScalar(5);
            _acceleration.add(vector);

            vector.set(
                this.worldOrigin.x + _width,
                this.position.y,
                this.position.z
            );
            vector = this.avoid(vector);
            vector.multiplyScalar(5);
            _acceleration.add(vector);

            vector.set(
                this.position.x,
                this.worldOrigin.y - _height,
                this.position.z
            );
            vector = this.avoid(vector);
            vector.multiplyScalar(5);
            _acceleration.add(vector);

            vector.set(
                this.position.x,
                this.worldOrigin.y + _height,
                this.position.z
            );
            vector = this.avoid(vector);
            vector.multiplyScalar(5);
            _acceleration.add(vector);

            vector.set(
                this.position.x,
                this.position.y,
                this.worldOrigin.z - _depth
            );
            vector = this.avoid(vector);
            vector.multiplyScalar(5);
            _acceleration.add(vector);

            vector.set(
                this.position.x,
                this.position.y,
                this.worldOrigin.z + _depth
            );
            vector = this.avoid(vector);
            vector.multiplyScalar(5);
            _acceleration.add(vector);
        } /* else {

                        this.checkBounds();

                    }
                    */

        if (Math.random() > 0.2) {
            this.flock(boids);
        }

        this.move();
    };

    this.flock = function(boids) {
        if (_goal) {
            _acceleration.add(this.reach(_goal, 0.005));
        }

        _acceleration.add(this.alignment(boids));
        _acceleration.add(this.cohesion(boids));
        _acceleration.add(this.separation(boids));
    };

    this.move = function() {
        this.velocity.add(_acceleration);

        var l = this.velocity.length();

        if (l > _maxSpeed) {
            this.velocity.divideScalar(l / _maxSpeed);
        }

        this.position.add(this.velocity);
        _acceleration.set(0, 0, 0);
    };

    this.checkBounds = function() {
        if (this.position.x > _width) this.position.x = -_width;
        if (this.position.x < -_width) this.position.x = _width;
        if (this.position.y > _height) this.position.y = -_height;
        if (this.position.y < -_height) this.position.y = _height;
        if (this.position.z > _depth) this.position.z = -_depth;
        if (this.position.z < -_depth) this.position.z = _depth;
    };

    //

    this.avoid = function(target) {
        var steer = new THREE.Vector3();

        steer.copy(this.position);
        steer.sub(target);

        steer.multiplyScalar(1 / this.position.distanceToSquared(target));

        return steer;
    };

    this.repulse = function(target) {
        var distance = this.position.distanceTo(target);

        if (distance < 50) {
            var steer = new THREE.Vector3();

            steer.subVectors(this.position, target);
            steer.multiplyScalar(0.5 / distance);

            _acceleration.add(steer);
        }
    };

    this.reach = function(target, amount) {
        var steer = new THREE.Vector3();

        steer.subVectors(target, this.position);
        steer.multiplyScalar(amount);

        return steer;
    };

    this.alignment = function(boids) {
        var boid,
            velSum = new THREE.Vector3(),
            count = 0;

        for (var i = 0, il = boids.length; i < il; i++) {
            if (Math.random() > 0.6) continue;

            boid = boids[i];

            distance = boid.position.distanceTo(this.position);

            if (distance > 0 && distance <= _neighborhoodRadius) {
                velSum.add(boid.velocity);
                count++;
            }
        }

        if (count > 0) {
            velSum.divideScalar(count);

            var l = velSum.length();

            if (l > _maxSteerForce) {
                velSum.divideScalar(l / _maxSteerForce);
            }
        }

        return velSum;
    };

    this.cohesion = function(boids) {
        var boid,
            distance,
            posSum = new THREE.Vector3(),
            steer = new THREE.Vector3(),
            count = 0;

        for (var i = 0, il = boids.length; i < il; i++) {
            if (Math.random() > 0.6) continue;

            boid = boids[i];
            distance = boid.position.distanceTo(this.position);

            if (distance > 0 && distance <= _neighborhoodRadius) {
                posSum.add(boid.position);
                count++;
            }
        }

        if (count > 0) {
            posSum.divideScalar(count);
        }

        steer.subVectors(posSum, this.position);

        var l = steer.length();

        if (l > _maxSteerForce) {
            steer.divideScalar(l / _maxSteerForce);
        }

        return steer;
    };

    this.separation = function(boids) {
        var boid,
            distance,
            posSum = new THREE.Vector3(),
            repulse = new THREE.Vector3();

        for (var i = 0, il = boids.length; i < il; i++) {
            if (Math.random() > 0.6) continue;

            boid = boids[i];
            distance = boid.position.distanceTo(this.position);

            if (distance > 0 && distance <= _neighborhoodRadius) {
                repulse.subVectors(this.position, boid.position);
                repulse.normalize();
                repulse.divideScalar(distance);
                posSum.add(repulse);
            }
        }

        return posSum;
    };
};

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
// document.addEventListener(
//     "click",
//     function() {
//         if (FISH_IN_POND) {
//             Alt.CES.SwimUp();
//         } else {
//             Alt.CES.SwimDown();
//         }
//     },
//     false
// );

var camera, scene, renderer;
var boid, boids;
var stats;

var manager = new THREE.LoadingManager();

camera = new THREE.PerspectiveCamera(
    75,
    SCREEN_WIDTH / SCREEN_HEIGHT,
    1,
    10000
);
camera.position.z = 200;

scene = new THREE.Scene();
scene.scale.set(30, 30, 30);

//############## I THINK YOU OLY NEED THIS FOR VR
// if (altspace.inClient) {
//     renderer = altspace.getThreeJSRenderer();
//     if (JUMP_TIMER) {
//         setInterval(function() {
//             fishJumpUp();
//         }, JUMP_REPEAT_INTERVAL);
//     }
//     document.getElementById("info").style.visibility = "hidden";

// stats = new Stats();
// stats.domElement.style.position = "absolute";
// stats.domElement.style.left = "0px";
// stats.domElement.style.top = "0px";
// document.getElementById("container").appendChild(stats.domElement);
// window.addEventListener("resize", onWindowResize, false);

// controls = new THREE.OrbitControls(camera, renderer.domElement);
// controls.damping = 0.2;
//controls.addEventListener( 'change', render );

//FISH COME IN HERE

var fishGroup = new THREE.Group();
scene.add(fishGroup);
fishGroup.position.y = FISH_START_IN_POND ? FISH_START_Y_DOWN : FISH_START_Y_UP;

// var fishes = [];

//NOT SURE WHAT FISH MODELS SHOULD BE
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

        // var fishModel = fishModels[i % 4];
        //
        // fishModel.scale.x = 0.4;
        // fishModel.scale.y = 0.4;
        // fishModel.scale.z = 0.4;
        // fishModel.rotation.y = -3.14 / 2;

        // var clone = fishModel.clone();
        // var fish = new THREE.Group();
        // fish.add(clone);
        fishGroup.add(coralfish);
        // fishes.push(fish);
    }
    animate();
}

function onWindowResize() {
    if (!(altspace && altspace.inClient)) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

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

/*#########################################SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM #############################################################################*/
/*#########################################SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM #############################################################################*/
/*#########################################SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM #############################################################################*/
/*#########################################SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM #############################################################################*/
/*#########################################SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM #############################################################################*/
/*#########################################SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM #############################################################################*/
/*#########################################SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM #############################################################################*/
/*#########################################SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM #############################################################################*/
/*#########################################SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM #############################################################################*/
/*#########################################SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM SWIM #############################################################################*/

var render = function() {
    // THREE.GLTFLoader.Shaders.update(scene, camera);
    requestAnimationFrame(render);
    // testMesh.rotation.x += 0.005;
    // testMesh.rotation.y += 0.005;
    // testMesh.position.z += 0.09;
    for (var i = 0; i < coralfish.length; i++) {
        coralfish[i].position.z += Math.PI * -0.09;
        coralfish[i].position.x += Math.PI * -0.09;
        // coralfish[i].position.y += Math.PI * 0.06;
    }

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

    for (var i = 0, imax = coralfish.length; i < imax; i++) {
        boid = boids[i];
        boid.run(boids);

        fish = coralfish[i];
        fish.position.copy(boids[i].position);

        fish.rotation.y = Math.atan2(-boid.velocity.z, boid.velocity.x);
        fish.rotation.z = Math.asin(boid.velocity.y / boid.velocity.length());
    }

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
