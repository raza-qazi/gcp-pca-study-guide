import { useState } from 'react'
import { MONITORING_TOOLS } from '../../../data/k8s/index'
import s from './Section.module.css'

const CLOUD_TAG = { aws:'tag-aws', gcp:'tag-gcp', azure:'tag-azure', multi:'tag-multi' }

function ToolDetail({ t }) {
  return (
    <div className={`${s.detail} fade-up`}>
      <div className={s.detailHero} style={{ '--c': t.cloud==='aws'?'var(--aws)':t.cloud==='gcp'?'var(--gcp)':t.cloud==='azure'?'var(--azure)':'var(--multi)' }}>
        <div className={s.detailTitle}>
          <span className={`tag ${CLOUD_TAG[t.cloud]}`}>{t.cloud.toUpperCase()}</span>
          <h2>{t.name}</h2>
          <span className={s.detailTag}>{t.tag}</span>
        </div>
        <p className={s.detailDesc}>{t.summary}</p>
        <div className={s.metaGrid}>
          <div className={s.metaItem}><span className={s.metaKey}>Setup</span><span className={s.metaVal} style={{whiteSpace:'normal',fontSize:10}}>{t.setup}</span></div>
        </div>
      </div>

      <div className={s.twoCol}>
        <div className="card">
          <span className="section-label">Strengths</span>
          <div className={s.pillList}>{t.strengths.map(x=><span key={x} className="pill pill-green">▲ {x}</span>)}</div>
        </div>
        <div className="card">
          <span className="section-label">Weaknesses</span>
          <div className={s.pillList}>{t.weaknesses.map(x=><span key={x} className="pill pill-red">▼ {x}</span>)}</div>
        </div>
      </div>

      <div className="card">
        <span className="section-label">Key Metrics to Watch</span>
        <div className={s.pillList}>{t.keyMetrics.map(m=><span key={m} className="pill pill-blue" style={{fontFamily:'var(--font-mono)',fontSize:10}}>{m}</span>)}</div>
      </div>

      <div className="exam-tip">
        <span className="exam-tip__label">⚡ When to Use</span>
        <p className="exam-tip__text">{t.examTip}</p>
      </div>
    </div>
  )
}

export default function Monitoring() {
  const [sel, setSel] = useState('prometheus')
  const current = MONITORING_TOOLS.find(t=>t.id===sel)

  return (
    <div>
      <h1 className={s.pageTitle}>Monitoring & Observability</h1>
      <p className={s.pageSub}>Metrics, logs, distributed traces, and alerting across EKS, GKE, AKS — native and cross-cloud options.</p>

      <div className={s.cardRow}>
        {MONITORING_TOOLS.map(t => (
          <button key={t.id}
            className={`${s.toolCard} ${sel===t.id ? s.toolCardActive:''}`}
            style={{'--c': t.cloud==='aws'?'var(--aws)':t.cloud==='gcp'?'var(--gcp)':t.cloud==='azure'?'var(--azure)':'var(--multi)'}}
            onClick={()=>setSel(t.id)}>
            <div className={s.toolHead}>
              <span className={`tag ${CLOUD_TAG[t.cloud]}`}>{t.cloud.toUpperCase()}</span>
            </div>
            <div className={s.toolName}>{t.name}</div>
            <div style={{fontSize:10,color:'var(--muted)',marginTop:3}}>{t.tag}</div>
          </button>
        ))}
      </div>

      {current && <ToolDetail t={current} />}

      {/* Observability pillars */}
      <div className="card" style={{marginTop:14}}>
        <span className="section-label">The 3 Pillars of Observability</span>
        <div className={s.threeCol}>
          {[
            { title:'Metrics', icon:'📊', desc:'Numeric time-series. CPU, memory, request rate, error rate, latency percentiles. Prometheus + Grafana = CNCF standard. RED method: Rate, Errors, Duration per service.', tools:'Prometheus, CloudWatch, Cloud Monitoring, Azure Monitor, Datadog' },
            { title:'Logs', icon:'📋', desc:'Structured event records (JSON preferred). Correlation via trace ID field. K8s: stdout → log driver → aggregator. Log levels: DEBUG, INFO, WARN, ERROR. Never log PII.', tools:'CloudWatch Logs, Cloud Logging, Log Analytics, Loki, Elasticsearch' },
            { title:'Traces', icon:'🔍', desc:'Distributed call graphs. Span = one unit of work. Trace = chain of spans. W3C traceparent header propagates context. Sample rate: 100% for errors, 1-10% for normal traffic.', tools:'AWS X-Ray, Cloud Trace, App Insights, Jaeger, Zipkin, OTel Collector' },
          ].map(p => (
            <div key={p.title} className={s.metaItem} style={{background:'var(--surface2)',padding:'14px 16px'}}>
              <div style={{fontSize:20,marginBottom:6}}>{p.icon}</div>
              <div style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:13,color:'var(--bright)',marginBottom:6}}>{p.title}</div>
              <p style={{fontSize:11,color:'#8a9db5',lineHeight:1.6,marginBottom:8}}>{p.desc}</p>
              <div style={{fontSize:10,fontFamily:'var(--font-mono)',color:'var(--muted)'}}>{p.tools}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
