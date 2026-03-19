// ─── NAV SECTIONS ─────────────────────────────────────────────────────────────
export const SECTIONS = [
  { id:'cluster',    label:'Cluster Management',    icon:'▣', color:'#22C55E' },
  { id:'monitoring', label:'Monitoring',             icon:'◉', color:'#EC4899' },
  { id:'networking', label:'Networking',             icon:'⬡', color:'#06B6D4' },
  { id:'auth',       label:'Auth & AuthZ',           icon:'⬟', color:'#EF4444' },
  { id:'debug',      label:'Microservices Debug',    icon:'◈', color:'#F59E0B' },
  { id:'hybrid',     label:'Multi-cloud / Hybrid',   icon:'✦', color:'#A855F7' },
  { id:'compare',    label:'Full Comparison',        icon:'⊟', color:'#3B82F6' },
]

// ─── CLUSTER MANAGEMENT ───────────────────────────────────────────────────────
export const CLUSTERS = [
  {
    id:'eks', name:'Amazon EKS', cloud:'aws', tag:'AWS Managed K8s',
    launched:'2018', controlPlaneCost:'$0.10/hr ($73/mo)',
    sla:'99.95% (multi-AZ)', k8sVersions:'1.29–1.33 (as of 2026)',
    upgradeStrategy:'Manual or managed; N, N-1, N-2 supported. Extended support +12mo for $0.60/hr.',
    provisionTime:'15–20 min (manual VPC/IAM setup required)',
    nodeScaling:'Cluster Autoscaler + Karpenter (recommended 2024+)',
    serverless:'EKS Fargate (per-pod serverless; no node management)',
    storage:'EBS CSI, EFS CSI, FSx; persistent volumes via StorageClass',
    networking:'VPC CNI (aws-node DaemonSet, native Pod IPs from VPC); supports Calico overlay for network policy',
    summary:'Most widely used managed K8s (CNCF survey). Maximum AWS ecosystem depth (IAM, ECR, ALB, RDS, SQS). Requires more manual setup than GKE/AKS but gives maximum control.',
    strengths:['Deepest AWS ecosystem integration','Karpenter for intelligent autoscaling','EKS Anywhere for on-prem/edge','Extended support (26 months total)','EKS Pod Identity (newer, simpler than IRSA)','Graviton/Inferentia/Trainium node support'],
    weaknesses:['15–20 min cluster creation (most manual setup)','IRSA configuration complexity','No equivalent to GKE Autopilot','CloudWatch Container Insights requires agent install','Control plane cost even for dev clusters'],
    hybridOption:'EKS Anywhere — run EKS on bare metal, VMware, Snow, Nutanix',
    aiOpts:'Inferentia2 (inf2), Trainium2 (trn2) node types for ML; Karpenter auto-provisions GPU nodes',
    examTip:'EKS = maximum AWS control + deepest AWS service integration. Karpenter > Cluster Autoscaler for node provisioning. IRSA or Pod Identity for pod-level AWS auth.',
  },
  {
    id:'gke', name:'Google GKE', cloud:'gcp', tag:'GCP Managed K8s',
    launched:'2014', controlPlaneCost:'$0.10/hr (1 free zonal cluster/mo)',
    sla:'99.95% (zonal) / 99.99% (Autopilot)', k8sVersions:'1.29–1.33; fastest upstream adoption (~2 weeks)',
    upgradeStrategy:'Auto-upgrade (recommended). Node auto-upgrade. 30 months support on Autopilot.',
    provisionTime:'5–8 min (standard). Autopilot: ~3 min.',
    nodeScaling:'Node Auto-Provisioning + Cluster Autoscaler. Autopilot: fully managed (pay per pod).',
    serverless:'GKE Autopilot (Google manages nodes; pay per pod vCPU+mem)',
    storage:'Persistent Disk CSI, Filestore CSI, GCS FUSE; Hyperdisk for high-perf',
    networking:'GKE Dataplane V2 (eBPF via Cilium). VPC-native (alias IP). Cluster DNS: Cloud DNS or kube-dns.',
    summary:'Kubernetes was invented at Google. GKE leads in K8s features, Autopilot abstraction, and AI/ML infrastructure (TPUs). Best built-in security (Binary Authorization, gVisor sandbox). Fastest K8s version adoption.',
    strengths:['Autopilot: no node management, pay per pod','GKE Dataplane V2 (eBPF — fastest network policy)','Binary Authorization for image signing','gVisor (gke-sandbox) runtime isolation','Node Auto-Provisioning + Spot node pools','Fastest upstream K8s version support'],
    weaknesses:['GCP ecosystem lock-in','Autopilot has workload restrictions','Fewer enterprise Windows workload patterns vs AKS','Regional cluster costs more than zonal'],
    hybridOption:'GKE Enterprise (Anthos) — fleet management across GCP, AWS, Azure, on-prem',
    aiOpts:'TPU v5p/v6e node pools, A100/H100 GPU node pools via AI Hypercomputer',
    examTip:"'Need Autopilot (no node ops)' → GKE Autopilot. 'Binary Authorization / image signing' → GKE. 'Multi-cloud K8s fleet' → GKE Enterprise/Anthos.",
  },
  {
    id:'aks', name:'Azure AKS', cloud:'azure', tag:'Azure Managed K8s',
    launched:'2018', controlPlaneCost:'Free (pay SLA: $0.10/hr optional)',
    sla:'99.95% (w/ AZs) / 99.9% (without)', k8sVersions:'1.30–1.33; 3–6 weeks after upstream',
    upgradeStrategy:'Auto-upgrade channels (rapid/stable/patch). LTS channel = 2 years support.',
    provisionTime:'5–10 min',
    nodeScaling:'Cluster Autoscaler + KEDA (event-driven); Node Auto-Provision (preview)',
    serverless:'Azure Container Apps (serverless K8s-based); ACI virtual nodes via Virtual Kubelet',
    storage:'Azure Disk CSI, Azure Files CSI, Azure Blob CSI (NFS); Ephemeral OS disks',
    networking:'Azure CNI (pods get VNet IPs) or Kubenet; Azure CNI Overlay (scales to larger clusters); Cilium BYO',
    summary:'Best Microsoft/Azure ecosystem integration (Entra ID, Azure AD, Key Vault, Defender). Free control plane makes it cheapest for dev/small clusters. Strongest regulated-industry compliance story with Azure Policy + Defender.',
    strengths:['Free control plane (no $73/mo for dev)','Entra ID (Azure AD) native integration','Azure Policy + OPA Gatekeeper built-in','Microsoft Defender for Containers threat detection','LTS channel (2 years support)','Strong Windows node pool support','Azure Confidential Computing node support'],
    weaknesses:['3–6 week K8s version lag','Less feature-dense out-of-the-box vs GKE','Azure CNI IP exhaustion at scale (use Overlay)','AKS networking options can be confusing'],
    hybridOption:'AKS Arc — run AKS on-prem (HCI, bare metal) via Azure Arc',
    aiOpts:'NDv4 (A100), ND H200 node pools; Azure Maia 100 (custom AI chip); KAITO for LLM serving',
    examTip:"'Entra ID integration', 'regulated industry on Azure', 'Windows containers' → AKS. Free control plane = cheapest for small clusters.",
  },
  {
    id:'anthos', name:'GKE Enterprise / Anthos', cloud:'gcp', tag:'Multi-cloud Fleet K8s',
    launched:'2019', controlPlaneCost:'Per-vCPU licensing (Enterprise tier)',
    sla:'Per underlying cluster', k8sVersions:'Follows GKE/attached cluster versions',
    upgradeStrategy:'Fleet-level upgrade policies; centralized rollout control',
    provisionTime:'Varies by environment',
    nodeScaling:'Per attached cluster autoscaling policy',
    serverless:'N/A (uses underlying compute)',
    storage:'Per underlying cloud storage',
    networking:'Anthos Service Mesh (Istio-based) across all fleet clusters; multi-cluster Ingress',
    summary:'GKE Enterprise (formerly Anthos) provides a single pane of glass over Kubernetes clusters across GCP, AWS, Azure, and on-prem. Key: Anthos Service Mesh (managed Istio), Config Sync (GitOps), Policy Controller (OPA), and Multi-cluster Ingress.',
    strengths:['Single control plane across clouds and on-prem','Anthos Service Mesh (managed Istio)','Config Sync (GitOps for K8s configuration)','Policy Controller (OPA Gatekeeper)','Multi-cluster Ingress for global traffic','Anthos Security Posture dashboard'],
    weaknesses:['Complex licensing model','Requires GCP for control plane (even for AWS/Azure attached clusters)','High cost at scale','Learning curve for fleet concepts'],
    hybridOption:'Core purpose: connect GKE, EKS, AKS, on-prem K8s into one fleet',
    aiOpts:'Fleet-level GPU workload placement policies',
    examTip:"'Manage clusters across AWS + GCP + on-prem from one place' → GKE Enterprise. Config Sync = GitOps for fleet. Policy Controller = OPA across fleet.",
  },
  {
    id:'cloudrun', name:'Cloud Run', cloud:'gcp', tag:'Serverless Containers (no K8s)',
    launched:'2019', controlPlaneCost:'Pay-per-request only',
    sla:'99.95%', k8sVersions:'N/A (Knative-based, managed)',
    upgradeStrategy:'Fully managed — no upgrades to perform',
    provisionTime:'<10 seconds (instant)',
    nodeScaling:'0 to 1000+ instances automatically',
    serverless:'Cloud Run IS the serverless tier — no nodes, no pods, no cluster',
    storage:'GCS FUSE, Cloud SQL, Memorystore via Direct VPC Egress',
    networking:'Direct VPC Egress (2024+); HTTPS by default; Cloud Armor integration',
    summary:'Cloud Run is not Kubernetes but is often the right answer when K8s is overkill. Stateless containers, scale to zero, no cluster ops. Cloud Run Jobs handles batch. Knative-based. Use when: stateless HTTP/gRPC services, event-driven, no state management.',
    strengths:['No cluster to manage','Scale to zero (zero idle cost)','Instant deployment (<10s)','gRPC, HTTP/2, WebSockets','Cloud Run Jobs for batch','Direct VPC Egress (no connector)'],
    weaknesses:['Stateless only (no PersistentVolumeClaims)','Max 60-min request timeout','No K8s APIs (CRDs, operators)','Not for complex stateful microservices'],
    hybridOption:'N/A — GCP only',
    aiOpts:'GPU instances on Cloud Run (A100, L4) for AI inference; pairs with Vertex AI',
    examTip:"'Scale to zero', 'no cluster ops', 'stateless container' → Cloud Run. When asked GKE vs Cloud Run: stateful/complex = GKE; stateless/event-driven = Cloud Run.",
  },
]

