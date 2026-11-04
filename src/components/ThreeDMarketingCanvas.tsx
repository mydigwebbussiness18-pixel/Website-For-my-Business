import React, { useEffect, useRef, useState } from "react";

/**
 * ThreeDMarketingCanvas
 * A high-performance, scroll-driven 3D Canvas engine that renders premium
 * digital-marketing-themed 3D objects (Megaphone, Social Media Cube, Analytics Growth
 * Chart, SEO Search Orb, 3D Browser Mockup, AI Core, and Particle Constellation).
 *
 * All objects respond directly to window.scrollY, rotating in 3D space, scaling,
 * parallaxing at different speeds, and smoothly transitioning between sections.
 */

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export const ThreeDMarketingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    motionQuery.addEventListener("change", handleMotionChange);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive sizing
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Smooth scroll tracking with rAF throttle
    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    let maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    let scrollQueued = false;

    const handleScroll = () => {
      if (scrollQueued) return;
      scrollQueued = true;
      requestAnimationFrame(() => {
        scrollQueued = false;
        targetScrollY = window.scrollY;
        maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Mouse parallax tracking with rAF throttle
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let mouseQueued = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (mouseQueued) return;
      mouseQueued = true;
      requestAnimationFrame(() => {
        mouseQueued = false;
        targetMouseX = (e.clientX / width - 0.5) * 2;
        targetMouseY = (e.clientY / height - 0.5) * 2;
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const isMobile = width < 768;
    const particleCount = isMobile ? 18 : 40;

    // 3D Particles
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      baseZ: number;
      size: number;
      color: string;
      speed: number;
    }> = [];

    const colors = ["#38BDF8", "#3B82F6", "#60A5FA", "#D4AF37", "#818CF8"];

    for (let i = 0; i < particleCount; i++) {
      const bx = (Math.random() - 0.5) * 1600;
      const by = (Math.random() - 0.5) * 1400;
      const bz = Math.random() * 800 - 400;
      particles.push({
        x: bx,
        y: by,
        z: bz,
        baseX: bx,
        baseY: by,
        baseZ: bz,
        size: Math.random() * 2.2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.4 + 0.2
      });
    }

    // 3D Matrix Rotation & Projection Utilities
    const focalLength = 650;

    const project = (p: Point3D, cx: number, cy: number): { x: number; y: number; scale: number; visible: boolean } => {
      const z = p.z + focalLength;
      if (z <= 20) return { x: 0, y: 0, scale: 0, visible: false };
      const scale = focalLength / z;
      return {
        x: cx + p.x * scale,
        y: cy + p.y * scale,
        scale,
        visible: true
      };
    };

    const rotateX = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: p.x,
        y: p.y * cos - p.z * sin,
        z: p.y * sin + p.z * cos
      };
    };

    const rotateY = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: p.x * cos + p.z * sin,
        y: p.y,
        z: -p.x * sin + p.z * cos
      };
    };

    const rotateZ = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: p.x * cos - p.y * sin,
        y: p.x * sin + p.y * cos,
        z: p.z
      };
    };

    // Render loop
    let clock = 0;

    const render = () => {
      clock += 0.016;

      // Lerp scroll and mouse for organic smoothness
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const progress = Math.min(1, Math.max(0, currentScrollY / maxScroll));
      const scrollRotation = currentScrollY * 0.0035;

      ctx.clearRect(0, 0, width, height);

      // Section focal anchor coordinates
      // Screen centers
      const cx = width * 0.5;
      const cy = height * 0.5;

      // 1. Draw 3D Ambient Glowing Particles with depth & scroll parallax
      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];
        // Scroll vertically with parallax based on depth
        const scrollDelta = (currentScrollY * pt.speed * 0.5) % 1200;
        let py = pt.baseY - scrollDelta;
        if (py < -700) py += 1400;

        let p3d: Point3D = { x: pt.baseX, y: py, z: pt.baseZ };
        // Gentle rotation
        p3d = rotateY(p3d, mouseX * 0.15 + (prefersReducedMotion ? 0 : clock * 0.05));
        p3d = rotateX(p3d, mouseY * 0.15);

        const proj = project(p3d, cx, cy);
        if (proj.visible && proj.scale > 0) {
          const alpha = Math.min(0.65, Math.max(0.1, (proj.scale * 0.45)));
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, pt.size * proj.scale, 0, Math.PI * 2);
          ctx.fillStyle = pt.color;
          ctx.globalAlpha = alpha;
          ctx.shadowBlur = 8 * proj.scale;
          ctx.shadowColor = pt.color;
          ctx.fill();
        }
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      // 2. Section 1 / Hero: 3D Floating Marketing Megaphone
      // Active primarily when progress < 0.28
      if (progress < 0.28) {
        const heroAlpha = Math.max(0, 1 - progress * 4);
        if (heroAlpha > 0.01) {
          ctx.save();
          ctx.globalAlpha = heroAlpha * 0.75;

          // Position in top right / hero visual area
          const megaX = isMobile ? width * 0.25 : width * 0.35;
          const megaY = height * 0.32 - currentScrollY * 0.3;
          const megaRotY = scrollRotation * 1.2 + (prefersReducedMotion ? 0.3 : Math.sin(clock * 0.8) * 0.15);
          const megaRotX = 0.25 + mouseY * 0.2;

          // Megaphone body vertices
          const coneLength = isMobile ? 80 : 120;
          const mouthR = isMobile ? 40 : 60;
          const throatR = isMobile ? 14 : 20;

          // Draw acoustic pulse rings expanding on scroll
          const wavePhase = (currentScrollY * 0.05 + clock * 2) % 3;
          for (let w = 0; w < 3; w++) {
            const wProg = (wavePhase + w) % 3;
            const wRadius = mouthR * (1.2 + wProg * 0.8);
            const wAlpha = Math.max(0, (1 - wProg / 3) * heroAlpha * 0.4);
            const ringPoint: Point3D = { x: coneLength * 0.5 + wProg * 35, y: 0, z: 0 };
            const rRotated = rotateX(rotateY(ringPoint, megaRotY), megaRotX);
            const prj = project(rRotated, cx + megaX, cy + (megaY - cy));

            if (prj.visible) {
              ctx.beginPath();
              ctx.ellipse(prj.x, prj.y, wRadius * prj.scale, (wRadius * 0.55) * prj.scale, megaRotY, 0, Math.PI * 2);
              ctx.strokeStyle = "#38BDF8";
              ctx.lineWidth = 1.5 * prj.scale;
              ctx.globalAlpha = wAlpha;
              ctx.stroke();
            }
          }

          // Draw 3D Megaphone cone slices
          ctx.globalAlpha = heroAlpha * 0.85;
          const segments = 12;
          const mouthPoints: Point3D[] = [];
          const throatPoints: Point3D[] = [];

          for (let s = 0; s < segments; s++) {
            const th = (s / segments) * Math.PI * 2;
            const my = Math.cos(th) * mouthR;
            const mz = Math.sin(th) * mouthR;
            const ty = Math.cos(th) * throatR;
            const tz = Math.sin(th) * throatR;

            mouthPoints.push(rotateX(rotateY({ x: coneLength * 0.5, y: my, z: mz }, megaRotY), megaRotX));
            throatPoints.push(rotateX(rotateY({ x: -coneLength * 0.5, y: ty, z: tz }, megaRotY), megaRotX));
          }

          // Render cone facets
          for (let s = 0; s < segments; s++) {
            const next = (s + 1) % segments;
            const p1 = project(throatPoints[s], cx + megaX, cy + (megaY - cy));
            const p2 = project(throatPoints[next], cx + megaX, cy + (megaY - cy));
            const p3 = project(mouthPoints[next], cx + megaX, cy + (megaY - cy));
            const p4 = project(mouthPoints[s], cx + megaX, cy + (megaY - cy));

            if (p1.visible && p2.visible && p3.visible && p4.visible) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.lineTo(p3.x, p3.y);
              ctx.lineTo(p4.x, p4.y);
              ctx.closePath();

              const shade = Math.abs(Math.sin((s / segments) * Math.PI + megaRotY));
              ctx.fillStyle = s % 2 === 0 ? `rgba(59, 130, 246, ${0.25 + shade * 0.35})` : `rgba(16, 42, 86, ${0.4 + shade * 0.35})`;
              ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
              ctx.lineWidth = 1;
              ctx.fill();
              ctx.stroke();
            }
          }

          // Handle
          const handleTop: Point3D = rotateX(rotateY({ x: -coneLength * 0.2, y: throatR, z: 0 }, megaRotY), megaRotX);
          const handleBottom: Point3D = rotateX(rotateY({ x: -coneLength * 0.1, y: throatR + 35, z: 0 }, megaRotY), megaRotX);
          const htPrj = project(handleTop, cx + megaX, cy + (megaY - cy));
          const hbPrj = project(handleBottom, cx + megaX, cy + (megaY - cy));
          if (htPrj.visible && hbPrj.visible) {
            ctx.beginPath();
            ctx.moveTo(htPrj.x, htPrj.y);
            ctx.lineTo(hbPrj.x, hbPrj.y);
            ctx.strokeStyle = "#D4AF37";
            ctx.lineWidth = 4 * htPrj.scale;
            ctx.lineCap = "round";
            ctx.stroke();
          }

          ctx.restore();
        }
      }

      // 3. Section 2 / Services: 3D Isometric Rotating Cube (Digital Ads & Meta Prism)
      // Active around progress 0.12 - 0.45
      if (progress > 0.08 && progress < 0.45) {
        const servFactor = Math.sin(((progress - 0.08) / 0.37) * Math.PI);
        if (servFactor > 0.02) {
          ctx.save();
          ctx.globalAlpha = servFactor * 0.65;

          const cubeX = isMobile ? -width * 0.3 : -width * 0.36;
          const cubeY = height * 0.45;
          const size = isMobile ? 42 : 65;
          const cubeRotY = scrollRotation * 1.5 + clock * 0.2;
          const cubeRotX = scrollRotation * 0.8 + 0.4;
          const cubeRotZ = scrollRotation * 0.5;

          // 8 Cube vertices
          const v: Point3D[] = [
            { x: -size, y: -size, z: -size },
            { x: size, y: -size, z: -size },
            { x: size, y: size, z: -size },
            { x: -size, y: size, z: -size },
            { x: -size, y: -size, z: size },
            { x: size, y: -size, z: size },
            { x: size, y: size, z: size },
            { x: -size, y: size, z: size },
          ].map((pt) => rotateZ(rotateX(rotateY(pt, cubeRotY), cubeRotX), cubeRotZ));

          // 6 Faces defined by vertex indices & color styling
          const faces = [
            { indices: [0, 1, 2, 3], color: "rgba(59, 130, 246, 0.4)", stroke: "#38BDF8" }, // Back
            { indices: [4, 5, 6, 7], color: "rgba(221, 42, 123, 0.45)", stroke: "#F43F5E" }, // Front (Instagram hint)
            { indices: [0, 1, 5, 4], color: "rgba(29, 78, 216, 0.5)", stroke: "#60A5FA" }, // Top
            { indices: [2, 3, 7, 6], color: "rgba(11, 22, 48, 0.6)", stroke: "#3B82F6" }, // Bottom
            { indices: [0, 3, 7, 4], color: "rgba(30, 58, 138, 0.5)", stroke: "#93C5FD" }, // Left
            { indices: [1, 2, 6, 5], color: "rgba(212, 175, 55, 0.4)", stroke: "#FDE047" }, // Right (Gold hint)
          ];

          faces.forEach((face) => {
            const p1 = project(v[face.indices[0]], cx + cubeX, cy + (cubeY - cy));
            const p2 = project(v[face.indices[1]], cx + cubeX, cy + (cubeY - cy));
            const p3 = project(v[face.indices[2]], cx + cubeX, cy + (cubeY - cy));
            const p4 = project(v[face.indices[3]], cx + cubeX, cy + (cubeY - cy));

            if (p1.visible && p2.visible && p3.visible && p4.visible) {
              // Simple backface culling check
              const cross = (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
              if (cross > 0) {
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.lineTo(p3.x, p3.y);
                ctx.lineTo(p4.x, p4.y);
                ctx.closePath();
                ctx.fillStyle = face.color;
                ctx.fill();
                ctx.strokeStyle = face.stroke;
                ctx.lineWidth = 1.5;
                ctx.stroke();
              }
            }
          });

          ctx.restore();
        }
      }

      // 4. Section 3 / Portfolio: 3D Floating Web Browser & Laptop Frame
      // Active around progress 0.28 - 0.58
      if (progress > 0.25 && progress < 0.58) {
        const portFactor = Math.sin(((progress - 0.25) / 0.33) * Math.PI);
        if (portFactor > 0.02) {
          ctx.save();
          ctx.globalAlpha = portFactor * 0.6;

          const frameX = isMobile ? width * 0.28 : width * 0.36;
          const frameY = height * 0.5;
          const bw = isMobile ? 85 : 130;
          const bh = isMobile ? 55 : 85;
          const frameRotY = -0.45 + Math.sin(scrollRotation * 0.8) * 0.25;
          const frameRotX = 0.25 + mouseY * 0.15;

          // Wireframe browser window
          const rectVerts: Point3D[] = [
            { x: -bw, y: -bh, z: 0 },
            { x: bw, y: -bh, z: 0 },
            { x: bw, y: bh, z: 0 },
            { x: -bw, y: bh, z: 0 },
          ].map((p) => rotateX(rotateY(p, frameRotY), frameRotX));

          const p1 = project(rectVerts[0], cx + frameX, cy + (frameY - cy));
          const p2 = project(rectVerts[1], cx + frameX, cy + (frameY - cy));
          const p3 = project(rectVerts[2], cx + frameX, cy + (frameY - cy));
          const p4 = project(rectVerts[3], cx + frameX, cy + (frameY - cy));

          if (p1.visible && p2.visible && p3.visible && p4.visible) {
            // Browser canvas body
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.lineTo(p4.x, p4.y);
            ctx.closePath();
            ctx.fillStyle = "rgba(11, 22, 48, 0.65)";
            ctx.fill();
            ctx.strokeStyle = "rgba(56, 189, 248, 0.7)";
            ctx.lineWidth = 1.8;
            ctx.stroke();

            // Browser top tab bar divider line
            const barLeft = rotateX(rotateY({ x: -bw, y: -bh + 20, z: 2 }, frameRotY), frameRotX);
            const barRight = rotateX(rotateY({ x: bw, y: -bh + 20, z: 2 }, frameRotY), frameRotX);
            const blPrj = project(barLeft, cx + frameX, cy + (frameY - cy));
            const brPrj = project(barRight, cx + frameX, cy + (frameY - cy));
            if (blPrj.visible && brPrj.visible) {
              ctx.beginPath();
              ctx.moveTo(blPrj.x, blPrj.y);
              ctx.lineTo(brPrj.x, brPrj.y);
              ctx.strokeStyle = "rgba(59, 130, 246, 0.4)";
              ctx.lineWidth = 1;
              ctx.stroke();
            }

            // Window dots (red, yellow, green)
            [-bw + 15, -bw + 27, -bw + 39].forEach((dotX, idx) => {
              const dPt = rotateX(rotateY({ x: dotX, y: -bh + 10, z: 3 }, frameRotY), frameRotX);
              const dPrj = project(dPt, cx + frameX, cy + (frameY - cy));
              if (dPrj.visible) {
                ctx.beginPath();
                ctx.arc(dPrj.x, dPrj.y, 2.5 * dPrj.scale, 0, Math.PI * 2);
                ctx.fillStyle = idx === 0 ? "#EF4444" : idx === 1 ? "#EAB308" : "#10B981";
                ctx.fill();
              }
            });
          }

          ctx.restore();
        }
      }

      // 5. Section 4 / Offers & Growth: 3D Extruded Growth Chart & Upward Arrow
      // Active around progress 0.42 - 0.72
      if (progress > 0.38 && progress < 0.72) {
        const growthFactor = Math.sin(((progress - 0.38) / 0.34) * Math.PI);
        if (growthFactor > 0.02) {
          ctx.save();
          ctx.globalAlpha = growthFactor * 0.7;

          const chartX = isMobile ? -width * 0.28 : -width * 0.35;
          const chartY = height * 0.52;
          const chartRotY = 0.55 + Math.sin(scrollRotation * 0.6) * 0.2;
          const chartRotX = 0.38;

          // 4 Extruded 3D pillars
          const barHeights = [30, 55, 80, 115];
          const barColors = ["#1E40AF", "#2563EB", "#38BDF8", "#D4AF37"];
          const barSpacing = isMobile ? 26 : 38;
          const barSize = isMobile ? 14 : 20;

          barHeights.forEach((bHeight, bIdx) => {
            const bx = (bIdx - 1.5) * barSpacing;
            // Base coordinates
            const pBase: Point3D = rotateX(rotateY({ x: bx, y: 50, z: 0 }, chartRotY), chartRotX);
            const pTop: Point3D = rotateX(rotateY({ x: bx, y: 50 - bHeight, z: 0 }, chartRotY), chartRotX);

            const bPrj = project(pBase, cx + chartX, cy + (chartY - cy));
            const tPrj = project(pTop, cx + chartX, cy + (chartY - cy));

            if (bPrj.visible && tPrj.visible) {
              ctx.beginPath();
              ctx.moveTo(bPrj.x - barSize * 0.5 * bPrj.scale, bPrj.y);
              ctx.lineTo(bPrj.x + barSize * 0.5 * bPrj.scale, bPrj.y);
              ctx.lineTo(tPrj.x + barSize * 0.5 * tPrj.scale, tPrj.y);
              ctx.lineTo(tPrj.x - barSize * 0.5 * tPrj.scale, tPrj.y);
              ctx.closePath();

              ctx.fillStyle = barColors[bIdx];
              ctx.fill();
              ctx.strokeStyle = "#FFFFFF";
              ctx.lineWidth = 1;
              ctx.stroke();

              // Glowing top cap
              ctx.beginPath();
              ctx.ellipse(tPrj.x, tPrj.y, (barSize * 0.5) * tPrj.scale, (barSize * 0.25) * tPrj.scale, 0, 0, Math.PI * 2);
              ctx.fillStyle = "#FFFFFF";
              ctx.fill();
            }
          });

          // Upward trending laser trendline
          ctx.beginPath();
          let firstPt = true;
          barHeights.forEach((bHeight, bIdx) => {
            const bx = (bIdx - 1.5) * barSpacing;
            const pTop: Point3D = rotateX(rotateY({ x: bx, y: 40 - bHeight, z: 10 }, chartRotY), chartRotX);
            const tPrj = project(pTop, cx + chartX, cy + (chartY - cy));
            if (tPrj.visible) {
              if (firstPt) {
                ctx.moveTo(tPrj.x, tPrj.y);
                firstPt = false;
              } else {
                ctx.lineTo(tPrj.x, tPrj.y);
              }
            }
          });
          ctx.strokeStyle = "rgba(234, 179, 8, 0.4)";
          ctx.lineWidth = 5;
          ctx.stroke();
          ctx.strokeStyle = "#FDE047";
          ctx.lineWidth = 2.5;
          ctx.stroke();

          ctx.restore();
        }
      }

      // 6. Section 6 / About & Tech: 3D AI Core & Network Gyroscope
      // Active around progress 0.60 - 0.88
      if (progress > 0.55 && progress < 0.88) {
        const aiFactor = Math.sin(((progress - 0.55) / 0.33) * Math.PI);
        if (aiFactor > 0.02) {
          ctx.save();
          ctx.globalAlpha = aiFactor * 0.65;

          const coreX = isMobile ? width * 0.28 : width * 0.36;
          const coreY = height * 0.5;
          const radius = isMobile ? 45 : 70;
          const coreRotY = scrollRotation * 1.8 + clock * 0.3;
          const coreRotX = scrollRotation * 1.2 + 0.3;
          const coreRotZ = clock * 0.5;

          // 3 Concentric orthogonal rings (Gyroscope)
          const ringConfigs = [
            { axis: "x", color: "#38BDF8", r: radius },
            { axis: "y", color: "#3B82F6", r: radius * 0.85 },
            { axis: "z", color: "#D4AF37", r: radius * 0.7 },
          ];

          ringConfigs.forEach((cfg) => {
            const pts: Point3D[] = [];
            const ringSegs = 24;
            for (let s = 0; s <= ringSegs; s++) {
              const th = (s / ringSegs) * Math.PI * 2;
              let pt: Point3D = { x: 0, y: 0, z: 0 };
              if (cfg.axis === "x") pt = { x: 0, y: Math.cos(th) * cfg.r, z: Math.sin(th) * cfg.r };
              if (cfg.axis === "y") pt = { x: Math.cos(th) * cfg.r, y: 0, z: Math.sin(th) * cfg.r };
              if (cfg.axis === "z") pt = { x: Math.cos(th) * cfg.r, y: Math.sin(th) * cfg.r, z: 0 };

              pts.push(rotateZ(rotateX(rotateY(pt, coreRotY), coreRotX), coreRotZ));
            }

            ctx.beginPath();
            let started = false;
            pts.forEach((p) => {
              const prj = project(p, cx + coreX, cy + (coreY - cy));
              if (prj.visible) {
                if (!started) {
                  ctx.moveTo(prj.x, prj.y);
                  started = true;
                } else {
                  ctx.lineTo(prj.x, prj.y);
                }
              }
            });
            ctx.strokeStyle = cfg.color;
            ctx.lineWidth = 1.8;
            ctx.stroke();
          });

          // Center glowing core node
          const centerPrj = project(
            rotateZ(rotateX(rotateY({ x: 0, y: 0, z: 0 }, coreRotY), coreRotX), coreRotZ),
            cx + coreX,
            cy + (coreY - cy)
          );
          if (centerPrj.visible) {
            ctx.beginPath();
            ctx.arc(centerPrj.x, centerPrj.y, 14 * centerPrj.scale, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(56, 189, 248, 0.28)";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(centerPrj.x, centerPrj.y, 8 * centerPrj.scale, 0, Math.PI * 2);
            ctx.fillStyle = "#38BDF8";
            ctx.fill();
          }

          ctx.restore();
        }
      }

      // 7. Section 7 & 8 / FAQ & Contact: 3D SEO Search Orb & Connectivity Pulse
      // Active around progress 0.78 - 1.0
      if (progress > 0.72) {
        const contactFactor = Math.min(1, (progress - 0.72) / 0.28);
        if (contactFactor > 0.02) {
          ctx.save();
          ctx.globalAlpha = contactFactor * 0.65;

          const orbX = isMobile ? -width * 0.28 : -width * 0.35;
          const orbY = height * 0.48;
          const orbRotY = scrollRotation * 1.4 + clock * 0.25;
          const orbRotX = 0.4 + mouseY * 0.2;
          const orbRadius = isMobile ? 40 : 65;

          // Wireframe 3D Latitude/Longitude Orb
          for (let lat = -2; lat <= 2; lat++) {
            const latRadius = orbRadius * Math.cos((lat / 3) * (Math.PI / 2));
            const latY = orbRadius * Math.sin((lat / 3) * (Math.PI / 2));
            const pts: Point3D[] = [];
            const segs = 20;

            for (let s = 0; s <= segs; s++) {
              const th = (s / segs) * Math.PI * 2;
              pts.push(rotateX(rotateY({ x: Math.cos(th) * latRadius, y: latY, z: Math.sin(th) * latRadius }, orbRotY), orbRotX));
            }

            ctx.beginPath();
            let started = false;
            pts.forEach((p) => {
              const prj = project(p, cx + orbX, cy + (orbY - cy));
              if (prj.visible) {
                if (!started) {
                  ctx.moveTo(prj.x, prj.y);
                  started = true;
                } else {
                  ctx.lineTo(prj.x, prj.y);
                }
              }
            });
            ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          // 3D Target crosshairs
          const crossArm = orbRadius * 1.35;
          const crossHoriz1 = rotateX(rotateY({ x: -crossArm, y: 0, z: 0 }, orbRotY), orbRotX);
          const crossHoriz2 = rotateX(rotateY({ x: crossArm, y: 0, z: 0 }, orbRotY), orbRotX);
          const ch1Prj = project(crossHoriz1, cx + orbX, cy + (orbY - cy));
          const ch2Prj = project(crossHoriz2, cx + orbX, cy + (orbY - cy));

          if (ch1Prj.visible && ch2Prj.visible) {
            ctx.beginPath();
            ctx.moveTo(ch1Prj.x, ch1Prj.y);
            ctx.lineTo(ch2Prj.x, ch2Prj.y);
            ctx.strokeStyle = "#38BDF8";
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }

          ctx.restore();
        }
      }

      if (!document.hidden && !prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    if (!document.hidden && !prefersReducedMotion) {
      animId = requestAnimationFrame(render);
    }

    const handleVisibility = () => {
      if (document.hidden || prefersReducedMotion) {
        cancelAnimationFrame(animId);
      } else {
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-90 transition-opacity duration-500 w-full h-full max-w-full overflow-hidden"
      aria-hidden="true"
    />
  );
};
