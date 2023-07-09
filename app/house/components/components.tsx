import * as THREE from 'three'
import { useRef } from 'react'
import { PivotControls } from '@react-three/drei'
import { Geometry, Base, Subtraction, Addition, CSGGeometryRef } from '@react-three/csg'

const box = new THREE.BoxGeometry()
const cyl = new THREE.CylinderGeometry(1, 1, 2, 20)
const tri = new THREE.CylinderGeometry(1, 1, 2, 3)

export function House(props) {
  const csg = useRef<CSGGeometryRef>()
  const selected = useRef(false)
  return (
    <mesh
      receiveShadow
      castShadow
      {...props}
      onPointerEnter={() => {
        selected.current = !selected.current
        console.log(selected.current)
      }}
      scale={selected ? [2, 2, 2] : [1, 1, 1]}
    >
      <Geometry ref={csg} computeVertexNormals>
        <Base name='base' geometry={box} scale={[3, 3, 3]} />
        <Subtraction name='cavity' geometry={box} scale={[2.7, 2.7, 2.7]} />
        <Addition
          name='roof'
          geometry={tri}
          scale={[2.5, 1.5, 1.425]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 2.2, 0]}
        />
        <Chimney scale={0.5} position={[-0.75, 3, 0.8]} />
        <Window position={[1.1, 2.5, 0]} scale={0.6} rotation={[0, Math.PI / 2, 0]} />
        <Window position={[0, 2.5, 1.5]} scale={0.6} rotation={[0, 0, 0]} />
        {/* <PivotControls
          activeAxes={[false, true, true]}
          rotation={[0, Math.PI / 2, 0]}
          scale={1}
          anchor={[0, 0, 0.4]}
          onDrag={() => csg.current && csg.current.update && csg.current.update()}
        > */}
        <Window position={[0, 0.25, 1.5]} scale={1.25} />
        {/* </PivotControls> */}
        {/* <PivotControls
          activeAxes={[false, true, true]}
          rotation={[0, Math.PI, 0]}
          scale={1}
          anchor={[0.4, 0, 0]}
          onDrag={() => csg.current.update()}
        > */}
        <Window rotation={[0, Math.PI / 2, 0]} position={[1.425, 0.25, 0]} scale={1.25} />
        {/* </PivotControls> */}
        {/* <PivotControls
          activeAxes={[false, true, true]}
          scale={1}
          anchor={[-0.5, 0, 0]}
          onDrag={() => csg.current.update()}
        > */}
        <Door rotation={[0, Math.PI / 2, 0]} position={[-1.425, -0.45, 0]} scale={[1, 0.9, 1]} />
        {/* </PivotControls> */}
      </Geometry>
      <meshStandardMaterial envMapIntensity={0.25} />
    </mesh>
  )
}

const Door = (props) => (
  <Subtraction {...props}>
    <Geometry>
      <Base geometry={box} scale={[1, 2, 1]} />
      <Addition geometry={cyl} scale={0.5} rotation={[Math.PI / 2, 0, 0]} position={[0, 1, 0]} />
    </Geometry>
  </Subtraction>
)

const Window = (props) => (
  <Subtraction {...props}>
    <Geometry>
      <Base geometry={box} />
      <Subtraction geometry={box} scale={[0.05, 1, 1]} />
      <Subtraction geometry={box} scale={[1, 0.05, 1]} />
    </Geometry>
  </Subtraction>
)

const Chimney = (props) => (
  <Addition name='chimney' {...props}>
    <Geometry>
      <Base name='base' geometry={box} scale={[1, 2, 1]} />
      <Subtraction name='hole' geometry={box} scale={[0.7, 2, 0.7]} position={[0, 0.5, 0]} />
    </Geometry>
  </Addition>
)
