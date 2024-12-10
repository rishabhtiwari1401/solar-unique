// Solar System in 3D using Three.js

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0x404040, 1);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Create the Sun (center of the solar system)
const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Create the planets
const planets = [];
const planetData = [
  { size: 0.4, distance: 4, speed: 0.02, color: 0x888888 },
  { size: 0.6, distance: 6, speed: 0.01, color: 0xaaaaff },
  { size: 0.8, distance: 8, speed: 0.008, color: 0xff5555 },
  { size: 1, distance: 10, speed: 0.006, color: 0x7777ff },
  { size: 0.7, distance: 12, speed: 0.004, color: 0xffcc66 },
  { size: 1.5, distance: 15, speed: 0.003, color: 0x77ff77 },
  { size: 1.2, distance: 18, speed: 0.002, color: 0x8888ff },
  { size: 1, distance: 20, speed: 0.0015, color: 0x666666 }
];

planetData.forEach((data) => {
  const geometry = new THREE.SphereGeometry(data.size, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: data.color });
  const planet = new THREE.Mesh(geometry, material);
  planet.orbitData = data;
  scene.add(planet);
  planets.push(planet);
});

// Position the camera
camera.position.z = 30;

// Animation Loop
let time = 0;
function animate() {
  requestAnimationFrame(animate);

  // Update the planets' positions (orbiting the sun)
  planets.forEach((planet, index) => {
    time += planet.orbitData.speed;
    planet.position.x = planet.orbitData.distance * Math.cos(time);
    planet.position.z = planet.orbitData.distance * Math.sin(time);
  });

  // Render the scene
  renderer.render(scene, camera);
}

// Handling window resizing
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Start the animation
animate();
