'use client'
import { useState, createRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Nodes, Node } from './components/Nodes'

export default function App() {
  const [[a, b, c, d, e]] = useState(() => [...Array(5)].map(createRef))
  return (
    <Canvas orthographic camera={{ zoom: 80 }}>
      <Nodes>
        {/* @ts-expect-error */}
        <Node ref={a} key={'a'} name='a' color='#204090' position={[-2, 2, 0]} connectedTo={[b, c, e]} />
        {/* @ts-expect-error */}
        <Node ref={b} key={'b'} name='b' color='#904020' position={[2, -3, 0]} connectedTo={[d, a]} />
        {/* @ts-expect-error */}
        <Node ref={c} key={'c'} name='c' color='#209040' position={[-0.25, 0, 0]} />
        {/* @ts-expect-error */}
        <Node ref={d} key={'d'} name='d' color='#204090' position={[0.5, -0.75, 0]} />
        {/* @ts-expect-error */}
        <Node ref={e} key={'e'} name='e' color='#204090' position={[-0.5, -1, 0]} />
      </Nodes>
    </Canvas>
  )
}
