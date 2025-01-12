import { THREE, Group, Configurable } from "../level_0"

@Configurable({
  position: (position, gui) => {
    const folder = gui.addFolder('Surface Position');
    folder.add(position, 'x', 1, 100, 0.1).name('X Coordinate');
    folder.add(position, 'y', 1, 100, 0.1).name('Y Coordinate');
    folder.open()
  },
  rotation: (rotation, gui) => {
    const folder = gui.addFolder('Surface Rotation');
    folder.add(rotation, 'x', -Math.PI, Math.PI, 0.1).name('X Axis');
    folder.add(rotation, 'y', -Math.PI, Math.PI, 0.1).name('Y Axis');
    folder.add(rotation, 'z', -Math.PI, Math.PI, 0.1).name('Z Axis');
    folder.open()
  },
  terrain: (terrain, gui) => {
    const folder = gui.addFolder('Terrain Settings');
    folder.add(terrain.material, 'wireframe')
    folder.open()
  }
})
export class Surface extends Group {
  public terrain: THREE.Mesh = this.GenerateTerrain()
  public editorMeshes: THREE.Mesh[] = []
  
  constructor(...objects: THREE.Object3D[]) {
    super()
    this.add(this.terrain, ...objects)
  }

  GenerateTerrain () {
    const width = 200
    const height = 200
    const depth = 50
    const geometry = new THREE.PlaneGeometry(width, height, depth, depth)
    const savedTerrain = window.localStorage.getItem('terrain')
    if (savedTerrain) {
      const verticies = JSON.parse(savedTerrain)
      geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verticies), 3))
      geometry.computeVertexNormals();
    } else {
      const verticies = Array.from(geometry.attributes.position.array)
      for (let i = 0; i < verticies.length; i += 3) verticies[i + 2] = Math.random() * 0.4
      geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verticies), 3))
      geometry.computeVertexNormals();
    }
    geometry.setAttribute('uv2', new THREE.BufferAttribute(geometry.attributes.uv.array, 2))
    const material = new THREE.MeshStandardMaterial({
      color: 0x41980a, // Зеленоватый оттенок
      wireframe: false, // Отключить каркас для реалистичного отображения
    });

    
    const plane = new THREE.Mesh(geometry, material)
    plane.castShadow = true;
    plane.receiveShadow = true; // Плоскость принимает тени
    this.rotation.x = -Math.PI / 2
    return plane
  }
}