const personasData = {
  exec: {
    title: "Technical Executive",
    subtitle: "CTO, VP Engineering, VP Platform",
    questions: [
      {
        id: "exec_q1",
        label: "Billing Monolith database decomposition",
        question: "We are migrating our legacy monolithic transaction and billing database to microservices. Team dependencies are blocking deployments, and we are worried about circular database locks during the cutover. How do we decouple the schemas and coordinate the migration?",
        mcp: `### Decomposing Monolithic Billing Systems

Decoupling a monolithic billing database requires a structured migration pattern to prevent deployment blocks and database deadlocks.

#### 1. Define Domain Boundries
Separate your core schemas along clear transactional boundaries using Domain-Driven Design. For billing, isolate your invoices, billing profiles, and processing logs. 

#### 2. Implement Database Decomposition Patterns
* **Avoid Shared Databases**: Each service must have its private schema. Sharing a database causes circular dependencies during deployments.
* **Transactional Outbox Pattern**: Prevent message loss by writing events to a local outbox table inside the same transaction as the billing update, then publishing them asynchronously.
* **Saga Orchestration**: Instead of distributed two-phase commit transactions which block database locks, coordinate transactions across services using a central Saga orchestrator.

#### 3. Cutover Strategy
* **Database Strangler Fig**: Move tables incrementally. Use Change Data Capture (CDC) to synchronize data from the monolith to microservice databases in real time.
* **Gateways and Routing**: Route client requests to the new service using an API gateway. Enforce automated fallbacks to redirect traffic to the monolith if processing exceptions spike.`,
        mcpCitations: [
          {
            author: "Sam Newman",
            role: "Software Architecture",
            book: "Building Resilient Distributed Microservices",
            chapter: "Chapter 4: Integration Patterns and Database Decomposition",
            bio: "Sam Newman is a technologist focusing on the areas of cloud, microservices, and continuous delivery. He has over 20 years of experience in IT as a developer, sysadmin, and architect."
          },
          {
            author: "Neal Ford",
            role: "Software Architecture",
            book: "Fundamentals of Software Architecture, 2nd Edition",
            chapter: "Chapter 12: Architectural Patterns and Trade-offs",
            bio: "Neal Ford is a director, software architect, and meme wrangler at Thoughtworks. He is an author of eight books and a software delivery expert."
          }
        ],
        generic: `### Monolithic Database Migration Strategy

Migrating a monolithic database and application to microservices involves carefully decoupled services. Here is an architectural blueprint:

#### 1. Service Identification
Analyze the monolith and identify cohesive boundaries. Split the application into microservices using standard API protocols.

#### 2. Communication Model
Implement RESTful APIs or gRPC for synchronous communication. For asynchronous messaging, deploy an event-driven architecture utilizing a broker like Apache Kafka or RabbitMQ.

#### 3. Database Split and Cutover
* **Schema Segregation**: Extract database tables corresponding to each microservice into separate databases.
* **API Gateways**: Use an API gateway (e.g., Kong, Envoy) to route client traffic.
* **Dual Writes**: Configure the application to write to both the legacy monolith database and the new service databases. This ensures synchronization before cutting over.

Ensure you monitor traffic and system performance during the deployment phase to mitigate failures.`,
        genericSources: [
          { source: "Medium Article", detail: "Complete Guide to Monolith to Microservices", date: "October 2018" },
          { source: "Reddit Thread", detail: "r/softwareengineering - Splitting monolithic database tables?", date: "March 2021" },
          { source: "Tech Vendor Whitepaper", detail: "Modernizing Legacy Systems", date: "June 2019" }
        ]
      },
      {
        id: "exec_q2",
        label: "Build vs Buy IDP for 300 devs",
        question: "Our software engineers complain that cloud resource provisioning takes two weeks. We want to implement self-service infrastructure. Should we staff a platform team to build an IDP on Backstage, or buy a commercial SaaS portal? We have 300 developers.",
        mcp: `### Build vs. Buy Internal Developer Platform Framework

At a scale of 300 developers, the decision to build or buy hinges on your custom pipeline complexity and operational capacity.

#### 1. Treat the Platform as a Product
An Internal Developer Platform (IDP) must reduce developer cognitive load. If you build it, you must staff a permanent platform product team.

#### 2. Evaluate Operational Costs
* **Core Competency**: Staffing a dedicated platform team costs significant engineering hours. If cloud workflows are standard, buying a portal is more cost-efficient.
* **Custom Pipelines**: If you have highly customized compliance gates or complex legacy pipelines, buy a SaaS portal and build custom plugins for specific workflows.
* **Cognitive Load**: The platform must accelerate developer velocity immediately. If custom portal work lags, developers will bypass the portal.

#### 3. Strategic Recommendations
* **Golden Paths**: Focus on defining standardized templates for infrastructure provisioning and deployments.
* **Evolutionary Architecture**: Start with a thin portal layer using SaaS components, then expand custom integrations using Backstage as requirements mature.
* **Feedback Loops**: Collect developer survey data monthly to align the platform roadmap with team needs.`,
        mcpCitations: [
          {
            author: "Neal Ford",
            role: "Software Architecture",
            book: "Architecture as Code",
            chapter: "Chapter 8: Platform Engineering and Self-Service Infrastructure",
            bio: "Neal Ford is a director, software architect, and meme wrangler at Thoughtworks. He is an author of eight books and a software architecture expert."
          },
          {
            author: "Yevgeniy \"Jim\" Brikman",
            role: "Infrastructure and Ops",
            book: "Fundamentals of DevOps and Software Delivery",
            chapter: "Chapter 5: Managing the Platform as a Product",
            bio: "Yevgeniy (Jim) Brikman is the co-founder of Gruntwork, author of Terraform: Up and Running, and has built infrastructure at LinkedIn and TripAdvisor."
          }
        ],
        generic: `### Building vs. Buying an Internal Developer Platform (IDP)

When deciding whether to build or buy an IDP for 300 developers, evaluate your engineering capacity and custom pipeline needs.

#### 1. The Case for Building
* **Workflow Customization**: Building allows you to tailor the portal exactly to your custom CI/CD pipelines, security controls, and container infrastructure.
* **Cost Efficiency**: You avoid vendor license seats, using open-source tooling like Backstage, ArgoCD, and Kubernetes.

#### 2. The Case for Buying
* **Speed to Value**: Off-the-shelf solutions like Port or Cortex deploy in weeks rather than quarters.
* **Maintenance Overhead**: Buying shifts security patching and tool integration maintenance onto the vendor.

For 300 developers, standard practice is to deploy a custom Backstage portal configured by a dedicated platform engineering team.`,
        genericSources: [
          { source: "Personal Blog Post", detail: "Why Backstage was a nightmare to configure", date: "August 2021" },
          { source: "StackOverflow Discussion", detail: "SaaS IDP options vs Backstage setup", date: "November 2022" },
          { source: "Marketing Blog", detail: "The real cost of building your own developer portal", date: "January 2023" }
        ]
      }
    ]
  },
  engineering: {
    title: "Engineering Team",
    subtitle: "Tech Leads, Engineering Managers, Staff Engineers",
    questions: [
      {
        id: "eng_q1",
        label: "Refactoring auth system mid-roadmap",
        question: "Our checkout sprint velocity is dropping because our legacy session authentication code has turned into spaghetti. We cannot stop our active cart page feature roadmap, but security vulnerabilities are rising. How do we refactor this code mid-sprint?",
        mcp: `### In-Flight Authentication Refactoring

Refactoring legacy security modules mid-roadmap requires establishing strict code deprecation structures and safety boundaries.

#### 1. Classify the Refactoring Boundaries
* **Pragmatic Debt**: Lock down the legacy authentication module. Do not add new features to it. Wrap new cart components in clean interfaces.
* **Strangler Method**: Rebuild the auth session verification into a separate service, then route user auth tokens to the new module gradually.
* **Vulnerability Fixes**: Prioritize patching known session leaks first. Delay aesthetic refactoring until code paths are isolated.

#### 2. Set Up Refactoring Capacity
* **Sprint Budgets**: Allocate 20% of engineering capacity in each sprint to refactor auth databases. This keeps feature releases moving.
* **The Debt Log**: Log every session issue in a tech debt registry. Detail the specific blocker it creates for developer velocity.
* **Test Protection**: Write integration tests around the monolith session authentication endpoints before refactoring to prevent regressions.`,
        mcpCitations: [
          {
            author: "Chelsea Troy",
            role: "Software Development",
            book: "Agentic Coding Skill Plan",
            chapter: "Module 2: Fundamentals of Technical Debt",
            bio: "Chelsea Troy leads the machine learning operations team at Mozilla and teaches computer science at the University of Chicago."
          },
          {
            author: "Addy Osmani",
            role: "Software Development",
            book: "The Effective Software Engineer",
            chapter: "Chapter 7: Balancing Product Delivery and Code Health",
            bio: "Addy Osmani is a director at Google Cloud AI, focusing on developers and businesses succeeding with enterprise AI."
          }
        ],
        generic: `### Tech Debt Prioritization and Management

Technical debt reduces team productivity. To manage it without halting features:

#### 1. Track Debt Items
Create a dedicated backlog in Jira for tech debt tasks. Encourage developers to flag code smells and outdated dependencies during sprints.

#### 2. Allocate Sprint Capacity
Dedicate 10% to 15% of your resources to resolving refactoring tasks. This ensures code maintenance occurs consistently.

#### 3. Schedule Tech Debt Sprints
Every three or four quarters, organize a sprint focused entirely on resolving stability issues, security warnings, and refactoring old modules.`,
        genericSources: [
          { source: "Jira Community Post", detail: "Best practices for tracking tech debt in Jira", date: "April 2020" },
          { source: "Tech Lead Blog", detail: "How to convince product managers to refactor", date: "September 2021" },
          { source: "Medium Article", detail: "Managing technical debt in agile software development", date: "June 2019" }
        ]
      },
      {
        id: "eng_q2",
        label: "Real-time backend inventory updates",
        question: "Our mobile app needs real-time catalog updates from our relational inventory database. The REST backend is slow. Should we warp it in GraphQL, deploy WebSockets, or use server-sent events (SSE)?",
        mcp: `### Event-Driven Real-Time API Upgrades

Upgrading a relational REST backend for real-time traffic requires choosing the right connection topology and decoupling writes from queries.

#### 1. Connection Topology Selection
* **WebSockets**: Choose WebSockets if you require bidirectional communication. Note that managing persistent TCP channels increases infrastructure overhead.
* **GraphQL Subscriptions**: Effective if you use GraphQL, but adds complex schema parsing over persistent WebSocket connections.
* **Server-Sent Events (SSE)**: Best for unidirectional updates like catalog prices. Works over standard HTTP/2 out of the box.

#### 2. Decouple Database Reads
Do not query the relational database directly on every client connection event. Use an event broker like Kafka or Redis Pub/Sub to push updates to client gateways.`,
        mcpCitations: [
          {
            author: "Mike Amundsen",
            role: "Software Architecture / Development",
            book: "AI-Driven API Design",
            chapter: "Chapter 6: Real-time and Event-Driven API Topologies",
            bio: "Mike Amundsen consults with organizations worldwide on network architecture, web development, and APIs."
          },
          {
            author: "Neal Ford",
            role: "Software Architecture",
            book: "Fundamentals of Software Architecture, 2nd Edition",
            chapter: "Chapter 15: Event-Driven Architecture Style",
            bio: "Neal Ford is a director, software architect, and meme wrangler at Thoughtworks."
          }
        ],
        generic: `### Modernizing Legacy APIs for Real-Time Clients

Upgrading legacy REST APIs to real-time client setups involves three main methods:

#### 1. GraphQL Subscriptions
GraphQL lets clients define data schemas. It uses WebSockets to push updates when database items change.

#### 2. WebSockets
WebSockets establish a persistent TCP link between browser and server, which allows for bidirectional data flow.

#### 3. Server-Sent Events (SSE)
SSE streams updates one way using regular HTTP connections. It is simpler than WebSockets but works well for notifications.

Consider WebSockets if you need bidirectional updates. Otherwise, GraphQL is standard for client-side queries.`,
        genericSources: [
          { source: "Medium Article", detail: "GraphQL vs WebSockets for real-time updates", date: "May 2021" },
          { source: "StackOverflow Thread", detail: "How to scale WebSocket connections", date: "August 2020" },
          { source: "Developer Blog", detail: "Building real-time data feeds with SSE", date: "March 2022" }
        ]
      }
    ]
  },
  platform: {
    title: "Platform and Infrastructure",
    subtitle: "SRE Leads, Platform Engineers, Infrastructure Leads",
    questions: [
      {
        id: "plat_q1",
        label: "Resolving 504 errors on multi-region EKS",
        question: "During outages on our multi-region Kubernetes clusters, CPU and memory dashboard charts look healthy, but customers experience 504 Gateway Timeouts. How do we trace these transient routing bugs?",
        mcp: `### Debugging Transient EKS Gateway Outages

Solving transient routing timeouts requires moving away from infrastructure metrics and implementing high-cardinality telemetry.

#### 1. Avoid Metric Pre-Aggregation
Standard CPU metrics hide localized latency spikes. Use structured telemetry events containing request attributes like ClientID, RoutePath, and RouteRegion.

#### 2. Trace Distributed Request Paths
* **Correlate Services**: Configure OpenTelemetry tracing headers to track requests across API gateways, service meshes, and databases.
* **Analyze Cardinality**: Query trace spans by custom dimensions. Find out if 504 timeouts are isolated to a single Kubernetes cluster or cloud provider zone.
* **Standardize Instrumentation**: Enforce OpenTelemetry APIs globally to inspect routing logic, preventing vendor lock-in.`,
        mcpCitations: [
          {
            author: "Charity Majors",
            role: "Infrastructure and Ops",
            book: "Observability Engineering, 2nd Edition",
            chapter: "Chapter 3: The Architecture of Observability Tooling",
            bio: "Charity Majors is the cofounder and CTO of Honeycomb.io, pioneering modern observability concepts."
          },
          {
            author: "Benjamin Muschko",
            role: "Infrastructure and Ops",
            book: "Certified Kubernetes Application Developer (CKAD) Study Guide",
            chapter: "Chapter 9: Application Observability and Telemetry",
            bio: "Benjamin Muschko specializes in cloud-native applications, container solutions, and DevSecOps."
          }
        ],
        generic: `### Implementing Telemetry: Monitoring vs. Observability

Observability relies on tracking three types of telemetry data: logs, metrics, and traces.

#### 1. Centralized Logging
Send all application logs to a centralized stack like Elasticsearch or Grafana Loki to query errors.

#### 2. Metric Collection
Gather infrastructure statistics (CPU, memory, disk I/O) using Prometheus. Create alerts when values exceed 80%.

#### 3. Distributed Tracing
Configure tracing using Jaeger or Zipkin to track client requests through different microservices and databases.

Configuring these three pillars provides full visibility into your distributed platforms.`,
        genericSources: [
          { source: "Medium Article", detail: "Logs, Metrics, Traces: The Three Pillars of Observability", date: "November 2019" },
          { source: "Tech Vendor Blog", detail: "Why static monitoring dashboards are failing", date: "January 2022" },
          { source: "StackOverflow Thread", detail: "How to correlate traces and logs in Kubernetes", date: "September 2020" }
        ]
      },
      {
        id: "plat_q2",
        label: "FinOps resource requests tuning",
        question: "Our EKS cluster spend increased by 40%. Developers are over-allocating container CPU requests, leaving cluster nodes idle. How do we audit limits and automate container sizing?",
        mcp: `### Container Resource Allocation Optimization

Controlling EKS compute waste requires automating resource profiles and establishing localized budgets.

#### 1. Automate Resource Limit Allocation
* **Vertical Pod Autoscaler**: Set container allocations dynamically using the Vertical Pod Autoscaler in recommendation mode.
* **Auto-Scaling Compute Nodes**: Replace cluster-autoscaler with Karpenter to scale down compute nodes immediately when EKS workloads shrink.
* **Clean Storage Waste**: Deploy automation policies to remove unused volumes and repository caches.

#### 2. Establish Allocation Control Gates
* **Admission Policies**: Enforce metadata tags like Team, Project, and CostCenter on deployments using admission controllers.
* **Cost Transparency**: Allocate idle infrastructure costs back to teams based on container CPU usage.
* **Anomalous Cost Alerts**: Trigger chat alerts when a service's weekly spend deviates by 15% from its moving average.`,
        mcpCitations: [
          {
            author: "Yevgeniy \"Jim\" Brikman",
            role: "Infrastructure and Ops",
            book: "Terraform: Up and Running, 3rd Edition",
            chapter: "Chapter 10: Production-Grade Terraform Infrastructure",
            bio: "Yevgeniy (Jim) Brikman is the co-founder of Gruntwork and author of Terraform: Up and Running."
          },
          {
            author: "Benjamin Muschko",
            role: "Infrastructure and Ops",
            book: "Certified Kubernetes Administrator (CKA) Study Guide",
            chapter: "Chapter 7: Resource Management and Scheduling",
            bio: "Benjamin Muschko specializes in cloud-native applications, container solutions, and DevSecOps."
          }
        ],
        generic: `### Cloud Cost Reduction and Governance Guide

To reduce cloud spend across multi-cloud Kubernetes deployments:

#### 1. Audit Cloud Billing Data
Review your AWS or Azure invoices to locate the resource types with the highest expenses.

#### 2. Terminate Unused Resources
Remove idle staging instances, unattached EBS volumes, and old database backups. Configure dev environments to turn off after working hours.

#### 3. Use Reserved Instances
Establish Savings Plans or Reserved Instances with cloud providers to receive discounts on consistent computing needs.

#### 4. Configure Kubernetes Limits
Configure CPU and memory limits inside deployment files to prevent single applications from over-consuming node capacity.`,
        genericSources: [
          { source: "Cloud Provider Guide", detail: "AWS Cost Explorer optimization policies", date: "April 2021" },
          { source: "Tech Article", detail: "How to save 30% on Kubernetes cluster costs", date: "December 2020" },
          { source: "Reddit Thread", detail: "r/devops - Fighting cloud cost sprawl", date: "September 2022" }
        ]
      }
    ]
  },
  data: {
    title: "Data and Analytics",
    subtitle: "Data Leads, Analytics Leads, ML Engineers",
    questions: [
      {
        id: "data_q1",
        label: "Data Lakehouse partitioning bottlenecks",
        question: "Our centralized data engineering team is a bottleneck. We have five business units requesting custom analytical pipelines, causing delays. How do we partition our lakehouse into self-serve products?",
        mcp: `### Lakehouse Decentralization Strategy

De-bottlenecking data pipelines requires shifting from centralized data platforms to a domain-driven Data Mesh.

#### 1. Apply Data Mesh Core Principles
* **Domain Ownership**: Domain units own data pipelines, processing, and warehousing.
* **Data as a Product**: Expose datasets to other teams via clean, secure schemas and APIs.
* **Self-Service Platforms**: The platform team provides data infrastructure templates (Snowflake/BigQuery pipelines) so teams can self-serve.
* **Automated Governance**: Enforce schema validations at the platform level.

#### 2. Implement Data Integration Safeguards
* **Change Data Capture**: Stream transactional updates to the lakehouse in real time using CDC pipelines to maintain data freshness.
* **Interoperability Standards**: Enforce universal schema standards like Apache Iceberg to prevent data silos across domains.`,
        mcpCitations: [
          {
            author: "Zhamak Dehghani",
            role: "Data Architecture",
            book: "Data Mesh",
            chapter: "Chapter 2: The Core Principles and Logical Architecture",
            bio: "Zhamak Dehghani is the originator of Data Mesh, codifying the architectural paradigm in 2018."
          },
          {
            author: "Martin Kleppmann",
            role: "Data Architecture",
            book: "Designing Data-Intensive Applications, 2nd Edition",
            chapter: "Chapter 10: Batch Processing and Data Warehousing",
            bio: "Martin Kleppmann is an associate professor at the University of Cambridge, specializing in distributed systems."
          }
        ],
        generic: `### Modern Data Architecture: Data Mesh Principles

A Data Mesh distributes data ownership to resolve analytical pipeline bottlenecks.

#### 1. Decentralized Domain Data
Transfer ownership of data pipelines from centralized data engineering to individual business units (e.g., Marketing).

#### 2. Data Products
Expose tables or datasets using query tools like Snowflake or Athena so other teams can consume them.

#### 3. Shared Data Platform
Platform engineers construct data catalog tools and storage platforms to help domain teams manage data easily.

This architecture removes data engineering bottlenecks by sharing delivery responsibilities.`,
        genericSources: [
          { source: "Medium Article", detail: "What is a Data Mesh?", date: "May 2020" },
          { source: "Reddit Thread", detail: "r/dataengineering - Is anyone actually doing Data Mesh?", date: "December 2021" },
          { source: "Tech Blog", detail: "Data Lake vs. Data Mesh", date: "August 2022" }
        ]
      },
      {
        id: "data_q2",
        label: "AI agent API tool use reliability",
        question: "We are building an LLM support agent that calls internal inventory APIs, but the agent occasionally hallucinates database parameters or triggers circular loops. How do we ensure reliability?",
        mcp: `### Production Patterns for Reliable AI Agents

Deploying LLM agents that query internal APIs requires strict validation layers and structured prompts.

#### 1. Constrain Model Operations
* **Strict Schema Enforcement**: Use JSON schemas or Pydantic models to force the LLM to output parameters matching your exact API signature.
* **Few-Shot Prompting**: Provide the agent context examples of correct and incorrect tool executions.
* **Retrieval Grounding**: Ground the agent's prompts in database and API metadata before running queries.

#### 2. Build Safety Guardrails
* **Validation Middleware**: Do not run raw LLM SQL parameters. Validate parameters using software guardrails before API execution.
* **Evaluation Frameworks**: Write automated tests using evaluation tools to verify correctness.
* **Manual Approvals**: Require human-in-the-loop approvals for sensitive write actions.`,
        mcpCitations: [
          {
            author: "Jay Alammar",
            role: "Artificial Intelligence",
            book: "An Illustrated Guide to AI Agents",
            chapter: "Chapter 4: Tools, Execution, and Grounding Techniques",
            bio: "Jay Alammar is an engineering fellow at Cohere, focusing on LLM research and agentic systems."
          },
          {
            author: "Chip Huyen",
            role: "Artificial Intelligence",
            book: "AI Engineering",
            chapter: "Chapter 6: Evaluation and Testing of LLM Systems",
            bio: "Chip Huyen is an ML computer scientist, author, and former Stanford lecturer."
          }
        ],
        generic: `### Improving LLM Agent Tool Calling Reliability

To resolve inconsistent tool utilization and API failures in LLM agents:

#### 1. Refine Prompts
Add clear descriptions, rules, and example calls inside the agent system prompt.

#### 2. Implement Retry Logic
Use code catch statements to check if the LLM output matches parameters, then feed syntax errors back to the LLM for corrections.

#### 3. Choose Fine-Tuned Models
Deploy models with dedicated function-calling capabilities, which use special tokens to generate tool parameters.`,
        genericSources: [
          { source: "LangChain Blog", detail: "Handling tool parser errors in agent loops", date: "November 2023" },
          { source: "Developer Forum", detail: "Improving function calling reliability", date: "July 2023" },
          { source: "AI Startup Blog", detail: "Few-shot prompting for database agents", date: "September 2023" }
        ]
      }
    ]
  },
  security: {
    title: "Security and DevSecOps",
    subtitle: "CISOs, Security Managers, DevSecOps Leads",
    questions: [
      {
        id: "sec_q1",
        label: "Automating Kubernetes runtime security policy",
        question: "Our engineering teams are checking raw AWS secrets into git and running EKS container images as root, creating compliance risks. How do we enforce security boundaries in active CI/CD pipelines?",
        mcp: `### Kubernetes DevSecOps Pipeline Security

Enforcing secure EKS pipelines requires integrating automated policy checks and runtime container boundaries.

#### 1. Secure Container Build Workflows
* **Enforce Distroless Images**: Block container images running as root. Configure build files to utilize minimal, distroless base images.
* **Inject Runtime Secrets**: Block hardcoded secrets in Dockerfiles. Enforce runtime secret injection using Vault or Kubernetes secrets.
* **Automate Security Scans**: Run static code analysis scans (SAST) on every commit to block vulnerabilities.

#### 2. Enforce Runtime Policy-as-Code
* **Admission Control Gates**: Implement Gatekeeper policies to reject pods lacking resource limits.
* **Isolate Network Traffic**: Apply Network Policies to block unnecessary pod-to-pod communication.
* **Limit Resource Access**: Set CPU and memory limits per namespace to prevent resource exhaustion attacks.`,
        mcpCitations: [
          {
            author: "Benjamin Muschko",
            role: "Infrastructure and Ops",
            book: "Certified Kubernetes Security Specialist (CKS) Study Guide",
            chapter: "Chapter 4: Container Build, Scan, and Runtime Security",
            bio: "Benjamin Muschko is a software engineer specializing in cloud-native applications and DevSecOps."
          },
          {
            author: "Adrian Gonzalez Sanchez",
            role: "Business / Governance",
            book: "Implementing AI Governance",
            chapter: "Chapter 9: Compliance and Security Audits in Container Systems",
            bio: "Adrian Gonzalez Sanchez is a product manager at Microsoft AI and EU AI Act advisor."
          }
        ],
        generic: `### Securing Kubernetes Pipelines (DevSecOps)

Securing containerized systems requires integrating security scans directly into the CI/CD pipeline.

#### 1. Secure Build Stage
* **Static Scanning**: Run static code analysis (SAST) on application code during every pull request.
* **Vulnerability Scanning**: Scan container base images for known vulnerabilities using scanners.

#### 2. Runtime Security
* **Network Policies**: Implement network policies to block unnecessary pod-to-pod communication.
* **RBAC Controls**: Limit namespace access using Kubernetes Role-Based Access Control (RBAC).

This approach maintains security alignment while enabling automated deployments.`,
        genericSources: [
          { source: "Medium Article", detail: "Kubernetes Security Best Practices", date: "February 2020" },
          { source: "StackOverflow Discussion", detail: "Restricting container registry access", date: "June 2021" },
          { source: "SaaS Blog", detail: "Securing Kubernetes without slowing developers", date: "April 2022" }
        ]
      }
    ]
  },
  it: {
    title: "IT and Corporate Tech",
    subtitle: "IT Leads, IT Architects, IT Managers",
    questions: [
      {
        id: "it_q1",
        label: "Replacing VPN with Zero-Trust network access",
        question: "Our remote engineering staff experiences high latency over client-VPNs when querying on-premise inventory servers, but bypasses the VPN creates security risks. How do we migrate to ZTNA without breaking authentication?",
        mcp: `### Transitioning to Zero-Trust Network Access

Migrating to Zero-Trust Network Access (ZTNA) requires moving access policies from network boundaries to user identities.

#### 1. Shift Perimeter Security Assumptions
* **Assume Compromise**: Treat internal networks as equally untrusted as external connections.
* **Continuous Access Audits**: Verify user authentication, device checks, and route permissions for every request.

#### 2. Implement Identity-First Routing
* **Unified SSO Policies**: Integrate ZTNA pathways with your Identity Provider. Enforce phishing-resistant multi-factor authentication (MFA).
* **Verify Device Health**: Block access for remote devices lacking disk encryption or endpoint security software.
* **Apply Microsegmentation**: Isolate resources into separate subnet boundaries. Limit client access using least-privilege security controls.`,
        mcpCitations: [
          {
            author: "Yevgeniy \"Jim\" Brikman",
            role: "Infrastructure and Ops",
            book: "Terraform: Up and Running, 3rd Edition",
            chapter: "Chapter 9: Securing Cloud Networks and Access Control",
            bio: "Yevgeniy (Jim) Brikman is the co-founder of Gruntwork and author of Terraform: Up and Running."
          },
          {
            author: "Adrian Gonzalez Sanchez",
            role: "Business / Governance",
            book: "Implementing AI Governance",
            chapter: "Chapter 6: Data Privacy and Identity Management Frameworks",
            bio: "Adrian Gonzalez Sanchez is a product manager at Microsoft AI and EU AI Act advisor."
          }
        ],
        generic: `### Implementing Zero-Trust Network Access (ZTNA)

Deploying a ZTNA model requires removing traditional perimeter networks (VPNs) and verifying every access request.

#### 1. Identity Verification
* **Multi-Factor Authentication**: Enforce MFA across all cloud and on-premise business tools.
* **Single Sign-On (SSO)**: Centralize access permissions under a single identity provider (IdP).

#### 2. Access Control Policies
* **Least Privilege**: Only allow access to tools needed for the user's specific role.
* **Device Checks**: Verify that remote laptops are running antivirus software and disk encryption.

This model reduces data leak risks while maintaining single-click access for remote staff.`,
        genericSources: [
          { source: "Tech Article", detail: "Moving from VPN to Zero Trust", date: "August 2020" },
          { source: "Reddit Thread", detail: "r/sysadmin - Zero Trust implementation headaches", date: "October 2021" },
          { source: "Whitepaper", detail: "Securing remote workforces in hybrid environments", date: "May 2022" }
        ]
      }
    ]
  },
  ld: {
    title: "Learning and Development",
    subtitle: "Director of LandD, VP Talent Development, CHRO",
    questions: [
      {
        id: "ld_q1",
        label: "GenAI developer upskilling quality control",
        question: "Our software engineers are using generic AI coding assistants to write code 30% faster, but security scans show a spike in duplicate modules and package vulnerabilities. How do we structure a training plan that teaches developers to audit AI code?",
        mcp: `### Developer GenAI Upskilling Framework

Building a secure AI developer upskilling program requires shifting from passive course consumption to structured, expert-grounded workflows.

#### 1. Ground AI Tools in Certified Expert Content
* **Grounded Coding Assistants**: Integrate developer assistants with licensed expert knowledge (like O'Reilly Expert MCP). Ensure suggestions display the source book, author, and engineering rationale.
* **Interactive Sandbox Practice**: Support training with browser-based sandboxes and labs where engineers can validate architectures safely.
* **Verify Skill Progression**: Implement continuous technical skills gap assessments to track developer proficiency over time.

#### 2. Design Specialized Learning Paths
Define role-based paths for GenAI, MLOps, and DevSecOps, ensuring training aligns with engineering goals.

#### 3. Measure Quality Over Course Activity
Measure the training program's ROI by tracking metrics like cycle time reductions and decrease in repository warnings, rather than simple course completion statistics.`,
        mcpCitations: [
          {
            author: "Addy Osmani",
            role: "Software Development",
            book: "Leading Effective Engineering Teams",
            chapter: "Chapter 4: Developer Onboarding and Skills Progression",
            bio: "Addy Osmani is a director at Google Cloud AI, focusing on developers and businesses succeeding with enterprise AI."
          },
          {
            author: "Aman Khan",
            role: "Business",
            book: "AI Product Management",
            chapter: "Chapter 3: Skill Mapping and AI Capability Assessment",
            bio: "Aman Khan works on Google's agent platform and hosts O'Reilly's AI Product Lab."
          }
        ],
        generic: `### Designing an AI Developer Upskilling Strategy

Upskilling developers to use generative AI requires structured training guidelines.

#### 1. Define Standard Workflows
* **Coding Assistants**: Provide enterprise access to tools like GitHub Copilot or Tabnine.
* **Prompt Guidelines**: Teach developers to write descriptive prompts specifying languages and formatting rules.

#### 2. Establish Learning Hours
* **Weekly Dedicated Time**: Allocate 2 hours weekly for developers to explore new AI coding tools and libraries.
* **Internal Hackathons**: Run team events where engineers build prototypes using AI APIs.

#### 3. Measure Training Progress
* **Usage Dashboard**: Monitor user activity, seat utilization, and average coding sessions.
* **Certifications**: Encourage developers to complete online AI certificates and bootcamps.

This structure drives developer efficiency while expanding technical skills.`,
        genericSources: [
          { source: "Forbes Technology Council", detail: "AI in LandD: Upskilling your tech workforce", date: "September 2024" },
          { source: "Reddit Thread", detail: "r/cscareerquestions - Are junior devs learning anything by using Copilot?", date: "July 2024" },
          { source: "Tech HR Blog", detail: "Measuring training ROI for software engineers", date: "May 2023" }
        ]
      }
    ]
  }
};