// ─── MONITORING ───────────────────────────────────────────────────────────────
export const MONITORING_TOOLS = [
  {
    id:'cw', name:'CloudWatch Container Insights', cloud:'aws', tag:'AWS Native',
    summary:'Native AWS monitoring for EKS. Container Insights collects CPU, memory, disk, and network metrics at cluster/node/pod/container level via CloudWatch Agent (DaemonSet). Enhanced Observability (2024) adds pod-level metrics with Prometheus scraping, application signals, and zero-code instrumentation.',
    setup:'Install CloudWatch Agent via EKS add-on (aws-cloudwatch-metrics) or Helm. Enhanced mode: aws-otel-collector add-on.',
    strengths:['Zero-config via EKS add-on','Log Insights: SQL-like log queries','Container Insights Enhanced: zero-code app signals','CloudWatch Alarms for alerting','Cost Explorer integration'],
    weaknesses:['Higher cost vs Prometheus at scale','Less flexible dashboarding than Grafana','Per-metric pricing adds up','Not multi-cloud'],
    keyMetrics:['pod/cpu_reserved_capacity','pod/memory_reserved_capacity','node/disk_utilization','pod/network_rx_bytes','cluster/failed_node_count'],
    examTip:'EKS native monitoring = CloudWatch Container Insights. Enhanced Observability = zero-code app performance monitoring (replaces manual instrumentation).',
  },
  {
    id:'cloudmon', name:'Cloud Monitoring (GCP)', cloud:'gcp', tag:'GCP Native',
    summary:'Native GCP observability for GKE. Auto-collects system metrics (no agent for GKE). Managed Prometheus for workload metrics. Log Analytics (SQL on logs via BigQuery). SLO monitoring with error budgets. Ops Agent needed for Compute Engine VMs.',
    setup:'Auto-enabled for GKE. Managed Prometheus: enable via cluster flag. Log Analytics: enable in Cloud Logging sink.',
    strengths:['Zero-config for GKE system metrics','Managed Prometheus (no Prometheus ops)','Log Analytics: SQL on logs','SLO monitoring built-in','Works with Anthos/GKE Enterprise'],
    weaknesses:['30d default log retention','Proprietary MQL for metric queries (though PromQL via Managed Prometheus)','Custom metric cost at scale'],
    keyMetrics:['kubernetes.io/container/cpu/limit_utilization','kubernetes.io/container/memory/used_bytes','kubernetes.io/node/cpu/allocatable_utilization','kubernetes.io/pod/network/received_bytes_count'],
    examTip:"'Managed Prometheus on GKE' = Cloud Monitoring with no Prometheus infra to manage. Log Analytics = SQL on logs (BigQuery-backed).",
  },
  {
    id:'azmon', name:'Azure Monitor / Container Insights', cloud:'azure', tag:'Azure Native',
    summary:'AKS native monitoring. Container Insights collects metrics/logs via Azure Monitor Agent (AMA). Prometheus metrics collection built-in. Log Analytics workspace stores all logs and metrics. Azure Managed Prometheus + Grafana (2023+) provides fully managed Prometheus stack.',
    setup:'Enable via AKS cluster → Insights tab, or az aks enable-addons --addons monitoring. Azure Managed Prometheus: --enable-azure-monitor-metrics flag.',
    strengths:['Azure Managed Prometheus + Grafana (managed stack)','Azure Monitor Agent auto-provisioned','Integration with Azure Workbooks','Defender for Containers integrates threat signals','Cost Analysis per namespace'],
    weaknesses:['Log Analytics workspace costs at high volume','Multiple products to understand (Monitor, Insights, Prometheus, Grafana)','Retention costs'],
    keyMetrics:['cpuUsageNanoCores','memoryWorkingSetBytes','podCount','restartCount','oomKilledContainerCount'],
    examTip:"AKS: Azure Monitor Container Insights = system metrics. Azure Managed Prometheus = custom/app metrics. Log Analytics workspace = central log store.",
  },
  {
    id:'prometheus', name:'Prometheus + Grafana', cloud:'multi', tag:'CNCF Standard',
    summary:'The Kubernetes de-facto monitoring standard. Prometheus scrapes metrics via pull model from /metrics endpoints. Grafana visualizes. AlertManager handles alerts. kube-state-metrics exposes K8s object state. node-exporter for hardware metrics. Works on all K8s distributions.',
    setup:'kube-prometheus-stack Helm chart installs entire stack: Prometheus, Grafana, AlertManager, kube-state-metrics, node-exporter, Prometheus Operator.',
    strengths:['Works everywhere (EKS, GKE, AKS, on-prem)','Huge community + pre-built dashboards (Grafana.com)','PromQL powerful query language','Prometheus Operator for K8s-native config','AlertManager for complex routing/silencing','Thanos/Cortex/Mimir for long-term storage'],
    weaknesses:['Stateful — needs PVC for storage','High cardinality can OOM Prometheus','Operational burden (unless using managed)','No built-in multi-tenancy'],
    keyMetrics:['container_cpu_usage_seconds_total','container_memory_working_set_bytes','kube_pod_status_phase','kube_deployment_status_replicas_unavailable','apiserver_request_duration_seconds_bucket'],
    examTip:"Prometheus pull model: it scrapes pods' /metrics endpoint. HPA can use Prometheus metrics via Prometheus Adapter + custom.metrics.k8s.io API.",
  },
  {
    id:'datadog', name:'Datadog', cloud:'multi', tag:'Commercial APM',
    summary:'Full-stack observability platform. Datadog Agent DaemonSet collects metrics, logs, APM traces, network performance, security signals. Live Container view shows real-time resource usage. Automatic distributed tracing via APM with service topology maps. Works across EKS, GKE, AKS.',
    setup:'Deploy Datadog Agent via Helm chart (datadog/datadog). Annotate pods for log collection and APM.',
    strengths:['Single platform: metrics + logs + traces + security','Live Container view','Distributed tracing with service maps','NPM (network performance monitoring)','K8s RBAC dashboards','Watchdog AI anomaly detection'],
    weaknesses:['Expensive at scale','Vendor lock-in','Agent DaemonSet resource overhead','Custom metric cost per host'],
    keyMetrics:['kubernetes.cpu.usage.total','kubernetes.memory.rss','kubernetes.pods.running','trace.requests.errors (APM)','network.bytes_sent (NPM)'],
    examTip:"Datadog = single pane for multi-cloud K8s. Best for teams who want APM + infrastructure + logs unified. Cost increases sharply with hosts.",
  },
  {
    id:'otel', name:'OpenTelemetry', cloud:'multi', tag:'CNCF Observability Standard',
    summary:'Vendor-neutral observability framework for traces, metrics, and logs. OTel Collector runs as sidecar or DaemonSet to receive, process, and export signals to any backend (Jaeger, Zipkin, Datadog, Cloud Trace, AWS X-Ray). SDKs for auto-instrumentation in Java, Python, Go, Node.js, .NET.',
    setup:'Deploy OTel Operator (manages OTelCollector CRD + auto-instrumentation injection). Or use Helm chart: open-telemetry/opentelemetry-collector.',
    strengths:['Vendor-neutral: one SDK, any backend','Auto-instrumentation (zero code changes)','W3C TraceContext propagation standard','Replaces vendor-specific SDKs','Collector can fan out to multiple backends'],
    weaknesses:['Configuration complexity','OTel Collector can be a bottleneck','SDK maturity varies by language','No built-in storage or UI (needs backend)'],
    keyMetrics:['service.request.duration (histogram)','service.request.count','service.error.count','db.query.duration'],
    examTip:"OTel = instrument once, send to any backend. OTel Collector: DaemonSet (node-level) vs Sidecar (per-pod) vs Deployment (central gateway).",
  },
]

