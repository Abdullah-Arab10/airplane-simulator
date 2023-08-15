import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
export abstract class Base {
  static width = window.innerWidth;
  static height = window.innerHeight;
  static renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('app') as HTMLCanvasElement,
    antialias: true,
  });

  static scene = new THREE.Scene();

  static mainCameraInitializer = () => {
    // prespective camera it is the same as real life camera
    const mainCamera = new THREE.PerspectiveCamera(
      90, //field of view the max angle what can be seen through the length of camera
      this.width / this.height, // aspect ratio
      0.1, // near plane
      100000 // far plane
    );
    mainCamera.position.set(0, -20000, -5000);
    mainCamera.rotation.set(0, 160, 0);
    //  mainCamera.position.set(0, 0, 0);

    return mainCamera;
  };
  static mainCamera = this.mainCameraInitializer();
  static orbit = new OrbitControls(this.mainCamera, this.renderer.domElement);

  static orbitSettings = () => {
    this.orbit.minDistance = 200;
    this.orbit.maxDistance = 300;
  };
  // Add keyboard input handling
  // Add event listener on keypress
}
