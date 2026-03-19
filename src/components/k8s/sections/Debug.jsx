import { useState } from 'react'
import { DEBUG } from '../../../data/k8s/index'
import s from './Section.module.css'

const TABS = ['Flow Paths', 'kubectl Reference', 'Common Issues', 'Distributed Tracing']

// ── Flow Paths ────────────────────────────────────────────────────────────────
function FlowTab() {
  const [sel, setSel] = useState(0)
  const flow = DEBUG.flowPaths[sel]

  return (
    <div>
      <div className={s.cardRow}>
        {DEBUG.flowPaths.map((f, i) => (
          <button key={f.name}
            className={`${s.toolCard} ${sel === i ? s.toolCardActive : ''}`}
            style={{ '--c': 'var(--k8s)' }}
            onClick={() => setSel(i)}>
            <div className={s.toolName} style={{ fontSize: 12 }}>{f.name}</div>
          </button>
        ))}
      </div>

      {flow && (
        <div className={`${s.detail} fade-up`}>
          <div className="card">
            <span className="section-label">{flow.name}</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {flow.steps.map((step, i) => (
                <div key={step.label} style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
                  {/* connector line */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 32, flexShrink: 0 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--surface2)', border: '2px solid var(--k8s)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--k8s)', flexShrink: 0, zIndex: 1 }}>{i + 1}</div>
                    {i < flow.steps.length - 1 && <div style={{ width: 2, flex: 1, background: 'var(--border)', minHeight: 20 }} />}
                  </div>
                  <div style={{ paddingLeft: 14, paddingBottom: 20, paddingTop: 4 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: 'var(--bright)', marginBottom: 3 }}>{step.label}</div>
                    <div style={{ fontSize: 12, color: '#8a9db5', lineHeight: 1.55 }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick reference for each flow */}
          {sel === 0 && (
            <div className="card">
              <span className="section-label">Debug Checklist for This Flow</span>
              <div className={s.pillList}>
                {[
                  'Ingress not routing: kubectl describe ingress — check host/path rules and backend service name/port',
                  'Service not routing to pods: kubectl get endpoints <svc> — empty = label selector mismatch',
                  'Pod not receiving traffic: check readinessProbe — failing probe removes pod from endpoints',
                  'Intermittent 503s: check PodDisruptionBudget and rolling update maxUnavailable settings',
                  'DNS not resolving: kubectl exec -- nslookup svc.namespace.svc.cluster.local (check CoreDNS pods)',
                ].map(t => <span key={t} className="pill pill-yellow" style={{ whiteSpace: 'normal', lineHeight: 1.5, fontSize: 11 }}>→ {t}</span>)}
              </div>
            </div>
          )}
          {sel === 1 && (
            <div className="card">
              <span className="section-label">DNS Debug Commands</span>
              <table className={s.cmdTable}>
                <tbody>
                  {[
                    ['kubectl exec debug -- nslookup svc', 'Resolve short name (searches namespaces via ndots)'],
                    ['kubectl exec debug -- nslookup svc.ns.svc.cluster.local', 'FQDN lookup — always unambiguous'],
                    ['kubectl get configmap coredns -n kube-system -o yaml', 'Inspect CoreDNS config (forward rules, cache TTL)'],
                    ['kubectl logs -l k8s-app=kube-dns -n kube-system', 'CoreDNS logs — NXDOMAIN storms or upstream failures'],
                    ['kubectl exec debug -- cat /etc/resolv.conf', 'Check ndots setting (default 5) + search domains'],
                  ].map(([cmd, desc]) => (
                    <tr key={cmd}><td>{cmd}</td><td>{desc}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {sel === 2 && (
            <div className="card">
              <span className="section-label">Istio Debug Commands</span>
              <table className={s.cmdTable}>
                <tbody>
                  {[
                    ['istioctl analyze -n <ns>', 'Analyzes Istio config for misconfigurations'],
                    ['istioctl proxy-status', 'Shows sync status of all Envoy sidecars vs Istiod'],
                    ['kubectl logs <pod> -c istio-proxy', 'Envoy sidecar logs (access log + error log)'],
                    ['istioctl proxy-config routes <pod>', 'Inspect Envoy route table for a pod'],
                    ['kubectl exec <pod> -c istio-proxy -- pilot-agent request GET /stats | grep circuit', 'Check circuit breaker state'],
                    ['kubectl get peerauthentication -A', 'List all mTLS policies (check for PERMISSIVE vs STRICT)'],
                  ].map(([cmd, desc]) => (
                    <tr key={cmd}><td>{cmd}</td><td>{desc}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── kubectl Reference ─────────────────────────────────────────────────────────
function KubectlTab() {
  const [sel, setSel] = useState(0)
  const cat = DEBUG.kubectl[sel]

  return (
    <div>
      <div className={s.tabs}>
        {DEBUG.kubectl.map((c, i) => (
          <button key={c.category}
            className={`${s.tabBtn} ${sel === i ? s.tabActive : ''}`}
            style={sel === i ? { '--c': 'var(--k8s)' } : {}}
            onClick={() => setSel(i)}>
            {c.category}
          </button>
        ))}
      </div>

      {cat && (
        <div className="card fade-up">
          <span className="section-label">{cat.category}</span>
          <table className={s.cmdTable}>
            <tbody>
              {cat.commands.map(c => (
                <tr key={c.cmd}>
                  <td>{c.cmd}</td>
                  <td>{c.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pro tips */}
      <div className="card" style={{ marginTop: 14 }}>
        <span className="section-label">Power Tips</span>
        <div className={s.pillList}>
          {[
            "Set default namespace: kubectl config set-context --current --namespace=production",
            "Watch resources live: kubectl get pods -w (or use k9s TUI for better experience)",
            "Dry-run before apply: kubectl apply -f manifest.yaml --dry-run=server",
            "Diff current state: kubectl diff -f manifest.yaml",
            "Force delete stuck pod: kubectl delete pod <n> --force --grace-period=0",
            "Port-forward to debug: kubectl port-forward svc/<svc> 8080:80",
            "Copy files from pod: kubectl cp <pod>:/path/to/file ./local-file",
            "Get all resources: kubectl get all -n <ns> (or use 'k get all -A' with alias)",
          ].map(t => <span key={t} className="pill pill-purple" style={{ whiteSpace: 'normal', lineHeight: 1.5, fontSize: 11 }}>⚡ {t}</span>)}
        </div>
      </div>
    </div>
  )
}

// ── Common Issues ─────────────────────────────────────────────────────────────
function IssuesTab() {
  return (
    <div className={s.detail}>
      <div className="card" style={{ marginBottom: 14 }}>
        <span className="section-label">Quick Diagnosis Guide</span>
        <table className="cmp-table">
          <thead>
            <tr>
              <th>Symptom</th>
              <th>First Command</th>
              <th>Most Likely Cause</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Pod CrashLoopBackOff', 'kubectl logs <pod> --previous', 'App crash, missing env var, OOMKilled (exit 137)'],
              ['Pod Pending', 'kubectl describe pod → Events', 'Insufficient resources, taint/toleration mismatch, PVC not bound'],
              ['ImagePullBackOff', 'kubectl describe pod → Events', 'Wrong tag, missing imagePullSecret, ECR auth expired'],
              ['Service unreachable', 'kubectl get endpoints <svc>', 'Label selector mismatch (empty endpoints)'],
              ['DNS resolution fails', 'kubectl exec -- nslookup <svc>', 'CoreDNS down, ndots misconfiguration, NetworkPolicy blocking UDP 53'],
              ['High latency', 'kubectl top pods + metrics', 'CPU throttling (limit too low), slow downstream, mesh circuit breaker'],
              ['OOMKilled', 'kubectl describe pod → Last State', 'Memory limit too low, JVM heap not tuned, memory leak'],
              ['Node NotReady', 'kubectl describe node', 'kubelet crash, disk pressure, network partition, kernel panic'],
              ['HPA not scaling', 'kubectl describe hpa', 'metrics-server not running, custom metric adapter missing'],
              ['Ingress 502/503', 'kubectl logs -n ingress-nginx ingress-nginx-controller', 'Backend pods unhealthy, readinessProbe failing, upstream timeout'],
            ].map(([sym, cmd, cause]) => (
              <tr key={sym}>
                <td style={{ color: '#f87171' }}>{sym}</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#7dd3fc' }}>{cmd}</td>
                <td>{cause}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {DEBUG.commonIssues.map(issue => (
        <div key={issue.issue} className={s.issueCard}>
          <div className={s.issueTitle}>{issue.issue}</div>
          <div className={s.issueCauses}>
            <ul>{issue.causes.map(c => <li key={c}>{c}</li>)}</ul>
          </div>
          <div className={s.issueFix}>✓ Fix: {issue.fix}</div>
        </div>
      ))}
    </div>
  )
}

// ── Tracing ───────────────────────────────────────────────────────────────────
function TracingTab() {
  const tr = DEBUG.tracing
  const [sel, setSel] = useState(0)
  const tool = tr.tools[sel]
  const CLOUD_C = { aws: 'var(--aws)', gcp: 'var(--gcp)', azure: 'var(--azure)', multi: 'var(--multi)' }
  const CLOUD_TAG = { aws: 'tag-aws', gcp: 'tag-gcp', azure: 'tag-azure', multi: 'tag-multi' }

  return (
    <div className={s.detail}>
      <div className="card">
        <span className="section-label">How Distributed Tracing Works</span>
        <p className={s.infoText} style={{ marginBottom: 14 }}>{tr.summary}</p>
        <div className={s.flowWrap}>
          {[
            { label: 'Client', desc: 'Sends HTTP request' },
            { label: 'Service A', desc: 'Creates root span, injects traceparent header' },
            { label: 'Service B', desc: 'Reads header, creates child span' },
            { label: 'Database', desc: 'Creates db span (OTel auto-instruments)' },
            { label: 'Collector', desc: 'Spans exported → Jaeger / Cloud Trace / X-Ray' },
          ].map((step, i, arr) => (
            <div key={step.label} style={{ display: 'flex', alignItems: 'center' }}>
              <div className={s.flowStep}><strong>{step.label}</strong><span>{step.desc}</span></div>
              {i < arr.length - 1 && <span className={s.flowArrow}>→</span>}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14 }}>
          <span className="section-label">Trace Context Headers</span>
          <pre className="codeblock" style={{ fontSize: 10, lineHeight: 1.7 }}>{tr.headers}</pre>
        </div>
      </div>

      <div className={s.cardRow}>
        {tr.tools.map((t, i) => (
          <button key={t.name}
            className={`${s.toolCard} ${sel === i ? s.toolCardActive : ''}`}
            style={{ '--c': CLOUD_C[t.cloud] }}
            onClick={() => setSel(i)}>
            <span className={`tag ${CLOUD_TAG[t.cloud]}`}>{t.cloud.toUpperCase()}</span>
            <div className={s.toolName} style={{ marginTop: 6, fontSize: 12 }}>{t.name}</div>
          </button>
        ))}
      </div>

      {tool && (
        <div className="card fade-up" style={{ '--c': CLOUD_C[tool.cloud] }}>
          <div className={s.detailTitle} style={{ marginBottom: 10 }}>
            <span className={`tag ${CLOUD_TAG[tool.cloud]}`}>{tool.cloud.toUpperCase()}</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--bright)' }}>{tool.name}</span>
          </div>
          <p className={s.infoText}>{tool.summary}</p>
        </div>
      )}

      <div className="exam-tip">
        <span className="exam-tip__label">⚡ Sampling Strategy</span>
        <p className="exam-tip__text">
          Never sample 100% in production at high RPS — it will overwhelm your tracing backend.
          Use head-based sampling (decide at trace start): 100% for errors/slow requests (tail-based via OTel Collector),
          1–10% for normal traffic. OTel Collector supports tail-based sampling: buffer spans and decide after seeing the full trace.
          Always propagate traceparent header regardless of sampling — downstream services can decide to record independently.
        </p>
      </div>
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function Debug() {
  const [tab, setTab] = useState(0)
  return (
    <div>
      <h1 className={s.pageTitle}>Microservices Debugging & Flow Paths</h1>
      <p className={s.pageSub}>
        Request flow through K8s, kubectl diagnostics, common failure patterns, and distributed tracing
        across EKS, GKE, and AKS.
      </p>
      <div className={s.tabs}>
        {TABS.map((t, i) => (
          <button key={t} className={`${s.tabBtn} ${tab === i ? s.tabActive : ''}`} onClick={() => setTab(i)}>{t}</button>
        ))}
      </div>
      {tab === 0 && <FlowTab />}
      {tab === 1 && <KubectlTab />}
      {tab === 2 && <IssuesTab />}
      {tab === 3 && <TracingTab />}
    </div>
  )
}
