import * as THREE from 'three';

import * as dat from 'dat.gui';

import { Initializer } from './classes/scene-initializer';

Initializer.sceneInitializer();

Initializer.animate();

const gui = new dat.GUI();

const options = {
  sphereColor: '#ffea00',
};
/* gui.addColor(options, 'sphereColor').onChange(function (e) {
  sphere.material.color.set(e);
}); */
//
