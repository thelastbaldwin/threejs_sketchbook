const fragmentShader = document.getElementById("fragment-shader").textContent;
const vertexShader = document.getElementById("vertex-shader").textContent;
const scene = new THREE.Scene();
const renderer = window.WebGLRenderingContext ?
    new THREE.WebGLRenderer():
    new THREE.CanvasRenderer();
const u_resolution = [window.innerWidth, window.innerHeight];
const camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );

var quadGeometry = new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight, 1, 1 );
const quadMaterial = new THREE.ShaderMaterial({
    uniforms: {
        u_resolution:{
            value: new THREE.Vector2(window.innerWidth, window.innerHeight)
        }
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
});
const quad = new THREE.Mesh(quadGeometry, quadMaterial);

camera.position.x = 0;
camera.position.y =	0;
camera.position.z = 100;
camera.lookAt(scene.position);
scene.add(camera);
scene.add(quad);

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function initScene(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    window.addEventListener( 'resize', onWindowResize, false );
    render();
}

function render(){
    //update uniforms
    quadMaterial.uniforms.u_resolution.value = new THREE.Vector2(window.innerWidth, window.innerHeight);

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

document.addEventListener("DOMContentLoaded", function(){
    initScene();
});

document.addEventListener("resize", onWindowResize);