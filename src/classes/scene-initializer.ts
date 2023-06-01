import * as THREE from 'three';
import { Base } from './base';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
export abstract class Initializer extends Base {
  constructor() {
    super();
  }
  static airplane;
  static sum = 1;

  public static sceneInitializer = () => {
    this.renderer.setSize(this.width, this.height);
    this.backgroundInitializer();
    this.loadAirplaneModel();
    this.renderer.render(this.scene, this.mainCamera);
    //helpers
    const axesHelper = new THREE.AxesHelper(5000);
    this.scene.add(axesHelper);
    const gridHelper = new THREE.GridHelper(5000);
    // this.scene.add(gridHelper);
  };

  public static backgroundInitializer = () => {
    const loader = new THREE.TextureLoader();
    const texture = loader.load('../../assets/images/back.jpg');
    const geometry = new THREE.SphereGeometry(5000, 600, 400);
    geometry.scale(-1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });
    const sphere = new THREE.Mesh(geometry, material);
    this.scene.add(sphere);
    /*     const loader = new RGBELoader(;);
    loader.load('../../assets/images/world.hdr', (texture) => {
      texture.mapping = THREE.EquirectangularRefractionMapping;
      this.scene.background = texture;
      this.scene.environment = texture;
    }); */
  };

  static loadAirplaneModel = () => {
   const directionalLight = new THREE.DirectionalLight(0xffffff,100);
   directionalLight.position.set(0,1,0);
   directionalLight.castShadow = true; 
   this.scene.add(directionalLight);

   const light = new THREE.PointLight(0xc4c4c4,10);
   light.position.set(0,300,500);
   this.scene.add(light);

   const light2 = new THREE.PointLight(0xc4c4c4,10);
   light2.position.set(500,100,0);
   this.scene.add(light2);

   const light3 = new THREE.PointLight(0xc4c4c4,10);
   light3.position.set(0,100,-500);
   this.scene.add(light3);

   const light4 = new THREE.PointLight(0xc4c4c4,10);
   light4.position.set(-500,300,0);
   this.scene.add(light4);

    const loader = new GLTFLoader();
    loader.load('../../assets/models/airplane/scene.gltf', (gltf) => {
      this.airplane = gltf.scene.children[0];
      this.airplane.scale.set(100, 100, 100);
      this.airplane.position.set(0, 0, -5000);

      this.scene.add(gltf.scene);
      setInterval(() => {
        //console.log(this.airplane.position);
        // this.mainCamera.position.y = this.sum;
        this.airplane.position.z = this.sum;
        console.log(this.mainCamera.rotation);
        this.sum += 0.1;
      }, 10);
    });
  };

  public static animate = () => {
    requestAnimationFrame(this.animate);

    // required if controls.enableDamping or controls.autoRotate are set to true
    this.orbit.update();
    this.renderer.render(this.scene, this.mainCamera);
  };
}
