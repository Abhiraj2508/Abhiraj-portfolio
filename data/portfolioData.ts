import {
  Boxes,
  Cloud,
  Code2,
  Container,
  GitBranch,
  Server,
  Terminal as TerminalIcon,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export interface TechDetail {
  use: string;
  fit: string;
  related: string;
  projects: string;
}

export const TECH_INFO: Record<string, TechDetail> = {
  AWS: {
    use: "Provisions and hosts cloud infrastructure — EC2 compute, S3 storage, IAM access control, VPC networking.",
    fit: "Foundation layer — cloud instances, managed clusters and storage buckets.",
    related: "Terraform, EC2, S3, IAM, VPC, EKS",
    projects: "AWS Infrastructure Automation, Kubernetes Deployment",
  },
  Linux: {
    use: "Operating system for every server, container host and pipeline runner.",
    fit: "Underneath the entire stack — automation, shell scripting, networking, and system administration.",
    related: "Bash, Networking, Systemd, Docker",
    projects: "All live systems",
  },
  Git: {
    use: "Version control for every codebase and infrastructure-as-code repository.",
    fit: "The initial trigger point of every CI/CD pipeline.",
    related: "GitHub, Jenkins, Webhooks, CI/CD",
    projects: "Automated CI/CD Pipeline, AWS Infrastructure",
  },
  Docker: {
    use: "Packages applications and dependencies into isolated, reproducible, lightweight container images.",
    fit: "Sits between build and deploy — the standard deployment artifact for modern clusters.",
    related: "Kubernetes, Jenkins, Docker Hub, Linux",
    projects: "All three live systems",
  },
  Kubernetes: {
    use: "Orchestrates containerized applications at scale — deployments, services, ingress, self-healing, rolling updates.",
    fit: "Runtime orchestration platform receiving images built and tested by CI/CD.",
    related: "Docker, Helm, Prometheus, Grafana, AWS EKS",
    projects: "Kubernetes Application Deployment, DevSecOps Pipeline",
  },
  Jenkins: {
    use: "Automates build, test, vulnerability scanning and deployment stages of the pipeline.",
    fit: "The automation workhorse that turns a git commit into a production-ready deployment.",
    related: "GitHub, Docker, SonarQube, Trivy, Kubernetes",
    projects: "Automated CI/CD Pipeline (DevSecOps)",
  },
  Terraform: {
    use: "Defines cloud resources as declarative, version-controlled, reusable code.",
    fit: "Provisions cloud VPCs, compute instances and IAM roles before application containers run.",
    related: "AWS, EC2, VPC, IAM, S3",
    projects: "AWS Infrastructure Automation",
  },
  Prometheus: {
    use: "Scrapes and stores multi-dimensional time-series metrics from nodes, pods and apps.",
    fit: "Continuously watches cluster and service health post-deployment.",
    related: "Grafana, Kubernetes, Alertmanager",
    projects: "Kubernetes Application Deployment",
  },
  Grafana: {
    use: "Visualizes time-series telemetry into responsive, observable real-time dashboards.",
    fit: "The observability cockpit providing visibility into system metrics and incidents.",
    related: "Prometheus, Kubernetes, Linux",
    projects: "Kubernetes Application Deployment",
  },
  Nginx: {
    use: "High-performance reverse proxy, ingress controller and SSL termination gateway.",
    fit: "Front door of incoming web traffic, routing requests to containers.",
    related: "DNS, TCP/IP, Ingress, SSL/TLS",
    projects: "Network-facing deployments",
  },
};

export const ORBITS = [
  { r: 92, items: ["AWS", "Linux", "Git"] },
  { r: 148, items: ["Docker", "Kubernetes", "Jenkins"] },
  { r: 204, items: ["Terraform", "Prometheus", "Grafana", "Nginx"] },
];

export interface SystemProject {
  id: string;
  name: string;
  steps: string[];
  stack: string[];
  bullets: string[];
  result: string;
  cluster: "cicd" | "cloud" | "containers";
}

export const SYSTEMS: SystemProject[] = [
  {
    id: "SYS-01",
    name: "Automated CI/CD Pipeline",
    steps: [
      "GitHub",
      "Jenkins",
      "Maven/Node Build",
      "Docker Image",
      "Container Deploy",
      "Smoke Testing",
      "Docker Hub Push",
    ],
    stack: ["Docker", "Jenkins", "GitHub", "CI/CD"],
    bullets: [
      "Automated source code checkout triggered by GitHub commits and webhooks.",
      "Automated application build, verification and testing inside isolated runners.",
      "Docker container image packaging, optimization and local deployment.",
      "Pipeline smoke testing and artifact publishing to Docker Hub.",
    ],
    result:
      "Result: Automated end-to-end software delivery, eliminating manual intervention and ensuring consistent deployments.",
    cluster: "cicd",
  },
  {
    id: "SYS-02",
    name: "Automated Kubernetes Deployment & Monitoring Platform",
    steps: [
      "Minikube Cluster",
      "NGINX Deploy",
      "Helm Charts",
      "Prometheus Stack",
      "Grafana Dashboards",
      "Alertmanager",
      "Self-Healing Test",
    ],
    stack: ["Kubernetes", "Minikube", "Docker", "Helm", "Prometheus", "Grafana", "Alertmanager"],
    bullets: [
      "Managed local Kubernetes cluster and deployed demo application with Deployments and Services.",
      "Configured multi-replica application, Ingress routing, ConfigMaps, and Secrets.",
      "Packaged and deployed applications using custom Helm charts with upgrade and rollback support.",
      "Installed kube-prometheus-stack and configured custom Grafana observability dashboards.",
      "Tested cluster self-healing and verified automated Prometheus alerts upon pod restarts.",
    ],
    result:
      "Result: Resilient container orchestration with proactive observability, self-healing verification and automated alerting.",
    cluster: "containers",
  },
  {
    id: "SYS-03",
    name: "Automated CI/CD Pipeline for React Application",
    steps: [
      "GitHub Push",
      "GitHub Webhook",
      "Jenkins Checkout",
      "Vite Production Build",
      "Docker Image Build",
      "Docker Hub Push",
      "Container Deploy :8086",
      "Smoke Testing",
    ],
    stack: ["React", "Vite", "Jenkins", "Docker", "Docker Hub", "Nginx", "GitHub Webhooks", "CI/CD"],
    bullets: [
      "Automated pipeline trigger via GitHub Webhooks upon developer push events.",
      "Automated source-code checkout and project validation inside Jenkins.",
      "Compiled production React application assets using Vite and Node.js.",
      "Packaged into lightweight Docker container image and published to Docker Hub registry.",
      "Deployed updated container (foodies-react-container) on port 8086 with automated smoke testing.",
    ],
    result:
      "Result: Zero-touch continuous deployment from git commit to live containerized React application with automated validation.",
    cluster: "cicd",
  },
];

export const DEPLOY_STEPS = [
  "Git push detected",
  "Pipeline triggered",
  "Source checkout",
  "Dependency installation",
  "Docker image building",
  "Image pushed to Docker Hub",
  "Deployment started on Kubernetes",
  "Deployment successful",
];

export const NET_NODES = ["CLIENT", "DNS", "NGINX", "APPLICATION", "CONTAINER", "DATABASE"];

export const NET_CONN_INFO = [
  { proto: "DNS", port: "53", request: "Resolve domain abhiraj.dev", response: "A record -> 76.76.21.21", status: "200 OK" },
  { proto: "HTTPS", port: "443", request: "GET /", response: "302 -> /app (TLS 1.3)", status: "302 Found" },
  { proto: "HTTP", port: "8080", request: "Proxy pass -> upstream", response: "App response", status: "200 OK" },
  { proto: "gRPC", port: "50051", request: "Internal cluster RPC", response: "Container response ack", status: "200 OK" },
  { proto: "TCP", port: "5432", request: "SELECT * FROM health_check", response: "Cluster healthy (1 row)", status: "200 OK" },
];

export interface EndpointItem {
  name: string;
  endpoint: string;
  url?: string;
  isResume?: boolean;
}

export const ENDPOINTS: EndpointItem[] = [
  { name: "GitHub", endpoint: "github.com/Abhiraj2508", url: "https://github.com/Abhiraj2508" },
  { name: "LinkedIn", endpoint: "linkedin.com/in/abhiraj2508/", url: "https://www.linkedin.com/in/abhiraj2508/" },
  { name: "Email", endpoint: "abhirajpratap250802@gmail.com", url: "https://mail.google.com/mail/?view=cm&fs=1&to=abhirajpratap250802@gmail.com" },
  { name: "Resume", endpoint: "resume.pdf", isResume: true },
];

export interface SkillItem {
  name: string;
  category: string;
  icon: LucideIcon;
  level: string;
  roadmap: string;
  description: string;
}

export const SKILLS_LIST: SkillItem[] = [
  {
    name: "Docker",
    category: "CONTAINERIZATION",
    icon: Container,
    level: "Learning & Project Practice",
    roadmap: "Part of my current learning roadmap",
    description:
      "Building reproducible container images, multi-stage Dockerfiles, volume management, container networking, and local cluster testing.",
  },
  {
    name: "Jenkins",
    category: "CI/CD AUTOMATION",
    icon: Workflow,
    level: "Project Practice",
    roadmap: "Part of my current learning roadmap",
    description:
      "Automated CI/CD pipelines, build triggers, automated testing, SonarQube code quality gates, and container deployments.",
  },
  {
    name: "Kubernetes",
    category: "ORCHESTRATION",
    icon: Boxes,
    level: "Learning",
    roadmap: "Part of my current learning roadmap",
    description:
      "Configuring multi-container Pods, Deployments, ClusterIP/NodePort Services, Ingress controllers, and Helm charts.",
  },
  {
    name: "AWS",
    category: "CLOUD PLATFORM",
    icon: Cloud,
    level: "Learning",
    roadmap: "Part of my current learning roadmap",
    description:
      "Provisioning cloud compute (EC2), storage (S3), identity management (IAM), VPC networking, and security groups.",
  },
  {
    name: "Linux",
    category: "OPERATING SYSTEM",
    icon: TerminalIcon,
    level: "Learning & Practice",
    roadmap: "Part of my current learning roadmap",
    description:
      "Core operating system foundation, Bash shell scripting, systemd service management, SSH, and networking fundamentals.",
  },
  {
    name: "Git & GitHub",
    category: "VERSION CONTROL",
    icon: GitBranch,
    level: "Project Practice",
    roadmap: "Part of my current learning roadmap",
    description:
      "Branch management, pull requests, semantic versioning, and GitHub webhook integrations with CI/CD runners.",
  },
  {
    name: "CI/CD",
    category: "AUTOMATION",
    icon: Server,
    level: "Project Practice",
    roadmap: "Part of my current learning roadmap",
    description:
      "Automating source checkout, dependency installation, security scanning, container packaging, and production rollouts.",
  },
  {
    name: "JavaScript",
    category: "PROGRAMMING",
    icon: Code2,
    level: "Learning & Practice",
    roadmap: "Part of my current learning roadmap",
    description:
      "Application logic, script automation, Node.js tooling, and interactive frontend & backend integrations.",
  },
];

