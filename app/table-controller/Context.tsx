import { createContext, useContext, useState } from 'react'

const defaults = { legs: { color: '#777777', visible: true, layout: 'standard' } }

const ConfiguratorContext = createContext<{
  legs: typeof defaults.legs
  setLegs: (legs: typeof defaults.legs) => void
  arms: number
  setArms: (arms: number) => void
  head: number
  setHead: (head: number) => void
  body: number
  setBody: (body: number) => void
  weapon: number
  setWeapon: (weapon: number) => void
}>({
  legs: defaults.legs,
  setLegs: () => {},
  arms: 0,
  setArms: () => {},
  head: 0,
  setHead: () => {},
  body: 0,
  setBody: () => {},
  weapon: 0,
  setWeapon: () => {},
})

export const ConfiguratorProvider = ({ children }) => {
  const [legs, setLegs] = useState(defaults.legs)
  const [arms, setArms] = useState(0)
  const [head, setHead] = useState(0)
  const [body, setBody] = useState(0)
  const [weapon, setWeapon] = useState(0)

  const value = {
    legs,
    setLegs,
    arms,
    setArms,
    head,
    setHead,
    body,
    setBody,
    weapon,
    setWeapon,
  }

  return <ConfiguratorContext.Provider value={value}>{children}</ConfiguratorContext.Provider>
}

export const useConfigurator = () => useContext(ConfiguratorContext)