// ─── NETWORKING ───────────────────────────────────────────────────────────────
export const NETWORKING = {
  cniplugins: [
    { name:'AWS VPC CNI', cloud:'aws', summary:'Default EKS CNI. Allocates native VPC IPs directly to pods (no overlay). Each pod gets a real VPC IP from the node ENI. Fast (no encapsulation) but exhausts VPC IPs at scale. ENI trunking increases pods-per-node.', pros:['No overlay overhead (native VPC perf)','Pod IPs visible in VPC (security groups work per-pod)','AWS security groups for pods'], cons:['IP exhaustion at scale (use IPv6 or custom CIDR)','Max pods limited by ENI + IP count','Slower to configure than overlay'], tip:'Use ENABLE_PREFIX_DELEGATION to massively increase pod density. Custom Networking to use separate CIDR for pods.' },
    { name:'Azure CNI', cloud:'azure', summary:'Default AKS CNI. Pods get real Azure VNet IPs. Azure CNI Overlay (2023+) uses VXLAN overlay with VNet IP only for nodes — solves IP exhaustion. Azure CNI + Cilium replaces kube-proxy with eBPF.', pros:['Direct VNet connectivity','NSG rules apply per pod','Overlay solves IP exhaustion'], cons:['Classic Azure CNI: IP exhaustion','Config complexity with multiple CNI modes'], tip:'Use Azure CNI Overlay for large clusters. Combine with Cilium for eBPF network policy and kube-proxy replacement.' },
    { name:'GKE Dataplane V2 (Cilium)', cloud:'gcp', summary:'Default in GKE. eBPF-based networking via Cilium. Replaces iptables and kube-proxy with eBPF programs. Faster connection tracking, lower latency, rich network policies (L3/L4/L7), Hubble for flow observability.', pros:['eBPF: faster than iptables at scale','Hubble: built-in network flow visibility','L7 network policies','No kube-proxy (lower overhead)'], cons:['Newer — some edge cases','GKE only for managed version'], tip:'Use Hubble UI to visualize pod-to-pod flows. NetworkPolicy enforcement is strict — test in observe mode first.' },
    { name:'Calico', cloud:'multi', summary:'Most popular third-party CNI. Works on EKS, AKS, GKE, on-prem. Supports BGP (no overlay, routes pods via BGP) or VXLAN overlay. Rich L3/L4 NetworkPolicy including GlobalNetworkPolicy for cluster-wide rules. Calico Enterprise adds security analytics.', pros:['Flexible: BGP or overlay','Rich NetworkPolicy (GlobalNetworkPolicy)','Works everywhere','eBPF dataplane option (Calico v3.22+)'], cons:['Complex BGP setup','eBPF mode needs kernel 5.3+'], tip:"BGP mode: pods routable directly — no NAT overhead. For EKS, deploy Calico via operator: 'kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.28.0/manifests/calico.yaml'" },
    { name:'Cilium', cloud:'multi', summary:'eBPF-native CNI. Replaces kube-proxy. L3/L4/L7 network policies. Hubble for real-time network flow observability. ClusterMesh for multi-cluster connectivity. Service mesh capabilities without sidecars (Cilium Service Mesh). Growing standard for high-performance K8s networking.', pros:['eBPF: fastest network path','Hubble: per-flow observability','L7 policies (HTTP, gRPC, Kafka)','ClusterMesh: multi-cluster flat network','No sidecar service mesh option'], cons:['Kernel 5.4+ required','More complex than basic CNIs'], tip:'Cilium ClusterMesh: connect up to 32 clusters with shared service discovery and policy. Hubble: see every flow between pods.' },
  ],
  ingress: [
    { name:'AWS ALB Ingress Controller', cloud:'aws', summary:'AWS Load Balancer Controller creates Application Load Balancers for each Ingress. Supports path/host routing, SSL termination, WAF integration, IP/instance target types. Natively integrated with IAM and ACM certificates.', tip:'Use TargetType=ip for direct pod routing (no node-port hop). Annotate with alb.ingress.kubernetes.io/scheme: internet-facing or internal.' },
    { name:'GKE Ingress (Cloud LB)', cloud:'gcp', summary:'GKE creates a Cloud HTTP(S) Load Balancer for each Ingress. Multi-cluster Ingress spreads traffic across multiple GKE clusters globally. Integrates with Cloud Armor (WAF) and Google-managed SSL certs.', tip:'Use BackendConfig CRD to configure Cloud Armor, session affinity, timeouts. Use Ingress class: gce for external, gce-internal for internal LB.' },
    { name:'Azure Application Gateway Ingress', cloud:'azure', summary:'AGIC (App Gateway Ingress Controller) provisions Azure Application Gateway. Supports WAF (Azure WAF), SSL offload, URL routing, and cookie-based affinity. Managed identity integration for cert management.', tip:'Use annotations: kubernetes.io/ingress.class: azure/application-gateway. Enable WAF via ApplicationGatewayFirewallMode annotation.' },
    { name:'NGINX Ingress Controller', cloud:'multi', summary:'Most widely used K8s ingress. Runs as a Deployment with a Service of type LoadBalancer. Full L7 routing: host, path, regex. Rate limiting, auth snippets, custom headers. Works on all K8s distributions.', tip:'Use cert-manager for automatic TLS (LetsEncrypt). Tune worker processes and worker connections for high throughput. Use HPA for ingress replicas.' },
    { name:'Istio / Gateway API', cloud:'multi', summary:'Istio provides advanced traffic management via VirtualService and DestinationRule CRDs. Gateway API (K8s standard, replacing Ingress): HTTPRoute, TCPRoute, GRPCRoute for service routing. Supported by Istio, Cilium, Envoy Gateway, GKE, AWS.', tip:'Use HTTPRoute (Gateway API) over Ingress for new deployments — it is the K8s standard going forward. Istio VirtualService enables canary (weight-based), retries, timeouts, fault injection.' },
  ],
  servicemesh: [
    { name:'Istio', cloud:'multi', tag:'Service Mesh', summary:'Most feature-rich service mesh. Sidecar (Envoy) injected per pod intercepts all traffic. mTLS between all services automatically. Observability: distributed tracing, metrics, access logs. Traffic management: canary, circuit breaker, retries, timeouts, fault injection. Istio Ambient (2024): sidecar-less mode via ztunnel.', pros:['Automatic mTLS (zero-trust)','Rich traffic management','Telemetry for all services','Ambient: no sidecar overhead'], cons:['Resource overhead (Envoy sidecars)','Operational complexity','Steep learning curve'], tip:'Use Ambient mode (ztunnel) on clusters where sidecar CPU/mem overhead is a concern. Use PeerAuthentication: STRICT to enforce mTLS everywhere.' },
    { name:'Anthos Service Mesh (ASM)', cloud:'gcp', tag:'GKE Managed Istio', summary:'Google-managed Istio for GKE clusters. Control plane managed by Google. Integrates with Cloud Monitoring/Trace/Logging. Works across GKE Enterprise fleet (multi-cluster service mesh). Supports Ambient mode.', pros:['No Istio control plane to manage','Deep GCP observability integration','Multi-cluster across Anthos fleet'], cons:['GCP only','Follows GKE-supported Istio versions'], tip:"Use ASM over self-managed Istio on GKE. Enable with: 'gcloud container fleet mesh enable'. Auto-upgrades with cluster." },
    { name:'Linkerd', cloud:'multi', tag:'Lightweight Service Mesh', summary:'Ultra-lightweight Rust-based service proxy (microproxy). Much lower resource overhead than Istio. Automatic mTLS, L7 observability, retries, timeouts. Simpler than Istio but less feature-rich (no fault injection, limited traffic routing).', pros:['Very low latency and resource overhead','Simple to operate','Automatic mTLS','Good observability (golden metrics)'], cons:['Less feature-rich than Istio','No Ambient equivalent','Smaller ecosystem'], tip:'Choose Linkerd when: you need mTLS + observability with minimum overhead. Choose Istio when: you need advanced traffic management (canary, fault injection).' },
    { name:'Cilium Service Mesh', cloud:'multi', tag:'Sidecarless Mesh', summary:'Cilium Service Mesh uses eBPF (no sidecars, no proxy). mTLS via SPIFFE/SPIRE integration. L7 visibility via Hubble. HTTP/gRPC aware network policies. No proxy means zero extra CPU/mem per pod. Lowest overhead option.', pros:['Zero sidecar overhead (eBPF)','Already part of CNI (no extra install)','L7 policies + observability'], cons:['Less mature than Istio','Fewer traffic management features'], tip:'Use Cilium as your CNI AND service mesh for the lowest overhead K8s networking stack. No extra DaemonSets or sidecars.' },
  ],
  networkpolicy: {
    summary:'Kubernetes NetworkPolicy is namespace-scoped, enforced by the CNI plugin. Default: all traffic allowed (no NetworkPolicy = allow all). Best practice: deny all by default, then explicitly allow.',
    defaultDenyExample:`apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: production
spec:
  podSelector: {}        # matches ALL pods in namespace
  policyTypes:
  - Ingress
  - Egress               # deny all ingress AND egress`,
    allowExample:`apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-to-backend
spec:
  podSelector:
    matchLabels:
      app: backend
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - protocol: TCP
      port: 8080`,
    tips:[
      "Default deny-all as baseline: {} podSelector + Ingress+Egress policyTypes.",
      "NetworkPolicy is additive: multiple policies on same pod = union of all allowed traffic.",
      "egress: allow kube-dns (UDP/TCP 53) even in deny-all, or DNS resolution breaks.",
      "Use Calico GlobalNetworkPolicy or Cilium ClusterwidePolicies for cluster-wide rules.",
      "Istio PeerAuthentication + AuthorizationPolicy provides L7 policy beyond NetworkPolicy's L4.",
    ],
  },
}

