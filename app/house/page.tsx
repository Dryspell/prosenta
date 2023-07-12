'use client'

import dynamic from 'next/dynamic'
import { Suspense, useRef, useState } from 'react'

import { Canvas, Vector3 } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { memo } from 'react'
import { AccumulativeShadows, RandomizedLight, Environment as EnvironmentImpl } from '@react-three/drei'
import { LoadingSpinner } from 'src/components/canvas/loadingSpinner'
import { House } from './components/components'
extend({ OrbitControls, Text, Canvas })

export const Environment = memo(
  ({ direction = [5, 5, 5] }: { direction: Parameters<typeof RandomizedLight>[0]['position'] }) => (
    <>
      <directionalLight position={direction} intensity={0.5} shadow-mapSize={1024} castShadow />
      <directionalLight position={[-5, 5, 5]} intensity={0.1} shadow-mapSize={128} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.1} shadow-mapSize={128} castShadow />
      <directionalLight position={[0, 5, 0]} intensity={0.1} shadow-mapSize={128} castShadow />
      <AccumulativeShadows frames={100} alphaTest={0.85} opacity={0.75} scale={30} position={[0, -1.5, 0]}>
        <RandomizedLight amount={8} radius={2.5} ambient={0.5} intensity={1} position={direction} bias={0.001} />
      </AccumulativeShadows>
      <EnvironmentImpl preset='city' />
    </>
  ),
)
Environment.displayName = 'Environment'

export default function App() {
  const defaults = { buildingsCount: 10 }
  const gameState = useRef({
    houses: Array.from({ length: defaults.buildingsCount }, (_, x) =>
      Array.from({ length: defaults.buildingsCount }, (_, y) => ({
        name: `house-${x}-${y}`,
        position: [5 * (x - defaults.buildingsCount / 2), 3, 5 * (y - defaults.buildingsCount / 2)],
        hidden: Math.random() > 0.5,
      })),
    ).flat(),
  })

  return (
    <>
      {/* <View> */}
      <Suspense fallback={<LoadingSpinner />}>
        <Canvas
          // className='absolute top-0 flex flex-col items-center justify-center w-full h-screen'
          shadows
          camera={{ position: [-30, 10, 30], fov: 25 }}
        >
          <color attach='background' args={['skyblue']} />
          {gameState.current.houses.map((house) => {
            return (
              <>
                ({<House visible={!house.hidden} oid={house.name} key={house.name} position={house.position} />})
                <Text key={house.name} position={house.position as Vector3} fontSize={1} color='black'>
                  {house.name}
                </Text>
              </>
            )
          })}
          <Environment direction={[5, 5, 5]} />
          <OrbitControls makeDefault />
        </Canvas>
      </Suspense>
      {/* </View> */}
    </>
  )
}
