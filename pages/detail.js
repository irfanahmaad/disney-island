import React, { Suspense, useCallback, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ResizeObserver } from '@juggle/resize-observer'
import { islands } from '../src/state'

const DetailIsland = ({ id, ...props }) => {
  const island = useMemo(() => {
    const island = islands[id]
    return island?.gltfjsx(island.billboards, island.active)
  }, [id])

  const ref = useRef()

  useFrame(() => {
    ref.current.rotation.y += 0.003
  })

  return (
    <group ref={ref} {...props} scale={3} rotation={[0.25, 0, 0]}>
      <group position={[0, -5, 0]}>
        <Suspense fallback={null}>{island}</Suspense>
      </group>
    </group>
  )
}

export default function DetailPage() {
  return (
    <Canvas
      resize={{ polyfill: ResizeObserver }}
      camera={{ position: [0, 0, 15], near: 4, far: 30 }}
      pixelRatio={[1, 1.5]}
      shadowMap
    >
      <Suspense fallback={null}>
        <pointLight position={[100, 100, 100]} intensity={0.5} castShadow />
        <pointLight
          position={[-100, -100, -100]}
          intensity={1.5}
          color={'#07113e'}
          castShadow
        />
        <ambientLight intensity={0.3} />

        <DetailIsland id={0} />
      </Suspense>
    </Canvas>
  )
}
