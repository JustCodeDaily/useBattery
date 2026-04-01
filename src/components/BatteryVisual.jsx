import styles from './BatteryVisual.module.css'

function getFillColor(pct) {
  if (pct > 40) return 'var(--green)'
  if (pct > 15) return 'var(--amber)'
  return 'var(--red)'
}

export function BatteryVisual({ level, charging, supported }) {
  const pct = level !== null ? Math.round(level * 100) : null
  const fillPct = supported && pct !== null ? pct : 0
  const color = supported && pct !== null ? getFillColor(pct) : 'var(--surface-3)'

  const statusLabel = !supported
    ? 'Unavailable'
    : pct === null
    ? 'Loading…'
    : charging
    ? 'Charging'
    : pct < 15
    ? 'Low battery'
    : 'Discharging'

  return (
    <div className={styles.wrapper}>
      <div className={styles.batteryOuter}>
        <div className={styles.batteryBody}>
          <div
            className={styles.fill}
            style={{ width: fillPct + '%', background: color }}
          />
          {charging && supported && (
            <div className={styles.segments}>
              {[0, 0.2, 0.4, 0.6].map((delay, i) => (
                <span
                  key={i}
                  className={styles.seg}
                  style={{ animationDelay: delay + 's' }}
                />
              ))}
            </div>
          )}
          <span className={styles.innerText}>{pct !== null ? pct + '%' : '?'}</span>
        </div>
        <div className={styles.nub} />
      </div>
      <div className={styles.meta}>
        <div className={styles.bigPct} style={{ color }}>
          {pct !== null ? pct + '%' : '—'}
        </div>
        <div className={styles.statusRow}>
          <span
            className={
              charging && supported
                ? `${styles.dot} ${styles.dotCharging}`
                : styles.dot
            }
          />
          <span className={styles.statusLabel}>{statusLabel}</span>
        </div>
      </div>
    </div>
  )
}