// ─── AUTH & AUTHZ ─────────────────────────────────────────────────────────────
export const AUTH = {
  workloadIdentity: [
    {
      id:'irsa', name:'IRSA (EKS)', full:'IAM Roles for Service Accounts',
      cloud:'aws',
      summary:'Links a Kubernetes ServiceAccount to an AWS IAM Role via OIDC federation. The EKS cluster acts as an OIDC identity provider. Pods assume IAM roles without static credentials — the AWS SDK automatically uses the projected ServiceAccount token to call STS AssumeRoleWithWebIdentity.',
      steps:[
        '1. Create IAM OIDC provider for the EKS cluster (once per cluster)',
        '2. Create IAM Role with trust policy: condition sub=system:serviceaccount:<ns>:<sa>',
        '3. Create K8s ServiceAccount with annotation: eks.amazonaws.com/role-arn: <ARN>',
        '4. Pod spec: serviceAccountName: <annotated-sa>',
        '5. AWS SDK auto-discovers credentials via AWS_WEB_IDENTITY_TOKEN_FILE env var',
      ],
      trustPolicy:`{
  "Effect": "Allow",
  "Principal": {
    "Federated": "arn:aws:iam::ACCOUNT:oidc-provider/OIDC_ISSUER"
  },
  "Action": "sts:AssumeRoleWithWebIdentity",
  "Condition": {
    "StringEquals": {
      "OIDC_ISSUER:sub":
        "system:serviceaccount:NAMESPACE:SA_NAME",
      "OIDC_ISSUER:aud": "sts.amazonaws.com"
    }
  }
}`,
      debugTips:[
        'Token validation fails: ensure OIDC thumbprint matches; thumbprint rotates — check IAM Identity Provider.',
        'AccessDenied: verify the IAM trust policy sub condition matches namespace:serviceaccount exactly.',
        'SDK not picking up IRSA: check AWS_WEB_IDENTITY_TOKEN_FILE and AWS_ROLE_ARN env vars are injected.',
        'Use EKS Pod Identity (2023+) as a simpler alternative — no OIDC provider setup required.',
      ],
    },
    {
      id:'gke-wi', name:'Workload Identity (GKE)', full:'GKE Workload Identity',
      cloud:'gcp',
      summary:'Links a K8s ServiceAccount to a GCP Service Account via IAM binding. The GKE cluster acts as an OIDC provider. Pods exchange the K8s SA token for a GCP access token via the GKE metadata server (no static keys). Recommended for all GKE pods accessing GCP APIs.',
      steps:[
        '1. Enable Workload Identity on cluster: --workload-pool=PROJECT.svc.id.goog',
        '2. Create GCP Service Account (GSA)',
        '3. Grant GSA the desired IAM roles',
        '4. Create K8s ServiceAccount (KSA) with annotation: iam.gke.io/gcp-service-account: GSA@PROJECT.iam.gserviceaccount.com',
        '5. Bind KSA to GSA: gcloud iam service-accounts add-iam-policy-binding GSA --member=serviceAccount:PROJECT.svc.id.goog[NAMESPACE/KSA] --role=roles/iam.workloadIdentityUser',
        '6. Pods using KSA auto-receive GCP credentials via metadata server',
      ],
      trustPolicy:`# IAM binding (not a JSON trust policy like AWS)
gcloud iam service-accounts add-iam-policy-binding \\
  GSA@PROJECT.iam.gserviceaccount.com \\
  --member="serviceAccount:PROJECT.svc.id.goog[NS/KSA]" \\
  --role="roles/iam.workloadIdentityUser"

# K8s ServiceAccount annotation
kubectl annotate serviceaccount KSA \\
  iam.gke.io/gcp-service-account=GSA@PROJECT.iam.gserviceaccount.com`,
      debugTips:[
        "PERMISSION_DENIED: check the IAM binding — member must be serviceAccount:PROJECT.svc.id.goog[namespace/ksa]",
        "Metadata server not reachable: verify node pool has --workload-metadata=GKE_METADATA (not EXPOSE to prevent old token).",
        "Use: kubectl exec -- curl http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/ to verify token source.",
        "Permission propagation: IAM changes take up to 60s globally.",
      ],
    },
    {
      id:'aks-wi', name:'Entra Workload Identity (AKS)', full:'Microsoft Entra Workload Identity',
      cloud:'azure',
      summary:'AKS cluster acts as OIDC issuer. K8s ServiceAccount token is exchanged for a Microsoft Entra ID (Azure AD) access token via federated credential. The Azure Identity SDK auto-handles the exchange. No secrets stored in cluster — passwordless access to Azure resources (Key Vault, Storage, CosmosDB, etc.).',
      steps:[
        '1. Create AKS cluster with: --enable-oidc-issuer --enable-workload-identity',
        '2. Get OIDC issuer URL: az aks show --query "oidcIssuerProfile.issuerUrl"',
        '3. Create Azure User-Assigned Managed Identity or App Registration',
        '4. Create Federated Credential on the identity: issuer=AKS_OIDC_URL, subject=system:serviceaccount:NAMESPACE:SA_NAME',
        '5. Create K8s ServiceAccount with annotation: azure.workload.identity/client-id: <CLIENT_ID>',
        '6. Add label: azure.workload.identity/use: "true" to pod spec',
        '7. Azure Identity SDK (DefaultAzureCredential) auto-exchanges token for Entra ID token',
      ],
      trustPolicy:`# Federated credential (Azure CLI)
az identity federated-credential create \\
  --name aks-federated-cred \\
  --identity-name MY_MANAGED_IDENTITY \\
  --resource-group MY_RG \\
  --issuer AKS_OIDC_ISSUER_URL \\
  --subject system:serviceaccount:NAMESPACE:SA_NAME \\
  --audience api://AzureADTokenExchange

# K8s ServiceAccount
apiVersion: v1
kind: ServiceAccount
metadata:
  name: MY_SA
  namespace: MY_NS
  annotations:
    azure.workload.identity/client-id: "CLIENT_ID"`,
      debugTips:[
        'AADSTS70021: verify federated credential subject matches system:serviceaccount:NAMESPACE:SA_NAME exactly.',
        'Pod not getting token: check label azure.workload.identity/use: "true" on pod AND serviceaccount annotation.',
        "Webhook injection not happening: verify azure-workload-identity-webhook pod is running in kube-system.",
        'OIDC issuer URL must match exactly — az aks show query to confirm.',
      ],
    },
  ],
  rbac: {
    summary:'Kubernetes RBAC controls what subjects (users, groups, ServiceAccounts) can do on which K8s resources. Two scope levels: ClusterRole/ClusterRoleBinding (cluster-wide) and Role/RoleBinding (namespace-scoped). Cloud providers map external identities to K8s RBAC subjects.',
    eksMapping:`# EKS: map IAM users/roles to K8s RBAC via aws-auth ConfigMap
# (or newer Access Entries API)
apiVersion: v1
kind: ConfigMap
metadata:
  name: aws-auth
  namespace: kube-system
data:
  mapRoles: |
    - rolearn: arn:aws:iam::ACCOUNT:role/NodeRole
      username: system:node:{{EC2PrivateDNSName}}
      groups: [ system:bootstrappers, system:nodes ]
    - rolearn: arn:aws:iam::ACCOUNT:role/DevTeamRole
      username: dev-user
      groups: [ dev-group ]
  mapUsers: |
    - userarn: arn:aws:iam::ACCOUNT:user/admin
      username: admin
      groups: [ system:masters ]`,
    aksMapping:`# AKS: Entra ID groups map to K8s RBAC via --enable-aad --aad-admin-group-object-ids
# Or use Azure RBAC for K8s authorization:
# --enable-azure-rbac (uses Azure IAM for K8s API auth, not K8s RBAC)
az aks create --enable-aad \\
  --aad-admin-group-object-ids GROUP_OBJECT_ID \\
  --enable-azure-rbac  # optional: replace K8s RBAC with Azure RBAC`,
    gkeMapping:`# GKE: Google identities map to K8s RBAC
# Grant user a K8s role:
kubectl create clusterrolebinding dev-binding \\
  --clusterrole=view \\
  --user=user@company.com

# For GKE Autopilot, Google-managed control plane uses
# Cloud IAM roles (roles/container.developer, etc.) which
# auto-map to K8s RBAC roles`,
    roleExample:`# Example: Read-only access to pods/logs in one namespace
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-reader
  namespace: production
rules:
- apiGroups: [""]
  resources: ["pods", "pods/log", "pods/exec"]
  verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: pod-reader-binding
  namespace: production
subjects:
- kind: User
  name: "alice@company.com"
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io`,
    tips:[
      "Least privilege: prefer Role+RoleBinding over ClusterRole+ClusterRoleBinding.",
      "Audit K8s RBAC with: kubectl auth can-i --list --as=system:serviceaccount:ns:sa",
      "EKS: Access Entries (2024) replaces aws-auth ConfigMap — use AWS console to manage cluster access.",
      "AKS: --enable-azure-rbac replaces K8s RBAC with Azure IAM (use Azure role assignments instead of RoleBindings).",
      "Never use system:masters group in prod — use least-privilege ClusterRoles instead.",
    ],
  },
  opa: {
    summary:'OPA (Open Policy Agent) / Gatekeeper enforces custom admission policies beyond RBAC. Webhook intercepts API server requests and evaluates Rego policies. Constraint Templates define policy schemas; Constraints configure specific rules.',
    example:`# ConstraintTemplate: require labels on all Deployments
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata: { name: requirelabels }
spec:
  crd:
    spec:
      names: { kind: RequireLabels }
      validation:
        openAPIV3Schema:
          properties:
            labels:
              type: array
              items: { type: string }
  targets:
  - target: admission.k8s.gatekeeper.sh
    rego: |
      package requirelabels
      violation[{"msg": msg}] {
        provided := { label | input.review.object.metadata.labels[label] }
        required := { label | label := input.parameters.labels[_] }
        missing := required - provided
        count(missing) > 0
        msg := sprintf("Missing labels: %v", [missing])
      }
---
# Constraint: enforce owner + team labels on Deployments
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: RequireLabels
metadata: { name: deployment-must-have-labels }
spec:
  match:
    kinds: [{ apiGroups: ["apps"], kinds: ["Deployment"] }]
  parameters:
    labels: ["owner", "team", "environment"]`,
    cloudNative:[
      'AKS: Azure Policy for K8s (built-in OPA/Gatekeeper), Policy definitions assignable at subscription/RG level.',
      'GKE: Policy Controller (Anthos/GKE Enterprise) — managed OPA Gatekeeper.',
      'EKS: Kyverno (alternative to Gatekeeper) popular in AWS ecosystem; also OPA/Gatekeeper supported.',
    ],
  },
}

