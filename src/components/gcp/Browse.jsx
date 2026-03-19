import { useState } from 'react'
import { SERVICES } from '../../data/gcp/services'
import { FAMILIES } from '../../data/gcp/families'
import ServiceGrid   from './ServiceGrid'
import ServiceDetail from './ServiceDetail'
import CompareTable  from './CompareTable'
import styles from './Browse.module.css'

const TABS = ['Explore', 'Compare']

export default function Browse({
  selFamily, selService, search, setSearch,
  onSelectService, onSelectFamily, setSelService
}) {
  const [tab, setTab] = useState('Explore')

  // Search mode
  if (search.trim()) {
    const results = SERVICES.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.tag.toLowerCase().includes(search.toLowerCase()) ||
      s.tldr.toLowerCase().includes(search.toLowerCase())
    )
    return (
      <div>
        <p className={styles.searchMeta}>{results.length} results for <strong>"{search}"</strong></p>
        <div className={styles.searchGrid}>
          {results.map(s => {
            const f = FAMILIES[s.family]
            return (
              <button key={s.id} className={styles.searchCard} style={{ '--c': f.color }}
                onClick={() => { onSelectFamily(s.family); onSelectService(s.id); setSearch('') }}>
                <span className={styles.sFam}>{s.family}</span>
                <span className={styles.sName}>{s.name}</span>
                <span className={styles.sTldr}>{s.tldr}</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Tabs */}
      <div className={styles.tabs}>
        {TABS.map(t => (
          <button key={t} className={`${styles.tabBtn} ${tab === t ? styles.tabActive : ''}`}
            onClick={() => { setTab(t); setSelService(null) }}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'Explore' && (
        selService
          ? <ServiceDetail
              serviceId={selService}
              onBack={() => setSelService(null)}
            />
          : <ServiceGrid
              family={selFamily}
              onSelectService={onSelectService}
            />
      )}

      {tab === 'Compare' && (
        <CompareTable defaultFamily={selFamily} />
      )}
    </div>
  )
}
