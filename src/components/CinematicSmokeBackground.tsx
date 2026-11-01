import React, { useEffect, useRef, useState, useCallback } from "react";

export type SmokeSectionPreset =
  | "hero"
  | "services"
  | "portfolio"
  | "offers"
  | "reviews"
  | "about"
  | "faq"
  | "contact"
  | "custom";

export interface SmokeCustomConfig {
  intensity?: number;
  speed?: number;
  opacity?: number;
  centerBias?: [number, number];
  vignette?: number;
  scale?: number;
  colors?: {
    deep?: [number, number, number];
    electric?: [number, number, number];
    cyan?: [number, number, number];
    violet?: [number, number, number];
    edge?: [number, number, number];
  };
}

interface CinematicSmokeBackgroundProps {
  preset?: SmokeSectionPreset;
  customConfig?: SmokeCustomConfig;
  className?: string;
  blendMode?: "normal" | "screen" | "lighten" | "color-dodge";
}

// Section preset configurations tailored to DigWeb Expert's branding and layout
const PRESET_CONFIGS: Record<SmokeSectionPreset, {
  intensity: number;
  speed: number;
  opacity: number;
  centerBias: [number, number];
  vignette: number;
  scale: number;
  colors: {
    deep: [number, number, number];
    electric: [number, number, number];
    cyan: [number, number, number];
    violet: [number, number, number];
    edge: [number, number, number];
  };
}> = {
  hero: {
    intensity: 1.0,
    speed: 0.65,
    opacity: 0.88,
    // Right-biased: brightest smoke rises behind the hero graphics/charts, leaving typography crisp
    centerBias: [0.72, 0.45],
    vignette: 1.15,
    scale: 2.2,
    colors: {
      deep: [0.043, 0.086, 0.188],      // #0B1630 Deep Navy
      electric: [0.231, 0.510, 0.965],  // #3B82F6 Electric Blue
      cyan: [0.220, 0.741, 0.973],      // #38BDF8 Bright Cyan
      violet: [0.310, 0.275, 0.898],    // #4F46E5 Violet-Blue
      edge: [0.878, 0.949, 0.996]       // #E0F2FE White-Blue Rim
    }
  },
  services: {
    intensity: 0.68,
    speed: 0.48,
    opacity: 0.45,
    centerBias: [0.5, 0.5],
    vignette: 1.0,
    scale: 2.8,
    colors: {
      deep: [0.035, 0.075, 0.165],
      electric: [0.231, 0.510, 0.965],
      cyan: [0.220, 0.741, 0.973],
      violet: [0.250, 0.220, 0.750],
      edge: [0.878, 0.949, 0.996]
    }
  },
  portfolio: {
    intensity: 0.75,
    speed: 0.52,
    opacity: 0.52,
    centerBias: [0.5, 0.6],
    vignette: 1.05,
    scale: 2.5,
    colors: {
      deep: [0.043, 0.086, 0.188],
      electric: [0.231, 0.510, 0.965],
      cyan: [0.220, 0.741, 0.973],
      violet: [0.280, 0.240, 0.820],
      edge: [0.878, 0.949, 0.996]
    }
  },
  offers: {
    intensity: 0.85,
    speed: 0.60,
    opacity: 0.58,
    centerBias: [0.5, 0.5],
    vignette: 1.0,
    scale: 2.3,
    colors: {
      deep: [0.040, 0.080, 0.180],
      electric: [0.231, 0.510, 0.965],
      cyan: [0.220, 0.741, 0.973],
      violet: [0.350, 0.280, 0.900],
      edge: [0.900, 0.960, 1.000]
    }
  },
  reviews: {
    intensity: 0.58,
    speed: 0.42,
    opacity: 0.42,
    centerBias: [0.45, 0.5],
    vignette: 1.0,
    scale: 3.0,
    colors: {
      deep: [0.043, 0.086, 0.188],
      electric: [0.231, 0.510, 0.965],
      cyan: [0.220, 0.741, 0.973],
      violet: [0.260, 0.230, 0.760],
      edge: [0.850, 0.920, 0.980]
    }
  },
  about: {
    intensity: 0.70,
    speed: 0.48,
    opacity: 0.48,
    // Left-biased around founder photo while softly drifting into story
    centerBias: [0.38, 0.5],
    vignette: 1.1,
    scale: 2.6,
    colors: {
      deep: [0.043, 0.086, 0.188],
      electric: [0.231, 0.510, 0.965],
      cyan: [0.220, 0.741, 0.973],
      violet: [0.310, 0.275, 0.898],
      edge: [0.878, 0.949, 0.996]
    }
  },
  faq: {
    intensity: 0.45,
    speed: 0.38,
    opacity: 0.32,
    centerBias: [0.5, 0.5],
    vignette: 0.95,
    scale: 3.2,
    colors: {
      deep: [0.060, 0.110, 0.220],
      electric: [0.231, 0.510, 0.965],
      cyan: [0.220, 0.741, 0.973],
      violet: [0.250, 0.220, 0.720],
      edge: [0.878, 0.949, 0.996]
    }
  },
  contact: {
    intensity: 0.92,
    speed: 0.58,
    opacity: 0.75,
    // Illuminated curling smoke behind appointment booking form
    centerBias: [0.62, 0.48],
    vignette: 1.15,
    scale: 2.4,
    colors: {
      deep: [0.043, 0.086, 0.188],
      electric: [0.231, 0.510, 0.965],
      cyan: [0.220, 0.741, 0.973],
      violet: [0.330, 0.290, 0.910],
      edge: [0.890, 0.955, 1.000]
    }
  },
  custom: {
    intensity: 0.75,
    speed: 0.50,
    opacity: 0.50,
    centerBias: [0.5, 0.5],
    vignette: 1.0,
    scale: 2.5,
    colors: {
      deep: [0.043, 0.086, 0.188],
      electric: [0.231, 0.510, 0.965],
      cyan: [0.220, 0.741, 0.973],
      violet: [0.310, 0.275, 0.898],
      edge: [0.878, 0.949, 0.996]
    }
  }
};

