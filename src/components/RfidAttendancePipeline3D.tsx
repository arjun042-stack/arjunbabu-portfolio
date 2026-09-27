"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Radio, RefreshCw, CheckCircle, Wifi, Database, Cpu } from "lucide-react";
import { useSound } from "@/context/SoundContext";

export default function RfidAttendancePipeline3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { playClick, playHover } = useSound();

  const [activeStep, setActiveStep] = useState<number>(1);
  const [statusMessage, setStatusMessage] = useState<string>("SYSTEM READY • STANDBY");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Trigger manual scan cycle
  const triggerScanRef = useRef<() => void>(() => {});

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Renderer setup
    let width = container.clientWidth || 600;
    let height = Math.min(380, Math.max(280, Math.floor(width * 0.45)));

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);

    // Responsive camera position
    const updateCameraDistance = () => {
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth < 1024;
      if (isMobile) {
        camera.position.set(0, 1.8, 12.8);
      } else if (isTablet) {
        camera.position.set(0, 1.6, 11.0);
      } else {
        camera.position.set(0, 1.4, 9.8);
      }
      camera.lookAt(0, -0.1, 0);
    };
    updateCameraDistance();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.8);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x818cf8, 1.2);
    dirLight2.position.set(-6, -2, 4);
    scene.add(dirLight2);

    // Pipeline root group
    const pipelineGroup = new THREE.Group();
    scene.add(pipelineGroup);

    // Common materials
    const pcbMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.4,
      metalness: 0.8,
    });
    const chipMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.2,
      metalness: 0.9,
    });
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.3,
      metalness: 0.95,
    });
    const goldPinMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.3,
      metalness: 0.9,
    });
    const cyanGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: false,
    });
    const emeraldGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0x10b981,
    });

    // -------------------------------------------------------------
    // NODE 1: RFID CARD & READER SCANNER (x = -4.2 to -2.8)
    // -------------------------------------------------------------
    const rfidGroup = new THREE.Group();
    rfidGroup.position.set(-3.7, 0, 0);
    pipelineGroup.add(rfidGroup);

    // Reader Base PCB (RC522 shape)
    const readerBaseGeo = new THREE.BoxGeometry(1.6, 0.08, 1.3);
    const readerBase = new THREE.Mesh(readerBaseGeo, pcbMaterial);
    rfidGroup.add(readerBase);

    // Reader Antenna Coil outline (copper ring)
    const readerCoilGeo = new THREE.TorusGeometry(0.42, 0.025, 8, 24);
    readerCoilGeo.rotateX(Math.PI / 2);
    const readerCoil = new THREE.Mesh(
      readerCoilGeo,
      new THREE.MeshStandardMaterial({ color: 0x0284c7, emissive: 0x0369a1, emissiveIntensity: 0.6 })
    );
    readerCoil.position.set(-0.25, 0.05, 0);
    rfidGroup.add(readerCoil);

    // Reader Sensor Chip
    const readerChipGeo = new THREE.BoxGeometry(0.35, 0.06, 0.35);
    const readerChip = new THREE.Mesh(readerChipGeo, chipMaterial);
    readerChip.position.set(0.4, 0.06, 0);
    rfidGroup.add(readerChip);

    // Reader Status LED
    const readerLedGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const readerLedMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const readerLed = new THREE.Mesh(readerLedGeo, readerLedMat);
    readerLed.position.set(-0.65, 0.06, 0.5);
    rfidGroup.add(readerLed);

    // Reader Scan Pulse Wave (expands during scan)
    const scanRingGeo = new THREE.RingGeometry(0.1, 0.16, 32);
    scanRingGeo.rotateX(-Math.PI / 2);
    const scanRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const scanRing = new THREE.Mesh(scanRingGeo, scanRingMat);
    scanRing.position.set(-0.25, 0.08, 0);
    rfidGroup.add(scanRing);

    // RFID Smart Student Card (hovers above reader)
    const cardGroup = new THREE.Group();
    cardGroup.position.set(-0.25, 1.1, 0);
    cardGroup.rotation.set(0.15, -0.2, 0.1);
    rfidGroup.add(cardGroup);

    // Card Body
    const cardGeo = new THREE.BoxGeometry(1.2, 0.03, 0.8);
    const cardMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.3,
      metalness: 0.6,
    });
    const cardMesh = new THREE.Mesh(cardGeo, cardMat);
    cardGroup.add(cardMesh);

    // Card Microchip Inlay
    const chipInlayGeo = new THREE.BoxGeometry(0.24, 0.035, 0.2);
    const chipInlay = new THREE.Mesh(chipInlayGeo, goldPinMaterial);
    chipInlay.position.set(-0.3, 0.01, 0);
    cardGroup.add(chipInlay);

    // Card RFID Chip Icon / Glow line
    const cardStripeGeo = new THREE.BoxGeometry(0.85, 0.032, 0.05);
    const cardStripeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const cardStripe = new THREE.Mesh(cardStripeGeo, cardStripeMat);
    cardStripe.position.set(0.1, 0.01, 0.22);
    cardGroup.add(cardStripe);

    // -------------------------------------------------------------
    // BUS TRACE: Reader to NodeMCU (SPI/GPIO bus)
    // -------------------------------------------------------------
    const busLineGeo = new THREE.BoxGeometry(1.4, 0.02, 0.06);
    const busLineMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.5,
    });
    const busLine = new THREE.Mesh(busLineGeo, busLineMat);
    busLine.position.set(-2.2, 0, 0);
    pipelineGroup.add(busLine);

    // Bus Pulse Packet (travels along wire)
    const busPacketGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const busPacketMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const busPacket = new THREE.Mesh(busPacketGeo, busPacketMat);
    busPacket.position.set(-2.8, 0.04, 0);
    busPacket.visible = false;
    pipelineGroup.add(busPacket);

    // -------------------------------------------------------------
    // NODE 2: NODEMCU ESP8266 MICROCONTROLLER (x = -1.2)
    // -------------------------------------------------------------
    const espGroup = new THREE.Group();
    espGroup.position.set(-1.2, 0, 0);
    pipelineGroup.add(espGroup);

    // NodeMCU PCB Base
    const espPcbGeo = new THREE.BoxGeometry(1.5, 0.09, 1.1);
    const espPcb = new THREE.Mesh(espPcbGeo, pcbMaterial);
    espGroup.add(espPcb);

    // Pin Headers (Top and Bottom rows)
    const makeHeaderPins = (zOffset: number) => {
      const pinHeaderGeo = new THREE.BoxGeometry(1.35, 0.16, 0.1);
      const pinHeader = new THREE.Mesh(pinHeaderGeo, chipMaterial);
      pinHeader.position.set(0, 0.08, zOffset);
      espGroup.add(pinHeader);

      for (let i = -6; i <= 6; i++) {
        const pinGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.12, 8);
        const pin = new THREE.Mesh(pinGeo, goldPinMaterial);
        pin.position.set(i * 0.1, 0.16, zOffset);
        espGroup.add(pin);
      }
    };
    makeHeaderPins(-0.45);
    makeHeaderPins(0.45);

    // ESP-12F Metal Shield Module (silver can)
    const shieldGeo = new THREE.BoxGeometry(0.75, 0.1, 0.65);
    const shieldMesh = new THREE.Mesh(shieldGeo, metalMaterial);
    shieldMesh.position.set(-0.15, 0.08, 0);
    espGroup.add(shieldMesh);

    // On-board Trace Antenna (meandered gold PCB trace)
    const antennaGeo = new THREE.BoxGeometry(0.25, 0.04, 0.55);
    const antennaMesh = new THREE.Mesh(antennaGeo, goldPinMaterial);
    antennaMesh.position.set(0.45, 0.06, 0);
    espGroup.add(antennaMesh);

    // ESP8266 Processing Indicator LED
    const espLedGeo = new THREE.SphereGeometry(0.04, 12, 12);
    const espLedMat = new THREE.MeshBasicMaterial({ color: 0x1d4ed8 });
    const espLed = new THREE.Mesh(espLedGeo, espLedMat);
    espLed.position.set(-0.55, 0.07, 0.3);
    espGroup.add(espLed);

    // -------------------------------------------------------------
    // NODE 3: WI-FI RF WIRELESS TRANSMISSION ZONE (x = -0.3 to 1.7)
    // -------------------------------------------------------------
    const wifiRings: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const ringGeo = new THREE.RingGeometry(0.2 + i * 0.35, 0.25 + i * 0.35, 32);
      ringGeo.rotateY(Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.set(-0.2 + i * 0.5, 0.3, 0);
      pipelineGroup.add(ringMesh);
      wifiRings.push(ringMesh);
    }

    // Wireless RF Particles
    const particleCount = 40;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleInitialX = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const px = -0.3 + Math.random() * 1.9;
      const py = 0.1 + (Math.random() - 0.5) * 0.6;
      const pz = (Math.random() - 0.5) * 0.6;
      particlePositions[i * 3] = px;
      particlePositions[i * 3 + 1] = py;
      particlePositions[i * 3 + 2] = pz;
      particleInitialX[i] = px;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 0.7,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    pipelineGroup.add(particleSystem);

    // -------------------------------------------------------------
    // NODE 4: CLOUD DATABASE CLUSTER (x = 2.1)
    // -------------------------------------------------------------
    const dbGroup = new THREE.Group();
    dbGroup.position.set(2.1, 0, 0);
    pipelineGroup.add(dbGroup);

    // Cylindrical database tiers
    const dbPlatters: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const platterGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.14, 28);
      const platter = new THREE.Mesh(platterGeo, metalMaterial);
      platter.position.set(0, (i - 1) * 0.28, 0);
      dbGroup.add(platter);
      dbPlatters.push(platter);

      // Glowing data slot ring
      const ringGeo = new THREE.TorusGeometry(0.56, 0.015, 8, 28);
      ringGeo.rotateX(Math.PI / 2);
      const ring = new THREE.Mesh(
        ringGeo,
        new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
      );
      ring.position.set(0, (i - 1) * 0.28, 0);
      dbGroup.add(ring);
    }

    // Geodesic Cloud Polyhedron Orbiting the DB
    const cloudGeo = new THREE.IcosahedronGeometry(0.9, 1);
    const cloudMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    cloudMesh.position.set(0, 0, 0);
    dbGroup.add(cloudMesh);

    // -------------------------------------------------------------
    // CONNECTOR: Cloud to Attendance Record Node
    // -------------------------------------------------------------
    const cloudSyncLineGeo = new THREE.BoxGeometry(0.9, 0.02, 0.04);
    const cloudSyncLine = new THREE.Mesh(cloudSyncLineGeo, busLineMat);
    cloudSyncLine.position.set(3.05, 0, 0);
    pipelineGroup.add(cloudSyncLine);

    // -------------------------------------------------------------
    // NODE 5: ATTENDANCE RECORD (x = 3.9)
    // -------------------------------------------------------------
    const recordGroup = new THREE.Group();
    recordGroup.position.set(3.9, 0, 0);
    pipelineGroup.add(recordGroup);

    // Holographic Attendance Record Tablet
    const recordCardGeo = new THREE.BoxGeometry(0.95, 1.25, 0.05);
    const recordCardMat = new THREE.MeshStandardMaterial({
      color: 0x091e2b,
      roughness: 0.3,
      metalness: 0.8,
    });
    const recordCard = new THREE.Mesh(recordCardGeo, recordCardMat);
    recordGroup.add(recordCard);

    // Outer Neon Border
    const recordBorderGeo = new THREE.BoxGeometry(1.0, 1.3, 0.04);
    const recordBorderMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const recordBorder = new THREE.Mesh(recordBorderGeo, recordBorderMat);
    recordGroup.add(recordBorder);

    // Verification Checkmark Emblem (Ring + Center Dot)
    const checkRingGeo = new THREE.TorusGeometry(0.24, 0.03, 12, 24);
    const checkRingMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const checkRing = new THREE.Mesh(checkRingGeo, checkRingMat);
    checkRing.position.set(0, 0.25, 0.04);
    recordGroup.add(checkRing);

    const checkDotGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const checkDot = new THREE.Mesh(checkDotGeo, emeraldGlowMaterial);
    checkDot.position.set(0, 0.25, 0.05);
    recordGroup.add(checkDot);

    // Data rows (representation of student ID and timestamp)
    for (let i = 0; i < 3; i++) {
      const rowGeo = new THREE.BoxGeometry(0.6 - i * 0.1, 0.04, 0.02);
      const row = new THREE.Mesh(rowGeo, cyanGlowMaterial);
      row.position.set(0, -0.05 - i * 0.15, 0.04);
      recordGroup.add(row);
    }

    // -------------------------------------------------------------
    // INTERACTION & ANIMATION STATE MACHINE
    // -------------------------------------------------------------
    let animationId: number;
    let clock = new THREE.Clock();
    let cycleTimer = 0;
    const CYCLE_DURATION = 8.5; // Complete scan sequence in 8.5 seconds

    // Mouse Parallax coordinates
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const handleMouseLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave);

    // Manual Scan Trigger
    triggerScanRef.current = () => {
      cycleTimer = 0.05;
      setIsSimulating(true);
    };

    // Responsive Resize
    const handleResize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth;
      height = Math.min(380, Math.max(280, Math.floor(width * 0.45)));
      camera.aspect = width / height;
      updateCameraDistance();
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Visibility observer to pause loop when off-screen
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.15 }
    );
    observer.observe(container);

    // Render loop
    const render = () => {
      animationId = requestAnimationFrame(render);
      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Mouse Parallax Smoothing
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      pipelineGroup.rotation.y = mouse.x * 0.12;
      pipelineGroup.rotation.x = -mouse.y * 0.08;

      if (!prefersReducedMotion) {
        cycleTimer = (cycleTimer + delta) % CYCLE_DURATION;
      } else {
        cycleTimer = 7.0; // Posed in verified state
      }

      // ---------------------------------------------------------
      // STAGE 1 (0.0s - 1.5s): RFID CARD APPROACHES READER
      // ---------------------------------------------------------
      if (cycleTimer < 1.5) {
        setActiveStep(1);
        setStatusMessage("STAGE 1: RFID CARD PRESENTED • 13.56MHz FIELD DETECTED");
        const progress = cycleTimer / 1.5;

        // Card glides down toward reader
        cardGroup.position.y = 1.1 - Math.sin(progress * Math.PI * 0.5) * 0.65;
        cardGroup.rotation.x = 0.15 - progress * 0.12;
        cardGroup.rotation.z = 0.1 - progress * 0.08;

        readerLedMat.color.setHex(0xf59e0b); // Amber standby
        scanRingMat.opacity = 0;
        busPacket.visible = false;
        espLedMat.color.setHex(0x1e3a8a);
        recordBorderMat.opacity = 0.2;
      }

      // ---------------------------------------------------------
      // STAGE 2 (1.5s - 2.8s): RFID SCAN ACTIVATES & GPIO BUS TRANSFER
      // ---------------------------------------------------------
      else if (cycleTimer >= 1.5 && cycleTimer < 2.8) {
        setActiveStep(2);
        setStatusMessage("STAGE 2: SCANNING CARD UID [0x8F4A2C] • TRANSMITTING TO NODEMCU");
        const subT = cycleTimer - 1.5;

        // Card resting gently above scanner coil
        cardGroup.position.y = 0.45 + Math.sin(subT * 4) * 0.02;

        // Expanding scan wave
        const waveScale = 1 + (subT * 1.5) % 1.5;
        scanRing.scale.set(waveScale, waveScale, waveScale);
        scanRingMat.opacity = Math.max(0, 1 - (waveScale - 1) / 1.5);
        readerLedMat.color.setHex(0x10b981); // Green active scan

        // Data pulse travels along bus wire from reader (-2.9) to ESP8266 (-1.2)
        busPacket.visible = true;
        const busProg = (subT / 1.3);
        busPacket.position.x = -2.9 + busProg * 1.7;
      }

      // ---------------------------------------------------------
      // STAGE 3 (2.8s - 4.2s): NODEMCU ESP8266 PROCESSES STUDENT ID
      // ---------------------------------------------------------
      else if (cycleTimer >= 2.8 && cycleTimer < 4.2) {
        setActiveStep(3);
        setStatusMessage("STAGE 3: NODEMCU ESP8266 VALIDATING ID • PREPARING WI-FI PACKET");
        busPacket.visible = false;
        scanRingMat.opacity = 0;

        // Fast blink on ESP8266 onboard LED
        const blink = Math.sin(elapsed * 25) > 0;
        espLedMat.color.setHex(blink ? 0x38bdf8 : 0x0f172a);

        // Subtle vibration/pulse on ESP module
        shieldMesh.position.y = 0.08 + Math.sin(elapsed * 12) * 0.005;
      }

      // ---------------------------------------------------------
      // STAGE 4 (4.2s - 5.8s): WI-FI WIRELESS DATA PACKET BURST
      // ---------------------------------------------------------
      else if (cycleTimer >= 4.2 && cycleTimer < 5.8) {
        setActiveStep(4);
        setStatusMessage("STAGE 4: 802.11 b/g/n TRANSMISSION • SENDING DATA TO CLOUD");
        const subT = cycleTimer - 4.2;

        // Pulse Wi-Fi rings
        wifiRings.forEach((ring, idx) => {
          const rProg = (subT * 1.5 + idx * 0.3) % 1;
          ring.scale.set(1 + rProg * 0.4, 1 + rProg * 0.4, 1);
          const mat = ring.material as THREE.MeshBasicMaterial;
          mat.opacity = 0.2 + (1 - rProg) * 0.6;
        });

        // Fast particle flight toward database
        const positions = particleGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3] += 0.04;
          if (positions[i * 3] > 2.1) {
            positions[i * 3] = -0.3;
          }
        }
        particleGeo.attributes.position.needsUpdate = true;
      }

      // ---------------------------------------------------------
      // STAGE 5 (5.8s - 7.0s): CLOUD DATABASE SYNC & RECORD INSERT
      // ---------------------------------------------------------
      else if (cycleTimer >= 5.8 && cycleTimer < 7.0) {
        setActiveStep(5);
        setStatusMessage("STAGE 5: CLOUD DATABASE RECORD MATCHED • COMMITTING ATTENDANCE LOG");
        const subT = cycleTimer - 5.8;

        // Spin database platters and cloud wireframe
        cloudMesh.rotation.y += 0.03;
        cloudMesh.rotation.x += 0.015;
        dbPlatters[0].rotation.y += 0.02;
        dbPlatters[1].rotation.y -= 0.025;
        dbPlatters[2].rotation.y += 0.02;

        cloudMat.opacity = 0.3 + Math.sin(subT * 6) * 0.2;
      }

      // ---------------------------------------------------------
      // STAGE 6 (7.0s - 8.5s): ATTENDANCE RECORD GENERATED & VERIFIED
      // ---------------------------------------------------------
      else {
        setActiveStep(6);
        setStatusMessage("STAGE 6: ATTENDANCE VERIFIED & RECORDED • REAL-TIME MONITORING COMPLETE");
        setIsSimulating(false);

        // Record node pulses emerald green
        recordBorderMat.opacity = 0.6 + Math.sin(elapsed * 4) * 0.3;
        recordGroup.position.y = Math.sin(elapsed * 3) * 0.04;

        // Slow ambient rotation of cloud
        cloudMesh.rotation.y += 0.008;
      }

      // Always keep subtle ambient micro-motion
      rfidGroup.position.y = Math.sin(elapsed * 1.5) * 0.03;
      espGroup.position.y = Math.cos(elapsed * 1.8) * 0.02;
      dbGroup.position.y = Math.sin(elapsed * 1.6 + 1) * 0.03;

      renderer.render(scene, camera);
    };

    render();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();

      // Dispose geometries and materials
      renderer.dispose();
      scene.clear();
    };
  }, []);

  const steps = [
    { num: 1, label: "RFID Card", icon: Radio },
    { num: 2, label: "Reader Scan", icon: Radio },
    { num: 3, label: "NodeMCU ESP8266", icon: Cpu },
    { num: 4, label: "Wi-Fi Uplink", icon: Wifi },
    { num: 5, label: "Cloud Database", icon: Database },
    { num: 6, label: "Attendance Record", icon: CheckCircle },
  ];

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl bg-[#070a11] border border-slate-800/90 shadow-2xl overflow-hidden font-mono text-xs select-none"
    >
      {/* 3D Scene Canvas */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: "280px" }}>
        <canvas
          ref={canvasRef}
          className="w-full h-full block cursor-grab active:cursor-grabbing touch-pan-y"
          aria-label="3D Interactive IoT RFID Attendance Pipeline"
        />

        {/* Top Floating Control Bar */}
        <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#0e1422]/90 backdrop-blur-md border border-slate-800 text-[10px] text-slate-300 pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-semibold text-cyan-300">IoT DATA PIPELINE</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">NodeMCU ESP8266</span>
          </div>

          <button
            type="button"
            onClick={() => {
              playClick();
              triggerScanRef.current();
            }}
            onMouseEnter={playHover}
            className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 hover:text-white border border-blue-500/40 hover:border-blue-400 transition-all text-[11px] font-semibold active:scale-95 shadow-sm"
          >
            <RefreshCw className={`w-3 h-3 ${isSimulating ? "animate-spin" : ""}`} />
            <span>Simulate Scan</span>
          </button>
        </div>

        {/* 3D Parallax Hint */}
        <div className="absolute bottom-2 right-3 pointer-events-none text-[9px] text-slate-500/80 font-mono hidden sm:block">
          Interactive 3D • Mouse Parallax Enabled
        </div>
      </div>

      {/* Sequential Pipeline Step Indicators */}
      <div className="p-3 bg-[#0a0e18] border-t border-slate-800/80">
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-1.5 text-center">
          {steps.map((step) => {
            const Icon = step.icon;
            const isCurrent = activeStep === step.num;
            const isCompleted = activeStep > step.num;

            return (
              <div
                key={step.num}
                className={`p-2 rounded-lg border transition-all duration-300 ${
                  isCurrent
                    ? "bg-blue-950/60 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/10 scale-[1.02]"
                    : isCompleted
                    ? "bg-[#0d1320] border-slate-700/80 text-slate-300"
                    : "bg-[#080c14] border-slate-800/50 text-slate-600"
                }`}
              >
                <div className="flex items-center justify-center gap-1 text-[9px] uppercase tracking-wider">
                  <Icon className={`w-3 h-3 ${isCurrent ? "text-cyan-400 animate-pulse" : ""}`} />
                  <span>0{step.num}</span>
                </div>
                <div
                  className={`text-[10px] font-semibold mt-0.5 truncate ${
                    isCurrent ? "text-white" : ""
                  }`}
                >
                  {step.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Telemetry Status Bar */}
      <div className="px-3.5 py-2 bg-[#06080e] border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 font-bold">STATUS:</span>
          <span className="text-slate-200 truncate max-w-[280px] sm:max-w-md">
            {statusMessage}
          </span>
        </div>
        <div className="flex items-center gap-3 text-[9px] text-slate-500 font-mono">
          <span>FREQ: 13.56MHz</span>
          <span>BAUD: 115200</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <CheckCircle className="w-2.5 h-2.5" />
            CLOUD SYNC
          </span>
        </div>
      </div>
    </div>
  );
}
