import { useState } from 'react'
import { SERVICES } from '../../data/gcp/services'
import { FAMILIES, FAMILY_ORDER } from '../../data/gcp/families'
import styles from './CompareTable.module.css'

// Rows shown in the comparison table, in order.
// Each entry is [displayLabel, serviceKey, optional formatter]
const ROWS = [
  ['Tag',         'tag'],
  ['Family',      'family'],
  ['Launched',    'launched'],
  ['Latency',     'latency'],
  ['Scale',       'scale'],
  ['Pricing',     'pricing'],
  ['SLA',         'sla'],
  ['Consistency', 'consistency'],
  ['Data Model',  'dataModel'],
  ['Best For',    'bestFor'],
  ['Avoid When',  'notFor'],
  ['Key Diff',    'keyDiff'],
  ['Exam Tip',    'examTip'],
  ['Integrations','integrations', v => Array.isArray(v) ? v.join(', ') : v],
]

export default function CompareTable({ defaultFamily }) {
  const [selectedIds, setSelectedIds] = useState(() =>
    SERVICES.filter(s => s.family === defaultFamily).slice(0, 3).map(s => s.id)
  )
  const [filterFamily, setFilterFamily] = useState('All')

  const toggle = (id) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length < 4 ? [...prev, id] : prev
    )
  }

  const filtered = filterFamily === 'All'
    ? SERVICES
    : SERVICES.filter(s => s.family === filterFamily)

  const selected = SERVICES.filter(s => selectedIds.includes(s.id))

  return (
    <div>
      {/* Picker */}
      <div className={styles.picker}>
        <div className={styles.pickerHeader}>
          <span className={styles.pickerTitle}>Select up to 4 services to compare</span>
          <div className={styles.familyFilter}>
            {['All', ...FAMILY_ORDER].map(f => (
              <button
                key={f}
                className={`${styles.famBtn} ${filterFamily === f ? styles.famActive : ''}`}
                style={{ '--c': f === 'All' ? '#6b7280' : FAMILIES[f]?.color }}
                onClick={() => setFilterFamily(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.chips}>
          {filtered.map(s => {
            const on = selectedIds.includes(s.id)
            const fam = FAMILIES[s.family]
            return (
              <button
                key={s.id}
                className={`${styles.chip} ${on ? styles.chipOn : ''}`}
                style={{ '--c': fam.color }}
                onClick={() => toggle(s.id)}
              >
                <span className={styles.chipDot} />
                <span className={styles.chipName}>{s.name}</span>
                <span className={styles.chipFam}>{s.family}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Table */}
      {selected.length < 2 ? (
        <p className={styles.empty}>Select at least 2 services above to compare them.</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.rowLabel} />
                {selected.map(s => {
                  const fam = FAMILIES[s.family]
                  return (
                    <th key={s.id} className={styles.colHead} style={{ '--c': fam.color }}>
                      <div className={styles.colIcon}>{fam.icon}</div>
                      <div className={styles.colName}>{s.name}</div>
                      <div className={styles.colTag}>{s.tag}</div>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([label, key, fmt]) => (
                <tr key={key} className={styles.row}>
                  <td className={styles.rowLabel}>{label}</td>
                  {selected.map(s => {
                    const raw = s[key]
                    const val = fmt ? fmt(raw) : raw
                    return (
                      <td key={s.id} className={styles.cell}>
                        {val ?? <span className={styles.na}>—</span>}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
