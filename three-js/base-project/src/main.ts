import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

class World {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  objects: Map<string, THREE.Mesh>;

  constructor() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      innerWidth / innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;
    this.scene.add(this.camera);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: document.getElementById('canvas') as HTMLCanvasElement,
    });
    this.renderer.setSize(innerWidth, innerHeight);
    this.objects = new Map();

    new OrbitControls(this.camera, this.renderer.domElement);

    const ambientLight = new THREE.AmbientLight();
    this.scene.add(ambientLight);

    const light = new THREE.SpotLight();
    light.position.set(-5, 5, 5);
    light.lookAt(new THREE.Vector3(0, 0, 0));
    this.scene.add(light);

    // Start Animating the world
    this.animate();
  }

  addObject(name: string, object: THREE.Mesh) {
    this.objects.set(name, object);
    this.scene.add(object);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const box = this.objects.get('box');
    if (box != undefined) {
      box.rotation.x += 0.02;
      box.rotation.y += 0.02;
      box.rotation.z += 0.02;
    }

    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(innerWidth, innerHeight);
  }
}

const world = new World();

const box = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 'green' })
);
world.addObject('box', box);

addEventListener('resize', () => {
  world.resize();
});
