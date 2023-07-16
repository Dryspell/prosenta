"use client"
import * as THREE from "three"
import { Canvas, extend, useFrame } from "@react-three/fiber"
import { Physics, RapierRigidBody, RigidBody } from "@react-three/rapier"
import { Fragment, Suspense, useRef, useState } from "react"
import { LoadingSpinner } from "src/components/canvas/loadingSpinner"
import { OrbitControls, QuadraticBezierLine, Environment as EnvironmentImpl, Html } from "@react-three/drei"
import { Vector3 } from "three"
extend({ Canvas, THREE })
import "./styles.css"

// const Environment = memo(
//   ({ direction = [5, 5, 5] }: { direction: Parameters<typeof RandomizedLight>[0]['position'] }) => (
//     <>
//       <directionalLight position={direction} intensity={0.5} shadow-mapSize={1024} castShadow />
//       {/* <directionalLight position={[-5, 5, 5]} intensity={0.1} shadow-mapSize={128} castShadow /> */}
//       {/* <directionalLight position={[-5, 5, -5]} intensity={0.1} shadow-mapSize={128} castShadow /> */}
//       {/* <directionalLight position={[0, 5, 0]} intensity={0.1} shadow-mapSize={128} castShadow /> */}
//       <AccumulativeShadows frames={100} alphaTest={0.85} opacity={0.75} scale={30} position={[0, -1.5, 0]}>
//         <RandomizedLight amount={8} radius={2.5} ambient={0.5} intensity={1} position={direction} bias={0.001} />
//       </AccumulativeShadows>
//       <EnvironmentImpl preset='city' />
//     </>
//   ),
// )
// Environment.displayName = 'Environment'

const Enemy = ({
  color,
  visible,
  name,
  // hovered,
  // setHovered,
  unit,
}: {
  color: string
  visible: boolean
  name: string
  // hovered?: boolean
  // setHovered?: (hovered: boolean) => void
  unit: (typeof defaults.gameState)[0]
}) => {
  const rigidBodyRef = useRef<RapierRigidBody>()
  const [hovered, setHovered] = useState(false)

  return (
    <RigidBody
      ref={rigidBodyRef}
      linearVelocity={[Math.random() * 5, Math.random() * 5, Math.random() * 5]}
      colliders='cuboid'
      type='dynamic'
      position={unit.position as [number, number, number]}
      restitution={2.1}
    >
      <mesh
        visible={visible}
        scale={hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
        onPointerEnter={() => setHovered(!hovered)}
        onPointerLeave={() => setHovered(!hovered)}
        onClick={() => console.log(name)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? "orange" : color} />
        {visible && (
          <Html distanceFactor={10}>
            <div className='content'>
              <h1>{name}</h1>
            </div>
          </Html>
        )}
      </mesh>
    </RigidBody>
  )
}

const DEFAULT_WIDTH = 20
const defaults = {
  boxCount: DEFAULT_WIDTH,
  gameState: Array.from({ length: DEFAULT_WIDTH }, (_, x) =>
    Array.from({ length: 1 || DEFAULT_WIDTH }, (_, y) =>
      Array.from({ length: DEFAULT_WIDTH }, (_, z) => ({
        position: [2 * x - DEFAULT_WIDTH, 2 * y - DEFAULT_WIDTH / 2, 2 * z - DEFAULT_WIDTH],
      })),
    ),
  ).flat(2),
}

export default function App() {
  const gameState = useRef(defaults.gameState)
  useFrame(() => {})

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Canvas camera={{ position: [20, 20, 20], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 5]} />
        <Physics gravity={[0, 0, 0]}>
          {/* <Ball /> */}
          {/* <Paddle /> */}
          {gameState.current.map(g => {
            const visible = Math.random() > 0.5
            return (
              <Fragment key={String(g.position)}>
                {Math.random() > 0.5 && visible && (
                  <QuadraticBezierLine
                    start={new Vector3(...g.position)}
                    mid={
                      gameState.current[Math.floor(Math.random() * defaults.boxCount ** 2)].position as [
                        number,
                        number,
                        number,
                      ]
                    }
                    end={
                      gameState.current[Math.floor(Math.random() * defaults.boxCount ** 2)].position as [
                        number,
                        number,
                        number,
                      ]
                    }
                  />
                )}
                <Enemy
                  unit={g}
                  visible={visible}
                  key={g.position.join("_")}
                  name={g.position.join("_")}
                  color='hotpink'
                />
              </Fragment>
            )
          })}
          {/* <Enemy color='orange' position={[2.75, 1.5, 0]} />
          <Enemy color='hotpink' position={[-2.75, 3.5, 0]} /> */}
        </Physics>
        <color attach='background' args={["skyblue"]} />
        {/* <Environment direction={[5, 5, 5]} /> */}
        <OrbitControls makeDefault />
      </Canvas>
    </Suspense>
  )
}
