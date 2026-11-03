"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  Cloud,
  Code2,
  Container,
  Download,
  ExternalLink,
  GitBranch,
  Mail,
  Server,
  ShieldCheck,
  Terminal as TerminalIcon,
  Workflow,
  Zap,
} from "lucide-react";

// --- DATA STRUCTURES ---

interface TechDetail {
  use: string;
  fit: string;
  related: string;
  projects: string;
}

const TECH_INFO: Record<string, TechDetail> = {
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

const ORBITS = [
  { r: 92, items: ["AWS", "Linux", "Git"] },
  { r: 148, items: ["Docker", "Kubernetes", "Jenkins"] },
  { r: 204, items: ["Terraform", "Prometheus", "Grafana", "Nginx"] },
];

interface SystemProject {
  id: string;
  name: string;
  steps: string[];
  stack: string[];
  bullets: string[];
  result: string;
  cluster: "cicd" | "cloud" | "containers";
}

const SYSTEMS: SystemProject[] = [
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
];

const DEPLOY_STEPS = [
  "Git push detected",
  "Pipeline triggered",
  "Source checkout",
  "Dependency installation",
  "Docker image building",
  "Image pushed to Docker Hub",
  "Deployment started on Kubernetes",
  "Deployment successful",
];

const NET_NODES = ["CLIENT", "DNS", "NGINX", "APPLICATION", "CONTAINER", "DATABASE"];

const NET_CONN_INFO = [
  { proto: "DNS", port: "53", request: "Resolve domain abhiraj.dev", response: "A record -> 76.76.21.21", status: "200 OK" },
  { proto: "HTTPS", port: "443", request: "GET /", response: "302 -> /app (TLS 1.3)", status: "302 Found" },
  { proto: "HTTP", port: "8080", request: "Proxy pass -> upstream", response: "App response", status: "200 OK" },
  { proto: "gRPC", port: "50051", request: "Internal cluster RPC", response: "Container response ack", status: "200 OK" },
  { proto: "TCP", port: "5432", request: "SELECT * FROM health_check", response: "Cluster healthy (1 row)", status: "200 OK" },
];

const ENDPOINTS = [
  { name: "GitHub", endpoint: "github.com/Abhiraj2508", url: "https://github.com/Abhiraj2508" },
  { name: "LinkedIn", endpoint: "linkedin.com/in/abhiraj-pratap-951753241/", url: "https://linkedin.com/in/abhiraj-pratap-951753241/" },
  { name: "Email", endpoint: "abhirajpratap250802@gmail.com", url: "https://mail.google.com/mail/?view=cm&fs=1&to=abhirajpratap250802@gmail.com" },
  { name: "Resume", endpoint: "resume.pdf", isResume: true },
];

const SKILLS_LIST = [
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

export default function Home() {
  // Navigation & UI state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Orbital system state
  const [selectedTech, setSelectedTech] = useState<string>("Kubernetes");

  // Tech stack 2nd section state
  const [selectedSkillName, setSelectedSkillName] = useState<string>("Docker");
  const activeSkill = SKILLS_LIST.find((s) => s.name === selectedSkillName) || SKILLS_LIST[0];
  const ActiveSkillIcon = activeSkill.icon;

  // Deployment simulator state
  const [deploying, setDeploying] = useState(false);
  const [deployStepIndex, setDeployStepIndex] = useState(-1);

  // Network map state
  const [netInfo, setNetInfo] = useState<string>("Click a connection above to inspect it.");

  // Terminal state
  const [termHistory, setTermHistory] = useState<Array<{ cmd?: string; text: string; cls?: string }>>([
    { text: "Welcome to ABHIRAJ.OS — type help to see available commands.", cls: "t-dir" },
  ]);
  const [termInput, setTermInput] = useState("");
  const [termCwd, setTermCwd] = useState("~");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdHistoryIdx, setCmdHistoryIdx] = useState(-1);
  const [isConsoleFlashing, setIsConsoleFlashing] = useState(false);

  // 3D Hero Scene references
  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const termInputRef = useRef<HTMLInputElement | null>(null);
  const termScrollRef = useRef<HTMLDivElement | null>(null);

  // 3D Scene Controller ref
  const sceneControllerRef = useRef<{
    focusCluster: (clusterKey: "cloud" | "containers" | "cicd" | "monitor" | "network", silent?: boolean) => void;
  } | null>(null);

  // Helper toast dispatcher
  function showToast(msg: string) {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message: msg }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }

  // Keyboard shortcut for console backtick & modal escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (activeModal) {
          setActiveModal(null);
        }
      } else if (e.key === "`") {
        if (document.activeElement !== termInputRef.current) {
          e.preventDefault();
          openConsole();
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModal]);


  // ACTIVE SECTION SCROLL SPY
  useEffect(() => {
    function onScroll() {
      const sections = document.querySelectorAll<HTMLElement>(".section, #hero");
      let curr = "hero";
      sections.forEach((sec) => {
        if (window.scrollY >= sec.offsetTop - 220) {
          curr = sec.id;
        }
      });
      setActiveSection(curr);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // THREE.JS 3D HERO WORLD SETUP
  useEffect(() => {
    if (!heroCanvasRef.current) return;

    const canvas = heroCanvasRef.current;
    const heroSec = document.getElementById("hero");
    if (!heroSec) return;

    const wrap = canvas.parentElement || heroSec;
    const initialWidth = wrap.clientWidth;
    const initialHeight = wrap.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08070d, 0.016);

    const camera = new THREE.PerspectiveCamera(50, initialWidth / initialHeight, 0.1, 300);
    const defaultCamPos = new THREE.Vector3(0, 10, 42);
    const defaultTarget = new THREE.Vector3(0, 2, 0);
    camera.position.copy(defaultCamPos);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(initialWidth, initialHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const ambient = new THREE.AmbientLight(0x9988cc, 0.7);
    scene.add(ambient);

    const pt1 = new THREE.PointLight(0xa855f7, 2.5, 70);
    pt1.position.set(12, 12, 10);
    scene.add(pt1);

    const pt2 = new THREE.PointLight(0x7e22ce, 2, 70);
    pt2.position.set(-12, -8, 6);
    scene.add(pt2);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.target.copy(defaultTarget);
    controls.enablePan = false;
    controls.minDistance = 14;
    controls.maxDistance = 65;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.35;
    controls.update();

    const CLUSTERS = {
      cloud: { color: 0xc084fc, label: "AWS CLOUD", items: ["AWS", "VPC", "EC2", "S3", "IAM"] },
      containers: { color: 0xa855f7, label: "CONTAINERS", items: ["Docker", "Kubernetes"] },
      cicd: { color: 0x4ade80, label: "CI/CD", items: ["GitHub", "Jenkins", "Build", "Test", "Deploy"] },
      monitor: { color: 0xf59e0b, label: "MONITORING", items: ["Prometheus", "Grafana"] },
      network: { color: 0xf5f3fa, label: "NETWORK", items: ["Nginx", "DNS"] },
    };

    const nodeMeshes: THREE.Mesh[] = [];
    const particleGroups: Array<{
      a: THREE.Vector3;
      b: THREE.Vector3;
      packet: THREE.Mesh;
      t: number;
      speed: number;
    }> = [];
    const nodesByCluster: Record<string, THREE.Mesh[]> = {
      cloud: [],
      containers: [],
      cicd: [],
      monitor: [],
      network: [],
    };

    function makeNode(x: number, y: number, z: number, color: number, label: string, cluster: string, size = 1.1) {
      const geo = new THREE.IcosahedronGeometry(size, 1);
      const mat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.4,
        roughness: 0.3,
        metalness: 0.4,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.userData = { label, cluster, baseEmissive: 0.4, baseColor: color };
      scene.add(mesh);
      nodeMeshes.push(mesh);

      const halo = new THREE.Mesh(
        new THREE.IcosahedronGeometry(size * 1.35, 1),
        new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.18 })
      );
      halo.position.copy(mesh.position);
      scene.add(halo);
      mesh.userData.halo = halo;

      return mesh;
    }

    function connectNodes(a?: THREE.Vector3, b?: THREE.Vector3, color: number = 0xa855f7) {
      if (!a || !b) return;
      const points = [a.clone(), b.clone()];
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.3 });
      const line = new THREE.Line(geo, mat);
      scene.add(line);

      const packetGeo = new THREE.SphereGeometry(0.18, 8, 8);
      const packetMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95 });
      const packet = new THREE.Mesh(packetGeo, packetMat);
      scene.add(packet);
      particleGroups.push({ a, b, packet, t: Math.random(), speed: 0.15 + Math.random() * 0.12 });
    }

    // Build world positions
    const cloudPositions: [string, number, number, number][] = [
      ["AWS", 0, 10, -4],
      ["VPC", 0, 6.5, -4],
      ["EC2", -3.2, 3, -4],
      ["S3", 3.2, 3, -4],
    ];
    const cicdPositions: [string, number, number, number][] = [
      ["GitHub", 10, 10, 2],
      ["CI/CD", 10, 6.8, 2],
      ["Build", 10, 3.6, 2],
      ["Test", 10, 0.4, 2],
      ["Deploy", 10, -2.8, 2],
    ];
    const containerPositions: [string, number, number, number][] = [
      ["Docker", -1.6, -0.5, 0],
      ["Kubernetes", 1.6, -3.4, 0],
    ];
    const monitorPositions: [string, number, number, number][] = [
      ["Prometheus", -6, -4.5, 3],
      ["Grafana", -8.5, -2, 3],
    ];
    const networkPositions: [string, number, number, number][] = [
      ["Nginx", 4.5, -0.6, 4],
      ["DNS", 6.5, -3, 5],
    ];

    const groupDefs: Array<[keyof typeof CLUSTERS, [string, number, number, number][]]> = [
      ["cloud", cloudPositions],
      ["cicd", cicdPositions],
      ["containers", containerPositions],
      ["monitor", monitorPositions],
      ["network", networkPositions],
    ];

    groupDefs.forEach(([clusterKey, positions]) => {
      positions.forEach(([label, x, y, z]) => {
        const mesh = makeNode(
          x,
          y,
          z,
          CLUSTERS[clusterKey].color,
          label,
          clusterKey,
          label.length > 6 ? 1.25 : 1.0
        );
        nodesByCluster[clusterKey].push(mesh);
      });
    });

    // Node interconnect cables
    const cn = nodesByCluster.cloud;
    connectNodes(cn[0].position, cn[1].position, CLUSTERS.cloud.color);
    connectNodes(cn[1].position, cn[2].position, CLUSTERS.cloud.color);
    connectNodes(cn[1].position, cn[3].position, CLUSTERS.cloud.color);
    connectNodes(cn[2].position, nodesByCluster.containers[0].position, CLUSTERS.containers.color);

    const ci = nodesByCluster.cicd;
    for (let i = 0; i < ci.length - 1; i++) {
      connectNodes(ci[i].position, ci[i + 1].position, CLUSTERS.cicd.color);
    }
    connectNodes(ci[ci.length - 1].position, nodesByCluster.containers[0].position, CLUSTERS.cicd.color);

    connectNodes(nodesByCluster.containers[0].position, nodesByCluster.containers[1].position, CLUSTERS.containers.color);
    connectNodes(nodesByCluster.containers[1].position, nodesByCluster.monitor[0].position, CLUSTERS.monitor.color);
    connectNodes(nodesByCluster.monitor[0].position, nodesByCluster.monitor[1].position, CLUSTERS.monitor.color);
    connectNodes(nodesByCluster.containers[1].position, nodesByCluster.network[0].position, CLUSTERS.network.color);
    connectNodes(nodesByCluster.network[0].position, nodesByCluster.network[1].position, CLUSTERS.network.color);

    // Background particle dust
    const starGeo = new THREE.BufferGeometry();
    const starCount = 600;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 90;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 60 - 10;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0x4c1d95, size: 0.16, transparent: true, opacity: 0.8 });
    scene.add(new THREE.Points(starGeo, starMat));

    // Camera animation state
    let camAnimId: number | null = null;
    function animateCamera(toPos: THREE.Vector3, toTarget: THREE.Vector3, duration = 1000) {
      const fromPos = camera.position.clone();
      const fromTarget = controls.target.clone();
      const start = performance.now();
      if (camAnimId) cancelAnimationFrame(camAnimId);

      function step(now: number) {
        const t = Math.min((now - start) / duration, 1);
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        camera.position.lerpVectors(fromPos, toPos, ease);
        controls.target.lerpVectors(fromTarget, toTarget, ease);
        controls.update();
        if (t < 1) {
          camAnimId = requestAnimationFrame(step);
        }
      }
      camAnimId = requestAnimationFrame(step);
    }

    function focusCluster(clusterKey: keyof typeof CLUSTERS, silent = false) {
      const nodes = nodesByCluster[clusterKey];
      if (!nodes || !nodes.length) return;
      const center = new THREE.Vector3();
      nodes.forEach((n) => center.add(n.position));
      center.divideScalar(nodes.length);

      const dir = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();
      const newCamPos = center.clone().add(dir.multiplyScalar(16));

      controls.autoRotate = false;
      animateCamera(newCamPos, center, 1100);

      nodeMeshes.forEach((m) => {
        const active = m.userData.cluster === clusterKey;
        (m.material as THREE.MeshStandardMaterial).emissiveIntensity = active ? 1.2 : 0.15;
        (m.userData.halo.material as THREE.MeshBasicMaterial).opacity = active ? 0.6 : 0.06;
      });

      if (!silent) {
        document.getElementById("hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
        showToast("▶ Focused 3D Cluster: " + CLUSTERS[clusterKey].label);
      }
      setTimeout(() => {
        controls.autoRotate = true;
      }, 6000);
    }

    sceneControllerRef.current = { focusCluster };

    // Raycasting hover & click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredMesh: THREE.Mesh | null = null;
    const tooltipEl = document.getElementById("node-tooltip");

    function onCanvasMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(nodeMeshes);

      if (hits.length) {
        const mesh = hits[0].object as THREE.Mesh;
        if (hoveredMesh !== mesh) {
          if (hoveredMesh) hoveredMesh.scale.set(1, 1, 1);
          hoveredMesh = mesh;
          mesh.scale.set(1.25, 1.25, 1.25);
        }
        if (tooltipEl) {
          tooltipEl.textContent = mesh.userData.label;
          tooltipEl.style.left = e.clientX - rect.left + "px";
          tooltipEl.style.top = e.clientY - rect.top + "px";
          tooltipEl.classList.add("show");
        }
        canvas.style.cursor = "pointer";
      } else {
        if (hoveredMesh) {
          hoveredMesh.scale.set(1, 1, 1);
          hoveredMesh = null;
        }
        tooltipEl?.classList.remove("show");
        canvas.style.cursor = "default";
      }
    }

    function onCanvasClick() {
      if (hoveredMesh) {
        focusCluster(hoveredMesh.userData.cluster);
      }
    }

    canvas.addEventListener("mousemove", onCanvasMove);
    canvas.addEventListener("click", onCanvasClick);

    function onResize() {
      const wrap = canvas.parentElement || heroSec;
      if (!wrap || !camera || !renderer) return;
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animFrame: number;
    function renderLoop() {
      animFrame = requestAnimationFrame(renderLoop);
      const t = performance.now() * 0.001;

      nodeMeshes.forEach((m, i) => {
        m.rotation.y += 0.004;
        m.position.y += Math.sin(t * 0.6 + i) * 0.0015;
        m.userData.halo.position.copy(m.position);
        m.userData.halo.rotation.y -= 0.003;
      });

      particleGroups.forEach((p) => {
        if (!p.a || !p.b || !p.packet) return;
        p.t += 0.0025 * (1 + p.speed);
        if (p.t > 1) p.t = 0;
        p.packet.position.lerpVectors(p.a, p.b, p.t);
      });

      controls.update();
      renderer.render(scene, camera);
    }
    renderLoop();

    return () => {
      cancelAnimationFrame(animFrame);
      if (camAnimId) cancelAnimationFrame(camAnimId);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onCanvasMove);
      canvas.removeEventListener("click", onCanvasClick);
      renderer.dispose();
    };
  }, []);

  // DEPLOYMENT SIMULATOR
  function triggerDeploy() {
    if (deploying) return;
    setDeploying(true);
    setDeployStepIndex(0);
    showToast("▶ Pipeline trigger: enterprise-cicd-devsecops");
    sceneControllerRef.current?.focusCluster("cicd", true);

    DEPLOY_STEPS.forEach((_, i) => {
      setTimeout(() => {
        setDeployStepIndex(i);
        if (i === DEPLOY_STEPS.length - 1) {
          setTimeout(() => {
            setDeployStepIndex(DEPLOY_STEPS.length);
            setDeploying(false);
            showToast("✓ Deployment successful to Kubernetes cluster");
            sceneControllerRef.current?.focusCluster("containers", true);
          }, 600);
        }
      }, i * 650);
    });
  }

  // TERMINAL EMULATOR
  function openConsole() {
    document.getElementById("terminal-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsConsoleFlashing(true);
    setTimeout(() => setIsConsoleFlashing(false), 700);
    setTimeout(() => termInputRef.current?.focus(), 450);
  }

  function handleTermSubmit(e: React.FormEvent) {
    e.preventDefault();
    const raw = termInput.trim();
    if (!raw) return;

    setCmdHistory((prev) => [...prev, raw]);
    setCmdHistoryIdx(cmdHistory.length + 1);
    setTermInput("");

    const newLines: Array<{ cmd?: string; text: string; cls?: string }> = [
      { cmd: raw, text: `abhiraj@devops:${termCwd}$ ${raw}` },
    ];

    const [base, ...rest] = raw.split(" ");
    const argStr = rest.join(" ").trim();

    switch (base) {
      case "help":
        newLines.push({
          text: `Available commands:
  whoami            about the engineer
  neofetch          system & technology stack summary
  ls                list current directory
  cd [dir]          change directory
  pwd               print working directory
  cat [file]        read file contents (try: cat resume.pdf)
  clear             clear terminal screen
  history           show command history
  man devops        open the DevOps manual
  git log           show version control commits
  docker ps         list running containers
  kubectl get pods  list cluster pods
  terraform plan    preview infrastructure
  aws               cloud environment info
  systemctl status  service observability status
  curl / ping       network testing utilities
  connect           open network connection (contact)
  ./deploy          trigger pipeline deployment simulator
  ./incident        open incident triage channel
  sudo hire abhiraj recruiter instant shortcut
  help              show this manual`,
          cls: "t-dir",
        });
        break;

      case "whoami":
        newLines.push({
          text: `Abhiraj Pratap Singh
Role: Aspiring DevOps Engineer
Focus: Cloud Infrastructure · CI/CD Automation · Containers · Linux · Observability
Status: Open to DevOps Engineer & Cloud opportunities`,
        });
        break;

      case "neofetch":
        newLines.push({
          text: `  ▓▓▓▓▓▓  ABHIRAJ.OS
  ▓▓  ▓▓  ───────────
  ▓▓▓▓▓▓
abhiraj@devops
--------------
OS:        ABHIRAJ.OS (DevOps Edition)
Engineer:  Abhiraj Pratap Singh
Shell:     bash 5.2
Cloud:     AWS (EC2, S3, IAM, VPC, EKS)
Runtime:   Docker, Kubernetes
CI/CD:     Jenkins, GitHub Actions
IaC:       Terraform
Observ:    Prometheus, Grafana
Status:    ● Available for opportunities`,
          cls: "t-ok",
        });
        break;

      case "pwd":
        newLines.push({ text: termCwd });
        break;

      case "clear":
        setTermHistory([]);
        return;

      case "history":
        newLines.push({
          text: cmdHistory.map((h, i) => `${i + 1}  ${h}`).join("\n"),
        });
        break;

      case "ls":
        if (termCwd === "~") {
          newLines.push({
            text: "about/   projects/   skills/   experience/   education/   certifications/   contact/   resume.pdf",
            cls: "t-dir",
          });
        } else if (termCwd === "~/projects") {
          newLines.push({
            text: "automated-cicd/   aws-infrastructure/   kubernetes-deployment/",
            cls: "t-dir",
          });
        } else {
          newLines.push({ text: "details.txt", cls: "t-dir" });
        }
        break;

      case "cd":
        if (!argStr || argStr === "~") {
          setTermCwd("~");
        } else if (argStr === "..") {
          setTermCwd("~");
        } else if (argStr === "projects" || argStr === "~/projects") {
          setTermCwd("~/projects");
        } else if (["about", "skills", "experience", "education", "contact"].includes(argStr)) {
          setTermCwd(`~/${argStr}`);
        } else {
          newLines.push({ text: `cd: ${argStr}: No such directory`, cls: "t-err" });
        }
        break;

      case "cat":
        if (argStr === "resume.pdf") {
          newLines.push({ text: "Opening resume.pdf in viewer...", cls: "t-ok" });
          setActiveModal("resume");
        } else if (argStr === "details.txt" || argStr === "profile.txt") {
          newLines.push({
            text: `Abhiraj Pratap Singh — DevOps Engineer
Focused on automated, scalable and observable infrastructure across AWS, Docker, Kubernetes and Jenkins.`,
          });
        } else {
          newLines.push({ text: `cat: ${argStr || ""}: No such file. Try: cat resume.pdf`, cls: "t-err" });
        }
        break;

      case "man":
        if (argStr === "devops") {
          newLines.push({
            text: `DEVOPS(1)                    Abhiraj's Manual                    DEVOPS(1)

NAME
    devops — automate, ship, observe

PRACTICES
    Linux         core OS, shell automation, performance tuning
    Networking    TCP/IP, DNS, HTTP/HTTPS, SSL/TLS, reverse proxies
    AWS           EC2, S3, IAM, VPC, RDS, EKS
    Docker        container packaging, lightweight images
    Kubernetes    declarative deployments, services, ingress, self-healing
    CI/CD         Jenkins automated pipelines, security gates
    Terraform     reusable infrastructure as code
    Monitoring    Prometheus metrics, Grafana visual dashboards

Explore any of these sections directly on this page.`,
          });
        } else {
          newLines.push({ text: `No manual entry for ${argStr}`, cls: "t-err" });
        }
        break;

      case "git":
        sceneControllerRef.current?.focusCluster("cicd");
        if (argStr === "log") {
          newLines.push({
            text: `commit 3f8a12e — Enterprise CI/CD Pipeline with Integrated Security (DevSecOps)
commit 8b2c45d — AWS Infrastructure Automation with Terraform
commit 9a4e76c — Kubernetes Application Deployment & Grafana Observability
● 3 infrastructure repositories active`,
            cls: "t-ok",
          });
        } else {
          newLines.push({ text: "usage: git log" });
        }
        break;

      case "docker":
        sceneControllerRef.current?.focusCluster("containers");
        if (argStr === "ps") {
          newLines.push({
            text: `CONTAINER ID   IMAGE                 STATUS         PORTS
c1a2b3         payments-api:latest   Up 3 hours     8080/tcp
d4e5f6         nginx:alpine          Up 3 hours     80/tcp, 443/tcp
2 containers running & healthy`,
            cls: "t-ok",
          });
        } else {
          newLines.push({ text: "usage: docker ps" });
        }
        break;

      case "kubectl":
        sceneControllerRef.current?.focusCluster("containers");
        if (argStr === "get pods") {
          newLines.push({
            text: `NAME                  READY   STATUS    RESTARTS   AGE
payments-api-7d9f     1/1     Running   0          14d
grafana-6f8c          1/1     Running   0          14d
prometheus-9a1d       1/1     Running   0          14d`,
            cls: "t-ok",
          });
        } else {
          newLines.push({ text: "usage: kubectl get pods" });
        }
        break;

      case "terraform":
        sceneControllerRef.current?.focusCluster("cloud");
        if (argStr === "plan") {
          newLines.push({
            text: `Terraform will perform the following actions:
  + aws_vpc.main
  + aws_instance.app_server
  + aws_security_group.allow_web
  + aws_iam_role.devops_role
Plan: 4 to add, 0 to change, 0 to destroy.`,
            cls: "t-ok",
          });
        } else {
          newLines.push({ text: "usage: terraform plan" });
        }
        break;

      case "aws":
        sceneControllerRef.current?.focusCluster("cloud");
        newLines.push({
          text: `Cloud: AWS
Services: EC2, S3, IAM, VPC, RDS, EKS
● cloud environment reachable & authenticated`,
          cls: "t-ok",
        });
        break;

      case "systemctl":
        sceneControllerRef.current?.focusCluster("monitor");
        newLines.push({
          text: `● monitoring.service — Observability Telemetry Stack
   Active: active (running)
   Engine: Prometheus + Grafana dashboards`,
          cls: "t-ok",
        });
        break;

      case "curl":
        sceneControllerRef.current?.focusCluster("network");
        newLines.push({
          text: `HTTP/1.1 200 OK
content-type: application/json

{ "status": "online", "engineer": "Abhiraj Pratap Singh", "available": true }`,
          cls: "t-ok",
        });
        break;

      case "ping":
        sceneControllerRef.current?.focusCluster("network");
        newLines.push({
          text: `64 bytes from abhiraj.os: icmp_seq=1 ttl=64 time=3.2ms
64 bytes from abhiraj.os: icmp_seq=2 ttl=64 time=3.1ms
0% packet loss — round-trip avg: 3.15ms`,
          cls: "t-ok",
        });
        break;

      case "connect":
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        newLines.push({ text: "Opening contact connection endpoints...", cls: "t-ok" });
        break;

      case "sudo":
        if (argStr === "hire abhiraj") {
          newLines.push({
            text: `[sudo] permission granted.
✓ Candidate request queued — Abhiraj will follow up promptly!
Redirecting to contact endpoints...`,
            cls: "t-ok",
          });
          setTimeout(() => {
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }, 700);
        } else {
          newLines.push({ text: "sudo: permission denied", cls: "t-err" });
        }
        break;

      case "./deploy":
        document.getElementById("pipeline")?.scrollIntoView({ behavior: "smooth" });
        newLines.push({ text: "Redirecting to Deployment Control simulator...", cls: "t-ok" });
        break;

      case "./incident":
        newLines.push({ text: "All systems nominal — 0 active incidents.", cls: "t-ok" });
        break;

      case "matrix":
        newLines.push({
          text: `01000001 01000010 01001000 01001001 01010010 01000001 01001010
Wake up, recruiter. The infrastructure has you.`,
          cls: "t-ok",
        });
        break;

      default:
        newLines.push({
          text: `command not found: ${base} — type 'help' for command listing`,
          cls: "t-err",
        });
        break;
    }

    setTermHistory((prev) => [...prev, ...newLines]);
  }

  // Auto scroll terminal output
  useEffect(() => {
    if (termScrollRef.current) {
      termScrollRef.current.scrollTop = termScrollRef.current.scrollHeight;
    }
  }, [termHistory]);

  return (
    <main className="relative min-h-screen">
      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />


      {/* TOP NAVIGATION */}
      <nav id="nav">
        <div className="logo">
          <img
            src="/avatar.jpg"
            alt="Abhiraj Pratap Singh"
            className="logo-avatar"
          />
          <span className="dot" /> ABHIRAJ.OS
        </div>
        <button id="nav-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          MENU
        </button>
        <ul id="nav-list" className={mobileMenuOpen ? "open" : ""}>
          <li>
            <a
              href="#hero"
              className={`nlink ${activeSection === "hero" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              System
            </a>
          </li>
          <li>
            <a
              href="#terminal-section"
              className={`nlink nlink-term ${activeSection === "terminal-section" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Terminal
            </a>
          </li>
          <li>
            <a
              href="#tech-stack"
              className={`nlink ${activeSection === "tech-stack" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Stack
            </a>
          </li>
          <li>
            <a
              href="#systems"
              className={`nlink ${activeSection === "systems" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#pipeline"
              className={`nlink ${activeSection === "pipeline" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Pipeline
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={`nlink ${activeSection === "contact" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
          </li>
        </ul>
        <div className="status">● SYSTEM ONLINE</div>
      </nav>

      {/* FLOATING CONSOLE LAUNCHER */}
      <button
        id="console-launcher"
        className="show"
        onClick={openConsole}
        data-node-label="CONSOLE"
      >
        <span className="blip" /> Open Console <span className="kbd">`</span>
      </button>

      {/* MAIN APPLICATION CONTAINER */}
      <div id="app">
        {/* ================= HERO / 3D WORLD ================= */}
        <section id="hero">
          <div id="hero-overlay">
            <div className="eyebrow">DevOps Engineer · Cloud · Automation · Infrastructure</div>
            <h1 id="hero-name">
              <span>ABHIRAJ </span>
              <span className="last">PRATAP SINGH</span>
            </h1>
            <div id="hero-role">DevOps Engineer</div>
            <p id="hero-tag">
              Engineering automated, scalable and observable infrastructure — across AWS, containers, CI/CD and Linux.
            </p>
            <div id="hero-cta">
              <a href="#terminal-section" className="btn primary">
                [ Open Terminal ]
              </a>
              <button className="btn" onClick={() => setActiveModal("resume")}>
                [ Resume ]
              </button>
            </div>
          </div>

          <div id="hero-canvas-wrap">
            <canvas id="hero-canvas" ref={heroCanvasRef} />
            <div className="node-tooltip" id="node-tooltip" />
          </div>

          <div id="hero-hint">
            Click a node to travel there · or drive it from the <b>Terminal</b> below
          </div>
          <div id="hero-scroll">
            Scroll<div className="line" />
          </div>
        </section>

        {/* ================= TERMINAL SECTION ================= */}
        <section id="terminal-section" className="section">
          <div className="section-head">
            <div className="eyebrow">01 · System Shell</div>
            <h2 className="section-title">The whole site, as a shell</h2>
            <p className="section-sub">
              Type <b style={{ color: "var(--purple-light)" }}>help</b> to see every command. Try{" "}
              <b style={{ color: "var(--purple-light)" }}>neofetch</b>,{" "}
              <b style={{ color: "var(--purple-light)" }}>ls</b>, or{" "}
              <b style={{ color: "var(--purple-light)" }}>kubectl get pods</b> — commands here also drive the 3D world up
              top.
            </p>
          </div>
          <div id="term-window" className={isConsoleFlashing ? "flash" : ""}>
            <div id="term-titlebar">
              <span className="dot r" />
              <span className="dot y" />
              <span className="dot g" />
              <span className="path">abhiraj@devops: ~</span>
            </div>
            <div id="terminal" ref={termScrollRef} onClick={() => termInputRef.current?.focus()}>
              {termHistory.map((item, idx) => (
                <div key={idx} className={`tline ${item.cls || ""}`}>
                  {item.text}
                </div>
              ))}
            </div>
            <form id="term-input-row" onSubmit={handleTermSubmit}>
              <span id="term-prompt-lbl">
                abhiraj@devops:<span style={{ color: "var(--term-dir)" }}>{termCwd}</span>$
              </span>
              <input
                id="term-input"
                ref={termInputRef}
                value={termInput}
                onChange={(e) => setTermInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowUp") {
                    if (cmdHistoryIdx > 0) {
                      const nextIdx = cmdHistoryIdx - 1;
                      setCmdHistoryIdx(nextIdx);
                      setTermInput(cmdHistory[nextIdx] || "");
                    }
                    e.preventDefault();
                  } else if (e.key === "ArrowDown") {
                    if (cmdHistoryIdx < cmdHistory.length - 1) {
                      const nextIdx = cmdHistoryIdx + 1;
                      setCmdHistoryIdx(nextIdx);
                      setTermInput(cmdHistory[nextIdx] || "");
                    } else {
                      setCmdHistoryIdx(cmdHistory.length);
                      setTermInput("");
                    }
                    e.preventDefault();
                  }
                }}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </form>
            <div className="term-hint">
              try: <b>help</b> · <b>neofetch</b> · <b>ls</b> · <b>cat resume.pdf</b> · <b>man devops</b> ·{" "}
              <b>sudo hire abhiraj</b>
            </div>
          </div>
        </section>

        {/* ================= SECTION 02: TECH STACK ================= */}
        <section id="tech-stack" className="section">
          <div className="section-head">
            <div className="eyebrow">02 / TECHNOLOGY ECOSYSTEM</div>
            <h2 className="section-title">My Tech Stack.</h2>
            <p className="section-sub">Tools and technologies I&apos;m learning and working with.</p>
          </div>

          <div className="skills-grid-wrap">
            <div className="skills-cards-grid">
              {SKILLS_LIST.map((skill) => {
                const Icon = skill.icon;
                const isSelected = selectedSkillName === skill.name;
                return (
                  <div
                    key={skill.name}
                    className={`skill-card ${isSelected ? "active" : ""}`}
                    onClick={() => {
                      setSelectedSkillName(skill.name);
                      if (skill.name === "Docker" || skill.name === "Kubernetes") {
                        sceneControllerRef.current?.focusCluster("containers", true);
                      } else if (skill.name === "AWS") {
                        sceneControllerRef.current?.focusCluster("cloud", true);
                      } else if (
                        skill.name === "Jenkins" ||
                        skill.name === "Git & GitHub" ||
                        skill.name === "CI/CD"
                      ) {
                        sceneControllerRef.current?.focusCluster("cicd", true);
                      } else if (skill.name === "Linux") {
                        sceneControllerRef.current?.focusCluster("network", true);
                      }
                    }}
                    data-node-label={skill.name}
                  >
                    <Icon className="skill-icon" />
                    <div>
                      <div className="skill-name">{skill.name}</div>
                      <div className="skill-cat">{skill.category}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="skill-detail-panel">
              <div className="skill-detail-eyebrow">SELECTED TECHNOLOGY</div>
              <div className="skill-detail-icon-wrap">
                <ActiveSkillIcon size={30} />
              </div>
              <div className="skill-detail-title">{activeSkill.name}</div>
              <div className="skill-detail-level">{activeSkill.level}</div>
              <div className="skill-detail-roadmap">
                <CheckCircle2 size={16} style={{ color: "var(--purple-light)" }} />
                <span>{activeSkill.roadmap}</span>
              </div>
              <p className="skill-detail-desc">{activeSkill.description}</p>
            </div>
          </div>
        </section>

        {/* ================= PROFILE SECTION ================= */}
        <section id="profile" className="section">
          <div className="section-head">
            <div className="eyebrow">03 · Engineer Profile</div>
            <h2 className="section-title">Read from disk: abhiraj.json</h2>
          </div>
          <div className="profile-grid">
            <div className="profile-intro">
              <p>
                Abhiraj Pratap Singh is an <span className="accent">aspiring DevOps Engineer</span> focused on building automated, reliable and scalable deployment workflows.
              </p>
              <p>
                With a foundation in Computer Science and Engineering, he is passionate about <span className="accent">Linux administration, containerization, CI/CD automation and cloud technologies.</span>
              </p>
              <p>
                His hands-on project experience includes building a <span className="accent">Docker and Jenkins-based CI/CD pipeline, automating application builds, container deployment, smoke testing and Docker Hub image publishing.</span>
              </p>
              <p>
                Currently strengthening his knowledge of Kubernetes, AWS, infrastructure automation and monitoring to build production-ready DevOps solutions.
              </p>
              <div className="focus-tags">
                <span>CLOUD & DEVOPS</span>
                <span>CI/CD AUTOMATION</span>
                <span>DOCKER CONTAINERIZATION</span>
                <span>JENKINS PIPELINES</span>
                <span>LINUX ADMINISTRATION</span>
                <span>GIT & GITHUB</span>
                <span>KUBERNETES</span>
                <span>AWS FUNDAMENTALS</span>
              </div>
            </div>
            <div className="data-card">
              <div className="data-row">
                <span className="k">name</span>
                <span className="v">Abhiraj Pratap Singh</span>
              </div>
              <div className="data-row">
                <span className="k">role</span>
                <span className="v">Aspiring DevOps Engineer</span>
              </div>

              <div className="data-row">
                <span className="k">focus</span>
                <span className="v">DevOps · Cloud · Automation · CI/CD</span>
              </div>
              <div className="data-row">
                <span className="k">primary_stack</span>
                <span className="v">Docker, Jenkins, Kubernetes, AWS, Linux, Git</span>
              </div>
              <div className="data-row">
                <span className="k">version_control</span>
                <span className="v">Git, GitHub</span>
              </div>
              <div className="data-row">
                <span className="k">status</span>
                <span className="v" style={{ color: "var(--green)" }}>
                  ● Open to Opportunities
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= STACK / ORBITAL SYSTEM ================= */}
        <section id="stack" className="section">
          <div className="section-head">
            <div className="eyebrow">04 · Orbital Architecture</div>
            <h2 className="section-title">Orbit around DevOps Engineering</h2>
            <p className="section-sub">
              Every tool orbits the same core discipline. Click one to see what it&apos;s used for, where it sits in the
              pipeline, and which live systems depend on it.
            </p>
          </div>
          <div id="stack-wrap">
            <div id="orbit-canvas">
              <svg viewBox="0 0 440 440">
                {ORBITS.map((o, idx) => (
                  <circle
                    key={idx}
                    className="orbit-ring"
                    cx={220}
                    cy={220}
                    r={o.r * 0.62}
                  />
                ))}
                <circle className="orbit-core" cx={220} cy={220} r={30} />
                <text
                  x={220}
                  y={218}
                  textAnchor="middle"
                  fill="var(--purple-light)"
                  fontFamily="var(--font-mono)"
                  fontSize={8}
                  letterSpacing={1}
                >
                  DEVOPS
                </text>
                <text
                  x={220}
                  y={229}
                  textAnchor="middle"
                  fill="var(--purple-light)"
                  fontFamily="var(--font-mono)"
                  fontSize={8}
                  letterSpacing={1}
                >
                  ENGINEERING
                </text>

                {ORBITS.map((o, oi) => {
                  const radius = o.r * 0.62;
                  return o.items.map((name, i) => {
                    const angle = (i / o.items.length) * Math.PI * 2 + oi * 0.5;
                    const x = 220 + radius * Math.cos(angle);
                    const y = 220 + radius * Math.sin(angle);
                    const isSelected = selectedTech === name;
                    return (
                      <g
                        key={name}
                        className={`orbit-node ${isSelected ? "active" : ""}`}
                        transform={`translate(${x},${y})`}
                        onClick={() => setSelectedTech(name)}
                        data-node-label={name}
                      >
                        <circle r={22} />
                        <text textAnchor="middle" dy={4}>
                          {name.length > 9 ? name.slice(0, 8) + "…" : name}
                        </text>
                      </g>
                    );
                  });
                })}
              </svg>
            </div>
            <div id="stack-info">
              {TECH_INFO[selectedTech] ? (
                <div>
                  <h3>{selectedTech}</h3>
                  <div className="field">
                    <div className="label">What I use it for</div>
                    <div className="val">{TECH_INFO[selectedTech].use}</div>
                  </div>
                  <div className="field">
                    <div className="label">Where it fits in the pipeline</div>
                    <div className="val">{TECH_INFO[selectedTech].fit}</div>
                  </div>
                  <div className="field">
                    <div className="label">Related technologies</div>
                    <div className="val">{TECH_INFO[selectedTech].related}</div>
                  </div>
                  <div className="field">
                    <div className="label">Live systems using it</div>
                    <div className="val">{TECH_INFO[selectedTech].projects}</div>
                  </div>
                </div>
              ) : (
                <div className="empty">
                  Select a technology from the orbit to inspect it — try{" "}
                  <b style={{ color: "var(--purple-light)" }}>Kubernetes</b> or{" "}
                  <b style={{ color: "var(--purple-light)" }}>Docker</b>.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ================= FEATURED PROJECTS ================= */}
        <section id="systems" className="section">
          <div className="section-head">
            <div className="eyebrow">05 · Featured Projects</div>
            <h2 className="section-title">Featured Projects.</h2>
            <p className="section-sub">
              Production pipelines, automated infrastructure and active engineering work.
            </p>
          </div>

          <div className="projects-grid">
            {/* FEATURED PROJECT 01 */}
            <div
              className="project-feature-card"
              onClick={() => sceneControllerRef.current?.focusCluster("cicd", true)}
              data-node-label="CI/CD Pipeline"
            >
              <div className="project-card-header">
                <span className="project-card-num">PROJECT / 01</span>
                <span className="project-card-status">
                  <span className="status-dot green" />
                  COMPLETED
                </span>
              </div>

              <div className="project-banner-wrap">
                <img
                  src="/ci-cd-project.png"
                  alt="Automated CI/CD Pipeline preview"
                  className="project-banner-img"
                />
              </div>

              <div className="project-feature-badges">
                <div className="f-badge">
                  <Zap size={13} className="f-icon" />
                  <span>Automated Build</span>
                </div>
                <div className="f-badge">
                  <Boxes size={13} className="f-icon" />
                  <span>Containerization</span>
                </div>
                <div className="f-badge">
                  <Workflow size={13} className="f-icon" />
                  <span>Continuous Deployment</span>
                </div>
                <div className="f-badge">
                  <ShieldCheck size={13} className="f-icon" />
                  <span>Reliable &amp; Scalable</span>
                </div>
              </div>

              <div className="project-sub">BUILD • TEST • DEPLOY</div>
              <h3 className="project-title">Automated CI/CD Pipeline</h3>
              <p className="project-desc">
                An automated pipeline using GitHub, Jenkins and Docker. It checks out source code, verifies the project,
                builds Docker images, deploys containers and performs smoke testing.
              </p>

              <div className="project-tech-tags">
                <span className="project-tech-tag">Docker</span>
                <span className="project-tech-tag">Jenkins</span>
                <span className="project-tech-tag">GitHub</span>
                <span className="project-tech-tag">CI/CD</span>
              </div>

              <ul className="project-checklist">
                <li>
                  <CheckCircle2 size={16} className="check-icon" />
                  <span>Automated source code checkout</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="check-icon" />
                  <span>Docker image build and deployment</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="check-icon" />
                  <span>Pipeline smoke testing</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="check-icon" />
                  <span>Docker Hub image push</span>
                </li>
              </ul>

              <a
                href="https://github.com/Abhiraj2508"
                target="_blank"
                rel="noopener noreferrer"
                className="project-repo-link"
                onClick={(e) => e.stopPropagation()}
              >
                Explore repository <ExternalLink size={15} />
              </a>
            </div>

            {/* MORE SYSTEMS ARE IN THE MAKING */}
            <div className="project-next-card">
              <div className="next-project-icon-wrap">
                <Code2 size={24} />
              </div>
              <div className="next-project-eyebrow">NEXT IN THE BUILD LOG</div>
              <h3 className="next-project-title">More systems are in the making.</h3>
              <p className="next-project-desc">
                New projects around Kubernetes, Infrastructure as Code, cloud and monitoring will appear here as I build
                and document them.
              </p>
              <div className="next-project-progress">
                <span className="live-dot" />
                <span>PROJECTS IN PROGRESS</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PIPELINE / DEPLOY SIMULATOR ================= */}
        <section id="pipeline" className="section">
          <div className="section-head">
            <div className="eyebrow">06 · Deployment Control</div>
            <h2 className="section-title">Trigger a deployment</h2>
            <p className="section-sub">
              This simulates the exact pipeline shape used in his DevOps project — Jenkins, automated testing,
              Docker, Kubernetes.
            </p>
          </div>
          <div className="deploy-panel">
            <div className="deploy-top">
              <div style={{ fontSize: "12px", color: "var(--muted)" }}>
                Pipeline: <span style={{ color: "var(--text)" }}>Foodie Application / CI-CD</span>
              </div>
              <button className="btn primary" onClick={triggerDeploy} disabled={deploying}>
                {deploying ? "[ Deploying... ]" : deployStepIndex >= DEPLOY_STEPS.length ? "[ Redeploy ]" : "[ Deploy ]"}
              </button>
            </div>
            <div id="deploy-steps">
              {DEPLOY_STEPS.map((step, idx) => {
                const isActive = deployStepIndex === idx;
                const isDone = deployStepIndex > idx;
                return (
                  <div
                    key={step}
                    className={`dstep ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
                  >
                    <span className="dname">{step}</span>
                    <span className="dstatus">
                      {isActive ? "running" : isDone ? (idx === DEPLOY_STEPS.length - 1 ? "success" : "done") : "pending"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= NETWORK MAP ================= */}
        <section id="network" className="section">
          <div className="section-head">
            <div className="eyebrow">07 · Network Map</div>
            <h2 className="section-title">Request lifecycle</h2>
            <p className="section-sub">Click any connection to inspect protocol, port and response.</p>
          </div>
          <div className="netmap">
            {NET_NODES.map((n, i) => (
              <React.Fragment key={n}>
                <div className="net-node">
                  <div className="box">{n}</div>
                </div>
                {i < NET_NODES.length - 1 && (
                  <div
                    className="net-conn"
                    onClick={() => {
                      const info = NET_CONN_INFO[i];
                      setNetInfo(
                        `${info.proto} · port ${info.port} — request: ${info.request} → response: ${info.response} [${info.status}]`
                      );
                    }}
                    data-node-label={NET_CONN_INFO[i].proto}
                  >
                    <span className="packet" style={{ animationDelay: `${i * 0.3}s` }} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div id="net-info">
            <b>{netInfo}</b>
          </div>
        </section>

        {/* ================= CONTACT ================= */}
        <section id="contact" className="section contact-section">
          <div className="contact-container">
            {/* LEFT COLUMN: HEADLINE & CTA */}
            <div className="contact-left">
              <div className="eyebrow contact-eyebrow">08 / ESTABLISH CONNECTION</div>
              <h2 className="contact-main-title">
                Let&apos;s build<br />
                <span className="contact-title-accent">something reliable.</span>
              </h2>
              <p className="contact-main-desc">
                I&apos;m open to entry-level opportunities, internships and learning-focused teams in DevOps and cloud engineering.
              </p>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=abhirajpratap250802@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-cta-btn"
              >
                <span>Start a conversation</span>
                <ArrowUpRight size={18} />
              </a>
            </div>

            {/* RIGHT COLUMN: 4 INTERACTIVE CONTACT CARDS */}
            <div className="contact-cards-stack">
              {/* EMAIL */}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=abhirajpratap250802@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card-item"
                data-node-label="Email"
              >
                <div className="contact-card-icon">
                  <Mail size={22} />
                </div>
                <div className="contact-card-info">
                  <span className="contact-card-label">EMAIL</span>
                  <span className="contact-card-value">abhirajpratap250802@gmail.com</span>
                </div>
                <ArrowUpRight size={18} className="contact-card-arrow" />
              </a>

              {/* GITHUB */}
              <a
                href="https://github.com/Abhiraj2508"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card-item"
                data-node-label="GitHub"
              >
                <div className="contact-card-icon">
                  <GitBranch size={22} />
                </div>
                <div className="contact-card-info">
                  <span className="contact-card-label">GITHUB</span>
                  <span className="contact-card-value">github.com/Abhiraj2508</span>
                </div>
                <ArrowUpRight size={18} className="contact-card-arrow" />
              </a>

              {/* LINKEDIN */}
              <a
                href="https://linkedin.com/in/abhiraj-pratap-951753241/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card-item"
                data-node-label="LinkedIn"
              >
                <div className="contact-card-icon">
                  <ExternalLink size={22} />
                </div>
                <div className="contact-card-info">
                  <span className="contact-card-label">LINKEDIN</span>
                  <span className="contact-card-value">Connect professionally</span>
                </div>
                <ArrowUpRight size={18} className="contact-card-arrow" />
              </a>

              {/* RESUME */}
              <div
                className="contact-card-item"
                onClick={() => setActiveModal("resume")}
                data-node-label="Resume"
              >
                <div className="contact-card-icon">
                  <Download size={22} />
                </div>
                <div className="contact-card-info">
                  <span className="contact-card-label">RESUME</span>
                  <span className="contact-card-value">Download PDF</span>
                </div>
                <ArrowUpRight size={18} className="contact-card-arrow" />
              </div>
            </div>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer id="footer">
          <div className="quote">&ldquo;Automate the repeatable. Observe the system. Build for reliability.&rdquo;</div>
          <div className="name">Abhiraj Pratap Singh — DevOps Engineer</div>
          <div className="meta">ABHIRAJ.OS · build 2026.11 · system nominal</div>
        </footer>
      </div>

      {/* ================= MODALS ================= */}
      {/* System Project Modal */}
      {activeModal && activeModal !== "resume" && (
        <div className="modal-backdrop show" onClick={() => setActiveModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveModal(null)}>
              ×
            </button>
            {(() => {
              const sys = SYSTEMS.find((s) => s.id === activeModal);
              if (!sys) return null;
              return (
                <>
                  <div className="eyebrow">{sys.id}</div>
                  <h3>{sys.name}</h3>
                  <div className="pipeline-mini">
                    {sys.steps.map((st, i) => (
                      <div key={i} className="step">
                        {st}
                      </div>
                    ))}
                  </div>
                  <ul>
                    {sys.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                  <div className="system-result">{sys.result}</div>
                  <div className="system-stack" style={{ marginTop: "18px" }}>
                    {sys.stack.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Resume Viewer Modal */}
      {activeModal === "resume" && (
        <div className="modal-backdrop show" id="resume-modal" onClick={() => setActiveModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="resume-top">
              <h3>resume.pdf — Abhiraj Pratap Singh</h3>
              <button className="modal-close" onClick={() => setActiveModal(null)}>
                ×
              </button>
            </div>
            <iframe src="/resume.pdf" title="Abhiraj Pratap Singh Resume" />
            <div className="resume-actions">
              <a className="btn primary" href="/resume.pdf" download="Abhiraj_Pratap_Singh_Resume.pdf">
                [ Download Resume ]
              </a>
              <a className="btn" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                [ Open in New Tab ]
              </a>
            </div>
          </div>
        </div>
      )}

      {/* TOASTS CONTAINER */}
      <div id="toasts">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            {t.message}
          </div>
        ))}
      </div>
    </main>
  );
}
