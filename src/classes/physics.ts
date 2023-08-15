import { Base } from './base';
import * as THREE from 'three';

const dragCoefficient = 0.1;
const airDensity = 1;
const wingArea = 21.08; // wing area in square meters
const wingLiftCoefficient = 0.496; // wing lift coefficient
const referenceArea = 23.3; // Reference area of the airplane in square meters

export abstract class Physics extends Base {
  constructor() {
    super();
  }

  static options = {
    gravity: 9.7,
    thrust: 2200,
    mass: 1000,
  };

  static velocity = new THREE.Vector3(0, 150, 10);

  static position = new THREE.Vector3(0, -39525, -24000);
  static accForPos = new THREE.Vector3(0, 0, 0);
  static acceleration = new THREE.Vector3(0, 0, 0);

  static initForces = () => {
    this.velocity.add(this.acceleration);
    let v = this.velocity;
    let speed = new THREE.Vector3(v.x, v.y / 20, v.z / 20);
    this.position.add(speed.divideScalar(1));
    this.acceleration.set(0, 0, 0);
  };

  static applyForce = () => {
    this.applyGravityAndLiftForce();
    this.applyDragAndThrust();

    this.initForces();
  };

  static changeGravity = (gravite) => {
    this.options.gravity = gravite;
    this.applyForce();
  };
  static changeMass = (mass) => {
    this.options.mass = mass;
    this.applyForce();
  };
  static changeThrust = (thrust) => {
    this.options.thrust = thrust;
    this.applyForce();
  };

  static applyGravityAndLiftForce = () => {
    // L = Cl * A * .5 * r * V^2
    let speed = this.velocity.z;

    let liftForce =
      0.5 * airDensity * wingArea * wingLiftCoefficient * Math.pow(speed, 2);

    let weightForce = this.options.mass * this.options.gravity;

    const netForce = liftForce - weightForce;

    const acc = netForce / this.options.mass;

    this.acceleration.y = acc;
    this.accForPos.y = acc / 20;

    this.initForces();
  };

  static applyDragAndThrust = () => {
    //F =-0.5 ρ (v^2) A Cd
    //ρ is the density of the fluid.
    //C is the drag coefficient.
    //A is the area of the object facing the fluid.

    let speed = this.velocity.z;

    const dragForce =
      0.5 * dragCoefficient * airDensity * referenceArea * Math.pow(speed, 2);
    const netForce = this.options.thrust - dragForce;

    const acceleration = netForce / this.options.mass;
    this.acceleration.z = acceleration;

    this.initForces();
  };
}
