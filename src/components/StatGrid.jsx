import styles from './StatGrid.module.css'

function fmtTime(secs) {
  if (secs === null || !isFinite(secs) || secs === 0) return '—'
  const h = Math.floor(secs / 3600)
  const m = Math.floor((secs % 3600) / 60)
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

export function StatGrid({ charging, chargingTime, dischargingTime, supported }) {
  const stats = [
    {
      label: 'Charging',
      value: !supported
        ? 'N/A'
        : charging === null
        ? '…'
        : charging
        ? 'Yes ⚡'
        : 'No',
    },
    {
      label: 'Charge in',
      value: !supported ? 'N/A' : fmtTime(chargingTime),
    },
    {
      label: 'Empty in',
      value: !supported ? 'N/A' : fmtTime(dischargingTime),
    },
  ]

  return (
    <div className={styles.grid}>
      {stats.map((s) => (
        <div key={s.label} className={styles.chip}>
          <span className={styles.label}>{s.label}</span>
          <span className={styles.value}>{s.value}</span>
        </div>
      ))}
    </div>
  )
}
