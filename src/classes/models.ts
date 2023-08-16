import * as THREE from 'three';
import { Base } from './base';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Physics } from './physics';
import { Sound } from './sound';
export abstract class Model extends Base {
  static airplane = new THREE.Object3D();
  constructor() {
    super();
  }

  static loadRunwayModel = async () => {
    const container = new THREE.Object3D();
    const loader = new GLTFLoader();
    await loader
      .loadAsync('../../assets/models/airport/scene.gltf', (progress) => {})
      .then((gltf) => {
        const model = gltf.scene;
        container.add(model);
        model.position.set(0, -39700, -25000);

        model.scale.set(40, 40, 40);
      });
    this.scene.add(container);
  };
  static loadTreeModel = async () => {
    const loader = new GLTFLoader();
    await loader
      .loadAsync('../../assets/models/tree/scene.gltf', (progress) => {})
      .then((gltf) => {
        const model = gltf.scene;
        //  container.add(model);
        model.scale.set(30, 30, 30);
        for (let i = 0; i < 20; i++) {
          const clone = model.clone();
          clone.position.set(1000, -39750, 2000 * -i);
          this.scene.add(clone);
        }
        for (let i = 0; i < 12; i++) {
          const clone = model.clone();
          clone.position.set(-1000, -39750, 2000 * -i);
          this.scene.add(clone);
        }
        // model.position.set(0, -39750, -20000);
      });
  };
  static loadCloudModel = async () => {
    const loader = new GLTFLoader();
    await loader
      .loadAsync('../../assets/models/cloud/scene.gltf', (progress) => {})
      .then((gltf) => {
        const model = gltf.scene;
        //  container.add(model);
        model.scale.set(300, 300, 300);
        for (let i = -12; i < 12; i++) {
          const clone = model.clone();
          clone.position.set(50000 * Math.random(), -35000, 2000 * -i);
          this.scene.add(clone);
        }
        for (let i = -12; i < 12; i++) {
          const clone = model.clone();
          clone.position.set(-5000 * Math.random(), -35000, 2000 * -i);
          this.scene.add(clone);
        }
        // model.position.set(0, -39750, -20000);
      });
  };
  static loadAirplaneModel = async () => {
    const loader = new GLTFLoader();
    await Sound.landingMusic(true);
    Sound.landingMusic(true);

    await loader
      .loadAsync('../../assets/models/airplane/scene.gltf', (progress) => {})
      .then((gltf) => {
        this.airplane = gltf.scene.children[0];
        this.airplane.scale.set(40, 50, 60);
        const p = Physics.position;
        this.airplane.position.set(p.x, p.y, p.z);
        this.airplane.rotation.x = 4.8;
        Sound.landingMusic(true);
        setInterval(() => {
          Sound.progressBar.value += 10;
        }, 2500);
        setTimeout(() => {
          Sound.landingMusic(false);
          Sound.gameMusic();
        }, 25000);

        this.scene.add(gltf.scene);
      });
  };
}
