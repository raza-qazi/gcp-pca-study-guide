import { useState } from 'react'
import { SERVICES }  from '../data/gcp/services'
import { FAMILIES }  from '../data/gcp/families'
import GcpSidebar    from './gcp/Sidebar'
import Browse        from './gcp/Browse'
import Quiz          from './gcp/Quiz'
import s             from './GcpApp.module.css'

export default function GcpApp() {
  const [view,       setView]       = useState('browse')
  const [selFamily,  setSelFamily]  = useState('Data*')
  const [selService, setSelService] = useState(null)
  const [search,     setSearch]     = useState('')

  const handleSelectService = (id) => { setSelService(id); setSearch('') }
  const handleSelectFamily  = (f)  => { setSelFamily(f); setSelService(null); setSearch('') }

  const switchView = (v) => { setView(v); setSearch('') }

  // Live search results for the top input
  const searchResults = search.trim()
    ? SERVICES.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.tag.toLowerCase().includes(search.toLowerCase()) ||
        s.tldr.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 8)
    : []

  return (
    <div className={s.app}>
      {/* Sub-topbar: GCP-specific nav + search */}
      <div className={s.subbar}>
        <nav className={s.nav}>
          {['browse', 'quiz'].map(v => (
            <button
              key={v}
              className={`${s.navBtn} ${view === v ? s.navActive : ''}`}
              onClick={() => switchView(v)}
            >
              {v === 'browse' ? '⬡ Services' : '◈ Quiz'}
            </button>
          ))}
        </nav>

        {/* Search */}
        <div className={s.searchWrap}>
          <input
            className={s.searchInput}
            placeholder="Search GCP services…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => view !== 'browse' && setView('browse')}
          />
          {searchResults.length > 0 && (
            <div className={s.dropdown}>
              {searchResults.map(svc => {
                const fam = FAMILIES[svc.family]
                return (
                  <button
                    key={svc.id}
                    className={s.dropResult}
                    onClick={() => { handleSelectFamily(svc.family); handleSelectService(svc.id) }}
                  >
                    <span className={s.drFamily} style={{ color: fam.color }}>{svc.family}</span>
                    <span className={s.drName}>{svc.name}</span>
                    <span className={s.drTag}>{svc.tag}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <div className={s.meta}>
          <span>{SERVICES.length} services</span>
        </div>
      </div>

      {/* Body */}
      <div className={s.body}>
        {view === 'browse' && (
          <GcpSidebar selected={selFamily} onSelect={handleSelectFamily} />
        )}
        <main className={s.main}>
          {view === 'browse' && (
            <Browse
              selFamily={selFamily}
              selService={selService}
              search={search}
              setSearch={setSearch}
              onSelectService={handleSelectService}
              onSelectFamily={handleSelectFamily}
              setSelService={setSelService}
            />
          )}
          {view === 'quiz' && <Quiz />}
        </main>
      </div>
    </div>
  )
}
