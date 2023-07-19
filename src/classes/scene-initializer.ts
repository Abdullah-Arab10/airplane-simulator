import * as THREE from 'three';
import { Base } from './base';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import dat from 'dat.gui';
import { Lighter } from './light';
import { Physics } from './physics';
import { Sound } from './sound';
export abstract class Initializer extends Base {
  constructor() {
    super();
  }

  static airplane;

  

  public static sceneInitializer = () => {
    window.addEventListener('resize', this.windowInitializer, false);
    this.windowInitializer();
    this.backgroundInitializer();
    this.loadAirplaneModel();
    this.panel();
    //this.createRectangle(2000, 2000, '../../assets/images/grass.jpg');
    const modelScale = { x: 300, y: 300, z: 300 };
    this.createRectangleWithModel('../../assets/models/airport/scene.gltf', { x: 0, y: -35000, z: -35000 } , modelScale);

    this.renderer.render(this.scene, this.mainCamera);
    //helpers
    const axesHelper = new THREE.AxesHelper(5000);
    this.scene.add(axesHelper);
    const gridHelper = new THREE.GridHelper(5000);
  };
  public static windowInitializer = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setSize(this.width, this.height);
  };
  static geometry = new THREE.SphereGeometry(50000, 600, 400);
  public static backgroundInitializer = async () => {
    const loader = new THREE.TextureLoader();
    const texture = await loader.load('../../assets/images/back.jpg');
    this.geometry.scale(-1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });
    const sphere = new THREE.Mesh(this.geometry, material);
    this.scene.add(sphere);
  };

  static loadAirplaneModel = async () => {
    const l = new THREE.LoadingManager();

    const loader = new GLTFLoader(l);
    await Sound.landingMusic(true);
    Sound.landingMusic(true);
    await loader
      .loadAsync('../../assets/models/airplane/scene.gltf', (progress) => {})
      .then((gltf) => {
        this.airplane = gltf.scene.children[0];
        this.airplane.scale.set(100, 150, 180);
        setInterval(() => {
          Sound.progressBar.value += 10;
        }, 2500);
        setTimeout(() => {
          Sound.gameMusic();
        }, 25000);

        this.scene.add(gltf.scene);
      });
  };

  static changeOverTime = () => {
    Physics.applyForce();

    const p = Physics.position;
    const angle = Physics.angle;
    if (p.y > this.airplane.position.y) {
      this.airplane.position.y += 0.1;
      if (this.airplane.rotation.x >= 4.75) {
        this.airplane.rotation.x -= 0.0005;
      }
      //   this.airplane.rotation.x = 4.5;
    }
    if (p.y < this.airplane.position.y) {
      this.airplane.position.y += -0.1;
      if (this.airplane.rotation.x < 5) {
        this.airplane.rotation.x += 0.0005;
      }
    }

    if (Math.round(p.y) == Math.round(this.airplane.position.y)) {
      this.airplane.rotation.x = 4.75;
    }
    this.airplane.position.z = p.z;
  };

  public static animate = () => {
    requestAnimationFrame(this.animate);
    if (this.airplane && Sound.start) {
      this.changeOverTime();
      Lighter.initLight();
      this.orbit.target.copy(this.airplane.position);
    }
    this.orbit.update();

    this.renderer.render(this.scene, this.mainCamera);
  };

  a = 10;
  static panel = () => {
    const changeGravity = (val) => {
      Physics.changeGravity(val);
    };
    const changeThrust = (val) => {
      Physics.changeThrust(val);
    };
    const changeMass = (val) => {
      Physics.changeMass(val);
    };
    const changeWind = (val) => {
      this.airplane.rotation.x = val;
    };
    const changeAirSpeed = (val) => {
      Physics.changeAirSpeed(val);
    };
    const gui = new dat.GUI();
    gui
      .add(Physics.options, 'gravity')
      .name('gravity')
      .onChange(function (val): void {
        changeGravity(val);
      });
    gui
      .add(Physics.options, 'thrust')
      .name('thrust')
      .onChange(function (val): void {
        changeThrust(val);
      });
    gui
      .add(Physics.options, 'mass')
      .name('mass')
      .onChange(function (val): void {
        changeMass(val);
      });
    gui
      .add(Physics.options, 'wind')
      .name('wind')
      .onChange(function (val): void {
        changeWind(val);
      });
    gui
      .add(Physics.options, 'airspeed')
      .name('air speed')
      .onChange(function (val): void {
        changeAirSpeed(val);
      });
  };
  
  static createRectangle = (width, height, textureUrl) =>{
    const geometry = new THREE.PlaneGeometry(width, height);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(textureUrl);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const rectangle = new THREE.Mesh(geometry, material);
    rectangle.position.set(0, -3000, 0);
    rectangle.rotation.x = Math.PI / -2;
    this.scene.add(rectangle);
    return rectangle;
  };

  static createRectangleWithModel = (modelUrl, modelOffset, modelScale) =>{
    const container = new THREE.Object3D();
    /*const rectangle = Initializer.createRectangle(width, height, textureUrl);
    container.add(rectangle);*/
    const loader = new GLTFLoader();
    loader.load(modelUrl, (gltf) => {
      const model = gltf.scene;
      container.add(model);
      model.position.set(modelOffset.x, modelOffset.y, modelOffset.z);
      model.scale.set(modelScale.x, modelScale.y, modelScale.z);
    });
    this.scene.add(container);
    return container;
  };

}