// ─── MICROSERVICES DEBUGGING ──────────────────────────────────────────────────
export const DEBUG = {
  flowPaths: [
    {
      name:'Request Flow Through K8s',
      steps:[
        { label:'Client', desc:'External request hits DNS (e.g. api.example.com)' },
        { label:'Ingress / LB', desc:'Cloud LB (ALB/CLB/GCLB) → Ingress Controller pod → routes by host/path rules' },
        { label:'Service', desc:'ClusterIP Service: kube-proxy (iptables/IPVS) or eBPF (Cilium) selects pod via label selector. Round-robin by default.' },
        { label:'Pod/Container', desc:'Request reaches container port. App processes request. May call other services (Service → Pod chain continues).' },
        { label:'Egress', desc:'Outbound: through NetworkPolicy → CNI → cloud NAT/Internet Gateway. Service mesh mTLS wraps egress.' },
      ],
    },
    {
      name:'DNS Resolution Flow',
      steps:[
        { label:'Pod', desc:'app tries to connect to http://backend-svc:8080' },
        { label:'CoreDNS', desc:'Pod resolves backend-svc → CoreDNS answers with ClusterIP (e.g. 10.96.5.42). FQDN: backend-svc.namespace.svc.cluster.local' },
        { label:'iptables/eBPF', desc:'kube-proxy iptables rules (or Cilium eBPF) intercept ClusterIP and DNAT to a pod IP from Endpoints/EndpointSlices' },
        { label:'Target Pod', desc:'Packet arrives at selected pod IP. Return traffic rewritten back via conntrack.' },
      ],
    },
    {
      name:'Service Mesh (Istio) Traffic Flow',
      steps:[
        { label:'Client Pod', desc:'App calls http://backend:8080. No TLS in app code.' },
        { label:'Envoy Sidecar (outbound)', desc:'Envoy intercepts outbound traffic (iptables redirect). Checks DestinationRule for traffic policy. Applies retries/timeouts/circuit-breaker.' },
        { label:'mTLS Tunnel', desc:'Envoy wraps traffic in mTLS using SPIFFE x.509 cert. Peer authentication verified.' },
        { label:'Envoy Sidecar (inbound)', desc:'Target pod Envoy decrypts mTLS. Checks AuthorizationPolicy (allow/deny based on source identity). Forwards to app container.' },
        { label:'Telemetry', desc:'Both Envoys emit spans to tracing backend (Jaeger/Zipkin/Cloud Trace) and metrics to Prometheus.' },
      ],
    },
  ],
  kubectl: [
    { category:'Pod Diagnostics', commands:[
      { cmd:'kubectl describe pod <pod> -n <ns>', desc:'Full pod status, events, conditions. First stop for any issue.' },
      { cmd:'kubectl logs <pod> -n <ns> --previous', desc:'Logs from the previous (crashed) container instance.' },
      { cmd:'kubectl logs <pod> -n <ns> -c <container> -f', desc:'Follow logs from a specific container in a multi-container pod.' },
      { cmd:'kubectl exec -it <pod> -- /bin/sh', desc:'Shell into a running container. Use busybox or debug sidecar if no shell.' },
      { cmd:'kubectl debug <pod> -it --image=busybox --copy-to=debug-pod', desc:'Ephemeral debug container — attach without modifying original pod. K8s 1.23+.' },
      { cmd:'kubectl get pod <pod> -o jsonpath="{.status.conditions}"', desc:'Get pod condition details (PodScheduled, Initialized, ContainersReady, Ready).' },
    ]},
    { category:'Node & Cluster Health', commands:[
      { cmd:'kubectl get nodes -o wide', desc:'All nodes with IP, OS, K8s version, runtime.' },
      { cmd:'kubectl describe node <node>', desc:'Node conditions, allocated resources, events. Look for MemoryPressure / DiskPressure.' },
      { cmd:'kubectl top pods -n <ns> --sort-by=cpu', desc:'Live CPU/memory usage per pod (requires metrics-server).' },
      { cmd:'kubectl top nodes', desc:'Live CPU/memory usage per node.' },
      { cmd:'kubectl get events -n <ns> --sort-by=.lastTimestamp', desc:'Recent events in namespace — shows OOMKilled, Failed scheduling, ImagePullBackOff reasons.' },
      { cmd:'kubectl drain <node> --ignore-daemonsets --delete-emptydir-data', desc:'Safely evict all pods before node maintenance.' },
    ]},
    { category:'Networking Debug', commands:[
      { cmd:'kubectl run debug --image=nicolaka/netshoot --rm -it --restart=Never', desc:'Powerful network debug pod with dig, curl, tcpdump, nmap, nslookup, mtr.' },
      { cmd:'kubectl exec debug -- curl -v http://backend-svc:8080/health', desc:'Test service-to-service connectivity from inside cluster.' },
      { cmd:'kubectl exec debug -- nslookup backend-svc.namespace.svc.cluster.local', desc:'Verify DNS resolution for a service.' },
      { cmd:'kubectl get endpoints <svc> -n <ns>', desc:'Verify service has pod IPs in endpoints — if empty, label selector mismatch.' },
      { cmd:'kubectl exec debug -- tcpdump -i eth0 port 8080', desc:'Packet capture on a pod interface (requires NET_ADMIN capability or debug container).' },
      { cmd:'kubectl get networkpolicies -n <ns>', desc:'List all NetworkPolicies — if pods cannot communicate, check policies first.' },
    ]},
    { category:'RBAC & Auth Debug', commands:[
      { cmd:'kubectl auth can-i get pods --as=system:serviceaccount:ns:sa', desc:'Test if a ServiceAccount can perform an action. Critical for RBAC debugging.' },
      { cmd:'kubectl auth can-i --list --as=USER', desc:'List all permissions a user/SA has.' },
      { cmd:'kubectl get rolebindings,clusterrolebindings -A -o wide | grep <subject>', desc:'Find all RoleBindings that include a specific user/group/SA.' },
      { cmd:'kubectl describe clusterrolebinding <name>', desc:'See exactly which subjects are bound to which role.' },
    ]},
    { category:'Deployment & Rollout', commands:[
      { cmd:'kubectl rollout status deployment/<name> -n <ns>', desc:'Watch rollout progress. Hangs if pods fail to become Ready.' },
      { cmd:'kubectl rollout history deployment/<name>', desc:'View rollout history with revision numbers.' },
      { cmd:'kubectl rollout undo deployment/<name> --to-revision=2', desc:'Roll back to a specific revision.' },
      { cmd:'kubectl set image deployment/<name> app=image:v2', desc:'Trigger rolling update with new image. Combines with rollout status to monitor.' },
      { cmd:'kubectl scale deployment/<name> --replicas=0', desc:'Scale to zero (emergency stop). Scale back up with --replicas=N.' },
    ]},
  ],
  commonIssues: [
    { issue:'CrashLoopBackOff', causes:['App crashing on startup (exit code ≠ 0)','Missing env vars / secrets','Liveness probe misconfigured (kills before app is ready)','OOMKilled (check exit code 137)'], fix:'kubectl logs --previous; kubectl describe pod (check exit code in Last State). For OOM: increase memory limit or optimize app.' },
    { issue:'Pending (Unschedulable)', causes:['Insufficient CPU/memory in node pool','Node taint without matching toleration','NodeAffinity/nodeSelector no match','PVC not bound (StorageClass issue)'], fix:'kubectl describe pod → Events. Check node capacity: kubectl describe node. For taints: add toleration in pod spec.' },
    { issue:'ImagePullBackOff', causes:['Wrong image name/tag','Private registry: missing imagePullSecret','ECR token expired','Repository does not exist'], fix:'Check pod events for error. For ECR: ensure node IAM role has ecr:GetAuthorizationToken. For private: kubectl create secret docker-registry.' },
    { issue:'Service Not Reachable', causes:['Label selector mismatch (check Endpoints)','Wrong targetPort (must match containerPort)','NetworkPolicy blocking','Pod readinessProbe failing (endpoints removed)'], fix:'kubectl get endpoints <svc> — if empty, fix label selector. kubectl describe svc to verify selector. Check NetworkPolicies.' },
    { issue:'OOMKilled', causes:['Memory limit too low','Memory leak in app','JVM heap not tuned for container limits','Large object processing (spike)'], fix:'kubectl describe pod → Last State. Increase memory limit OR add -Xmx (JVM) OR fix memory leak. Monitor with kubectl top pods.' },
    { issue:'High Latency / Timeout', causes:['CPU throttling (limit too low vs request)','Slow downstream service','DNS resolution failures','Service mesh policy (circuit breaker open)'], fix:"Check CPU throttling: container_cpu_cfs_throttled_periods_total metric. Check Envoy circuit breaker state. Trace with Jaeger/Zipkin." },
  ],
  tracing: {
    summary:'Distributed tracing connects the dots across microservices. A trace = collection of spans. Each span = one operation (HTTP call, DB query, message publish). Trace context propagated via HTTP headers (W3C TraceContext: traceparent header).',
    tools:[
      { name:'AWS X-Ray', cloud:'aws', summary:'AWS native tracing. X-Ray SDK auto-instruments AWS SDK calls. X-Ray Daemon runs as sidecar or DaemonSet. Service Map shows call graph. Works with OTel via AWS Distro for OpenTelemetry (ADOT).' },
      { name:'Cloud Trace', cloud:'gcp', summary:'GCP native tracing. Auto-instrumented for GKE when using OTel or Cloud Trace SDK. Integrates with Cloud Monitoring dashboards. Latency distribution per operation. Trace → Log correlation via trace IDs in Cloud Logging.' },
      { name:'Azure Monitor (App Insights)', cloud:'azure', summary:'Application Insights auto-instruments .NET, Java, Node, Python apps. Application Map shows service topology with error rates + latency. Live Metrics for real-time traces. OTel compatible.' },
      { name:'Jaeger / Zipkin', cloud:'multi', summary:'Open-source distributed tracing. Jaeger: sampling strategies (probabilistic, rate-limiting), dependency graph. Zipkin: lightweight. Both accept OTel spans. Jaeger UI shows flame graph per trace.' },
    ],
    headers:`# W3C TraceContext headers (propagated by all OTel SDKs)
traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01
# Format: version-traceId(16B)-spanId(8B)-flags
tracestate: vendor=value  # vendor-specific state

# B3 headers (Zipkin legacy, still used by Istio by default)
X-B3-TraceId: 4bf92f3577b34da6a3ce929d0e0e4736
X-B3-SpanId: 00f067aa0ba902b7
X-B3-Sampled: 1`,
  },
}

