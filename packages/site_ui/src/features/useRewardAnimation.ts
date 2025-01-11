import { pickRandom } from '@site:shared/pickRandom';
import { publicPath } from '@site:shared/publicPath';
import * as THREE from 'three';

export function useRewardAnimation() {
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let coinTextures: THREE.Texture[];
  let animationFrame: number | null = null;
  const coins: { sprite: THREE.Sprite, velocity: THREE.Vector3 }[] = [];

  const initCanvas = () => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1000';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const loader = new THREE.TextureLoader();
    coinTextures = [
      loader.load(publicPath('/icons/coin-1.svg')),
      loader.load(publicPath('/icons/coin-2.svg'))
    ]

    window.addEventListener('resize', resizeScene);
  };

  const resizeScene = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const createCoin = () => {
    const spriteMaterial = new THREE.SpriteMaterial({ map: pickRandom(coinTextures) });
    const sprite = new THREE.Sprite(spriteMaterial);

    sprite.position.set(
      (Math.random() - 0.5) * 20,
      Math.random() * 10 + 5,
      0
    );
    sprite.scale.set(0.5, 0.5, 1);

    const velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 0.1,
      -Math.random() * 0.2 - 0.05,
      0
    );

    coins.push({ sprite, velocity });
    scene.add(sprite);
  };

  const animateScene = () => {
    for (const coin of coins) {
      coin.sprite.position.add(coin.velocity);
      coin.velocity.x += (Math.random() - 0.5) * 0.01;
      coin.velocity.y -= 0.0015;

      if (coin.sprite.position.y < -10) {
        scene.remove(coin.sprite);
        coins.splice(coins.indexOf(coin), 1);
      }
    }

    renderer.render(scene, camera);

    if (coins.length > 0) {
      animationFrame = requestAnimationFrame(animateScene);
    } else {
      stopAnimation();
    }
  };

  const stopAnimation = () => {
    if (animationFrame !== null) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
    renderer.domElement.remove();
    window.removeEventListener('resize', resizeScene);
  };

  const animate = () => {
    if (!scene) initCanvas()
    for (let i = 0; i < 250; i++) createCoin()
    if (animationFrame === null) animateScene()
  };

  return { animate };
}
