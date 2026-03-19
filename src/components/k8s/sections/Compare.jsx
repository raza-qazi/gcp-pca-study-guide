import { useState } from 'react'
import { COMPARE_ROWS } from '../../../data/k8s/index'
import s from './Section.module.css'

const CATEGORIES = [
  { label: 'All', filter: null },
  { label: 'Cost & SLA',       filter: r => ['Control Plane Cost','SLA','Cluster Creation Time'].includes(r.label) },
  { label: 'Compute',          filter: r => ['Serverless Nodes','Node Autoscaling','GPU / AI Support','Windows Node Support'].includes(r.label) },
  { label: 'Networking',       filter: r => ['CNI Default'].includes(r.label) },
  { label: 'Security & Auth',  filter: r => ['Workload Identity','Cluster Auth','Policy Enforcement','Service Mesh'].includes(r.label) },
  { label: 'Observability',    filter: r => ['Monitoring (native)','Logging'].includes(r.label) },
  { label: 'DevOps',           filter: r => ['Image Registry','CI/CD Integration','K8s Version Lag'].includes(r.label) },
  { label: 'Hybrid',           filter: r => ['Hybrid / On-prem','Multi-cluster Management'].includes(r.label) },
]

// Highlight cells that are clearly stronger
const HIGHLIGHTS = {
  'Control Plane Cost': { gke: true },          // free tier
  'SLA':               { gke: true },           // 99.99% Autopilot
  'Serverless Nodes':  { gke: true },           // Autopilot
  'Node Autoscaling':  { eks: true },           // Karpenter
  'CNI Default':       { gke: true },           // eBPF
  'Workload Identity': {},
  'GPU / AI Support':  { gke: true },           // TPUs
  'Windows Node Support': { aks: true },        // Best-in-class
  'K8s Version Lag':   { gke: true },           // fastest
  'Best For':          {},
}

export default function Compare() {
  const [catIdx, setCatIdx] = useState(0)

  const rows = CATEGORIES[catIdx].filter
    ? COMPARE_ROWS.filter(CATEGORIES[catIdx].filter)
    : COMPARE_ROWS

  return (
    <div>
      <h1 className={s.pageTitle}>Full Comparison: EKS vs GKE vs AKS</h1>
      <p className={s.pageSub}>
        {COMPARE_ROWS.length}-dimension side-by-side comparison across cluster management, security,
        networking, observability, DevOps, and hybrid. Updated for 2026.
      </p>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 20 }}>
        {CATEGORIES.map((c, i) => (
          <button key={c.label}
            className={catIdx === i ? 'btn-primary' : 'btn-ghost'}
            style={{ fontSize: 11, padding: '6px 14px' }}
            onClick={() => setCatIdx(i)}>
            {c.label}
          </button>
        ))}
      </div>

      {/* Main table */}
      <div className={s.cmpWrap}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr className={s.cmpHead}>
              <th className={`${s.cmpHead} thLabel`} style={{ width: 180, padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1.2px', color: 'var(--muted)', background: '#0d1420', borderBottom: '2px solid var(--border)' }}>Dimension</th>
              {[
                { key: 'eks', label: 'Amazon EKS', color: 'var(--aws)', cls: 'thAws' },
                { key: 'gke', label: 'Google GKE', color: 'var(--gcp)', cls: 'thGke' },
                { key: 'aks', label: 'Azure AKS',  color: 'var(--azure)', cls: 'thAks' },
              ].map(col => (
                <th key={col.key} style={{ padding: '12px 16px', textAlign: 'left', background: '#0d1420', borderBottom: `2px solid ${col.color}`, color: col.color, fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 800 }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => {
              const hl = HIGHLIGHTS[row.label] || {}
              return (
                <tr key={row.label} style={{ borderBottom: '1px solid var(--border)', background: ri % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.008)' }}>
                  <td style={{ padding: '11px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--muted)', background: '#09111c', fontWeight: 600, borderRight: '1px solid var(--border)', whiteSpace: 'nowrap', verticalAlign: 'top' }}>
                    {row.label}
                  </td>
                  {[
                    { key: 'eks', color: 'var(--aws)' },
                    { key: 'gke', color: 'var(--gcp)' },
                    { key: 'aks', color: 'var(--azure)' },
                  ].map(col => (
                    <td key={col.key} style={{
                      padding: '11px 16px',
                      fontSize: 12,
                      color: hl[col.key] ? col.color : '#8a9db5',
                      fontWeight: hl[col.key] ? 600 : 400,
                      background: hl[col.key] ? `color-mix(in srgb, ${col.color} 4%, transparent)` : 'transparent',
                      borderRight: '1px solid var(--border)',
                      verticalAlign: 'top',
                      lineHeight: 1.55,
                    }}>
                      {hl[col.key] && <span style={{ marginRight: 5, fontSize: 10 }}>★</span>}
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

    </div>
  )
}
