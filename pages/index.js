import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React, { Suspense, useRef } from 'react'
import { useContextBridge } from '@react-three/drei'
import {
  A11y,
  useA11y,
  A11ySection,
  A11yUserPreferencesContext,
} from '@react-three/a11y'
import { ResizeObserver } from '@juggle/resize-observer'
import { useIslandStore } from '../src/store'
import shallow from 'zustand/shallow'
import { islands } from '../src/state'

function Diamond({ position, rotation }) {
  const a11y = useA11y()
  return (
    <mesh position={position} rotation={rotation}>
      <tetrahedronBufferGeometry />
      <meshStandardMaterial
        metalness={1}
        roughness={0.8}
        color={a11y.focus || a11y.hover ? '#cc66dd' : '#ffffff'}
        emissive={a11y.focus ? '#cc4444' : a11y.hover ? '#339922' : '#003399'}
      />
    </mesh>
  )
}

function Nav({ left }) {
  const snap = useIslandStore((state) => state)
  const viewport = useThree((state) => state.viewport)
  const radius = Math.min(12, viewport.width / 2.5)

  return (
    <A11y
      role='button'
      actionCall={() => {
        snap.setRotation(
          snap.rotation + ((Math.PI * 2) / islands?.length) * (!left ? -1 : 1)
        )
        snap.setActive(
          !left
            ? snap.active === 0
              ? 4
              : snap.active - 1
            : snap.active === 4
            ? 0
            : snap.active + 1
        )
      }}
    >
      <Diamond
        position={[left ? -radius : radius, 0, 0]}
        rotation={[0, 0, -Math.PI / 4]}
        scale={[1, 1, 1]}
      >
        <meshBasicMaterial color='aqua' />
      </Diamond>
    </A11y>
  )
}

function Shape({ index, active, item, ...props }) {
  const vec = new THREE.Vector3()
  const ref = useRef()
  const snap = useIslandStore((state) => state)
  const a11y = useA11y()

  useFrame((state, delta) => {
    const s = active ? 1.25 : 0.75
    ref.current.scale.lerp(vec.set(s, s, s), 0.1)
    ref.current.position.y = active ? Math.sin(state.clock.elapsedTime) / 2 : 0
    ref.current.rotation.y += active ? 0.005 : 0
  })

  return (
    <>
      <group rotation-y={index * 2000} ref={ref} {...props}>
        <group position={[0, 0, 0]}>{item?.gltfjsx(item?.billboards)}</group>
      </group>
    </>
  )
}

function Carroussel() {
  const viewport = useThree((state) => state.viewport)
  const { rotation, active } = useIslandStore(
    (state) => ({
      rotation: state.rotation,
      active: state.active,
    }),
    shallow
  )

  const group = useRef()
  const radius = Math.min(6, viewport.width / 5)

  useFrame(
    () =>
      (group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        rotation - Math.PI / 2,
        0.1
      ))
  )
  return (
    <>
      <group rotation={[0.5, 0, 0]}>
        <group ref={group}>
          {islands?.map((item, i) => (
            <A11y
              key={item?.name}
              role='content'
              tabIndex={-1}
              hidden={active !== i}
              actionCall={() => {
                if (active === i) {
                  alert(item?.name)
                }
              }}
            >
              <Suspense fallback={true}>
                <Shape
                  index={i}
                  position={[
                    radius * Math.cos(i * ((Math.PI * 2) / islands?.length)),
                    0,
                    radius * Math.sin(i * ((Math.PI * 2) / islands?.length)),
                  ]}
                  active={active === i}
                  item={item}
                />
              </Suspense>
            </A11y>
          ))}
        </group>
      </group>
    </>
  )
}

export default function Home() {
  const ContextBridge = useContextBridge(A11yUserPreferencesContext)

  return (
    <>
      <Canvas
        resize={{ polyfill: ResizeObserver }}
        camera={{ position: [0, 0, 15], near: 4, far: 30 }}
        pixelRatio={[1, 1.5]}
      >
        <ContextBridge>
          <pointLight position={[100, 100, 100]} intensity={0.5} />
          <pointLight
            position={[-100, -100, -100]}
            intensity={1.5}
            color={'#ccffcc'}
          />
          <ambientLight intensity={0.8} />
          <group>
            <A11ySection>
              <Nav left />
              <Carroussel />
              <Nav />
            </A11ySection>
          </group>
        </ContextBridge>
      </Canvas>
    </>
  )
}
