import { Base } from './base';

export abstract class Sound extends Base {
  constructor() {
    super();
  }
  static gameMusicElement = document.getElementById(
    'game-music'
  ) as HTMLAudioElement;
  static progressBar = document.getElementById(
    'progress'
  ) as HTMLProgressElement;
  static landingMusicElement = document.getElementById(
    'landing-music'
  ) as HTMLAudioElement;
  static start = false;
  static landingPage = document.querySelector(
    '.progress-bar-container'
  ) as HTMLDivElement;
  static gameMusic = async () => {
    const gameMusicLoader = new Audio('../../assets/sounds/jet.mp3');
    this.gameMusicElement.src = gameMusicLoader.src;
    this.gameMusicElement.play();
    this.landingPage.style.display = 'none';
    this.start = true;
    this.gameMusicElement.volume = 0.3;
  };

  static landingMusic = (start) => {
    const landingMusicLoader = new Audio('../../assets/sounds/landing.mp3');
    landingMusicLoader.addEventListener('canplaythrough', () => {
      this.landingMusicElement.src = landingMusicLoader.src;
      start === true
        ? this.landingMusicElement.play()
        : this.landingMusicElement.pause();
      this.landingMusicElement.volume = 1;
    });
  };
}
