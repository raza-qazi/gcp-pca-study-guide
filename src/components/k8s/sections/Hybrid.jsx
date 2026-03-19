import { useState } from 'react'
import { HYBRID } from '../../../data/k8s/index'
import s from './Section.module.css'

const PROVIDER_C = {
  GCP: 'var(--gcp)',
  AWS: 'var(--aws)',
  Azure: 'var(--azure)',
  'CNCF/AWS': 'var(--k8s)',
  CNCF: 'var(--multi)',
}
const PROVIDER_TAG = {
  GCP: 'tag-gcp',
  AWS: 'tag-aws',
  Azure: 'tag-azure',
  'CNCF/AWS': 'tag-k8s',
  CNCF: 'tag-multi',
}

function HybridDetail({ item }) {
  const color = PROVIDER_C[item.provider] || 'var(--k8s)'
  return (
    <div className={`${s.detail} fade-up`} style={{ '--c': color }}>
      <div className={s.detailHero}>
        <div className={s.detailTitle}>
          <span className={`tag ${PROVIDER_TAG[item.provider] || 'tag-k8s'}`}>{item.provider}</span>
          <h2>{item.name}</h2>
        </div>
        <p className={s.detailDesc}>{item.summary}</p>
      </div>

      <div className={s.threeCol}>
        <div className="card">
          <span className="section-label">Pros</span>
          <div className={s.pillList}>{item.pros.map(x => <span key={x} className="pill pill-green">▲ {x}</span>)}</div>
        </div>
        <div className="card">
          <span className="section-label">Cons</span>
          <div className={s.pillList}>{item.cons.map(x => <span key={x} className="pill pill-red">▼ {x}</span>)}</div>
        </div>
        <div className="card">
          <span className="section-label">Use Cases</span>
          <div className={s.pillList}>{item.useCases.map(x => <span key={x} className="pill pill-blue">→ {x}</span>)}</div>
        </div>
      </div>

      <div className="exam-tip">
        <span className="exam-tip__label">⚡ When to Choose This</span>
        <p className="exam-tip__text">{item.examTip}</p>
      </div>
    </div>
  )
}

export default function Hybrid() {
  const [sel, setSel] = useState('anthos')
  const current = HYBRID.find(h => h.id === sel)

  return (
    <div>
      <h1 className={s.pageTitle}>Multi-cloud & Hybrid Kubernetes</h1>
      <p className={s.pageSub}>
        Extending and connecting Kubernetes across clouds and on-prem — GKE Enterprise (Anthos),
        EKS Anywhere, AKS Arc, Karpenter, and Crossplane.
      </p>

      {/* Concept overview */}
      <div className="card" style={{ marginBottom: 20 }}>
        <span className="section-label">Multi-cloud K8s Landscape (2026)</span>
        <div className={s.threeCol}>
          {[
            {
              cloud: 'AWS', color: 'var(--aws)', tag: 'tag-aws',
              points: [
                'EKS Anywhere: on-prem/edge EKS on VMware, bare metal, Snow',
                'EKS Connector: attach any K8s cluster to EKS console (view-only)',
                'AWS outposts: EKS on your hardware in your DC',
                'Karpenter: intelligent multi-arch node provisioning (ARM + x86 + GPU)',
              ],
            },
            {
              cloud: 'GCP', color: 'var(--gcp)', tag: 'tag-gcp',
              points: [
                'GKE Enterprise: manage EKS/AKS/on-prem clusters as a fleet',
                'Config Sync: Git-driven config across all clusters',
                'Anthos Service Mesh: Istio across hybrid fleet',
                'Policy Controller: OPA Gatekeeper fleet-wide',
              ],
            },
            {
              cloud: 'Azure', color: 'var(--azure)', tag: 'tag-azure',
              points: [
                'AKS Arc: AKS on HCI, bare metal, VMware — full AKS on-prem',
                'Azure Arc: attach any K8s cluster, get Azure services on it',
                'Fleet Manager (preview): multi-cluster update orchestration',
                'GitOps (Flux v2): built-in GitOps for Arc-enabled clusters',
              ],
            },
          ].map(col => (
            <div key={col.cloud} className="card" style={{ background: 'var(--surface2)' }}>
              <span className={`tag ${col.tag}`} style={{ marginBottom: 10, display: 'inline-block' }}>{col.cloud}</span>
              <div className={s.pillList} style={{ flexDirection: 'column', gap: 5 }}>
                {col.points.map(p => <span key={p} style={{ fontSize: 11, color: '#8a9db5', lineHeight: 1.5 }}>→ {p}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selector */}
      <div className={s.cardRow}>
        {HYBRID.map(h => (
          <button key={h.id}
            className={`${s.toolCard} ${sel === h.id ? s.toolCardActive : ''}`}
            style={{ '--c': PROVIDER_C[h.provider] || 'var(--k8s)' }}
            onClick={() => setSel(h.id)}>
            <span className={`tag ${PROVIDER_TAG[h.provider] || 'tag-k8s'}`}>{h.provider}</span>
            <div className={s.toolName} style={{ marginTop: 6, fontSize: 12 }}>{h.name}</div>
          </button>
        ))}
      </div>

      {current && <HybridDetail item={current} />}

      {/* Decision guide */}
      <div className="card" style={{ marginTop: 14 }}>
        <span className="section-label">Decision Guide: Which Hybrid Solution?</span>
        <table className="cmp-table">
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Recommended Solution</th>
              <th>Why</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Manage clusters across AWS + GCP + on-prem from one control plane', 'GKE Enterprise (Anthos)', 'Fleet management, Config Sync, managed Istio across all clusters'],
              ['Run EKS-compatible K8s on-prem (VMware or bare metal)', 'EKS Anywhere', 'Consistent EKS APIs, curated distro, optional AWS connectivity'],
              ['Run AKS on-prem with Azure HCI', 'AKS Arc', 'Full AKS experience on-prem, Azure services projection'],
              ['Attach any K8s cluster (EKS/GKE/on-prem) to Azure for monitoring/policy', 'Azure Arc (K8s)', 'Free Arc agent gives Azure Monitor, Policy, GitOps on any cluster'],
              ['Intelligent spot + on-demand node provisioning on EKS', 'Karpenter', 'Provisions exact right node type in seconds; supports consolidation'],
              ['Provision cloud infra (S3, RDS, Azure SQL) via kubectl/GitOps', 'Crossplane', 'K8s-native IaC; replaces Terraform for K8s-centric teams'],
              ['Multi-cluster service mesh with mTLS and observability', 'Istio + GKE Enterprise ASM or self-managed', 'ASM for managed; self-managed Istio for cloud-agnostic'],
              ['Sync K8s manifests from Git across many clusters automatically', 'Flux v2 (GitOps Toolkit) or ArgoCD', 'Flux: CNCF graduated, lightweight. ArgoCD: richer UI, app-of-apps pattern'],
            ].map(([scenario, solution, why]) => (
              <tr key={scenario}>
                <td>{scenario}</td>
                <td style={{ color: '#c084fc', fontWeight: 600 }}>{solution}</td>
                <td>{why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
