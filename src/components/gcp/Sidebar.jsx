import { FAMILIES, FAMILY_ORDER } from '../../data/gcp/families'
import { SERVICES } from '../../data/gcp/services'
import styles from './Sidebar.module.css'

export default function Sidebar({ selected, onSelect }) {
  const countByFamily = Object.fromEntries(
    FAMILY_ORDER.map(f => [f, SERVICES.filter(s => s.family === f).length])
  )

  return (
    <aside className={styles.sidebar}>
      <span className={styles.label}>Families</span>
      {FAMILY_ORDER.map(f => {
        const { color, icon } = FAMILIES[f]
        return (
          <button
            key={f}
            className={`${styles.btn} ${selected === f ? styles.active : ''}`}
            style={{ '--c': color }}
            onClick={() => onSelect(f)}
          >
            <span className={styles.icon}>{icon}</span>
            <span className={styles.name}>{f}</span>
            <span className={styles.count}>{countByFamily[f]}</span>
          </button>
        )
      })}

      <span className={styles.label} style={{ marginTop: 16 }}>Total</span>
      <div className={styles.stat}>{SERVICES.length} services</div>
    </aside>
  )
}