// ─── HYBRID / MULTI-CLOUD ─────────────────────────────────────────────────────
export const HYBRID = [
  {
    id:'anthos', name:'GKE Enterprise (Anthos)', provider:'GCP',
    summary:'Fleet management across GKE clusters on GCP, attached EKS/AKS clusters, and on-prem (bare metal, VMware). Control plane stays on GCP. Components: Config Sync (GitOps), Policy Controller (OPA), Anthos Service Mesh (Istio), Multi-cluster Ingress, Binary Authorization.',
    useCases:['Consistent policy across clouds','GitOps for multi-cluster config','Service mesh across hybrid','Single observability pane (Cloud Monitoring + ASM)'],
    pros:['One config management (Config Sync)','Policy enforcement across all clusters','Managed Istio (no ops)','Multi-cluster Ingress (global LB)'],
    cons:['GCP control plane required','Per-vCPU licensing cost','Complex onboarding for non-GKE clusters'],
    examTip:"'Multi-cloud K8s management from GCP' → GKE Enterprise. Config Sync = GitOps across fleet. Policy Controller = OPA Gatekeeper across all clusters.",
  },
  {
    id:'eks-anywhere', name:'EKS Anywhere', provider:'AWS',
    summary:'Run EKS-compatible clusters on your own infrastructure: VMware vSphere, bare metal, Snow, Nutanix, CloudStack. AWS manages the K8s distribution; you run it on-prem. Consistent EKS APIs, curated component versions, and Anywhere add-ons (Emissary, Harbor, MetalLB).',
    useCases:['On-prem K8s with AWS tooling','Edge computing (Snow)','Air-gapped environments','Data sovereignty requirements'],
    pros:['EKS-consistent APIs','AWS curated K8s distro','Connected or disconnected mode','Integration with AWS services via IRSA'],
    cons:['Infrastructure management still on you','Connected mode needs AWS connectivity','Limited to supported environments'],
    examTip:"'Run EKS on-prem or VMware' → EKS Anywhere. For edge/disconnected: Snow device. IRSA works with EKS Anywhere via self-hosted OIDC provider.",
  },
  {
    id:'aks-arc', name:'AKS Arc', provider:'Azure',
    summary:'Azure Arc-enabled Kubernetes: attach any K8s cluster (EKS, GKE, on-prem) to Azure Arc, then project AKS onto Arc infrastructure (HCI, bare metal, VMware). Get Azure services (Azure Monitor, Key Vault, Defender) on any cluster.',
    useCases:['On-prem AKS on HCI/bare metal','Azure services on non-Azure clusters','Windows Server 2022 HCI deployments','Regulated on-prem with Azure management'],
    pros:['Free for Arc-enabled K8s (attach any cluster)','Azure services everywhere','Azure Policy on any cluster','Integrated GitOps (Flux)'],
    cons:['On-prem infra management','Arc agent required on all clusters','Complex networking for Azure service projection'],
    examTip:"'Azure management on non-Azure clusters' or 'on-prem AKS' → AKS Arc / Azure Arc.",
  },
  {
    id:'karpenter', name:'Karpenter (Node Autoscaling)', provider:'CNCF/AWS',
    summary:'Next-generation K8s node autoscaler (created by AWS, now CNCF). Watches for unschedulable pods and provisions exactly the right node type in seconds. Supports consolidation (bin-packing + node removal). Works with EKS (native) and any K8s cluster.',
    useCases:['Dynamic heterogeneous node provisioning','Spot instance management','ML workload burst scaling','Cost optimization via consolidation'],
    pros:['Provisions correct node type for pod requirements','Fast (seconds vs CAS minutes)','Consolidation: removes underutilized nodes','Works with any instance type/family'],
    cons:['EKS native; other cloud support experimental','Different mental model from CAS','NodePool/EC2NodeClass CRDs to learn'],
    examTip:"Karpenter vs Cluster Autoscaler: Karpenter provisions new node types dynamically; CAS scales existing node groups. Karpenter is preferred for EKS.",
  },
  {
    id:'crossplane', name:'Crossplane', provider:'CNCF',
    summary:'K8s-native infrastructure control plane. Define cloud resources (S3, RDS, Azure SQL, GCS) as K8s CRDs and manage them via kubectl. Compositions create complex infrastructure from simple abstractions. Replaces Terraform for K8s-native teams.',
    useCases:['Provision cloud infra via K8s API','Internal developer platform','Multi-cloud resource management','GitOps for infrastructure'],
    pros:['K8s-native (kubectl for infra)','Providers for all major clouds','Compositions for complex multi-resource setups','No state files (uses K8s etcd)'],
    cons:['Learning curve for Compositions','Control plane overhead','Less mature than Terraform for edge cases'],
    examTip:"Crossplane = Terraform inside K8s. Define AWS RDS as a K8s CRD, manage with kubectl/GitOps.",
  },
]

