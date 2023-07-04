import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
export abstract class Base {
  static width = window.innerWidth;
  static height = window.innerHeight;
  static renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('app') as HTMLCanvasElement,
  });

  static scene = new THREE.Scene();

  static mainCameraInitializer = () => {
    // prespective camera it is the same as real life camera
    const mainCamera = new THREE.PerspectiveCamera(
      75, //field of view the max angle what can be seen through the length of camera
      this.width / this.height, // aspect ratio
      0.1, // near plane
      100000 // far plane
    );
    mainCamera.position.set(0, 200, 0);
    mainCamera.rotation.set(0, 160, 0);
    //  mainCamera.position.set(0, 0, 0);

    return mainCamera;
  };
  static mainCamera = this.mainCameraInitializer();
  static orbit = new OrbitControls(this.mainCamera, this.renderer.domElement);
  // Add keyboard input handling
  // Add event listener on keypress
}