const ideConfigs = {
  cursor: {
    name: "Cursor IDE",
    desc: "Simulated Cursor editor with O'Reilly Expert MCP integrated into the sidebar chat pane.",
    theme: "theme-cursor",
    layout: "ide-split"
  },
  claude: {
    name: "Claude.ai Web",
    desc: "Simulated Claude.ai chat client with O'Reilly Expert MCP capability.",
    theme: "theme-claude",
    layout: "chat-only"
  },
  copilot: {
    name: "VS Code (Copilot Chat)",
    desc: "Simulated VS Code interface showing GitHub Copilot chat grounded with the O'Reilly MCP.",
    theme: "theme-vscode",
    layout: "ide-split"
  },
  intellij: {
    name: "IntelliJ IDEA",
    desc: "Simulated IntelliJ IDEA editor layout with the O'Reilly Expert MCP tool pane active.",
    theme: "theme-intellij",
    layout: "ide-split"
  },
  vscode: {
    name: "VS Code (Native)",
    desc: "Simulated native VS Code editor with O'Reilly Expert MCP active in the chat sidebar panel.",
    theme: "theme-vscode",
    layout: "ide-split"
  }
};

// Global State
let activePersonaKey = "exec";
let activeIdeKey = "cursor";
let activeQuestionIndex = 0;
let activeStreamTimeouts = [];

