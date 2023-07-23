"use client"
import { useState, createRef, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Nodes, Node } from "./components/Nodes"
import { LoadingSpinner } from "src/components/canvas/loadingSpinner"
import "./styles.css"
import { Button } from "@mui/material"

const INITIAL_NODE_COUNT = 5
const INITIAL_POSITION_RANGE = 10
const INITIAL_COLOR_PALETTE = ["#204090", "#904020", "#209040"]
const createInitialPosition = () =>
  [
    Math.random() * INITIAL_POSITION_RANGE - INITIAL_POSITION_RANGE / 2,
    Math.random() * INITIAL_POSITION_RANGE - INITIAL_POSITION_RANGE / 2,
    Math.random() * INITIAL_POSITION_RANGE - INITIAL_POSITION_RANGE / 2,
  ] as [number, number, number]

const createName = (i: number) => `node_${i}`

const createInitialNode = (i: number) => {
  return {
    name: createName(i),
    ref: createRef(),
    position: createInitialPosition(),
    connectedTo: [...Array(INITIAL_NODE_COUNT)]
      .map((_, i) => (Math.random() > 0.6 ? createName(i) : null))
      .filter(x => x),
    color: INITIAL_COLOR_PALETTE[Math.floor(Math.random() * INITIAL_COLOR_PALETTE.length)],
  }
}

export default function App() {
  const [nodes, setNodes] = useState(() => [...Array(INITIAL_NODE_COUNT)].map((_, i) => createInitialNode(i)))

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Button variant='contained' onClick={() => setNodes([...nodes, createInitialNode(nodes.length)])}>
        Add Node
      </Button>
      <Canvas orthographic camera={{ zoom: 80 }}>
        <Nodes>
          {nodes.map(node => {
            return (
              <Node
                ref={node.ref}
                key={node.name}
                name={node.name}
                color={node.color}
                position={node.position}
                connectedTo={node.connectedTo.map(name => nodes.find(n => n.name === name)?.ref)}
              />
            )
          })}
        </Nodes>
      </Canvas>
    </Suspense>
  )
}
