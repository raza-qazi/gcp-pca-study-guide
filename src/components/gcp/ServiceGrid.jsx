import { SERVICES } from '../../data/gcp/services'
import { FAMILIES } from '../../data/gcp/families'
import styles from './ServiceGrid.module.css'

export default function ServiceGrid({ family, onSelectService }) {
  const services = SERVICES.filter(s => s.family === family)
  const fam = FAMILIES[family]

  return (
    <div>
      <div className={styles.header}>
        <span className={styles.icon} style={{ color: fam.color }}>{fam.icon}</span>
        <div>
          <h2 className={styles.title}>{family} Services</h2>
          <p className={styles.sub}>{services.length} services — click to explore</p>
        </div>
      </div>

      <div className={styles.grid}>
        {services.map(s => (
          <button key={s.id} className={styles.card} style={{ '--c': fam.color }}
            onClick={() => onSelectService(s.id)}>
            <div className={styles.cardTop}>
              <div className={styles.iconBox}>{fam.icon}</div>
              <div>
                <div className={styles.name}>{s.name}</div>
                <div className={styles.tag}>{s.tag}</div>
              </div>
            </div>
            <p className={styles.tldr}>{s.tldr}</p>
            <div className={styles.foot}>
              <span><strong>Latency</strong>{s.latency}</span>
              <span><strong>Scale</strong>{s.scale}</span>
              <span><strong>Since</strong>{s.launched}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