// Simple Markdown Formatter
function formatMarkdown(text) {
  if (!text) return '';
  
  // Escape HTML
  let html = text
    .replace(new RegExp(String.fromCharCode(38), 'g'), String.fromCharCode(38) + 'amp;')
    .replace(/</g, String.fromCharCode(38) + 'lt;')
    .replace(/>/g, String.fromCharCode(38) + 'gt;');
  
  // Code blocks: ```javascript ... ```
  html = html.replace(/```(\w*)\n([\s\S]*?)\n```/g, (match, lang, code) => {
    return `<pre><code class="language-${lang}">${code.trim()}</code></pre>`;
  });
  
  // Headers: ###, ####
  html = html.replace(/^#### (.*?)$/gm, '<h4>$1</h4>');
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  
  // Bullet points - group lines starting with * into <ul>
  html = html.replace(/(?:^[*-] (.*?)(?:\n|$))+/gm, (match) => {
    const items = match.trim().split('\n').map(line => {
      const content = line.replace(/^[*-]\s+/, '');
      return `<li>${content}</li>`;
    }).join('');
    return `<ul>${items}</ul>`;
  });
  
  // Bold: **text**
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Line breaks
  html = html.replace(/\n/g, '<br>');
  
  return html;
}

// Clear all active streaming intervals
function clearActiveStreams() {
  activeStreamTimeouts.forEach(t => clearTimeout(t));
  activeStreamTimeouts = [];
  
  // Remove any remaining cursor elements
  const cursors = document.querySelectorAll(".streaming-cursor");
  cursors.forEach(c => c.remove());
}

// Token-based Typewriter Streaming Simulator
function streamHTMLContent(element, htmlContent, speed = 4, onComplete) {
  element.innerHTML = "";
  
  // Tokenize HTML to prevent rendering broken markup during typewriter updates
  const tokens = [];
  let current = "";
  let inTag = false;
  
  for (let char of htmlContent) {
    if (char === '<') {
      if (current) {
        tokens.push(...current.split(""));
        current = "";
      }
      inTag = true;
      current += char;
    } else if (char === '>') {
      current += char;
      tokens.push(current);
      current = "";
      inTag = false;
    } else {
      current += char;
    }
  }
  if (current) {
    if (inTag) {
      tokens.push(current);
    } else {
      tokens.push(...current.split(""));
    }
  }
  
  // Create cursor indicator
  const cursor = document.createElement("span");
  cursor.className = "streaming-cursor";
  element.appendChild(cursor);
  
  let i = 0;
  function step() {
    if (i < tokens.length) {
      const token = tokens[i];
      cursor.insertAdjacentHTML('beforebegin', token);
      i++;
      
      // Auto scroll container
      const scrollParent = element.closest('.pane-scroll-area');
      if (scrollParent) {
        scrollParent.scrollTop = scrollParent.scrollHeight;
      }
      
      const timeoutId = setTimeout(step, speed);
      activeStreamTimeouts.push(timeoutId);
    } else {
      cursor.remove();
      if (onComplete) onComplete();
    }
  }
  
  step();
}

// Text Typewriter (for raw prompt string)
function streamRawText(element, text, speed = 8, onComplete) {
  element.textContent = "";
  let i = 0;
  
  function step() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      const timeoutId = setTimeout(step, speed);
      activeStreamTimeouts.push(timeoutId);
    } else {
      if (onComplete) onComplete();
    }
  }
  
  step();
}

