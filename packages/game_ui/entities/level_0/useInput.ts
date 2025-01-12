import { Vector2 } from "three";

const listeners = () => {
  window.addEventListener('mousedown')
  window.addEventListener('mousemove')
  window.addEventListener('mouseup')
}

export const userInput = (() => {
  const mouse = {
    pressed: {
      lmb: false,
      rmb: false,
      wheel: false
    },
  }

  const keyboard = {
    pressed: {}
  }

  return {
    mouse
  }
})()

window.addEventListener('mousedown', (e) => {
  if (e.button === 0) {
    const intersects = raycaster.intersectObjects(surface.editorMeshes);
    const [intersection] = intersects
    if (intersection) {
      activeIntersection = intersection
      activeIntersection.object.material.color.set('green')
    }
  }
})

  window.addEventListener('mouseup', () => {
    if (activeIntersection) {
      activeIntersection.object.material.color.set('red')
      activeIntersection = null
      window.localStorage.setItem('terrain', JSON.stringify([...surface.terrain.geometry.attributes.position.array]))
    }
  })

  window.addEventListener('pointermove', (event) => {
    pointer.x = ( event.clientX / wrapperElement.clientWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / wrapperElement.clientHeight ) * 2 + 1;
    pointerDelta.x = event.movementX / wrapperElement.clientWidth
    pointerDelta.y = event.movementY / wrapperElement.clientHeight * -1

    if (activeIntersection) {
      const planeVertex = activeIntersection.object.userData.verticies
      const SCALE_FACTOR = 3
      morphObjectGeometry(surface.terrain, planeVertex, new THREE.Vector3(0, 0, pointerDelta.y * SCALE_FACTOR))
      activeIntersection.object.position.z += pointerDelta.y * SCALE_FACTOR
    }
  });