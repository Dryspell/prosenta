'use client'
import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import './styles.css'
import { LoadingSpinner } from 'src/components/canvas/loadingSpinner'
import { Group } from 'three'

function Dodecahedron({ ...props }) {
  return (
    <mesh {...props}>
      <dodecahedronGeometry />
      <meshStandardMaterial roughness={0.75} emissive='#404057' />
      <Html distanceFactor={10}>
        {/* @ts-expect-error */}
        <div class='content'>
          hello <br />
          world
        </div>
      </Html>
    </mesh>
  )
}

function Content() {
  const ref = useRef<Group>()
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += 0.01))
  return (
    <group ref={ref}>
      <Dodecahedron position={[-2, 0, 0]} />
      <Dodecahedron position={[0, -2, -3]} />
      <Dodecahedron position={[2, 0, 0]} />
    </group>
  )
}
export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Canvas camera={{ position: [0, 0, 7.5] }}>
        <pointLight color='indianred' />
        <pointLight position={[10, 10, -10]} color='orange' />
        <pointLight position={[-10, -10, 10]} color='lightblue' />
        <Content />
      </Canvas>
      ,
    </Suspense>
  )
}
