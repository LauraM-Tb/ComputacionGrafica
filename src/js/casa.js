import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // Fondo blanco

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Controles
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(6, 5, 6);
controls.update();

//////////////////////////////////////////////////////////////
// CASA

// Base
const base = new THREE.Mesh(
  new THREE.BoxGeometry(3, 2, 3),
  new THREE.MeshBasicMaterial({ color: 0x00008B }) 
);
scene.add(base);

// Techo
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(2.5, 1.5, 4),
  new THREE.MeshBasicMaterial({ color: 0x000000 }) // Negro
);
roof.position.y = 1.75;
roof.rotation.y = Math.PI / 4;
scene.add(roof);

//////////////////////////////////////////////////////////////

// Grid y ejes
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//////////////////////////////////////////////////////////////

function animate() {
  controls.update();
  renderer.render(scene, camera);
}

//////////////////////////////////////////////////////////////

window.addEventListener('resize', onWindowResize);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}