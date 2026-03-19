import { SERVICES } from '../../data/gcp/services'
import { FAMILIES } from '../../data/gcp/families'
import styles from './TopBar.module.css'

export default function TopBar({ view, setView, search, setSearch, onSelectService, setSelFamily }) {
  const results = search.trim()
    ? SERVICES.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.tag.toLowerCase().includes(search.toLowerCase()) ||
        s.tldr.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 8)
    : []

  const handlePick = (svc) => {
    setSelFamily(svc.family)
    onSelectService(svc.id)
    setSearch('')
  }

  const switchTo = (v) => {
    setView(v)
    setSearch('')
  }

  return (
    <header className={styles.bar}>
      <div className={styles.brand}>
        <span className={styles.gcp}>GCP</span>
        <span className={styles.title}>PCA Study</span>
        <span className={styles.year}>2026</span>
      </div>

      <nav className={styles.nav}>
        <button className={`${styles.tab} ${view === 'browse' ? styles.active : ''}`} onClick={() => switchTo('browse')}>
          Services
        </button>
        <button className={`${styles.tab} ${view === 'quiz' ? styles.active : ''}`} onClick={() => switchTo('quiz')}>
          Quiz
        </button>
      </nav>

      <div className={styles.searchWrap}>
        <input
          className={styles.input}
          placeholder="Search services…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onFocus={() => view !== 'browse' && setView('browse')}
        />
        {results.length > 0 && (
          <div className={styles.dropdown}>
            {results.map(s => (
              <button key={s.id} className={styles.result} onClick={() => handlePick(s)}>
                <span className={styles.rFamily} style={{ color: FAMILIES[s.family].color }}>{s.family}</span>
                <span className={styles.rName}>{s.name}</span>
                <span className={styles.rTag}>{s.tag}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
