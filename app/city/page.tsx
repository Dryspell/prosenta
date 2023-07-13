'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Vector3 } from 'three'

const View = dynamic(() => import('src/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})

import { useRef, useState } from 'react'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, Text } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { memo } from 'react'
import { AccumulativeShadows, RandomizedLight, Environment as EnvironmentImpl } from '@react-three/drei'
import { LoadingSpinner } from 'src/components/canvas/loadingSpinner'
import { House } from '../house/components/components'
extend({ OrbitControls, Text, Canvas, Stage })

const Environment = memo(
  ({ direction = [5, 5, 5] }: { direction: Parameters<typeof RandomizedLight>[0]['position'] }) => (
    <>
      <directionalLight position={direction} intensity={0.5} shadow-mapSize={1024} castShadow />
      {/* <directionalLight position={[-5, 5, 5]} intensity={0.1} shadow-mapSize={128} castShadow /> */}
      {/* <directionalLight position={[-5, 5, -5]} intensity={0.1} shadow-mapSize={128} castShadow /> */}
      {/* <directionalLight position={[0, 5, 0]} intensity={0.1} shadow-mapSize={128} castShadow /> */}
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
          {/* <Stage
            intensity={1.5}
            environment='city'
            // shadows={{ type: 'accumulative', color: '#d9afd9', opacity: 2, colorBlend: 2 }}
            adjustCamera={1.5}
          > */}
          {gameState.current.houses.map((house) => {
            return (
              <>
                ({<House visible={!house.hidden} oid={house.name} key={house.name} position={house.position} />})
                <Text key={house.name} position={new Vector3(...house.position)} fontSize={1} color='black'>
                  {house.name}
                </Text>
              </>
            )
          })}
          {/* </Stage> */}
          <color attach='background' args={['skyblue']} />
          <Environment direction={[5, 5, 5]} />
          <OrbitControls makeDefault />
        </Canvas>
      </Suspense>
    </>
  )
}
