import styles from './StateDisplay.module.css'

function Line({ propKey, value, valueClass }) {
  return (
    <span className={styles.line}>
      <span className={styles.indent} />
      <span className={styles.key}>{propKey}</span>
      <span className={styles.colon}>: </span>
      <span className={styles[valueClass]}>{value}</span>
      <span className={styles.comma}>,</span>
    </span>
  )
}

function cls(val) {
  if (val === null || val === undefined) return 'null'
  if (val === true) return 'true'
  if (val === false) return 'false'
  if (!isFinite(val)) return 'inf'
  return 'num'
}

export function StateDisplay({ supported, loading, level, charging }) {
  const lvlDisplay = level !== null ? level.toFixed(2) : 'null'
  const chgDisplay = charging !== null ? String(charging) : 'null'

  return (
    <div className={styles.block}>
      <p className={styles.blockLabel}>State Object Returned</p>
      <div className={styles.code}>
        <span className={styles.brace}>{'{'}</span>
        <Line propKey="supported" value={String(supported)} valueClass={cls(supported)} />
        <Line propKey="loading" value={String(loading)} valueClass={cls(loading)} />
        <Line propKey="level" value={lvlDisplay} valueClass={cls(level)} />
        <Line propKey="charging" value={chgDisplay} valueClass={cls(charging)} />
      </div>
    </div>
  )
}
