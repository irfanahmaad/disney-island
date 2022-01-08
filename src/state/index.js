import * as THREE from 'three'
import dynamic from 'next/dynamic'

export const geometries = [
  new THREE.SphereBufferGeometry(1, 32, 32),
  new THREE.TetrahedronBufferGeometry(1.5),
  new THREE.TorusBufferGeometry(1, 0.35, 16, 32),
  new THREE.OctahedronGeometry(1.5),
  new THREE.IcosahedronBufferGeometry(1.5),
]

const SampleIsland = dynamic(() => import('src/island/sample-island'), {
  ssr: false,
})

export const islands = [
  {
    gltfjsx: () => <SampleIsland />,
    name: 'Sample Island 1',
    geometry: new THREE.SphereBufferGeometry(1, 32, 32),
  },
  {
    gltfjsx: () => <SampleIsland />,
    name: 'Sample Island 2',
    geometry: new THREE.TetrahedronBufferGeometry(1.5),
  },
  {
    gltfjsx: () => <SampleIsland />,
    name: 'Sample Island 3',
    geometry: new THREE.TorusBufferGeometry(1, 0.35, 16, 32),
  },
  {
    gltfjsx: () => <SampleIsland />,
    name: 'Sample Island 4',
    geometry: new THREE.OctahedronGeometry(1.5),
  },
  {
    gltfjsx: () => <SampleIsland />,
    name: 'Sample Island 5',
    geometry: new THREE.IcosahedronBufferGeometry(1.5),
  },
]
