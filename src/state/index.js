import * as THREE from 'three'
import dynamic from 'next/dynamic'

const SampleIsland = dynamic(() => import('src/island/sample-island'), {
  ssr: false,
})

export const islands = [
  {
    gltfjsx: () => <SampleIsland />,
    name: 'Sample Island 1',
  },
  {
    gltfjsx: () => <SampleIsland />,
    name: 'Sample Island 2',
  },
  {
    gltfjsx: () => <SampleIsland />,
    name: 'Sample Island 3',
  },
  {
    gltfjsx: () => <SampleIsland />,
    name: 'Sample Island 4',
  },
  {
    gltfjsx: () => <SampleIsland />,
    name: 'Sample Island 5',
  },
]
