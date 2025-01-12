import { THREE, Mouse } from "../level_0";

export class MeshVerticiesEditor {
  public editorMeshes: THREE.Mesh[] = []
  public activeIntersection: null | THREE.Intersection = null
  public pointer = new THREE.Vector2(0, 0)

  constructor(
    public raycaster: THREE.Raycaster,
    public targetMesh: THREE.Mesh,
    public mouse: Mouse,
    public color: THREE.Color,
    public activeColor: THREE.Color,
    public save: (value: number[]) => void = () => {},
  ) {
    this.GenerateMorphVerticies()
    this.mouse.on('lmb-mousedown', this.PickVertice.bind(this))
    this.mouse.on('lmb-mouseup', this.UnpickVertice.bind(this))
    this.mouse.on('mousemove', this.MorphVertex.bind(this))
  }

  GenerateMorphVerticies() {
    const verticies = this.targetMesh.geometry.attributes.position.array
    for (let i = 0; i < verticies.length / 3; i++) {
      const x = verticies[i * 3]
      const y = verticies[i * 3 + 1]
      const z = verticies[i * 3 + 2] + 0.1
      const material = new THREE.MeshStandardMaterial({ color: this.color })
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), material)
      mesh.userData = { verticies: [i * 3, i * 3 + 1, i * 3 + 2] }
      mesh.position.set(x, y, z)
      this.editorMeshes.push(mesh)
      this.targetMesh.add(mesh)
    }
  }

  MorphObjectGeometry (
    object: THREE.Mesh, 
    vertexIndicies: [number, number, number], 
    morphVector: THREE.Vector3
  ) {
    const verticies = object.geometry.attributes.position.array
    verticies[vertexIndicies[0]] += morphVector.x 
    verticies[vertexIndicies[1]] += morphVector.y
    verticies[vertexIndicies[2]] += morphVector.z
    object.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verticies), 3))
    object.geometry.computeVertexNormals();
    object.geometry.attributes.position.needsUpdate = true
  }

  PickVertice () {
    const intersects: THREE.Intersection<THREE.Mesh>[] = this.raycaster.intersectObjects(this.editorMeshes);
    
    const [intersection] = intersects
    if (intersection) {
      this.activeIntersection = intersection
      this.activeIntersection.object.material.color = this.activeColor
    }
  }

  UnpickVertice () {
    if (this.activeIntersection) {
      this.activeIntersection.object.material.color = this.color
      this.activeIntersection = null
      this.save([...this.targetMesh.geometry.attributes.position.array])
    }
  }

  MorphVertex ({ deltaY, x, y }) {
    this.pointer.set(x, y)
    this.raycaster.intersectObjects(this.editorMeshes)

    if (this.activeIntersection) {
      const planeVertex = this.activeIntersection.object.userData.verticies
      const SCALE_FACTOR = 3
      this.MorphObjectGeometry(this.targetMesh, planeVertex, new THREE.Vector3(0, 0, deltaY * SCALE_FACTOR))
      this.activeIntersection.object.position.z += deltaY * SCALE_FACTOR
    }
  }
}