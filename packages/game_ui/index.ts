import { 
  renderer, 
  rendererResize ,
  gameCamera,
  gameCameraResize,
  gameScene,
  wrapperElement,
  THREE,
  Mouse
} from './entities/level_0'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Surface, MeshVerticiesEditor } from './entities/level_1'
import { guiInstance } from './entities/level_0/Configurable'

export const startWebGLApplication = () => {

  gameCamera.position.z = 12
  gameCamera.position.y = 8
  gameCamera.rotateY(Math.PI / 4)


  const surface = new Surface()
  const axesHelper = new THREE.AxesHelper(2)
  const orbitControls = new OrbitControls(gameCamera, wrapperElement)
  orbitControls.enableDamping = true

  gameScene.add(axesHelper, surface)

  const raycaster = new THREE.Raycaster();
  

  const mouse = new Mouse(wrapperElement, {
    preventDefault: true,
    morphCoords: {
      x: (value: number) => (value / wrapperElement.clientWidth ) * 2 - 1,
      y: (value: number) => ((value / wrapperElement.clientHeight) * 2 - 1) * -1,
      deltaX: (value: number) => (value / wrapperElement.clientWidth),
      deltaY: (value: number) => (value / wrapperElement.clientHeight) * -1,
    }
  })

  const terrainEditor = new MeshVerticiesEditor(
    raycaster,
    surface.terrain,
    mouse,
    new THREE.Color('red'),
    new THREE.Color('green'),
    (value) => {
      localStorage.setItem('terrain', JSON.stringify(value))
    }
  )

  gameScene.background = new THREE.CubeTextureLoader()
  .setPath('/RoutineGamifier/environmentMaps/1/')
  .load(
    [
      'px.jpg',
      'nx.jpg',
      'py.jpg',
      'ny.jpg',
      'pz.jpg',
      'nz.jpg'
    ]
  )

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  gameScene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff,8.25); // Белый свет
  directionalLight.position.set(5, 1.2, 4.8); // Расположить свет выше плоскости
  directionalLight.castShadow = true; // Включить отбрасывание теней
  gameScene.add(directionalLight);

  // Настройка теней для более качественного отображения
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 5000;

  const lightFolder = guiInstance.addFolder('light')
  lightFolder.add(directionalLight.position, 'x', 0, 10, 0.1)
  lightFolder.add(directionalLight.position, 'y', 0, 100, 0.1)
  lightFolder.add(directionalLight.position, 'z', 0, 10, 0.1)
  lightFolder.add(directionalLight, 'intensity', 0, 20, 0.05)
  const raycast = () => {
    raycaster.setFromCamera( terrainEditor.pointer, gameCamera );
    orbitControls.enabled = !terrainEditor.activeIntersection
  }

  renderer.setAnimationLoop((time, frame) => {
    raycast()
    orbitControls.update()
    renderer.render(gameScene, gameCamera)
  })

  window.addEventListener('resize', () => {
    gameCameraResize()
    rendererResize()
  })
}