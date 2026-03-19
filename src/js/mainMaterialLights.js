import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f9fa);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);


const geometry = new THREE.BoxGeometry(1, 1, 1);
const loader = new THREE.TextureLoader();


const materialCubeFaces = [
  new THREE.MeshStandardMaterial({ map: loader.load('../../src/imagenes/face1.jpg') }),
  new THREE.MeshStandardMaterial({ map: loader.load('../../src/imagenes/face2.png') }),
  new THREE.MeshStandardMaterial({ map: loader.load('../../src/imagenes/face3.jpg') }),
  new THREE.MeshStandardMaterial({ map: loader.load('../../src/imagenes/face4.jpg') }),
  new THREE.MeshStandardMaterial({ map: loader.load('../../src/imagenes/face5.png') }),
  new THREE.MeshStandardMaterial({ map: loader.load('../../src/imagenes/face6.jpg') })
];


const materialHell = new THREE.MeshStandardMaterial({
  map: loader.load('../../src/imagenes/uv_test_bw_1024.png')
});


const materialBasic = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });
const materialStandard = new THREE.MeshStandardMaterial({ color: 0xff00ff, metalness: 1, roughness: 0.4 });
const materialPhong = new THREE.MeshPhongMaterial({
  map: loader.load('../../src/img/face1.jpg'),
  shininess: 100
});
const materialLambert = new THREE.MeshLambertMaterial({
  map: loader.load('../../src/img/face2.png')
});
const materialTransparent = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  transparent: true,
  opacity: 0.4
});
const materialMetal = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 1,
  roughness: 0.1
});
const materialDark = new THREE.MeshStandardMaterial({
  color: 0x222222
});
const materialRandom = new THREE.MeshStandardMaterial({
  color: Math.random() * 0xffffff
});


const cubes = [];

cubes.push(new THREE.Mesh(geometry, materialCubeFaces)); // 1 (caras)
cubes.push(new THREE.Mesh(geometry, materialHell));      // 2 (hellnaw)
cubes.push(new THREE.Mesh(geometry, materialBasic));     // 3
cubes.push(new THREE.Mesh(geometry, materialStandard));  // 4
cubes.push(new THREE.Mesh(geometry, materialPhong));     // 5
cubes.push(new THREE.Mesh(geometry, materialLambert));   // 6
cubes.push(new THREE.Mesh(geometry, materialTransparent)); // 7
cubes.push(new THREE.Mesh(geometry, materialMetal));     // 8
cubes.push(new THREE.Mesh(geometry, materialDark));      // 9
cubes.push(new THREE.Mesh(geometry, materialRandom));    // 10


cubes.forEach((cube, i) => {
  cube.position.x = (i - 5) * 1.5;
  scene.add(cube);
});


const controls = new OrbitControls(camera, renderer.domElement);
camera.position.z = 10;


scene.add(new THREE.GridHelper(20, 20));
scene.add(new THREE.AxesHelper(5));


function animate() {
  cubes.forEach((cube, i) => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  });

  controls.update();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});