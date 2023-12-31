'use client'
import "./styles.css"
import * as THREE from "three"
import React, { useRef, useMemo, useState, useEffect, Suspense } from "react"
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber"
import niceColors from "nice-color-palettes"
import { Effects } from "@react-three/drei"
import { SSAOPass, UnrealBloomPass } from "three-stdlib"
import { LoadingSpinner } from "src/components/canvas/loadingSpinner"

extend({ SSAOPass, UnrealBloomPass, Canvas })
declare global {
  namespace JSX {
    interface IntrinsicElements {
      unrealBloomPass: any
      sSAOPass: any
    }
  }
}

const tempObject = new THREE.Object3D()
const tempColor = new THREE.Color()
const data = Array.from({ length: 1000 }, () => ({ color: niceColors[17][Math.floor(Math.random() * 5)], scale: 1 }))

function Boxes() {
  const [hovered, setHovered] = useState<number | undefined>()
  const colorArray = useMemo(
    () => Float32Array.from(new Array(1000).fill(undefined).flatMap((_, i) => tempColor.set(data[i].color).toArray())),
    [],
  )
  const meshRef = useRef<THREE.InstancedMesh>()
  const prevRef = useRef<number | undefined>()
  useEffect(() => void (prevRef.current = hovered), [hovered])

  useFrame(state => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = Math.sin(time / 4)
    meshRef.current.rotation.y = Math.sin(time / 2)
    let i = 0
    for (let x = 0; x < 10; x++)
      for (let y = 0; y < 10; y++)
        for (let z = 0; z < 10; z++) {
          const id = i++
          tempObject.position.set(5 - x, 5 - y, 5 - z)
          tempObject.rotation.y = Math.sin(x / 4 + time) + Math.sin(y / 4 + time) + Math.sin(z / 4 + time)
          tempObject.rotation.z = tempObject.rotation.y * 2
          if (hovered !== prevRef.current) {
            ;(id === hovered ? tempColor.setRGB(10, 10, 10) : tempColor.set(data[id].color)).toArray(colorArray, id * 3)
            meshRef.current.geometry.attributes.color.needsUpdate = true
          }
          const scale = (data[id].scale = THREE.MathUtils.lerp(data[id].scale, id === hovered ? 2.5 : 1, 0.1))
          tempObject.scale.setScalar(scale)
          tempObject.updateMatrix()
          meshRef.current.setMatrixAt(id, tempObject.matrix)
        }
    meshRef.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, 1000]}
      onPointerMove={e => (e.stopPropagation(), setHovered(e.instanceId))}
      onPointerOut={e => setHovered(undefined)}
    >
      <boxGeometry args={[0.6, 0.6, 0.6]}>
        <instancedBufferAttribute attach='attributes-color' args={[colorArray, 3]} />
      </boxGeometry>
      <meshBasicMaterial toneMapped={false} vertexColors />
    </instancedMesh>
  )
}

function PostProcessing() {
  const { scene, camera } = useThree()
  return (
    <Effects disableGamma>
      <sSAOPass args={[scene, camera]} kernelRadius={0.5} maxDistance={0.1} />
      <unrealBloomPass threshold={0.9} strength={0.75} radius={0.5} />
    </Effects>
  )
}

export default function App() {
  return (
    <>
      {/* <View> */}
      <Suspense fallback={<LoadingSpinner />}>
        <Canvas gl={{ antialias: false }} camera={{ position: [0, 0, 15], near: 5, far: 20 }}>
          <color attach='background' args={["#f0f0f0"]} />
          <Boxes />
          <PostProcessing />
        </Canvas>
      </Suspense>
    </>
  )
}
