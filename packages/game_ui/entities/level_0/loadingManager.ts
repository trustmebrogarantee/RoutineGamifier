import * as THREE from 'three'

export const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = (url, num, total) => {
  console.log('start', url, num, total);
}
loadingManager.onProgress = (url, num, total) => {
  console.log('progress', url, num, total);
}
loadingManager.onLoad = () => {
  console.log('loaded')
}
loadingManager.onError = (e ) => {
  console.error(e)
}