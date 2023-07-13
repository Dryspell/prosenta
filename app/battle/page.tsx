'use client'
import * as THREE from 'three'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier'
import { Ref, Suspense, useRef, useState } from 'react'
import { LoadingSpinner } from 'src/components/canvas/loadingSpinner'
import { Environment } from '../city/page'
import { OrbitControls, QuadraticBezierLine } from '@react-three/drei'
import { Vector3 } from 'three'
extend({ Canvas })

const Enemy = ({ position, color, visible, name }) => {
  const [onHover, setOnHover] = useState(false)
  return (
    <RigidBody colliders='cuboid' type='fixed' position={position} restitution={2.1}>
      <mesh
        visible={visible}
        scale={onHover ? [1.1, 1.1, 1.1] : [1, 1, 1]}
        onPointerEnter={() => setOnHover(!onHover)}
        onPointerLeave={() => setOnHover(!onHover)}
        onClick={() => console.log(name)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={onHover ? 'orange' : color} />
      </mesh>
    </RigidBody>
  )
}

const defaults = { boxCount: 20 }

export default function App() {
  const gameState = useRef(
    Array.from({ length: defaults.boxCount }, (_, x) =>
      Array.from({ length: 1 || defaults.boxCount }, (_, y) =>
        Array.from({ length: defaults.boxCount }, (_, z) => ({
          position: [2 * x - defaults.boxCount, 2 * y - defaults.boxCount / 2, 2 * z - defaults.boxCount],
        })),
      ),
    ).flat(2),
  )

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Canvas camera={{ position: [20, 20, 20], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 5]} />
        <Physics gravity={[0, 0, 0]}>
          {/* <Ball /> */}
          {/* <Paddle /> */}
          {gameState.current.map((g) => {
            const visible = Math.random() > 0.5
            return (
              <>
                {Math.random() > 0.5 && visible && (
                  <QuadraticBezierLine
                    start={new Vector3(...g.position)}
                    mid={new Vector3(...gameState.current[Math.floor(Math.random() * defaults.boxCount ** 2)].position)}
                    end={new Vector3(...gameState.current[Math.floor(Math.random() * defaults.boxCount ** 2)].position)}
                  />
                )}
                <Enemy
                  visible={visible}
                  key={g.position.join('_')}
                  name={g.position.join('_')}
                  color='hotpink'
                  position={g.position}
                />
              </>
            )
          })}
          {/* <Enemy color='orange' position={[2.75, 1.5, 0]} />
          <Enemy color='hotpink' position={[-2.75, 3.5, 0]} /> */}
        </Physics>
        <color attach='background' args={['skyblue']} />
        <Environment direction={[5, 5, 5]} />
        <OrbitControls makeDefault />
      </Canvas>
    </Suspense>
  )
}
