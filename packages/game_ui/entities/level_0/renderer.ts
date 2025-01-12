import * as THREE from 'three'
import { wrapperElement } from './wrapperElement'
export const renderer = new THREE.WebGLRenderer()
wrapperElement.appendChild(renderer.domElement)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(wrapperElement.clientWidth, wrapperElement.clientHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
export const rendererResize = () => {
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(wrapperElement.clientWidth, wrapperElement.clientHeight)
}