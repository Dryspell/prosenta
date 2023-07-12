'use client'
import { Canvas, extend } from '@react-three/fiber'
extend({ Canvas })
import { Suspense } from 'react'
import { LoadingSpinner } from 'src/components/canvas/loadingSpinner'
import { Environment } from '../city/page'
import {} from './Experience'
import dynamic from 'next/dynamic'
import { Interface } from './Interface'
import { ConfiguratorProvider } from './Context'

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