// High-performance vertex shader
const VERTEX_SHADER_SRC = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = (a_position + 1.0) * 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// Volumetric multi-octave FBM fluid smoke shader with dual domain warping & edge illumination
const FRAGMENT_SHADER_SRC = `
  precision highp float;
  varying vec2 v_uv;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_scroll;
  uniform float u_intensity;
  uniform float u_opacity;
  uniform float u_scale;
  uniform float u_vignette;
  uniform vec2 u_center_bias;

  uniform vec3 u_color_deep;
  uniform vec3 u_color_electric;
  uniform vec3 u_color_cyan;
  uniform vec3 u_color_violet;
  uniform vec3 u_color_edge;

  // Artifact-free pseudo-random hash
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  // Smooth quintic 2D noise
  float noise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);

    float a = dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0));
    float b = dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0));
    float c = dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0));
    float d = dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0));

    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  // 4-octave Fractional Brownian Motion with rotation matrix to eliminate directional grain
  const mat2 rot = mat2(0.80, -0.60, 0.60, 0.80);

  float fbm(vec2 p) {
    float total = 0.0;
    float amp = 0.52;
    for (int i = 0; i < 4; i++) {
      total += amp * noise2D(p);
      p = rot * p * 2.04 + vec2(1.3, 2.7);
      amp *= 0.48;
    }
    return total;
  }

  // Dual-stage Domain Warping: mimics volumetric fluid curl & vortex dynamics of cinematic smoke
  float smokeSimulation(vec2 p, float t, out vec2 q, out vec2 r) {
    // Stage 1: broad slow drift
    q = vec2(
      fbm(p + vec2(0.0, 0.0) + vec2(0.035, 0.048) * t),
      fbm(p + vec2(5.2, 1.3) + vec2(-0.025, 0.038) * t)
    );

    // Stage 2: curling turbulence
    r = vec2(
      fbm(p + 3.2 * q + vec2(1.7, 9.2) + vec2(0.065, -0.052) * t),
      fbm(p + 3.2 * q + vec2(8.3, 2.8) + vec2(-0.042, 0.060) * t)
    );

    // Final smoke density field with curl displacement
    return fbm(p + 3.4 * r);
  }

  void main() {
    // Aspect-ratio corrected UV coordinates
    vec2 st = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    st *= (u_scale * 0.45);

    // Subtle scroll and mouse interaction
    st.y += u_scroll * 0.15;
    vec2 mouseOffset = (u_mouse - 0.5) * 0.25;
    st += mouseOffset;

    float t = u_time * 0.45;

    // Single-pass volumetric smoke calculation (eliminates 66% of trigonometric math)
    vec2 q;
    vec2 r;
    float smoke = smokeSimulation(st, t, q, r);

    // Analytical normal gradient derived from domain curl vector r
    // Mathematically collinear with the spatial gradient of the warped density field
    vec2 normal = normalize(r + vec2(0.0001));

    // Directional rim illumination from top-right light source
    float rimLight = pow(clamp(dot(normal, vec2(0.707, 0.707)), 0.0, 1.0), 2.2);

    // Remap smoke density into smooth [0, 1] range
    float density = clamp(smoke * 0.85 + 0.50, 0.0, 1.0);
    density = pow(density, 1.15) * u_intensity;

    // Color mixing pipeline: Deep Navy -> Electric Blue -> Violet -> Bright Cyan -> White-Blue Rim
    vec3 color = u_color_deep;

    // Electric blue smoke body
    float electricWeight = smoothstep(0.18, 0.62, density);
    color = mix(color, u_color_electric, electricWeight * 0.88);

    // Violet-blue depth transitions in curling vortex troughs
    float vortexTrough = clamp(length(r) * 0.55, 0.0, 1.0);
    color = mix(color, u_color_violet, vortexTrough * 0.35);

    // Bright cyan highlights on dense smoke billows
    float cyanWeight = smoothstep(0.50, 0.90, density);
    color = mix(color, u_color_cyan, cyanWeight * 0.92);

    // White-blue edge illumination (soft illuminated smoke filaments)
    float edgeGlow = rimLight * smoothstep(0.28, 0.85, density);
    color += u_color_edge * edgeGlow * 0.55;

    // Compositional focus point and soft vignette
    vec2 centerCoord = v_uv - u_center_bias;
    float dist = length(centerCoord);
    float vignette = exp(-dist * u_vignette);

    // Fade edges smoothly so it blends seamlessly into the surrounding canvas
    float edgeFadeX = smoothstep(0.0, 0.08, v_uv.x) * smoothstep(1.0, 0.92, v_uv.x);
    float edgeFadeY = smoothstep(0.0, 0.08, v_uv.y) * smoothstep(1.0, 0.92, v_uv.y);
    float edgeFade = edgeFadeX * edgeFadeY;

    float alpha = clamp(density * vignette * edgeFade * u_opacity, 0.0, 1.0);

    gl_FragColor = vec4(color, alpha);
  }
`;

