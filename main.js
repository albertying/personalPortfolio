import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  5,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 50;

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
  alpha: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

// Mars

const marsTexture = new THREE.TextureLoader().load("./marstexture.png");
const marsNormalTexture = new THREE.TextureLoader().load(
  "./5672_mars_4k_normal.jpg"
);

const geometry = new THREE.SphereGeometry(9, 64, 32);

const material = new THREE.MeshStandardMaterial({
  map: marsTexture,
  normalMap: marsNormalTexture,
});

const mars = new THREE.Mesh(geometry, material);

mars.rotation.z = -1.5;
mars.rotation.y = -0.5;

mars.position.x = 7;
mars.position.y = -7;
mars.position.z = 5;

scene.add(mars);

// Lighting

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(ambientLight);

// Stars

// function addStar() {
//   const geometry = new THREE.SphereGeometry(0.02, 24, 24);
//   const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
//   const star = new THREE.Mesh(geometry, material);

//   let [x, y, z] = Array(3)
//     .fill()
//     .map(() => THREE.MathUtils.randFloatSpread(50));

//   z -= 30;

//   document.body.onscroll =
//   star.position.set(x, y, z);

//   scene.add(star);
// }

// for (let i = 0; i < 300; i++) {
//   addStar();
// }

let array = [];
function createStar() {
  for (let i = 0; i < 30; i++) {
    const geometry = new THREE.SphereGeometry(0.02, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    let [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(15));

    z -= 30;

    array.push(new THREE.Mesh(geometry, material));
    array[i].position.set(x, y, z);
    scene.add(array[i]);
  }
}

createStar();

// Mouse move interactivity

document.addEventListener("mousemove", onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(e) {
  mouseX = e.clientX - windowX;
  mouseY = e.clientY - windowY;
}

// scroll interactivity

function moveMars() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.y = t * 0.015;

  mars.position.x = t * -0.004 + 7;
  mars.position.y = t * 0.034 - 7;

  mars.rotation.y += 0.003;
  mars.rotation.y += 0.003;
}

document.body.onscroll = moveMars;
moveMars();

// Orbit controls

// const controls = new OrbitControls(camera, renderer.domElement);

// Animate

function animate() {
  requestAnimationFrame(animate);

  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;
  if (document.body.getBoundingClientRect().top === 0) {
    camera.position.x += 0.005 * (targetX - camera.position.x);
    camera.position.y += 0.005 * (targetY - camera.position.y);
  }

  mars.rotation.x += 0.0001;
  mars.rotation.y -= 0.0001;

  // controls.update();

  renderer.render(scene, camera);
}
animate();