// ─── COMPARISON TABLE DATA ────────────────────────────────────────────────────
export const COMPARE_ROWS = [
  { label:'Control Plane Cost',         eks:'$0.10/hr ($73/mo)',                   gke:'$0.10/hr (1 free zonal/mo)',          aks:'Free (pay SLA opt-in)' },
  { label:'SLA',                        eks:'99.95%',                               gke:'99.95% (99.99% Autopilot)',           aks:'99.95% (w/ AZs)' },
  { label:'Serverless Nodes',           eks:'EKS Fargate (per-pod)',                gke:'GKE Autopilot (per-pod)',             aks:'Azure Container Apps / ACI Virtual Nodes' },
  { label:'Node Autoscaling',           eks:'Cluster Autoscaler + Karpenter',       gke:'Node Auto-Provisioning + CAS',        aks:'Cluster Autoscaler + KEDA' },
  { label:'CNI Default',                eks:'AWS VPC CNI (native IPs)',             gke:'GKE Dataplane V2 (eBPF/Cilium)',      aks:'Azure CNI / Azure CNI Overlay' },
  { label:'Workload Identity',          eks:'IRSA or EKS Pod Identity',             gke:'Workload Identity (GSA binding)',     aks:'Entra Workload ID (OIDC federation)' },
  { label:'Cluster Auth',               eks:'IAM + aws-auth ConfigMap / Access Entries', gke:'Google IAM + K8s RBAC / RBAC-only', aks:'Entra ID (AAD) + K8s RBAC or Azure RBAC' },
  { label:'Policy Enforcement',         eks:'OPA Gatekeeper / Kyverno (3rd-party)', gke:'Policy Controller (managed OPA)',     aks:'Azure Policy for K8s (managed OPA)' },
  { label:'Service Mesh',               eks:'AWS App Mesh (deprecated) / Istio / Linkerd', gke:'Anthos Service Mesh (managed Istio)', aks:'Open Service Mesh / Istio / Linkerd' },
  { label:'Monitoring (native)',        eks:'CloudWatch Container Insights',        gke:'Cloud Monitoring + Managed Prometheus', aks:'Azure Monitor + Managed Prometheus + Grafana' },
  { label:'Logging',                    eks:'CloudWatch Logs (Fluent Bit add-on)',   gke:'Cloud Logging (auto-enabled)',        aks:'Log Analytics Workspace (auto-enabled)' },
  { label:'Image Registry',             eks:'Amazon ECR',                           gke:'Artifact Registry',                   aks:'Azure Container Registry' },
  { label:'CI/CD Integration',          eks:'CodePipeline + CodeBuild / GitHub Actions', gke:'Cloud Build + Cloud Deploy',        aks:'Azure Pipelines / GitHub Actions' },
  { label:'Windows Node Support',       eks:'Yes (Windows 2019/2022)',              gke:'Yes (limited)',                       aks:'Best-in-class (Windows Server 2019/2022)' },
  { label:'K8s Version Lag',            eks:'4–8 weeks after upstream',            gke:'~2 weeks (fastest)',                  aks:'3–6 weeks' },
  { label:'Hybrid / On-prem',           eks:'EKS Anywhere',                        gke:'GKE Enterprise (Anthos)',             aks:'AKS Arc' },
  { label:'GPU / AI Support',           eks:'Inferentia2, Trainium2, A100/H100',   gke:'TPU v5p/v6e, A100/H100 (AI Hypercomputer)', aks:'NDv4 A100, ND H200, Maia 100' },
  { label:'Multi-cluster Management',   eks:'EKS Console / 3rd-party (ArgoCD)',    gke:'GKE Enterprise Fleet',               aks:'Azure Arc / Fleet Manager (preview)' },
  { label:'Cluster Creation Time',      eks:'15–20 min',                           gke:'5–8 min (Autopilot: ~3 min)',         aks:'5–10 min' },
  { label:'Best For',                   eks:'AWS-native teams, maximum control',   gke:'K8s-first teams, AI/ML, Autopilot',  aks:'Azure/Microsoft-heavy shops, compliance, Windows' },
]
