import dynamic from 'next/dynamic'

const SampleIsland = dynamic(() => import('src/island/sample-island'), {
  ssr: false,
})

export const islands = [
  {
    gltfjsx: (billboards) => <SampleIsland billboards={billboards} />,
    name: 'Sample Island 1',
    billboards: ['/image/duck.jpg'],
    active: true,
  },
  {
    gltfjsx: (billboards) => <SampleIsland billboards={billboards} />,
    name: 'Sample Island 2',
    billboards: ['/image/duck.jpg'],
    active: false,
  },
  {
    gltfjsx: (billboards) => <SampleIsland billboards={billboards} />,
    name: 'Sample Island 3',
    billboards: ['/image/duck.jpg'],
    active: false,
  },
  {
    gltfjsx: (billboards) => <SampleIsland billboards={billboards} />,
    name: 'Sample Island 4',
    billboards: ['/image/duck.jpg'],
    active: false,
  },
  {
    gltfjsx: (billboards) => <SampleIsland billboards={billboards} />,
    name: 'Sample Island 5',
    billboards: ['/image/duck.jpg'],
    active: false,
  },
]