export const CinematicSmokeBackground: React.FC<CinematicSmokeBackgroundProps> = ({
  preset = "hero",
  customConfig,
  className = "",
  blendMode = "normal"
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  // Merge preset defaults with custom overrides
  const cfg = {
    ...PRESET_CONFIGS[preset],
    ...(customConfig || {}),
    colors: {
      ...PRESET_CONFIGS[preset].colors,
      ...(customConfig?.colors || {})
    }
  };

  useEffect(() => {
    // Accessibility check: user motion preference
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    motionQuery.addEventListener("change", handleMotionChange);
    return () => motionQuery.removeEventListener("change", handleMotionChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Check if reduced motion is requested; if so, halt render loop
    if (prefersReducedMotion) {
      return;
    }

    // Initialize WebGL context
    let gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: "low-power"
    });

    if (!gl) {
      gl = canvas.getContext("experimental-webgl") as WebGLRenderingContext | null;
    }

    if (!gl) {
      setWebglSupported(false);
      return;
    }

    // Shader compilation helper
    const createShader = (type: number, src: string): WebGLShader | null => {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, src);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.warn("[SmokeShader] Compilation error:", gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fragShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
    if (!vertShader || !fragShader) {
      setWebglSupported(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("[SmokeShader] Link error:", gl.getProgramInfoLog(program));
      setWebglSupported(false);
      return;
    }

    gl.useProgram(program);

    // Quad geometry covering [-1, 1]
    const quadVertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

    const aPosLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPosLoc);
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResLoc = gl.getUniformLocation(program, "u_resolution");
    const uTimeLoc = gl.getUniformLocation(program, "u_time");
    const uMouseLoc = gl.getUniformLocation(program, "u_mouse");
    const uScrollLoc = gl.getUniformLocation(program, "u_scroll");
    const uIntensityLoc = gl.getUniformLocation(program, "u_intensity");
    const uOpacityLoc = gl.getUniformLocation(program, "u_opacity");
    const uScaleLoc = gl.getUniformLocation(program, "u_scale");
    const uVignetteLoc = gl.getUniformLocation(program, "u_vignette");
    const uCenterBiasLoc = gl.getUniformLocation(program, "u_center_bias");
    const uColorDeepLoc = gl.getUniformLocation(program, "u_color_deep");
    const uColorElectricLoc = gl.getUniformLocation(program, "u_color_electric");
    const uColorCyanLoc = gl.getUniformLocation(program, "u_color_cyan");
    const uColorVioletLoc = gl.getUniformLocation(program, "u_color_violet");
    const uColorEdgeLoc = gl.getUniformLocation(program, "u_color_edge");

    // Static uniforms
    gl.uniform1f(uIntensityLoc, cfg.intensity);
    gl.uniform1f(uOpacityLoc, cfg.opacity);
    gl.uniform1f(uScaleLoc, cfg.scale);
    gl.uniform1f(uVignetteLoc, cfg.vignette);
    gl.uniform2f(uCenterBiasLoc, cfg.centerBias[0], cfg.centerBias[1]);

    gl.uniform3f(uColorDeepLoc, cfg.colors.deep[0], cfg.colors.deep[1], cfg.colors.deep[2]);
    gl.uniform3f(uColorElectricLoc, cfg.colors.electric[0], cfg.colors.electric[1], cfg.colors.electric[2]);
    gl.uniform3f(uColorCyanLoc, cfg.colors.cyan[0], cfg.colors.cyan[1], cfg.colors.cyan[2]);
    gl.uniform3f(uColorVioletLoc, cfg.colors.violet[0], cfg.colors.violet[1], cfg.colors.violet[2]);
    gl.uniform3f(uColorEdgeLoc, cfg.colors.edge[0], cfg.colors.edge[1], cfg.colors.edge[2]);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Responsive sizing & mobile performance scaling
    let animId = 0;
    let isVisible = false;
    let isRunning = false;
    let startTime = performance.now();
    let mouse = { x: 0.5, y: 0.5 };
    let scrollNorm = 0;

    const resize = () => {
      if (!canvas || !container || !gl) return;
      const rect = container.getBoundingClientRect();
      const isMobile = window.innerWidth < 768;
      // High-performance DPR clamp: 0.5x on mobile, 0.75x on desktop for ultra-fast fill-rate
      const dpr = isMobile ? Math.min(window.devicePixelRatio || 1, 1.0) * 0.5 : Math.min(window.devicePixelRatio || 1, 1.0) * 0.75;
      
      const targetW = Math.max(1, Math.floor(rect.width * dpr));
      const targetH = Math.max(1, Math.floor(rect.height * dpr));

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        gl.viewport(0, 0, targetW, targetH);
        gl.uniform2f(uResLoc, targetW, targetH);
      }
    };

    resize();

    // Loop control: Only execute rAF when actively intersecting viewport and tab is visible
    const render = () => {
      if (!isVisible || !gl || document.hidden) {
        isRunning = false;
        return;
      }
      const elapsed = (performance.now() - startTime) * 0.001 * cfg.speed;
      gl.uniform1f(uTimeLoc, elapsed);
      gl.uniform2f(uMouseLoc, mouse.x, mouse.y);
      gl.uniform1f(uScrollLoc, scrollNorm);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animId = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (isRunning || !gl) return;
      isRunning = true;
      animId = requestAnimationFrame(render);
    };

    const stopLoop = () => {
      isRunning = false;
      cancelAnimationFrame(animId);
    };

    // IntersectionObserver: Strictly pause and unpause animation loop
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry.isIntersecting;
        if (isVisible && !document.hidden) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.02 }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else if (isVisible) {
        startLoop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize, { passive: true });

    let mouseQueued = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible || mouseQueued) return;
      mouseQueued = true;
      requestAnimationFrame(() => {
        mouseQueued = false;
        if (!isVisible || !container) return;
        const rect = container.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          mouse.x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
          mouse.y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let scrollQueued = false;
    const handleScroll = () => {
      if (!isVisible || scrollQueued) return;
      scrollQueued = true;
      requestAnimationFrame(() => {
        scrollQueued = false;
        if (!isVisible || !container) return;
        const rect = container.getBoundingClientRect();
        scrollNorm = -rect.top / Math.max(1, window.innerHeight);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      stopLoop();
    };
    canvas.addEventListener("webglcontextlost", handleContextLost, false);

    // Clean up
    return () => {
      stopLoop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      canvas.removeEventListener("webglcontextlost", handleContextLost);

      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
        gl.deleteBuffer(posBuffer);
      }
    };
  }, [
    prefersReducedMotion,
    cfg.intensity,
    cfg.speed,
    cfg.opacity,
    cfg.scale,
    cfg.vignette,
    cfg.centerBias,
    cfg.colors
  ]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Reduced-Motion Static Graceful Fallback: Cinematic smoky blue atmospheric gradient */}
      {prefersReducedMotion && (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              preset === "hero" || preset === "contact"
                ? `radial-gradient(circle at 70% 45%, rgba(59,130,246,0.35) 0%, rgba(56,189,248,0.20) 30%, rgba(11,22,48,0.95) 70%), linear-gradient(135deg, #0B1630 0%, #102A56 100%)`
                : `radial-gradient(circle at 50% 50%, rgba(59,130,246,0.18) 0%, rgba(56,189,248,0.08) 40%, transparent 75%)`
          }}
        />
      )}

      {/* WebGL Animated Cinematic Smoke Canvas */}
      {!prefersReducedMotion && webglSupported && (
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{
            mixBlendMode: blendMode,
            filter: "blur(0.5px)"
          }}
        />
      )}

      {/* 2D Canvas Fallback in case WebGL is unavailable */}
      {!prefersReducedMotion && !webglSupported && (
        <Canvas2DFallback preset={preset} cfg={cfg} />
      )}
    </div>
  );
};

