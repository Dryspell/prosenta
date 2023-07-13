import { createContext, useContext, useState } from 'react'

const defaults = {
  legs: { color: '#777777', visible: true, layout: 'standard' },
  arms: { color: '#777777', visible: true, layout: 'standard' },
  head: { color: '#777777', visible: true, layout: 'standard' },
  body: { color: '#777777', visible: true, layout: 'standard' },
  weapon: { color: '#777777', visible: true, layout: 'standard' },
}

const ConfiguratorContext = createContext<{
  legs: typeof defaults.legs
  setLegs: (legs: typeof defaults.legs) => void
  arms: typeof defaults.arms
  setArms: (arms: typeof defaults.arms) => void
  head: typeof defaults.head
  setHead: (head: typeof defaults.head) => void
  body: typeof defaults.body
  setBody: (body: typeof defaults.body) => void
  weapon: typeof defaults.weapon
  setWeapon: (weapon: typeof defaults.weapon) => void
}>({
  legs: defaults.legs,
  setLegs: () => {},
  arms: defaults.arms,
  setArms: () => {},
  head: defaults.head,
  setHead: () => {},
  body: defaults.body,
  setBody: () => {},
  weapon: defaults.weapon,
  setWeapon: () => {},
})

export const ConfiguratorProvider = ({ children }) => {
  const [legs, setLegs] = useState(defaults.legs)
  const [arms, setArms] = useState(defaults.arms)
  const [head, setHead] = useState(defaults.head)
  const [body, setBody] = useState(defaults.body)
  const [weapon, setWeapon] = useState(defaults.weapon)

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
