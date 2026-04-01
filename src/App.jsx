import { useState } from 'react'
import { BatteryVisual } from './components/BatteryVisual'
import { StatGrid } from './components/StatGrid'
import { StateDisplay } from './components/StateDisplay'
import { SimulatorControls } from './components/SimulatorControls'
import styles from './App.module.css'

export default function App() {
  const [levelPct, setLevelPct] = useState(72)
  const [charging, setCharging] = useState(false)
  const [supported, setSupported] = useState(true)

  const level           = supported ? levelPct / 100 : null
  const chargingTime    = supported ? (charging  ? Math.round((1 - level) * 5400) : Infinity) : null
  const dischargingTime = supported ? (!charging ? Math.round(level * 7200)       : Infinity) : null

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.hookName}>
          <span className={styles.accent}>use</span>
          Battery
          <span className={styles.accent}>()</span>
        </h1>
        <span className={styles.badge}>Hook Preview</span>
      </header>

      <section className={supported ? styles.card : `${styles.card} ${styles.dimmed}`}>
        <p className={styles.cardLabel}>Battery State</p>
        <BatteryVisual level={level} charging={charging} supported={supported} />
        <StatGrid charging={charging} chargingTime={chargingTime} dischargingTime={dischargingTime} supported={supported} />
      </section>

      {!supported && (
        <p className={styles.unsupportedMsg}>
          supported: false — hook returns null for all battery values
        </p>
      )}

      <StateDisplay
        supported={supported}
        loading={false}
        level={level}
        charging={supported ? charging : null}
        chargingTime={chargingTime}
        dischargingTime={dischargingTime}
      />

      <SimulatorControls
        level={levelPct}
        charging={charging}
        supported={supported}
        onLevel={(v) => setLevelPct(v)}
        onCharge={() => setCharging((c) => !c)}
        onSupport={() => setSupported((s) => !s)}
      />

      <footer className={styles.footer}>
        <p>
          Simulated — Battery API is blocked in sandboxed environments.
          <br />
          In a real browser, <code>useBattery()</code> reads live device values.
          <br />
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API" target="_blank" rel="noreferrer">MDN Docs →</a>
          {' · '}
          <a href="https://caniuse.com/battery-status" target="_blank" rel="noreferrer">Can I Use →</a>
        </p>
      </footer>
    </div>
  )
}
