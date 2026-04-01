import styles from './SimulatorControls.module.css'

export function SimulatorControls({ level, charging, supported, onLevel, onCharge, onSupport }) {
  return (
    <div className={styles.card}>
      <p className={styles.label}>Simulate Changes</p>

      <div className={styles.row}>
        <span className={styles.rowLabel}>Battery level</span>
        <input
          type="range"
          className={styles.slider}
          min={0}
          max={100}
          step={1}
          value={level}
          onChange={(e) => onLevel(Number(e.target.value))}
        />
        <span className={styles.readout}>{level}%</span>
      </div>

      <div className={styles.row}>
        <span className={styles.rowLabel}>Charging</span>
        <button
          className={charging ? `${styles.btn} ${styles.btnGreen}` : styles.btn}
          onClick={onCharge}
        >
          {charging ? 'Unplug' : 'Plug in'}
        </button>
      </div>

      <div className={`${styles.row} ${styles.lastRow}`}>
        <span className={styles.rowLabel}>Supported</span>
        <button
          className={
            supported
              ? `${styles.btn} ${styles.btnGreen}`
              : `${styles.btn} ${styles.btnRed}`
          }
          onClick={onSupport}
        >
          {supported ? 'Supported' : 'Unsupported'}
        </button>
      </div>
    </div>
  )
}
