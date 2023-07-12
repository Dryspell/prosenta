import { OrbitControls, Stage } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { Ninja } from 'src/components/models/Ninja'
import { Interface } from './Interface'
extend({ OrbitControls, Stage, Interface })

export default function Experience(props: {}) {
  return (
    <>
      <Stage
        intensity={1.5}
        environment='city'
        shadows={{ type: 'accumulative', color: '#d9afd9', opacity: 2, colorBlend: 2 }}
        adjustCamera={1.5}
      >
        <Ninja hovered={false} />
      </Stage>
      <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
    </>
  )
}