// Graceful 2D Canvas Procedural Smoke Simulation Fallback
const Canvas2DFallback: React.FC<{
  preset: SmokeSectionPreset;
  cfg: typeof PRESET_CONFIGS[SmokeSectionPreset];
}> = ({ preset, cfg }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // Drifting smoke puff particles
    const puffs = Array.from({ length: 18 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 120 + Math.random() * 220,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.2 - Math.random() * 0.4,
      alpha: 0.12 + Math.random() * 0.22,
      pulse: Math.random() * Math.PI * 2
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      puffs.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.015;

        if (p.y + p.radius < 0) p.y = height + p.radius;
        if (p.x - p.radius > width) p.x = -p.radius;
        if (p.x + p.radius < 0) p.x = width + p.radius;

        const currentRadius = p.radius + Math.sin(p.pulse) * 20;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentRadius);
        grad.addColorStop(0, `rgba(56, 189, 248, ${p.alpha * cfg.opacity})`);
        grad.addColorStop(0.4, `rgba(59, 130, 246, ${p.alpha * 0.7 * cfg.opacity})`);
        grad.addColorStop(0.8, `rgba(16, 42, 86, ${p.alpha * 0.25 * cfg.opacity})`);
        grad.addColorStop(1, "rgba(11, 22, 48, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [cfg]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
};
