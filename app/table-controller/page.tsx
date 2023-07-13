'use client'
import { Canvas, extend } from '@react-three/fiber'
extend({ Canvas })
import { Suspense, memo } from 'react'
import { LoadingSpinner } from 'src/components/canvas/loadingSpinner'
import dynamic from 'next/dynamic'
import { Interface } from './Interface'
import { ConfiguratorProvider } from './Context'
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'
import { Environment as EnvironmentImpl } from '@react-three/drei'

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

const Experience = dynamic(() => import('./Experience').then((mod) => mod), {
  ssr: false,
})
Experience.displayName = 'Experience'

export default function Page() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <ConfiguratorProvider>
          <Canvas
            // className='absolute top-0 flex flex-col items-center justify-center w-full h-screen'
            shadows
            camera={{ position: [-30, 10, 30], fov: 25 }}
          >
            <color attach='background' args={['skyblue']} />
            <Environment direction={[5, 5, 5]} />
            <Experience />
          </Canvas>
          <Interface />
        </ConfiguratorProvider>
      </Suspense>
      {/* </View> */}
    </>
  )
}