// Render active focus area
function renderPersona(key) {
  activePersonaKey = key;
  const data = personasData[key];
  
  // Render question tabs
  const questionTabs = document.getElementById("question-tabs");
  questionTabs.innerHTML = "";
  
  data.questions.forEach((q, index) => {
    const btn = document.createElement("button");
    btn.className = `btn-question ${index === activeQuestionIndex ? "active" : ""}`;
    btn.textContent = q.label;
    btn.addEventListener("click", () => {
      selectQuestion(index);
    });
    questionTabs.appendChild(btn);
  });
  
  selectQuestion(0);
}

// Select active question
function selectQuestion(index) {
  activeQuestionIndex = index;
  
  // Toggle active class on buttons
  const buttons = document.querySelectorAll(".btn-question");
  buttons.forEach((btn, idx) => {
    if (idx === index) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
  
  updatePlayground();
}

// Update playground interface (IDE mock, question, answers)
function updatePlayground() {
  // Clear any ongoing typewriter animations
  clearActiveStreams();

  const persona = personasData[activePersonaKey];
  const qData = persona.questions[activeQuestionIndex];
  const ide = ideConfigs[activeIdeKey];
  
  // Update IDE layout classes
  const mockContainer = document.getElementById("mock-ide-container");
  mockContainer.className = `mock-ide ${ide.theme} ${ide.layout}`;
  
  // Show / hide sidebars based on active IDE key
  const ideSidebar = document.getElementById("mock-ide-sidebar");
  const activityBar = document.getElementById("mock-ide-activity-bar");
  const rightSidebar = document.getElementById("mock-ide-right-sidebar");
  const inputBar = document.querySelector(".mock-chat-input-bar");

  // Update window title
  document.getElementById("mock-ide-title").textContent = ide.name;

  if (activeIdeKey === "claude") {
    ideSidebar.style.display = "none";
    activityBar.style.display = "none";
    rightSidebar.style.display = "none";
    inputBar.style.display = "none"; // Claude web chat handles its own inputs
  } else if (activeIdeKey === "intellij") {
    ideSidebar.style.display = "flex";
    activityBar.style.display = "none";
    rightSidebar.style.display = "flex";
    inputBar.style.display = "flex";
  } else {
    // cursor, vscode, copilot
    ideSidebar.style.display = "flex";
    activityBar.style.display = "flex";
    rightSidebar.style.display = "none";
    inputBar.style.display = "flex";
  }
  
  // Dynamically swap O'Reilly Logo based on Light/Dark environment
  const headerLogo = document.querySelector(".brand-logo");
  const paneLogo = document.querySelector(".pane-logo");
  const modalLogo = document.querySelector(".modal-logo-img");

  if (activeIdeKey === "claude") {
    // Claude is a light environment -> use black logo inside the pane
    paneLogo.src = "logo_black.png";
  } else {
    // Other IDEs are dark -> use white logo
    paneLogo.src = "logo_white.png";
  }
  
  // Set up panels with loading states
  const mcpContainer = document.getElementById("mcp-response-body");
  const genericContainer = document.getElementById("generic-response-body");
  const citationsContainer = document.getElementById("mcp-citations-list");
  const genSourcesContainer = document.getElementById("generic-sources-list");
  
  citationsContainer.innerHTML = "";
  genSourcesContainer.innerHTML = "";
  
  // Trigger user question typing
  const promptEl = document.getElementById("simulated-prompt");
  promptEl.textContent = "";
  
  mcpContainer.innerHTML = `<div class="loading-state">Streaming database response...</div>`;
  genericContainer.innerHTML = `<div class="loading-state">Querying standard model...</div>`;
  
  // 1. Type prompt
  streamRawText(promptEl, qData.question, 6, () => {
    // Once prompt typing completes, show thinking state brief transition
    mcpContainer.innerHTML = "";
    genericContainer.innerHTML = "";
    
    // 2. Stream MCP grounded answer
    streamHTMLContent(mcpContainer, formatMarkdown(qData.mcp), 5, () => {
      // Reveal Citations once done
      qData.mcpCitations.forEach((cit) => {
        const badge = document.createElement("div");
        badge.className = "citation-badge";
        badge.innerHTML = `
          <span class="cit-author">${cit.author}</span>
          <span class="cit-book">${cit.book}</span>
        `;
        badge.addEventListener("click", () => {
          showCitationModal(cit);
        });
        citationsContainer.appendChild(badge);
      });
    });
    
    // 3. Stream Generic answer (Simultaneously)
    streamHTMLContent(genericContainer, formatMarkdown(qData.generic), 5, () => {
      // Reveal Generic Sources once done
      if (qData.genericSources) {
        qData.genericSources.forEach((src) => {
          const badge = document.createElement("div");
          badge.className = "generic-source-badge";
          badge.innerHTML = `
            <div class="gen-source-row">
              <span class="gen-src-type">${src.source}</span>
              <span class="gen-src-date">${src.date}</span>
            </div>
            <span class="gen-src-detail">${src.detail}</span>
          `;
          genSourcesContainer.appendChild(badge);
        });
      }
    });
  });
}

// Citation Modal
function showCitationModal(cit) {
  document.getElementById("modal-author-name").textContent = cit.author;
  document.getElementById("modal-author-role").textContent = cit.role;
  document.getElementById("modal-book-title").textContent = cit.book;
  document.getElementById("modal-chapter-info").textContent = cit.chapter;
  document.getElementById("modal-author-bio").textContent = cit.bio;
  
  const modal = document.getElementById("citation-modal");
  modal.style.display = "flex";
  modal.classList.add("active");
}

function closeCitationModal() {
  const modal = document.getElementById("citation-modal");
  modal.style.display = "none";
  modal.classList.remove("active");
}

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
  // Bind focus area selectors (client-facing tabs)
  const focusButtons = document.querySelectorAll(".focus-tab-btn");
  focusButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      focusButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderPersona(btn.dataset.persona);
    });
  });
  
  // Bind IDE selectors
  const ideButtons = document.querySelectorAll(".ide-tab-btn");
  ideButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      ideButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeIdeKey = btn.dataset.ide;
      updatePlayground();
    });
  });
  
  // Bind modal close buttons
  document.getElementById("modal-close-btn").addEventListener("click", closeCitationModal);
  document.getElementById("citation-modal").addEventListener("click", (e) => {
    if (e.target.id === "citation-modal") {
      closeCitationModal();
    }
  });
  
  // Initial render
  renderPersona("exec");
});
