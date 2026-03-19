import { SECTIONS } from '../../data/k8s/index'
import s from './K8sSidebar.module.css'

export default function K8sSidebar({ active, setActive }) {
  return (
    <aside className={s.side}>
      <span className={s.label}>Sections</span>
      {SECTIONS.map(sec => (
        <button
          key={sec.id}
          className={`${s.btn} ${active === sec.id ? s.active : ''}`}
          style={{ '--c': sec.color }}
          onClick={() => setActive(sec.id)}
        >
          <span className={s.icon}>{sec.icon}</span>
          <span className={s.name}>{sec.label}</span>
        </button>
      ))}
    </aside>
  )
}
