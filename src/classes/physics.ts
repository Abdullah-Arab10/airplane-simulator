import { Base } from './base';
import * as THREE from 'three';

const dragCoefficient = 0.1;
const airDensity = 1;
const maxLift = 9.7; // maximum lift force
const maxAngle = Math.PI / 4; // maximum angle of attack
const wingArea = 21.08; // wing area in square meters
const wingLiftCoefficient = 0.496; // wing lift coefficient
const referenceArea = 23.3; // Reference area of the airplane in square meters

export abstract class Physics extends Base {
  constructor() {
    super();
  }
  static angle;

  static options = {
    gravity: 9.7,
    thrust: 2161,
    mass: 1000,
    wind: 0.1,
    airspeed: 64.21,
  };

  static velocity = new THREE.Vector3(0, 150, 10);

  static position = new THREE.Vector3(0, 0, 0);

  static weightForce = new THREE.Vector3(
    0,
    this.options.gravity * this.options.mass * -1,
    0
  );

  static acceleration = new THREE.Vector3(0, 0, 0);

  static wind = new THREE.Vector3(0, 0, this.options.wind * -1);

  static initForces = () => {
    this.velocity.add(this.acceleration);
    let v = this.velocity;
    let speed = new THREE.Vector3(v.x, v.y / 1000, v.z / 1000);
    this.position.add(speed.divideScalar(1));
    this.acceleration.set(0, 0, 0);
  };

  static applyForce = () => {
    this.applyGravity();

    this.applyDragAndThrust();
    this.initForces();
  };

  static changeGravity = (gravite) => {
    this.options.gravity = gravite;
    this.applyGravity();
  };
  static changeMass = (mass) => {
    this.options.mass = mass;
    this.applyGravity();
  };
  static changeThrust = (thrust) => {
    this.options.thrust = thrust;
    this.applyDragAndThrust();
  };

  static changeAirSpeed = (speed) => {
    this.options.airspeed = speed;
    this.applyLiftForce();
  };

  static applyGravity = () => {
    //𝑊 = m * g
    this.weightForce.setY(-this.options.mass * this.options.gravity);
    this.applyLiftForce();
  };
  static applyLiftForce = () => {
    // L = Cl * A * .5 * r * V^2
    let speed = this.velocity.z;

    let liftForce =
      0.5 * airDensity * wingArea * wingLiftCoefficient * Math.pow(speed, 2);

    let weightForce = this.weightForce.y;

    const netForce = liftForce - -weightForce;

    this.angle = Math.atan(liftForce / weightForce);
    const acc = netForce / this.options.mass;
    this.acceleration.y = acc;

    this.initForces();
  };
  static applyWind = (wind) => {
    this.wind.z = -wind;
    this.acceleration.add(this.wind);
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

// laws
/* 
//Newton second law
Force = Acceleration * Mass
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

dx\dt

velocity is change of postion over time

acceleration is change of velocity over time
 */
