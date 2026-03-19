import { SERVICES } from '../../data/gcp/services'
import { FAMILIES } from '../../data/gcp/families'
import styles from './ServiceDetail.module.css'

const Pill = ({ children, variant = 'gray' }) => (
  <span className={`pill pill-${variant}`}>{children}</span>
)

export default function ServiceDetail({ serviceId, onBack }) {
  const s = SERVICES.find(x => x.id === serviceId)
  if (!s) return null

  const fam   = FAMILIES[s.family]
  const color = fam.color

  return (
    <div className={`${styles.wrap} fade-up`}>
      <button className="btn-ghost" style={{ marginBottom: 16, fontSize: 12 }} onClick={onBack}>
        ← Back to {s.family}
      </button>

      <div className={styles.layout}>
        {/* ── Left column ── */}
        <div className={styles.left}>

          {/* Hero */}
          <div className={styles.hero} style={{ '--c': color }}>
            <div className={styles.heroFamily}>
              <span>{fam.icon}</span> {s.family}
            </div>
            <h1 className={styles.heroName}>{s.name}</h1>
            <p className={styles.heroTag}>{s.tag}</p>
            <p className={styles.heroDesc}>{s.description}</p>

            <div className={styles.stats}>
              {[
                ['Latency',     s.latency],
                ['Scale',       s.scale],
                ['Pricing',     s.pricing],
                ['SLA',         s.sla],
                ['Consistency', s.consistency],
                ['Data Model',  s.dataModel],
              ].map(([label, val]) => (
                <div key={label} className={styles.stat}>
                  <span className={styles.statLabel}>{label}</span>
                  <span className={styles.statValue}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths + Weaknesses */}
          <div className={styles.twoCol}>
            <div className="section-card">
              <span className="section-label">Strengths</span>
              <div className={styles.pillList}>
                {s.strengths.map(x => <Pill key={x} variant="green">▲ {x}</Pill>)}
              </div>
            </div>
            <div className="section-card">
              <span className="section-label">Weaknesses</span>
              <div className={styles.pillList}>
                {s.weaknesses.map(x => <Pill key={x} variant="red">▼ {x}</Pill>)}
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="section-card">
            <span className="section-label">Common Use Cases</span>
            <div className={styles.pillList}>
              {s.useCases.map(x => <Pill key={x} variant="blue">→ {x}</Pill>)}
            </div>
          </div>

          {/* Key Differentiators */}
          <div className="section-card">
            <span className="section-label">Key Differentiators</span>
            <p className={styles.diffText}>{s.keyDiff}</p>
          </div>

          {/* Debug Tips */}
          {s.debugTips && s.debugTips.length > 0 && (
            <div className={`section-card ${styles.debugCard}`}>
              <span className="section-label">Debugging & Troubleshooting</span>
              <ul className={styles.debugList}>
                {s.debugTips.map((tip, i) => (
                  <li key={i} className={styles.debugItem}>
                    <span className={styles.debugBullet}>→</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ── Right column (sidebar) ── */}
        <div className={styles.right}>

          {/* Verdict */}
          <div className="section-card">
            <span className="section-label">Verdict</span>
            <div className={styles.verdict} data-type="good">
              <span className={styles.verdictLabel}>✓ Best For</span>
              <p className={styles.verdictText}>{s.bestFor}</p>
            </div>
            <div className={styles.verdict} data-type="bad" style={{ marginTop: 8 }}>
              <span className={styles.verdictLabel}>✗ Avoid When</span>
              <p className={styles.verdictText}>{s.notFor}</p>
            </div>
          </div>

          {/* Exam Tip */}
          <div className="exam-tip">
            <span className="exam-tip__label">⚡ PCA Exam Tip</span>
            <p className="exam-tip__text">{s.examTip}</p>
          </div>

          {/* Integrations */}
          <div className="section-card">
            <span className="section-label">Integrations</span>
            <div className={styles.pillList} style={{ marginTop: 0 }}>
              {s.integrations.map(x => <Pill key={x} variant="gray">{x}</Pill>)}
            </div>
          </div>

          {/* Quick stats */}
          <div className="section-card">
            <span className="section-label">Quick Stats</span>
            {[['Launched', s.launched], ['Pricing', s.pricing], ['Scale', s.scale]].map(([k, v]) => (
              <div key={k} className={styles.kvRow}>
                <span className={styles.kvKey}>{k}</span>
                <span className={styles.kvVal}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
