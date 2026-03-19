import { useState } from 'react'
import { NETWORKING } from '../../../data/k8s/index'
import s from './Section.module.css'

const TABS = ['CNI Plugins', 'Ingress', 'Service Mesh', 'Network Policy']

const CLOUD_TAG = { aws:'tag-aws', gcp:'tag-gcp', azure:'tag-azure', multi:'tag-multi' }
const CLOUD_C   = { aws:'var(--aws)', gcp:'var(--gcp)', azure:'var(--azure)', multi:'var(--multi)' }

function CniTab() {
  const [sel, setSel] = useState(0)
  const item = NETWORKING.cniplugins[sel]
  return (
    <div>
      <div className={s.cardRow}>
        {NETWORKING.cniplugins.map((c,i) => (
          <button key={c.name}
            className={`${s.toolCard} ${sel===i?s.toolCardActive:''}`}
            style={{'--c':CLOUD_C[c.cloud]}}
            onClick={()=>setSel(i)}>
            <span className={`tag ${CLOUD_TAG[c.cloud]}`}>{c.cloud.toUpperCase()}</span>
            <div className={s.toolName} style={{marginTop:6}}>{c.name}</div>
          </button>
        ))}
      </div>
      {item && (
        <div className={`${s.detail} fade-up`} style={{'--c':CLOUD_C[item.cloud]}}>
          <div className={s.detailHero}>
            <div className={s.detailTitle}>
              <span className={`tag ${CLOUD_TAG[item.cloud]}`}>{item.cloud.toUpperCase()}</span>
              <h2>{item.name}</h2>
            </div>
            <p className={s.detailDesc}>{item.summary}</p>
          </div>
          <div className={s.twoCol}>
            <div className="card">
              <span className="section-label">Pros</span>
              <div className={s.pillList}>{item.pros.map(x=><span key={x} className="pill pill-green">{x}</span>)}</div>
            </div>
            <div className="card">
              <span className="section-label">Cons</span>
              <div className={s.pillList}>{item.cons.map(x=><span key={x} className="pill pill-red">{x}</span>)}</div>
            </div>
          </div>
          <div className="exam-tip"><span className="exam-tip__label">⚡ Tip</span><p className="exam-tip__text">{item.tip}</p></div>
        </div>
      )}
    </div>
  )
}

function IngressTab() {
  const [sel, setSel] = useState(0)
  const item = NETWORKING.ingress[sel]
  return (
    <div>
      <div className={s.cardRow}>
        {NETWORKING.ingress.map((c,i) => (
          <button key={c.name}
            className={`${s.toolCard} ${sel===i?s.toolCardActive:''}`}
            style={{'--c':CLOUD_C[c.cloud]}}
            onClick={()=>setSel(i)}>
            <span className={`tag ${CLOUD_TAG[c.cloud]}`}>{c.cloud.toUpperCase()}</span>
            <div className={s.toolName} style={{marginTop:6,fontSize:12}}>{c.name}</div>
          </button>
        ))}
      </div>
      {item && (
        <div className={`${s.detail} fade-up`} style={{'--c':CLOUD_C[item.cloud]}}>
          <div className={s.detailHero}>
            <div className={s.detailTitle}>
              <span className={`tag ${CLOUD_TAG[item.cloud]}`}>{item.cloud.toUpperCase()}</span>
              <h2>{item.name}</h2>
            </div>
            <p className={s.detailDesc}>{item.summary}</p>
          </div>
          <div className="exam-tip"><span className="exam-tip__label">⚡ Tip</span><p className="exam-tip__text">{item.tip}</p></div>
        </div>
      )}
    </div>
  )
}

function MeshTab() {
  const [sel, setSel] = useState(0)
  const item = NETWORKING.servicemesh[sel]
  return (
    <div>
      <div className={s.cardRow}>
        {NETWORKING.servicemesh.map((m,i) => (
          <button key={m.name}
            className={`${s.toolCard} ${sel===i?s.toolCardActive:''}`}
            style={{'--c': m.cloud==='gcp'?'var(--gcp)':'var(--multi)'}}
            onClick={()=>setSel(i)}>
            <span className={`tag ${m.cloud==='gcp'?'tag-gcp':'tag-multi'}`}>{m.tag}</span>
            <div className={s.toolName} style={{marginTop:6}}>{m.name}</div>
          </button>
        ))}
      </div>
      {item && (
        <div className={`${s.detail} fade-up`} style={{'--c': item.cloud==='gcp'?'var(--gcp)':'var(--multi)'}}>
          <div className={s.detailHero}>
            <div className={s.detailTitle}><h2>{item.name}</h2><span className={s.detailTag}>{item.tag}</span></div>
            <p className={s.detailDesc}>{item.summary}</p>
          </div>
          <div className={s.twoCol}>
            <div className="card">
              <span className="section-label">Pros</span>
              <div className={s.pillList}>{item.pros.map(x=><span key={x} className="pill pill-green">{x}</span>)}</div>
            </div>
            <div className="card">
              <span className="section-label">Cons</span>
              <div className={s.pillList}>{item.cons.map(x=><span key={x} className="pill pill-red">{x}</span>)}</div>
            </div>
          </div>
          <div className="exam-tip"><span className="exam-tip__label">⚡ Tip</span><p className="exam-tip__text">{item.tip}</p></div>
        </div>
      )}
    </div>
  )
}

function PolicyTab() {
  const np = NETWORKING.networkpolicy
  return (
    <div className={s.detail}>
      <div className="card">
        <span className="section-label">How NetworkPolicy Works</span>
        <p className={s.infoText} style={{marginBottom:12}}>{np.summary}</p>
        <div className={s.pillList}>
          {np.tips.map(t=><span key={t} className="pill pill-yellow">→ {t}</span>)}
        </div>
      </div>
      <div className={s.twoCol}>
        <div>
          <div className="section-label" style={{marginBottom:8}}>Default Deny All (baseline)</div>
          <pre className="codeblock">{np.defaultDenyExample}</pre>
        </div>
        <div>
          <div className="section-label" style={{marginBottom:8}}>Allow Frontend → Backend</div>
          <pre className="codeblock">{np.allowExample}</pre>
        </div>
      </div>
    </div>
  )
}

export default function Networking() {
  const [tab, setTab] = useState(0)
  return (
    <div>
      <h1 className={s.pageTitle}>Networking</h1>
      <p className={s.pageSub}>CNI plugins, ingress controllers, service meshes, and network policies — the full K8s networking stack.</p>
      <div className={s.tabs}>
        {TABS.map((t,i) => (
          <button key={t} className={`${s.tabBtn} ${tab===i?s.tabActive:''}`} onClick={()=>setTab(i)}>{t}</button>
        ))}
      </div>
      {tab===0 && <CniTab />}
      {tab===1 && <IngressTab />}
      {tab===2 && <MeshTab />}
      {tab===3 && <PolicyTab />}
    </div>
  )
}
