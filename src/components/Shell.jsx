import { APPS } from '../App'
import s from './Shell.module.css'

export default function Shell({ activeApp, setActiveApp }) {
  const current = APPS.find(a => a.id === activeApp)

  return (
    <header className={s.shell}>
      {/* Brand */}
      <div className={s.brand}>
        <span className={s.brandIcon}>◈</span>
        <span className={s.brandName}>Cloud Study Guide</span>
        <span className={s.brandYear}>2026</span>
      </div>

      {/* App switcher — the two apps as tabs */}
      <nav className={s.switcher}>
        {APPS.map(app => (
          <button
            key={app.id}
            className={`${s.appTab} ${activeApp === app.id ? s.appTabActive : ''}`}
            style={{ '--c': app.color }}
            onClick={() => setActiveApp(app.id)}
          >
            <span className={s.tabIcon}>{app.icon}</span>
            <span className={s.tabLabel}>{app.label}</span>
            <span className={s.tabSub}>{app.sub}</span>
          </button>
        ))}
      </nav>

      {/* Right: subtle current-app indicator */}
      <div className={s.right}>
        <span className={s.activePill} style={{ '--c': current.color }}>
          {current.icon} {current.label}
        </span>
      </div>
    </header>
  )
}
