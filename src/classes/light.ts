import { Base } from './base';
import * as THREE from 'three';
import { Physics } from './physics';

export abstract class Lighter extends Physics {
  constructor() {
    super();
  }
  static directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  static light = new THREE.PointLight(0xc4c4c4, 1);
  static light2 = new THREE.PointLight(0xc4c4c4, 1);
  static light3 = new THREE.PointLight(0xc4c4c4, 1);

  static light4 = new THREE.PointLight(0xc4c4a1, 1);

  static initLight = () => {
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);
    this.scene.add(this.light);
    this.scene.add(this.light2);
    this.scene.add(this.light3);
    this.scene.add(this.light4);
    this.airplaneLightPosition(this.position);
  };
  static airplaneLightPosition = (p) => {
    //    this.directionalLight.position.set(p.x, p.y + 100, p.z);

    this.light.position.set(p.x, p.y + 300, p.z + 500);

    this.light2.position.set(p.x + 500, p.y + 100, 0);

    this.light3.position.set(p.x, p.y + 100, p.z - 500);

    this.light4.position.set(p.x - 500, p.y + 300, p.z);
  };
}
