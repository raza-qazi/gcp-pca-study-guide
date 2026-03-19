import { useState } from 'react'
import { AUTH } from '../../../data/k8s/index'
import s from './Section.module.css'

const CLOUD_TAG = { aws:'tag-aws', gcp:'tag-gcp', azure:'tag-azure' }
const CLOUD_C   = { aws:'var(--aws)', gcp:'var(--gcp)', azure:'var(--azure)' }

const TABS = ['Workload Identity', 'RBAC', 'OPA / Policy']

// ── Workload Identity ─────────────────────────────────────────────────────────
function WorkloadIdentityTab() {
  const [sel, setSel] = useState('irsa')
  const item = AUTH.workloadIdentity.find(x => x.id === sel)

  return (
    <div>
      {/* Concept banner */}
      <div className="card" style={{ marginBottom: 16 }}>
        <span className="section-label">The Core Concept</span>
        <p className={s.infoText} style={{ marginBottom: 10 }}>
          All three clouds use the same underlying mechanism: <strong style={{ color: 'var(--bright)' }}>OIDC federation</strong>.
          The K8s cluster acts as an identity provider and issues a signed JWT to each pod.
          The pod exchanges that JWT with the cloud IAM system for a short-lived cloud credential.
          <strong style={{ color: '#4ade80' }}> No static credentials ever stored in the cluster.</strong>
        </p>
        <div className={s.flowWrap}>
          {[
            { label: 'K8s SA Token', desc: 'Cluster issues OIDC JWT to pod volume' },
            { label: 'Cloud STS / IAM', desc: 'Pod exchanges JWT → cloud credential' },
            { label: 'IAM Role / SA', desc: 'Cloud validates issuer + sub claim' },
            { label: 'Cloud Service', desc: 'Pod accesses S3 / GCS / Key Vault etc.' },
          ].map((step, i, arr) => (
            <div key={step.label} style={{ display: 'flex', alignItems: 'center' }}>
              <div className={s.flowStep}>
                <strong>{step.label}</strong>
                <span>{step.desc}</span>
              </div>
              {i < arr.length - 1 && <span className={s.flowArrow}>→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Selector */}
      <div className={s.cardRow}>
        {AUTH.workloadIdentity.map(wi => (
          <button key={wi.id}
            className={`${s.toolCard} ${sel === wi.id ? s.toolCardActive : ''}`}
            style={{ '--c': CLOUD_C[wi.cloud] }}
            onClick={() => setSel(wi.id)}>
            <span className={`tag ${CLOUD_TAG[wi.cloud]}`}>{wi.cloud.toUpperCase()}</span>
            <div className={s.toolName} style={{ marginTop: 6 }}>{wi.name}</div>
            <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 3 }}>{wi.full}</div>
          </button>
        ))}
      </div>

      {item && (
        <div className={`${s.detail} fade-up`} style={{ '--c': CLOUD_C[item.cloud] }}>
          <div className={s.detailHero}>
            <div className={s.detailTitle}>
              <span className={`tag ${CLOUD_TAG[item.cloud]}`}>{item.cloud.toUpperCase()}</span>
              <h2>{item.name}</h2>
            </div>
            <p className={s.detailDesc}>{item.summary}</p>
          </div>

          <div className={s.twoCol}>
            {/* Steps */}
            <div className="card">
              <span className="section-label">Setup Steps</span>
              <div className={s.authFlow}>
                {item.steps.map((step, i) => (
                  <div key={i} className={s.authStep}>
                    <div className={s.authNum}>{i + 1}</div>
                    <div>
                      <div className={s.authDesc}>{step.replace(/^\d+\.\s*/, '')}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Config snippet */}
            <div className="card">
              <span className="section-label">Config / Policy</span>
              <pre className="codeblock" style={{ fontSize: 10, lineHeight: 1.65 }}>
                {item.trustPolicy}
              </pre>
            </div>
          </div>

          {/* Debug tips */}
          <div className="card">
            <span className="section-label">Debugging Tips</span>
            <div className={s.pillList}>
              {item.debugTips.map(t => (
                <span key={t} className="pill pill-yellow" style={{ fontSize: 11, fontWeight: 400, whiteSpace: 'normal', lineHeight: 1.5 }}>
                  → {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── RBAC ─────────────────────────────────────────────────────────────────────
function RBACTab() {
  const [sel, setSel] = useState('role')
  const rbac = AUTH.rbac

  return (
    <div className={s.detail}>
      <div className="card">
        <span className="section-label">How K8s RBAC Works</span>
        <p className={s.infoText} style={{ marginBottom: 12 }}>{rbac.summary}</p>
        <div className={s.pillList}>
          {rbac.tips.map(t => (
            <span key={t} className="pill pill-yellow" style={{ fontSize: 11, fontWeight: 400, whiteSpace: 'normal', lineHeight: 1.5 }}>
              → {t}
            </span>
          ))}
        </div>
      </div>

      {/* Cloud mappings */}
      <div className={s.tabs} style={{ marginTop: 8 }}>
        {[['role', 'Role + RoleBinding'], ['eks', 'EKS (IAM→RBAC)'], ['aks', 'AKS (Entra→RBAC)'], ['gke', 'GKE (Google IAM→RBAC)']].map(([id, label]) => (
          <button key={id}
            className={`${s.tabBtn} ${sel === id ? s.tabActive : ''}`}
            onClick={() => setSel(id)}>
            {label}
          </button>
        ))}
      </div>

      {sel === 'role' && (
        <div className="card fade-up">
          <span className="section-label">Role + RoleBinding Example</span>
          <pre className="codeblock" style={{ fontSize: 10, lineHeight: 1.65 }}>{rbac.roleExample}</pre>
        </div>
      )}
      {sel === 'eks' && (
        <div className="card fade-up">
          <span className="section-label">EKS: IAM → K8s RBAC (aws-auth ConfigMap)</span>
          <pre className="codeblock" style={{ fontSize: 10, lineHeight: 1.65 }}>{rbac.eksMapping}</pre>
          <div style={{ marginTop: 12 }} className={s.pillList}>
            <span className="pill pill-yellow">→ Access Entries API (2024) is the modern replacement for aws-auth ConfigMap</span>
            <span className="pill pill-yellow">→ Use EKS Console or eksctl to manage access entries — no more hand-editing ConfigMap</span>
          </div>
        </div>
      )}
      {sel === 'aks' && (
        <div className="card fade-up">
          <span className="section-label">AKS: Microsoft Entra ID → K8s RBAC</span>
          <pre className="codeblock" style={{ fontSize: 10, lineHeight: 1.65 }}>{rbac.aksMapping}</pre>
          <div style={{ marginTop: 12 }} className={s.pillList}>
            <span className="pill pill-yellow">→ --enable-azure-rbac: replaces K8s RBAC entirely with Azure IAM role assignments</span>
            <span className="pill pill-yellow">→ Built-in Azure roles: Azure Kubernetes Service RBAC Admin, Cluster Admin, Reader, Writer</span>
          </div>
        </div>
      )}
      {sel === 'gke' && (
        <div className="card fade-up">
          <span className="section-label">GKE: Google Identity → K8s RBAC</span>
          <pre className="codeblock" style={{ fontSize: 10, lineHeight: 1.65 }}>{rbac.gkeMapping}</pre>
          <div style={{ marginTop: 12 }} className={s.pillList}>
            <span className="pill pill-yellow">→ GKE also has GCP IAM roles (roles/container.developer) that auto-map to K8s RBAC</span>
            <span className="pill pill-yellow">→ Workload Identity Federation (for human users): use Google Workspace groups as RBAC subjects</span>
          </div>
        </div>
      )}
    </div>
  )
}

// ── OPA / Policy ──────────────────────────────────────────────────────────────
function OPATab() {
  const opa = AUTH.opa
  return (
    <div className={s.detail}>
      <div className="card">
        <span className="section-label">What OPA / Gatekeeper Does</span>
        <p className={s.infoText} style={{ marginBottom: 12 }}>{opa.summary}</p>
        <div className={s.pillList}>
          {opa.cloudNative.map(t => (
            <span key={t} className="pill pill-blue" style={{ whiteSpace: 'normal', lineHeight: 1.5, fontSize: 11 }}>→ {t}</span>
          ))}
        </div>
      </div>

      <div className="card">
        <span className="section-label">ConstraintTemplate + Constraint Example</span>
        <pre className="codeblock" style={{ fontSize: 10, lineHeight: 1.65 }}>{opa.example}</pre>
      </div>

      <div className="card">
        <span className="section-label">Admission Flow</span>
        <div className={s.flowWrap}>
          {[
            { label: 'kubectl apply', desc: 'User or CI/CD submits resource' },
            { label: 'API Server', desc: 'Authenticates + Authorizes (RBAC)' },
            { label: 'Mutating Webhook', desc: 'Istio injects sidecar, Workload Identity injects env vars' },
            { label: 'Validating Webhook', desc: 'OPA Gatekeeper evaluates Rego policies' },
            { label: 'etcd', desc: 'Resource persisted if all webhooks allow' },
          ].map((step, i, arr) => (
            <div key={step.label} style={{ display: 'flex', alignItems: 'center' }}>
              <div className={s.flowStep}>
                <strong>{step.label}</strong>
                <span>{step.desc}</span>
              </div>
              {i < arr.length - 1 && <span className={s.flowArrow}>→</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="exam-tip">
        <span className="exam-tip__label">⚡ OPA vs RBAC</span>
        <p className="exam-tip__text">
          RBAC controls WHO can perform verb+resource actions (get pods, create deployments).
          OPA/Gatekeeper controls WHAT configuration is allowed (must have labels, no latest tag, no root containers).
          Use both: RBAC for access control, OPA for policy enforcement. In AKS use Azure Policy; in GKE Enterprise use Policy Controller; in EKS use Kyverno or OPA.
        </p>
      </div>
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function Auth() {
  const [tab, setTab] = useState(0)
  return (
    <div>
      <h1 className={s.pageTitle}>Authentication & Authorization</h1>
      <p className={s.pageSub}>
        Workload identity (IRSA, GKE Workload Identity, Entra Workload ID), K8s RBAC across clouds,
        and admission policy enforcement with OPA/Gatekeeper.
      </p>
      <div className={s.tabs}>
        {TABS.map((t, i) => (
          <button key={t} className={`${s.tabBtn} ${tab === i ? s.tabActive : ''}`} onClick={() => setTab(i)}>{t}</button>
        ))}
      </div>
      {tab === 0 && <WorkloadIdentityTab />}
      {tab === 1 && <RBACTab />}
      {tab === 2 && <OPATab />}
    </div>
  )
}
