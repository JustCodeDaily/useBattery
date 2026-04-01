import { useState, useEffect } from 'react'

const INITIAL_STATE = {
  supported: true,
  loading: true,
  level: null,
  charging: null
}

function useBattery() {
  const [state, setState] = useState(INITIAL_STATE)

  useEffect(() => {
    if (!('getBattery' in navigator)) {
      setState({ ...INITIAL_STATE, supported: false, loading: false })
      return
    }

    let battery = null

    const sync = () =>
      setState({
        supported: true,
        loading: false,
        level: battery.level,
        charging: battery.charging,
      })

    navigator.getBattery().then((b) => {
      battery = b
      sync()
      b.addEventListener('levelchange', sync)
      b.addEventListener('chargingchange', sync)
    })

    return () => {
      if (battery) {
        battery.removeEventListener('levelchange', sync)
        battery.removeEventListener('chargingchange', sync)
      }
    }
  }, [])

  return state
}

export default useBattery
