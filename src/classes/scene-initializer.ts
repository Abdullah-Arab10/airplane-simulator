import * as THREE from 'three';
import { Base } from './base';
import dat from 'dat.gui';
import { Lighter } from './light';
import { Physics } from './physics';
import { Sound } from './sound';
import { Model } from './models';
export abstract class Initializer extends Base {
  constructor() {
    super();
  }

  public static testBackground = () => {};
  public static sceneInitializer = () => {
    window.addEventListener('resize', this.windowInitializer, false);
    this.windowInitializer();
    this.orbitSettings();
    this.backgroundInitializer();
    Model.loadAirplaneModel();
    Model.loadRunwayModel();
    Model.loadTreeModel();
    Model.loadCloudModel();
    this.panel();

    this.renderer.render(this.scene, this.mainCamera);
  };
  public static windowInitializer = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setSize(this.width, this.height);
  };
  static geometry = new THREE.SphereGeometry(50000, 600, 400);
  static sphere;
  public static backgroundInitializer = async () => {
    this.geometry.scale(-1, 1, 1);

    let materialArray = [];
    let texture_ft = new THREE.TextureLoader().load(
      '../../assets/world/posz.jpg'
    );
    let texture_bk = new THREE.TextureLoader().load(
      '../../assets/world/negz.jpg'
    );
    let texture_up = new THREE.TextureLoader().load(
      '../../assets/world/posy.jpg'
    );
    let texture_dn = new THREE.TextureLoader().load(
      '../../assets/world/negy.jpg'
    );
    let texture_rt = new THREE.TextureLoader().load(
      '../../assets/world/negx.jpg'
    );
    let texture_lf = new THREE.TextureLoader().load(
      '../../assets/world/posx.jpg'
    );

    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

    for (let i = 0; i < 6; i++) materialArray[i].side = THREE.BackSide;

    let skyboxGeo = new THREE.BoxGeometry(80000, 80000, 80000);
    let skybox = new THREE.Mesh(skyboxGeo, materialArray);
    skybox.position.set(0, 0, 0);

    this.scene.add(skybox);
  };

  static changeOverTime = () => {
    Physics.applyForce();

    const p = Physics.position;

    Model.airplane.position.y += Physics.accForPos.y;

    if (Physics.accForPos.y > 0) {
      if (Model.airplane.rotation.x > 4.5) {
        Model.airplane.rotation.x -= 0.0005;
      }
    }

    if (Physics.accForPos.y < 0) {
      if (Model.airplane.rotation.x <= 5) {
        Model.airplane.rotation.x += 0.0005;
      }
    }

    if (Math.round(p.y) == Math.round(Model.airplane.position.y)) {
      Model.airplane.rotation.x = 4.8;
    }

    Model.airplane.position.z = p.z;
  };

  public static animate = () => {
    requestAnimationFrame(this.animate);
    if (Model.airplane && Sound.start) {
      this.changeOverTime();
      Lighter.initLight();
      this.orbit.target.copy(Model.airplane.position);
      this.orbit.enableZoom = true;
    }

    this.orbit.update();

    this.renderer.render(this.scene, this.mainCamera);
  };

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
  };
}
