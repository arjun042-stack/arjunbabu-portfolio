"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
}

interface DataPacket {
  nodeA: number;
  nodeB: number;
  progress: number;
  speed: number;
}

export default function HeroAiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Reduced motion check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const nodeCount = prefersReducedMotion ? 0 : isMobile ? 18 : 42;

    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.6),
        vy: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.6),
        radius: Math.random() * 1.5 + 1.2,
        baseRadius: Math.random() * 1.5 + 1.2,
      });
    }

    const packets: DataPacket[] = [];
    if (!isMobile && !prefersReducedMotion) {
      for (let i = 0; i < 6; i++) {
        packets.push({
          nodeA: Math.floor(Math.random() * nodeCount),
          nodeB: Math.floor(Math.random() * nodeCount),
          progress: Math.random(),
          speed: 0.006 + Math.random() * 0.008,
        });
      }
    }

    const mouse = { x: -1000, y: -1000, radius: 140 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Pause rendering when off-screen to save battery & GPU
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const isLightMode = theme === "light";
    const nodeColor = isLightMode ? "rgba(37, 99, 235, 0.45)" : "rgba(56, 189, 248, 0.55)";
    const lineColor = isLightMode ? "37, 99, 235" : "59, 130, 246";
    const packetColor = isLightMode ? "rgba(29, 78, 216, 0.85)" : "rgba(103, 232, 249, 0.95)";
    const maxDistance = isMobile ? 80 : 130;

    const render = () => {
      if (!isVisible) {
        animationId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Update & Draw Nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Bounce from walls
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Mouse reaction
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          node.x -= (dx / dist) * force * 2;
          node.y -= (dy / dist) * force * 2;
          node.radius = node.baseRadius * (1 + force * 0.8);
        } else {
          node.radius = node.baseRadius;
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const distBetween = Math.hypot(node.x - other.x, node.y - other.y);

          if (distBetween < maxDistance) {
            const alpha = (1 - distBetween / maxDistance) * (isLightMode ? 0.18 : 0.25);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw active data packets
      for (let p of packets) {
        const nA = nodes[p.nodeA];
        const nB = nodes[p.nodeB];
        if (nA && nB) {
          p.progress += p.speed;
          if (p.progress >= 1) {
            p.progress = 0;
            p.nodeA = Math.floor(Math.random() * nodes.length);
            p.nodeB = Math.floor(Math.random() * nodes.length);
          }
          const px = nA.x + (nB.x - nA.x) * p.progress;
          const py = nA.y + (nB.y - nA.y) * p.progress;

          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fillStyle = packetColor;
          ctx.shadowBlur = 6;
          ctx.shadowColor = packetColor;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto opacity-70 transition-opacity duration-500"
      aria-hidden="true"
    />
  );
}
