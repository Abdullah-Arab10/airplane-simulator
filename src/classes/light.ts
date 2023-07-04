import { Base } from './base';
import * as THREE from 'three';
import { Physics } from './physics';

export abstract class Lighter extends Base {
  constructor() {
    super();
  }
  static directionalLight = new THREE.DirectionalLight(0xffffff, 100);
  static light = new THREE.PointLight(0xc4c4c4, 100);
  static light2 = new THREE.PointLight(0xc4c4c4, 10);
  static light3 = new THREE.PointLight(0xc4c4c4, 10);

  static light4 = new THREE.PointLight(0xc4c4a1, 100);

  static initLight = () => {
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);
    this.scene.add(this.light);
    this.scene.add(this.light2);
    this.scene.add(this.light3);
    this.scene.add(this.light4);
    this.airplaneLightPosition(new THREE.Vector3(0, 0, 0));
  };
  static airplaneLightPosition = (p) => {
    this.directionalLight.position.set(p.x, p.y + 1, p.z);

    this.light.position.set(p.x, p.y + 300, p.z + 500);

    this.light2.position.set(p.x + 500, p.y + 100, 0);

    this.light3.position.set(p.x, p.y + 100, p.z - 500);

    this.light4.position.set(p.x - 500, p.y + 300, p.z);
  };
}
