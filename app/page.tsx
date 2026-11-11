"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Modular Section Components
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TerminalSection from "@/components/TerminalSection";
import TechStackSection from "@/components/TechStackSection";
import ProfileSection from "@/components/ProfileSection";
import OrbitSection from "@/components/OrbitSection";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";
import PipelineSimulatorSection from "@/components/PipelineSimulatorSection";
import NetworkMapSection from "@/components/NetworkMapSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import Modals from "@/components/Modals";
import ToastContainer from "@/components/ToastContainer";

// Data
import { DEPLOY_STEPS } from "@/data/portfolioData";

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

      {/* TOP NAVIGATION & FLOATING CONSOLE LAUNCHER */}
      <Navbar
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        openConsole={openConsole}
      />

      {/* MAIN APPLICATION CONTAINER */}
      <div id="app">
        {/* 00 · Hero / 3D World */}
        <HeroSection
          heroCanvasRef={heroCanvasRef}
          setActiveModal={setActiveModal}
        />

        {/* 01 · System Shell / Terminal */}
        <TerminalSection
          isConsoleFlashing={isConsoleFlashing}
          termScrollRef={termScrollRef}
          termInputRef={termInputRef}
          termHistory={termHistory}
          termCwd={termCwd}
          termInput={termInput}
          setTermInput={setTermInput}
          cmdHistory={cmdHistory}
          cmdHistoryIdx={cmdHistoryIdx}
          setCmdHistoryIdx={setCmdHistoryIdx}
          handleTermSubmit={handleTermSubmit}
        />

        {/* 02 · Technology Ecosystem */}
        <TechStackSection
          selectedSkillName={selectedSkillName}
          setSelectedSkillName={setSelectedSkillName}
          onFocusCluster={(cluster) => sceneControllerRef.current?.focusCluster(cluster, true)}
        />

        {/* 03 · Engineer Profile */}
        <ProfileSection />

        {/* 04 · Orbital Architecture */}
        <OrbitSection
          selectedTech={selectedTech}
          setSelectedTech={setSelectedTech}
        />

        {/* 05 · Featured Projects */}
        <FeaturedProjectsSection
          onFocusCluster={(cluster) => sceneControllerRef.current?.focusCluster(cluster, true)}
        />

        {/* 06 · Deployment Control */}
        <PipelineSimulatorSection
          deploying={deploying}
          deployStepIndex={deployStepIndex}
          triggerDeploy={triggerDeploy}
        />

        {/* 07 · Network Map */}
        <NetworkMapSection
          netInfo={netInfo}
          setNetInfo={setNetInfo}
        />

        {/* 08 · Contact / Establish Connection */}
        <ContactSection
          setActiveModal={setActiveModal}
        />

        {/* Footer */}
        <FooterSection />
      </div>

      {/* Modals */}
      <Modals
        activeModal={activeModal}
        setActiveModal={setActiveModal}
      />

      {/* Toasts */}
      <ToastContainer toasts={toasts} />
    </main>
  );
}
