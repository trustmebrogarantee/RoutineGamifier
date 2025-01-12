import * as THREE from 'three'
import { wrapperElement } from './wrapperElement'
import { guiInstance } from './Configurable'

export const gameCamera = new THREE.PerspectiveCamera(75, wrapperElement.clientWidth / wrapperElement.clientHeight, 0.1, 1000)
gameCamera.position.set(4.4, 5.2, 2.2)
gameCamera.lookAt(new THREE.Vector3(0,0,0))
const folder = guiInstance.addFolder('Camera Position')
folder.add(gameCamera.position, 'x', 0, 100, 0.1,).name('X Coordinate')
folder.add(gameCamera.position, 'y', 0, 100, 0.1,).name('Y Coordinate')
folder.add(gameCamera.position, 'z', 0, 100, 0.1,).name('Z Coordinate')
folder.open()
export const gameCameraResize = () => {
  gameCamera.aspect = wrapperElement.clientWidth / wrapperElement.clientHeight
  gameCamera.updateProjectionMatrix()
}