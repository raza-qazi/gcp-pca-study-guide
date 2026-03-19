import { useState } from 'react'
import { CLUSTERS } from '../../../data/k8s/index'
import s from './Section.module.css'

const CLOUD_COLOR = { aws:'var(--aws)', gcp:'var(--gcp)', azure:'var(--azure)' }
const CLOUD_TAG   = { aws:'tag-aws',    gcp:'tag-gcp',    azure:'tag-azure'    }

function ClusterCard({ c, selected, onSelect }) {
  const color = CLOUD_COLOR[c.cloud]
  return (
    <button className={`${s.clusterCard} ${selected ? s.clusterCardActive:''}`}
      style={{ '--c': color }} onClick={onSelect}>
      <div className={s.cardHead}>
        <span className={`tag ${CLOUD_TAG[c.cloud]}`}>{c.cloud.toUpperCase()}</span>
        <span className={s.cardName}>{c.name}</span>
      </div>
      <p className={s.cardSummary}>{c.tag}</p>
      <div className={s.cardMeta}>
        <span><strong>SLA</strong>{c.sla}</span>
        <span><strong>Cost</strong>{c.controlPlaneCost}</span>
      </div>
    </button>
  )
}

function ClusterDetail({ c }) {
  const color = CLOUD_COLOR[c.cloud]
  return (
    <div className={`${s.detail} fade-up`} style={{ '--c': color }}>
      <div className={s.detailHero}>
        <div className={s.detailTitle}>
          <span className={`tag ${CLOUD_TAG[c.cloud]}`}>{c.cloud.toUpperCase()}</span>
          <h2>{c.name}</h2>
          <span className={s.detailTag}>{c.tag}</span>
        </div>
        <p className={s.detailDesc}>{c.summary}</p>
        <div className={s.metaGrid}>
          {[
            ['Control Plane', c.controlPlaneCost],
            ['SLA', c.sla],
            ['K8s Versions', c.k8sVersions],
            ['Provision Time', c.provisionTime],
            ['Serverless', c.serverless],
          ].map(([k,v]) => (
            <div key={k} className={s.metaItem}>
              <span className={s.metaKey}>{k}</span>
              <span className={s.metaVal}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={s.twoCol}>
        <div className="card">
          <span className="section-label">Strengths</span>
          <div className={s.pillList}>{c.strengths.map(x => <span key={x} className="pill pill-green">▲ {x}</span>)}</div>
        </div>
        <div className="card">
          <span className="section-label">Weaknesses</span>
          <div className={s.pillList}>{c.weaknesses.map(x => <span key={x} className="pill pill-red">▼ {x}</span>)}</div>
        </div>
      </div>

      <div className={s.threeCol}>
        <div className="card">
          <span className="section-label">Node Autoscaling</span>
          <p className={s.infoText}>{c.nodeScaling}</p>
        </div>
        <div className="card">
          <span className="section-label">Networking</span>
          <p className={s.infoText}>{c.networking}</p>
        </div>
        <div className="card">
          <span className="section-label">Hybrid / On-prem</span>
          <p className={s.infoText}>{c.hybridOption}</p>
        </div>
      </div>

      <div className={s.twoCol}>
        <div className="card">
          <span className="section-label">Storage</span>
          <p className={s.infoText}>{c.storage}</p>
        </div>
        <div className="card">
          <span className="section-label">AI / GPU Support</span>
          <p className={s.infoText}>{c.aiOpts}</p>
        </div>
      </div>

      <div className="exam-tip">
        <span className="exam-tip__label">⚡ Key Decision Point</span>
        <p className="exam-tip__text">{c.examTip}</p>
      </div>
    </div>
  )
}

export default function Cluster() {
  const [sel, setSel] = useState('eks')
  const current = CLUSTERS.find(c => c.id === sel)
  return (
    <div>
      <h1 className={s.pageTitle}>Cluster Management</h1>
      <p className={s.pageSub}>Managed Kubernetes platforms — control plane, node scaling, networking foundations, and serverless options.</p>
      <div className={s.cardRow}>
        {CLUSTERS.map(c => (
          <ClusterCard key={c.id} c={c} selected={sel===c.id} onSelect={()=>setSel(c.id)} />
        ))}
      </div>
      {current && <ClusterDetail c={current} />}
    </div>
  )
}
