export const QUESTIONS = [
  // ── Data Processing ─────────────────────────────────────────────────────────
  { id:1, cat:'Data Processing', domain:'Designing Solutions',
    q:'A team has existing PySpark jobs processing 50TB/day on-premises. They need to migrate to GCP with minimal code changes. Which service?',
    opts:['Cloud Dataflow','Cloud Dataproc','BigQuery','Cloud Data Fusion'],
    ans:1, exp:'Dataproc runs existing Spark/Hadoop workloads unchanged. Dataflow requires rewriting to Apache Beam. BigQuery is SQL analytics. Data Fusion is no-code.' },

  { id:2, cat:'Data Processing', domain:'Designing Solutions',
    q:'A streaming pipeline needs exactly-once semantics writing IoT events from Pub/Sub to BigQuery. Which service provides this natively?',
    opts:['Dataproc Spark Streaming','Cloud Dataflow','BigQuery Streaming API directly','Cloud Composer'],
    ans:1, exp:'Cloud Dataflow (Apache Beam) provides exactly-once streaming semantics. Dataproc Spark Streaming is at-least-once. BigQuery Streaming API has no deduplication built in.' },

  { id:3, cat:'Data Processing', domain:'Analyzing Processes',
    q:'A data analyst without coding skills needs to clean and deduplicate a 5TB CSV before loading to BigQuery. Which tool best fits?',
    opts:['Cloud Dataflow','Cloud Dataproc','Cloud Dataprep','BigQuery DML'],
    ans:2, exp:'Dataprep provides a visual no-code interface for wrangling data. Dataflow and Dataproc require code. BigQuery DML works on already-loaded structured data.' },

  { id:4, cat:'Data Processing', domain:'Designing Solutions',
    q:'A company needs to replicate MySQL changes from on-prem to BigQuery in near real-time for operational analytics. Which service handles CDC?',
    opts:['Cloud Dataflow','Cloud Datastream','Cloud Data Fusion','Database Migration Service'],
    ans:1, exp:'Datastream is the purpose-built CDC service for streaming DB changes to BigQuery. DMS handles one-time migration. Data Fusion handles batch integration.' },

  { id:5, cat:'Data Processing', domain:'Managing Implementation',
    q:'Which orchestration tool is BEST for a complex pipeline with dependencies between Dataflow, Dataproc, and BigQuery jobs on a schedule?',
    opts:['Cloud Scheduler','Cloud Composer','Vertex AI Pipelines','Eventarc'],
    ans:1, exp:'Cloud Composer (managed Airflow) handles complex dependency-driven orchestration. Cloud Scheduler is for simple triggers. Vertex AI Pipelines is ML-specific.' },

  { id:6, cat:'Data Processing', domain:'Designing Solutions',
    q:'A data engineer wants to build versioned, tested SQL transformation pipelines in BigQuery with Git integration. Which tool?',
    opts:['Cloud Dataflow','Cloud Composer','Dataform','Dataproc SQL'],
    ans:2, exp:'Dataform is GCP\'s managed dbt-equivalent: versioned SQLX models, dependency resolution, data quality assertions, Git integration, all native to BigQuery.' },

  { id:7, cat:'Data Processing', domain:'Designing Solutions',
    q:'An enterprise needs to integrate Salesforce data into BigQuery without writing code, using a visual drag-and-drop interface. Best choice?',
    opts:['Cloud Dataflow with Beam connectors','Cloud Data Fusion','Dataform','Datastream'],
    ans:1, exp:'Data Fusion has a pre-built Salesforce connector and a visual no-code interface. Dataflow requires writing Beam pipeline code. Datastream is for database CDC.' },

  // ── Analytics & Warehousing ──────────────────────────────────────────────────
  { id:8, cat:'Analytics & Warehousing', domain:'Designing Solutions',
    q:'A startup needs analytics on 10TB of JSON logs without any infrastructure management. Analysts use SQL ad-hoc. Best choice?',
    opts:['BigQuery','Bigtable','Cloud Spanner','Dataproc with Spark SQL'],
    ans:0, exp:'BigQuery is serverless, handles semi-structured JSON natively, and uses SQL with zero infrastructure management. Others require ops or don\'t support SQL analytics.' },

  { id:9, cat:'Analytics & Warehousing', domain:'Designing Solutions',
    q:'A BI dashboard served by BigQuery has 500 concurrent users with 8-second average query times. How do you achieve sub-second responses?',
    opts:['Add more BigQuery slots','Enable BigQuery BI Engine','Move data to Bigtable','Use Dataproc for dashboard serving'],
    ans:1, exp:'BigQuery BI Engine is an in-memory acceleration layer for BI tools that delivers sub-second query responses for repeated dashboard queries.' },

  { id:10, cat:'Analytics & Warehousing', domain:'Designing Solutions',
    q:'Analysts use Python pandas but datasets are now 50TB in BigQuery. How can they keep their pandas workflow at scale?',
    opts:['Dataproc with PySpark','BigQuery DataFrames','Vertex AI Workbench with standard Pandas','Dataflow with Beam DataFrames'],
    ans:1, exp:'BigQuery DataFrames provides a pandas-compatible API that executes at BigQuery scale without pulling data to the client.' },

  { id:11, cat:'Analytics & Warehousing', domain:'Designing Solutions',
    q:'A company has data in AWS S3 and wants to query it using BigQuery SQL without moving data to GCP. Which feature?',
    opts:['BigLake on S3','BigQuery Omni','Storage Transfer Service + BigQuery','Dataflow from S3 to BigQuery'],
    ans:1, exp:'BigQuery Omni allows running BigQuery SQL on data in AWS S3 or Azure Blob without egressing data to GCP.' },

  { id:12, cat:'Analytics & Warehousing', domain:'Designing Solutions',
    q:'Multiple teams use Spark, Presto, and BigQuery to query the same Parquet files in GCS. Each team must see only their authorized rows/columns. Best solution?',
    opts:['Separate GCS buckets per team','BigLake with row/column-level security','Separate IAM per query engine','Dataplex policies alone'],
    ans:1, exp:'BigLake extends BigQuery\'s row/column-level security to GCS data, consistently enforced across all query engines without data duplication.' },

  // ── Compute ──────────────────────────────────────────────────────────────────
  { id:13, cat:'Compute', domain:'Managing Provisioning',
    q:'A batch ML training job runs for 2–4 hours and checkpoints every 10 minutes (fault-tolerant). How do you minimize cost?',
    opts:['Standard Compute Engine VMs','Spot VMs','Committed Use Discounts (3-year)','Cloud Run Jobs'],
    ans:1, exp:'Spot VMs offer up to 91% discount for fault-tolerant, interruptible workloads. Checkpoints every 10 min means minimal work lost on preemption.' },

  { id:14, cat:'Compute', domain:'Designing Solutions',
    q:'A stateless REST API in a container must handle 0 requests at night and spike to 10,000 RPS during business hours, with minimum operational overhead. Best choice?',
    opts:['Compute Engine MIG with autoscaling','GKE Autopilot','Cloud Run','App Engine Flex'],
    ans:2, exp:'Cloud Run scales to zero, handles spikes automatically, and requires zero infrastructure management. GKE Autopilot still requires cluster-level planning.' },

  { id:15, cat:'Compute', domain:'Designing Solutions',
    q:'A legacy Java app requires a specific OS kernel parameter, custom hardware drivers, and access to an HSM via a physical PCI card. Which compute option?',
    opts:['GKE Standard','Cloud Run','Compute Engine (bare metal)','App Engine Standard'],
    ans:2, exp:'Compute Engine is the only option providing full OS control, custom kernel parameters, and hardware-level access. All others abstract the OS layer.' },

  { id:16, cat:'Compute', domain:'Designing Solutions',
    q:'Which statement about GKE Standard vs GKE Autopilot is CORRECT?',
    opts:['Autopilot is cheaper for all workloads','Standard: manage nodes. Autopilot: Google manages nodes; you pay per pod request','Autopilot supports custom node images','Standard automatically scales pods with no configuration'],
    ans:1, exp:'GKE Standard: you manage node pools. GKE Autopilot: Google manages nodes, handles pod scheduling/bin-packing, you pay per pod resource request. Standard = more control; Autopilot = less ops.' },

  { id:17, cat:'Compute', domain:'Designing Solutions',
    q:'A GKE pod needs to access Cloud Storage. According to GCP best practices, how should it authenticate?',
    opts:['Mount service account JSON key as a Kubernetes Secret','Use Workload Identity to bind K8s SA to GCP SA','Use the node\'s default service account','Use IAP to authenticate the pod'],
    ans:1, exp:'Workload Identity is the GCP-recommended approach: binds Kubernetes ServiceAccounts to GCP service accounts via OIDC, eliminating long-lived key files entirely.' },

  { id:18, cat:'Compute', domain:'Debugging',
    q:'A GKE pod is stuck in CrashLoopBackOff. What is the FIRST command to diagnose the issue?',
    opts:['kubectl get nodes','kubectl logs <pod> --previous','kubectl delete pod <pod>','gcloud container clusters describe'],
    ans:1, exp:'kubectl logs <pod> --previous shows the logs from the last crashed container instance — the most direct way to see why it crashed. kubectl describe pod for events is the second step.' },

  { id:19, cat:'Compute', domain:'Debugging',
    q:'A GKE pod is stuck in Pending state. What is the most likely cause?',
    opts:['Image pull failure (use ImagePullBackOff for that)','Insufficient CPU/memory in node pool or missing toleration for a node taint','Network policy blocking scheduling','Service account missing permissions'],
    ans:1, exp:'Pending usually means the scheduler cannot place the pod: insufficient resources in node pool, a node taint without matching toleration, or a node selector not matching any node. Check kubectl describe pod events.' },

  // ── Networking ───────────────────────────────────────────────────────────────
  { id:20, cat:'Networking', domain:'Managing Provisioning',
    q:'A company has 20 projects and wants a dedicated network team to centrally manage VPCs while app teams create resources in their own projects. Best approach?',
    opts:['One VPC per project with VPC Peering','Shared VPC with a host project','Network Connectivity Center only','VPN between each project pair'],
    ans:1, exp:'Shared VPC: host project owns the VPC; service projects deploy resources into it. Network team manages host; app teams work in service projects. Non-transitive Peering doesn\'t scale to 20 projects.' },

  { id:21, cat:'Networking', domain:'Designing Solutions',
    q:'An on-prem trading system needs consistent 10Gbps bandwidth to GCP with sub-millisecond latency. Which connectivity option?',
    opts:['HA Cloud VPN','Partner Interconnect','Dedicated Interconnect','Cloud Router with BGP only'],
    ans:2, exp:'Dedicated Interconnect provides physical 10/100Gbps links with consistent sub-ms latency. VPN traverses the public internet with variable latency. Partner Interconnect uses a carrier and shares bandwidth.' },

  { id:22, cat:'Networking', domain:'Designing Solutions',
    q:'A Cloud Run service needs to access a Cloud SQL instance on a private IP. What is the recommended modern approach (2024+)?',
    opts:['Serverless VPC Access Connector','Direct VPC Egress','VPN tunnel to Cloud SQL','Public IP with SSL'],
    ans:1, exp:'Direct VPC Egress (GA 2024) connects Cloud Run directly to VPC resources without a Serverless VPC Access Connector, reducing latency, cost, and configuration complexity.' },

  { id:23, cat:'Networking', domain:'Designing Solutions',
    q:'A global e-commerce app needs a single anycast IP, multi-region traffic distribution, and WAF protection. Which combination?',
    opts:['Regional TCP LB + Cloud Armor','Global External HTTP(S) LB + Cloud Armor','Internal HTTP(S) LB + Cloud Armor','Cloud CDN alone'],
    ans:1, exp:'Global External HTTP(S) LB provides anycast IP and multi-region distribution. Cloud Armor provides WAF/DDoS protection. Internal LB is private only; CDN alone has no LB capability.' },

  { id:24, cat:'Networking', domain:'Designing Security',
    q:'A GKE health check is failing and preventing pods from receiving traffic. What firewall rule is most likely missing?',
    opts:['Allow 0.0.0.0/0 on port 80','Allow 130.211.0.0/22 and 35.191.0.0/16 on the health check port','Allow the pod CIDR on all ports','Allow Cloud Armor source IPs'],
    ans:1, exp:'GCP load balancer health checks originate from 130.211.0.0/22 and 35.191.0.0/16. If a firewall rule does not allow these ranges on the health check port, backends appear unhealthy.' },

  // ── Security ─────────────────────────────────────────────────────────────────
  { id:25, cat:'Security', domain:'Designing Security',
    q:'A company needs all encryption keys to meet FIPS 140-2 Level 3. Which Cloud KMS protection level?',
    opts:['SOFTWARE (default)','Customer-Supplied Encryption Keys (CSEK)','Cloud HSM mode','External Key Manager (EKM)'],
    ans:2, exp:'Cloud HSM (Hardware Security Module) mode uses FIPS 140-2 Level 3 validated hardware. SOFTWARE is default. CSEK lets you supply your own key material. EKM stores keys outside GCP entirely.' },

  { id:26, cat:'Security', domain:'Designing Security',
    q:'Developers need SSH access to Compute Engine instances without public IPs or VPN. Access must be audited per user. Best approach?',
    opts:['Bastion host with public IP','IAP TCP tunneling for SSH','OS Login with public IP','Cloud VPN for developer access'],
    ans:1, exp:'IAP TCP tunneling allows SSH/RDP to instances without public IPs, authenticates via Google identity, and logs all access per user. No VPN or bastion host needed.' },

  { id:27, cat:'Security', domain:'Designing Security',
    q:'An organization wants to prevent ANY project owner from disabling Cloud Audit Logs. What mechanism enforces this org-wide?',
    opts:['Project-level IAM deny policy','Organization Policy Service constraint','VPC Service Controls','Security Command Center'],
    ans:1, exp:'Organization Policy Service can enforce constraints (like requiring audit logs) across all projects, overriding even project Owner-level IAM. It operates above the IAM layer.' },

  { id:28, cat:'Security', domain:'Designing Security',
    q:'A contractor needs temporary BigQuery read access for 2 weeks with automatic expiry. Best approach?',
    opts:['Add to BigQuery Data Viewer and remove manually','Conditional IAM with date/time-based expiry condition','Separate project for contractor','VPC Service Controls ingress rule'],
    ans:1, exp:'Conditional IAM supports time-based conditions (request.time before a specific date), automatically expiring access without any manual cleanup.' },

  { id:29, cat:'Security', domain:'Designing Security',
    q:'A GCS bucket must only be accessible from within the corporate VPC, even if IAM credentials are compromised. Best solution?',
    opts:['Set bucket ACLs to private','Enable VPC Service Controls perimeter','Use Private Service Connect only','Enable uniform bucket-level access'],
    ans:1, exp:'VPC Service Controls creates a perimeter preventing data access from outside the defined boundary, even with valid IAM credentials — directly addressing credential compromise.' },

  { id:30, cat:'Security', domain:'Designing Security',
    q:'An external CI/CD system (GitHub Actions) needs to deploy to Cloud Run without storing GCP service account keys. What should you use?',
    opts:['Store SA JSON key in GitHub Secrets','Workload Identity Federation with GitHub OIDC','Create a new SA per workflow run','Use IAP for GitHub Actions auth'],
    ans:1, exp:'Workload Identity Federation allows external OIDC identity providers (GitHub, GitLab, etc.) to impersonate GCP service accounts without key files, eliminating long-lived credential risk.' },

  { id:31, cat:'Security', domain:'Designing Security',
    q:'A Gemini-powered chatbot processes employee queries. You need to prevent the model from leaking PII in its responses. Which security control?',
    opts:['VPC Service Controls around Vertex AI','Model Armor + Sensitive Data Protection','IAM binding on Vertex AI endpoint','Cloud Armor WAF on the chatbot API'],
    ans:1, exp:'Model Armor with Sensitive Data Protection detects and redacts PII in LLM prompts and responses at the AI interaction layer — specifically addressing AI-layer data leakage.' },

  // ── AI & ML ──────────────────────────────────────────────────────────────────
  { id:32, cat:'AI & ML', domain:'Designing Solutions',
    q:'A retail company wants to build a product recommendation model using 3-year BigQuery purchase history without writing custom ML code. Fastest path?',
    opts:['Export to CSV and train on Vertex AI custom training','BigQuery ML directly on existing data','AutoML Tables on exported data','Dataproc with MLlib'],
    ans:1, exp:'BigQuery ML trains models with SQL on data already in BigQuery — no export, no infra. Fastest path for analysts with SQL skills on tabular data.' },

  { id:33, cat:'AI & ML', domain:'Designing Solutions',
    q:'A company wants to deploy Llama 3 70B for internal Q&A with RAG over proprietary documents with minimal infrastructure management.',
    opts:['Deploy Llama 3 on Compute Engine VMs','Vertex AI Model Garden + Agent Builder','Train Gemini on proprietary data','Cloud Run with custom ONNX model'],
    ans:1, exp:'Model Garden provides Llama 3 as a managed endpoint; Agent Builder handles the RAG pipeline over proprietary documents. Minimal infrastructure.' },

  { id:34, cat:'AI & ML', domain:'Designing Solutions',
    q:'An ML team needs to automatically retrain a fraud model weekly with new BigQuery data, evaluate on holdout, and deploy only if accuracy improves. Best solution?',
    opts:['Cloud Composer DAG with manual deploy','Vertex AI Pipelines with evaluation + conditional deploy','Cloud Scheduler + Dataflow + Vertex AI manually','Cloud Build CI/CD pipeline'],
    ans:1, exp:'Vertex AI Pipelines is purpose-built for ML lifecycle orchestration: data prep → training → evaluation → conditional deployment, all versioned and auditable.' },

  { id:35, cat:'AI & ML', domain:'Designing Solutions',
    q:'Which GCP service is specifically designed for training very large foundation models using TPU v5p clusters at scale?',
    opts:['GKE with A100 node pools','AI Hypercomputer / Cloud TPU via Vertex AI','Dataproc Serverless with GPU','Vertex AI AutoML'],
    ans:1, exp:'AI Hypercomputer integrates TPU v5p/v6e and H100 GPUs with ICI high-bandwidth interconnect — purpose-built for training large-scale AI/foundation models.' },

  { id:36, cat:'AI & ML', domain:'Designing Solutions',
    q:'A PostgreSQL application needs to add semantic vector search over 10M product embeddings alongside existing OLTP queries. Best GCP database?',
    opts:['Cloud Spanner','Cloud SQL PostgreSQL','AlloyDB with pgvector (AlloyDB AI)','Firestore'],
    ans:2, exp:'AlloyDB AI includes built-in pgvector support and ML inference inside SQL, enabling vector similarity search alongside OLTP in the same database. Spanner and Cloud SQL Postgres can also run pgvector but AlloyDB has native optimization.' },

  // ── Storage ──────────────────────────────────────────────────────────────────
  { id:37, cat:'Storage', domain:'Designing Solutions',
    q:'Compliance records must be retained for 7 years and accessed at most once per year. Cost optimization is the priority. Which GCS storage class?',
    opts:['Standard','Nearline','Coldline','Archive'],
    ans:3, exp:'Archive is the cheapest class, designed for data accessed less than once per year, with a 365-day minimum storage commitment. Matches the once-per-year, 7-year retention pattern.' },

  { id:38, cat:'Storage', domain:'Designing Solutions',
    q:'A genomics research team needs a shared POSIX filesystem that multiple Compute Engine VMs can mount simultaneously via NFS. Which service?',
    opts:['Cloud Storage with FUSE','Filestore','Persistent Disk ReadWriteMany','Hyperdisk'],
    ans:1, exp:'Filestore is GCP\'s managed NFS service with POSIX semantics accessible simultaneously by multiple VMs. GCSFUSE doesn\'t provide true POSIX semantics. PD ReadWriteMany is limited and not NFS.' },

  { id:39, cat:'Storage', domain:'Designing Solutions',
    q:'A global financial transaction system requires strong consistency, 5-nines availability, horizontal scalability, and ANSI SQL across 3+ regions. Which database?',
    opts:['Cloud SQL PostgreSQL with cross-region read replicas','Cloud Spanner (multi-region)','AlloyDB','Firestore'],
    ans:1, exp:'Cloud Spanner multi-region: 99.999% SLA, globally distributed strong consistency (TrueTime), ANSI SQL, horizontal scaling. Cloud SQL is 99.95% and regional only.' },

  { id:40, cat:'Storage', domain:'Designing Solutions',
    q:'An application needs sub-millisecond response for 100,000 session reads/sec. Which service?',
    opts:['Firestore','Cloud Bigtable','Memorystore (Redis)','Cloud SQL read replica'],
    ans:2, exp:'Memorystore for Redis provides sub-millisecond latency, 100k+ ops/sec, and is purpose-built for in-memory caching. Firestore/Bigtable have single-digit ms latency. Cloud SQL is disk-based.' },

  { id:41, cat:'Storage', domain:'Designing Solutions',
    q:'A high-performance PostgreSQL application has mixed OLTP and analytical query workloads and needs 4x faster OLTP and faster analytical queries than standard Cloud SQL Postgres. Best choice?',
    opts:['Cloud SQL PostgreSQL Enterprise Plus','AlloyDB','Cloud Spanner','BigQuery + Cloud SQL federated query'],
    ans:1, exp:'AlloyDB provides 4x faster OLTP and 100x faster analytical queries vs standard PostgreSQL via its columnar engine — specifically designed for HTAP Postgres workloads.' },

  // ── Operations & Reliability ─────────────────────────────────────────────────
  { id:42, cat:'Operations & Reliability', domain:'Ensuring Reliability',
    q:'A production Cloud Run service is experiencing high error rates. You need automatic rollback and on-call notification. Best approach?',
    opts:['Manual monitoring and rollback procedure','Cloud Deploy with Cloud Monitoring verification + rollback + Alerting policy','Cloud Build retry logic','Pub/Sub dead letter topic'],
    ans:1, exp:'Cloud Deploy supports deploy verification via Cloud Monitoring metrics; if verification fails, it automatically rolls back. An Alerting policy notifies the on-call team.' },

  { id:43, cat:'Operations & Reliability', domain:'Ensuring Reliability',
    q:'The SRE team needs to query 6 months of application logs using SQL. Default Cloud Logging retention is 30 days. What should they configure?',
    opts:['Increase Cloud Logging retention to 6 months','Route logs to BigQuery via log sink and use Log Analytics','Use Cloud Monitoring metrics history','Export to GCS and query with Athena'],
    ans:1, exp:'A log sink to BigQuery enables Log Analytics — SQL queries on logs beyond Cloud Logging\'s 30-day default. BigQuery retains as long as configured.' },

  { id:44, cat:'Operations & Reliability', domain:'Ensuring Reliability',
    q:'According to the Google Cloud Well-Architected Framework, chaos engineering directly addresses which pillar?',
    opts:['Performance efficiency','Cost optimization','Reliability','Security'],
    ans:2, exp:'Chaos engineering (intentionally introducing failures) validates a system\'s ability to recover — directly addressing the Reliability pillar by proactively testing resilience.' },

  { id:45, cat:'Operations & Reliability', domain:'Ensuring Reliability',
    q:'An SLO requires 99.9% availability for a global web app. Which architecture best satisfies this?',
    opts:['Single-region Compute Engine with daily backups','Global External HTTP(S) LB + multi-region Cloud Run + Cloud CDN','Regional Cloud Run + Cloud SQL HA','App Engine + Memorystore in one region'],
    ans:1, exp:'Global LB + multi-region Cloud Run provides geographic redundancy and automatic failover. Cloud CDN reduces origin load. This architecture exceeds 99.9% through redundancy.' },

  { id:46, cat:'Operations & Reliability', domain:'Managing Implementation',
    q:'A team wants blue-green deployment for a Cloud Run service with traffic shifting and automatic rollback. Which tool provides this natively?',
    opts:['Cloud Build with custom scripts','Cloud Deploy with blue-green strategy','GKE rolling update','Terraform traffic split resource'],
    ans:1, exp:'Cloud Deploy natively supports canary and blue-green deployment strategies to Cloud Run, including traffic percentage control, metric verification, and automatic rollback.' },

  // ── Hybrid & Migration ───────────────────────────────────────────────────────
  { id:47, cat:'Hybrid & Migration', domain:'Designing Solutions',
    q:'A company is migrating 500 VMs from VMware and wants to maintain existing VMware tooling (vSphere, NSX-T, vSAN) during migration. Which service?',
    opts:['Migrate to Virtual Machines (M2VM)','Google Cloud VMware Engine (GCVE)','GKE Enterprise','Compute Engine Lift-and-Shift'],
    ans:1, exp:'GCVE runs VMware natively on GCP\'s infrastructure, letting organizations keep VMware tools unchanged. M2VM is for converting VMs to GCE; it doesn\'t preserve VMware tooling.' },

  { id:48, cat:'Hybrid & Migration', domain:'Designing Solutions',
    q:'Before migrating 1,200 on-prem servers, a company needs compatibility assessment, cost estimation, and migration planning. Which GCP tool?',
    opts:['Cloud Pricing Calculator','Migrate to Virtual Machines assessment','Migration Center','Cloud Asset Inventory'],
    ans:2, exp:'Migration Center (released 2022) is purpose-built for discovering, assessing, and planning migrations — including cost estimation for on-prem environments. The Pricing Calculator requires manual input.' },

  { id:49, cat:'Hybrid & Migration', domain:'Designing Solutions',
    q:'An organization runs clusters on GCP and AWS. They want a single control plane with consistent policy, service mesh, and fleet management across both. Which service?',
    opts:['GKE Autopilot deployed on both clouds','GKE Enterprise (Anthos)','Cloud Run multi-region','Network Connectivity Center'],
    ans:1, exp:'GKE Enterprise (formerly Anthos) enables managing GKE clusters on GCP and other clouds/on-prem with a unified fleet control plane, consistent policies, and Anthos Service Mesh.' },

  { id:50, cat:'Hybrid & Migration', domain:'Designing Solutions',
    q:'A company has an AlloyDB database on GCP and needs to add AI-powered vector similarity search to their existing PostgreSQL application without changing their database engine. Best approach?',
    opts:['Export data to Vertex AI Feature Store','Enable AlloyDB AI with pgvector extension','Migrate to Firestore for vector support','Use a separate Cloud SQL instance with pgvector'],
    ans:1, exp:'AlloyDB AI provides built-in pgvector support plus optimized ML inference inside SQL. Enabling the google_ml_integration extension enables vector search and Vertex AI model calls directly in SQL.' },

  // ── MIGs & Scheduling ────────────────────────────────────────────────────────
  { id:51, cat:'Compute', domain:'Managing Provisioning',
    q:'A MIG is running VM instances on an older instance template. You need to update ALL existing VMs to a new template automatically without manual intervention. Which update type should you use?',
    opts:['Opportunistic update','Proactive update (REPLACE action)','Rolling restart only','Blue-green with a new MIG'],
    ans:1, exp:'Proactive updates (type: PROACTIVE, action: REPLACE or RESTART) automatically apply the new template to all existing VMs according to maxSurge and maxUnavailable settings. Opportunistic only updates VMs when they are naturally replaced or manually triggered.' },

  { id:52, cat:'Compute', domain:'Managing Provisioning',
    q:'A MIG needs to update its instance template but you want to minimize disruption — updates should only apply when VMs are naturally recreated (e.g. autohealing) or when you manually trigger individual VMs. Which update strategy?',
    opts:['Proactive update','Opportunistic update','Canary update to 100%','Rolling update with maxUnavailable=0'],
    ans:1, exp:'Opportunistic update type means the MIG only applies the new template when a VM is naturally replaced (autohealing, scale-out) or when you explicitly call update-instances on a specific VM. No automatic disruption to existing VMs.' },

  { id:53, cat:'Compute', domain:'Managing Provisioning',
    q:'You want to test a new instance template on 10% of a MIG\'s VMs before rolling it out to all instances. Which MIG feature enables this?',
    opts:['Opportunistic update to a subset','Canary update with --target-size=10%','Create a second MIG with new template','Proactive update with maxUnavailable=10%'],
    ans:1, exp:'MIG canary updates allow you to specify a target-size (e.g. 10%) that will receive the new template first. After validating, you can roll out to the remaining instances. This is different from maxUnavailable which controls concurrency, not subset selection.' },

  { id:54, cat:'Compute', domain:'Designing Solutions',
    q:'Which GCP service is most appropriate for triggering a Cloud Run service every weekday at 8 AM UTC?',
    opts:['Cloud Tasks','Pub/Sub with a time filter','Cloud Scheduler','Eventarc with a schedule trigger'],
    ans:2, exp:'Cloud Scheduler is GCP\'s managed cron service — it triggers HTTP endpoints, Pub/Sub topics, or App Engine handlers on a schedule defined in unix-cron syntax. Cloud Tasks is for demand-driven async queues, not time-based scheduling.' },

  { id:55, cat:'Compute', domain:'Designing Solutions',
    q:'An application needs to offload a slow email-sending operation from the user request path. The operation should retry up to 5 times on failure with exponential backoff and be rate-limited to 100 emails/sec. Which service?',
    opts:['Cloud Scheduler','Cloud Pub/Sub','Cloud Tasks','Cloud Run Jobs'],
    ans:2, exp:'Cloud Tasks is designed for exactly this: explicit task enqueuing from application code, configurable retry with exponential backoff, per-queue rate limiting, and deduplication. Pub/Sub does fan-out messaging but lacks per-task rate limiting and deduplication.' },

  { id:56, cat:'Compute', domain:'Designing Solutions',
    q:'A company publishes sensor events and needs multiple downstream services (analytics pipeline, alerting, archival) to each independently process every event. Which messaging pattern?',
    opts:['Cloud Tasks with multiple queues','Cloud Scheduler','Cloud Pub/Sub with multiple subscriptions','Cloud Run Jobs'],
    ans:2, exp:'Pub/Sub fan-out: one topic, multiple subscriptions — each subscription gets an independent copy of every message. Cloud Tasks has one worker per task. Cloud Scheduler is time-based.' },

  // ── Anthos / GKE Enterprise ──────────────────────────────────────────────────
  { id:57, cat:'Compute', domain:'Designing Solutions',
    q:'A company runs Kubernetes clusters on-prem and on GCP. They need a single pane of glass to manage config, apply security policies, and observe service health across all clusters. Which service?',
    opts:['GKE Autopilot','GKE Enterprise (Anthos) with Config Sync and ASM','Cloud Run multi-region','Kubernetes Federation (deprecated)'],
    ans:1, exp:'GKE Enterprise provides fleet management across GCP, on-prem, and other clouds. Config Sync delivers GitOps-based config to all clusters. Anthos Service Mesh provides cross-cluster observability and security.' },

  { id:58, cat:'Compute', domain:'Designing Solutions',
    q:'An SRE team needs per-service golden signals (latency, error rate, throughput) for microservices on GKE without adding instrumentation code to each service. Which feature provides this?',
    opts:['Cloud Monitoring custom metrics','Anthos Service Mesh (ASM) sidecar proxy','GKE built-in metrics only','Cloud Profiler'],
    ans:1, exp:'ASM injects Envoy sidecar proxies transparently into pods. These proxies automatically collect per-service request metrics (latency, error rate, throughput) and expose them in the ASM dashboard in Cloud Console — no application code changes required.' },

  { id:59, cat:'Compute', domain:'Designing Solutions',
    q:'A security requirement mandates that all service-to-service communication inside a GKE cluster must be encrypted in transit and mutually authenticated. Minimum operational overhead solution?',
    opts:['Implement TLS in every microservice\'s code','Enable Anthos Service Mesh with automatic mTLS','Use Network Policies to allow only known service IPs','Deploy a custom certificate authority sidecar'],
    ans:1, exp:'ASM automatically provisions mTLS between all sidecar-injected services using managed certificates — zero application code changes. Network Policies control traffic flow but do not encrypt or authenticate. Manual TLS per-service is high overhead.' },

  { id:60, cat:'Compute', domain:'Designing Solutions',
    q:'A GitOps team wants configuration changes committed to a Git repo to automatically propagate to all clusters in a GKE Enterprise fleet within minutes. Which component handles this?',
    opts:['Cloud Build triggered on every commit','Config Sync (Anthos Config Management)','Cloud Deploy to all cluster targets','kubectl apply in a Cloud Run job'],
    ans:1, exp:'Config Sync continuously reconciles cluster state against a Git repo (or OCI registry). Changes committed to Git are detected and applied to all registered fleet clusters within minutes, with drift detection and conflict resolution.' },

  // ── Security ──────────────────────────────────────────────────────────────────
  { id:61, cat:'Security', domain:'Designing Security',
    q:'A team wants to ensure that only container images built and attested by their Cloud Build pipeline can be deployed to their GKE production cluster. Which service enforces this?',
    opts:['Artifact Registry access control','Binary Authorization with a Cloud Build attestor','Cloud Armor on the cluster ingress','GKE security policy admission controller (custom)'],
    ans:1, exp:'Binary Authorization enforces deploy-time policy requiring attestations. Configuring a Cloud Build attestor means only images that passed the Cloud Build pipeline (and were signed) can be deployed. Artifact Registry IAM controls access but does not enforce signing.' },

  { id:62, cat:'Security', domain:'Designing Security',
    q:'A security team wants to detect if any GCS bucket in the organization has been made public. Which service provides this detection?',
    opts:['Cloud Audit Logs query manually','VPC Service Controls alert','Security Command Center finding','Cloud Armor rule'],
    ans:2, exp:'Security Command Center actively scans GCP resources for misconfigurations including public GCS buckets. It surfaces these as findings in the SCC dashboard. Audit Logs record actions but don\'t proactively detect the resulting misconfigured state.' },

  { id:63, cat:'Security', domain:'Designing Security',
    q:'A web application is being targeted by a DDoS attack and SQL injection attempts. Which GCP service addresses BOTH threats simultaneously?',
    opts:['VPC Firewall rules','Cloud Armor with Adaptive Protection + OWASP ruleset','Cloud Load Balancing rate limiting alone','IAP with access levels'],
    ans:1, exp:'Cloud Armor addresses both: Adaptive Protection uses ML to detect and mitigate volumetric DDoS attacks; preconfigured OWASP rulesets block SQL injection (sqli) and other L7 attacks. VPC firewalls operate at L3/L4 only.' },

  // ── Data / Storage ─────────────────────────────────────────────────────────
  { id:64, cat:'Data Processing', domain:'Designing Solutions',
    q:'A company runs a nightly Dataflow pipeline triggered at 2 AM that reads from GCS and writes to BigQuery. The simplest trigger mechanism?',
    opts:['Cloud Composer DAG with a daily schedule','Cloud Scheduler calling the Dataflow REST API to launch the job','Eventarc watching GCS for a trigger file','A Compute Engine cron VM'],
    ans:1, exp:'Cloud Scheduler is the simplest solution for a time-triggered single job. It calls the Dataflow jobs.create REST API on a cron schedule. Cloud Composer is overkill for a single pipeline with no dependencies.' },

  { id:65, cat:'Analytics & Warehousing', domain:'Debugging',
    q:'A BigQuery query is running slowly. You suspect data skew across partitions. Which built-in tool helps identify the skew?',
    opts:['INFORMATION_SCHEMA.JOBS_BY_PROJECT to check slot usage','The query execution plan (EXPLAIN) showing shuffle bytes per stage','Cloud Monitoring BigQuery metrics dashboard','INFORMATION_SCHEMA.PARTITIONS to count rows per partition'],
    ans:1, exp:'The BigQuery query execution plan (visible after running a query in the UI, or via INFORMATION_SCHEMA.JOBS) shows shuffle bytes and records per stage. Highly uneven shuffle bytes across workers indicates data skew. The INFORMATION_SCHEMA.PARTITIONS table shows partition sizes which is also useful for identifying skew before running the query.' },

  { id:66, cat:'Hybrid & Migration', domain:'Designing Solutions',
    q:'A company needs to migrate a PostgreSQL database from on-prem to Cloud SQL with less than 5 minutes of downtime. Which service handles this?',
    opts:['pg_dump + pg_restore with a maintenance window','Database Migration Service with CDC replication','Datastream CDC to Cloud SQL','Storage Transfer Service'],
    ans:1, exp:'DMS uses CDC (continuous replication) to keep the Cloud SQL target in sync with the source during migration. The cutover window (stopping the source, promoting the target) can be just a few minutes. pg_dump requires a full maintenance window for large databases.' },

  { id:67, cat:'Operations & Reliability', domain:'Ensuring Reliability',
    q:'An application team needs to verify that their GKE application correctly recovers from random pod failures before going to production. Which practice validates this?',
    opts:['Load testing only','Chaos engineering: inject pod failures in staging','Blue-green deployment dry run','Canary release to 5% of users'],
    ans:1, exp:'Chaos engineering proactively validates resilience by intentionally injecting failures (pod kills, network partitions, resource starvation). This is directly aligned with the Reliability pillar of the Well-Architected Framework. Per the PCA exam guide: chaos engineering is explicitly listed under ensuring reliability.' },

  { id:68, cat:'Security', domain:'Designing Security',
    q:'Which resource hierarchy level should Organization Policy constraints be applied at to prevent developers from creating external IP addresses on any VM in the entire organization?',
    opts:['Project level in every project','Folder level for each team folder','Organization level','VPC network level'],
    ans:2, exp:'Organization Policy constraints applied at the Organization level are inherited by all folders and projects beneath. The constraints/compute.vmExternalIpAccess constraint prevents external IP assignment org-wide. Project-level requires applying to each project individually.' },
]
