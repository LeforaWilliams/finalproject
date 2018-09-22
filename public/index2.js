(function() {
    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.025, 20);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // LOAD CUBE TEXTURE
    new THREE.CubeTextureLoader().setPath("assets/images/").load(
        // urls of images used in the cube texture
        [
            "water-1.jpg",
            "water-1.jpg",
            "water-1.jpg",
            "water-1.jpg",
            "water-1.jpg",
            "water-1.jpg"
        ],

        // what to do when loading is over
        function(cubeTexture) {
            // Geometry
            var geometry = new THREE.SphereGeometry(1, 20, 20);

            // Material
            var material = new THREE.MeshBasicMaterial({
                // CUBE TEXTURE can be used with
                // the environment map property of
                // a material.
                envMap: cubeTexture
            });

            // Mesh
            var mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            // CUBE TEXTURE is also an option for a background
            scene.background = cubeTexture;

            renderer.render(scene, camera);
        }
    );
})();
