"use client";
import { useEffect, useRef } from "react";

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const config = {
      // canvasBg: "#0d0c0c", // Dark background
      canvasBg: "#1f1d1d", // Dark background
      logoSize: 2200,
      distortionRadius: 2000,
      forceStrength: 0.02,
      maxDisplacement: 600,
      returnForce: 0.1,
      logoPath: "/varun-agro.svg",
      particleSpacing: 2,
    };

    let gl;
    let program;
    let geometry;
    let particles = [];
    let posArray;
    let mouse = { x: 0, y: 0 };
    let execCount = 0;
    let isMobile = false;
    let animFrame;

    const init = () => {
      isMobile = window.innerWidth < 1000;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";

      gl = canvas.getContext("webgl", {
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
        desynchronized: true,
      });

      if (!gl) return;

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      setupShaders();
      loadImage();

      if (!isMobile) {
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
      }
      window.addEventListener("resize", handleResize);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      mouse.x = (e.clientX - rect.left) * dpr;
      mouse.y = (e.clientY - rect.top) * dpr;
      if (execCount === 0) execCount = 60 * 5; // Activate physics for a few seconds
    };

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      
      if (particles.length > 0) {
        // Re-center particles? Or just let them be. 
        // Ideally we might want to recreate them but that's expensive.
        // For now just update viewport in render.
      }
    };

    const setupShaders = () => {
      const vs = `
        precision mediump float;
        uniform vec2 u_resolution;
        attribute vec2 a_position;
        attribute vec4 a_color;
        varying vec4 v_color;
        void main() {
          vec2 clip = (a_position / u_resolution * 2.0 - 1.0) * vec2(1.0, -1.0);
          v_color = a_color;
          gl_Position = vec4(clip, 0.0, 1.0);
          gl_PointSize = 3.0;
        }`;

      const fs = `
        precision mediump float;
        varying vec4 v_color;
        void main() {
          if (v_color.a < 0.01) discard;
          float dist = length(gl_PointCoord - 0.5);
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          gl_FragColor = vec4(v_color.rgb, v_color.a * alpha);
        }`;

      const createShader = (type, source) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
      };

      const vShader = createShader(gl.VERTEX_SHADER, vs);
      const fShader = createShader(gl.FRAGMENT_SHADER, fs);

      if (!vShader || !fShader) return;

      program = gl.createProgram();
      gl.attachShader(program, vShader);
      gl.attachShader(program, fShader);
      gl.linkProgram(program);
    };

    const loadImage = () => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const temp = document.createElement("canvas");
        const ctx = temp.getContext("2d", { willReadFrequently: true });
        temp.width = temp.height = config.logoSize;

        const s = config.logoSize * 0.9;
        const aspect = img.width / img.height;
        let dw, dh;
        
        if (aspect >= 1) {
          dw = s;
          dh = s / aspect;
        } else {
          dw = s * aspect;
          dh = s;
        }

        const ox = (config.logoSize - dw) / 2;
        const oy = (config.logoSize - dh) / 2;

        ctx.drawImage(img, ox, oy, dw, dh);
        createParticles(ctx.getImageData(0, 0, config.logoSize, config.logoSize).data);
      };
      img.src = config.logoPath;
    };

    const createParticles = (pixels) => {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      // Calculate scale to fit width (accounting for internal padding)
      // The logo takes up 90% of the grid internally (s = logoSize * 0.9)
      // So setting scale = width / logoSize makes the logo occupy 90% of screen width
      const scale = Math.min(window.innerWidth / config.logoSize, 1.2); 
      const dim = config.logoSize;
      const spacing = config.particleSpacing;

      const pos = [];
      const col = [];
      particles = [];

      for (let i = 0; i < dim; i += spacing) {
        for (let j = 0; j < dim; j += spacing) {
          const idx = (i * dim + j) * 4;
          if (pixels[idx + 3] > 50) {
            const x = cx + (j - dim / 2) * scale;
            const y = cy + (i - dim / 2) * scale;

            pos.push(x, y);
            // Use light color for particles on dark background
            // rgb(242, 237, 230) -> var(--base-100)
            col.push(
              242 / 255,
              237 / 255,
              230 / 255,
              (pixels[idx + 3] / 255) * 0.4
            );
            particles.push({ ox: x, oy: y, vx: 0, vy: 0 });
          }
        }
      }

      posArray = new Float32Array(pos);
      const posBuf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
      gl.bufferData(gl.ARRAY_BUFFER, posArray, gl.DYNAMIC_DRAW);

      const colBuf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, colBuf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(col), gl.STATIC_DRAW);

      geometry = { posBuf, colBuf, count: particles.length };
      animate();
    };

    const animate = () => {
      animFrame = requestAnimationFrame(animate);

      if (!isMobile && execCount > 0) {
        execCount--;
        const rad = config.distortionRadius ** 2;
        let needsUpdate = false;

        for (let i = 0; i < particles.length; i++) {
            const x = posArray[i * 2];
            const y = posArray[i * 2 + 1];
            const p = particles[i];
            const dx = mouse.x - x;
            const dy = mouse.y - y;
            const dis = dx * dx + dy * dy;

            if (dis < rad && dis > 0) {
                const f = -rad / dis;
                const distOrig = Math.sqrt((x - p.ox) ** 2 + (y - p.oy) ** 2);
                const mult = Math.max(0.1, 1 - distOrig / (config.maxDisplacement * 2));
                
                p.vx += f * Math.cos(Math.atan2(dy, dx)) * config.forceStrength * mult;
                p.vy += f * Math.sin(Math.atan2(dy, dx)) * config.forceStrength * mult;
                needsUpdate = true;
            }

            if (Math.abs(p.vx) > 0.01 || Math.abs(p.vy) > 0.01) {
                const nx = x + (p.vx *= 0.82) + (p.ox - x) * config.returnForce;
                const ny = y + (p.vy *= 0.82) + (p.oy - y) * config.returnForce;
                
                posArray[i * 2] = nx;
                posArray[i * 2 + 1] = ny;
                needsUpdate = true;
            }
        }

        if (needsUpdate) {
          gl.bindBuffer(gl.ARRAY_BUFFER, geometry.posBuf);
          gl.bufferSubData(gl.ARRAY_BUFFER, 0, posArray);
        }
      }

      render();
    };

    const render = () => {
      if (!gl || !program) return;
      
      // Clear with transparent background to overlay on hero
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0); // Transparent
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);

      gl.uniform2f(
        gl.getUniformLocation(program, "u_resolution"),
        canvas.width,
        canvas.height
      );

      gl.bindBuffer(gl.ARRAY_BUFFER, geometry.posBuf);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, geometry.colBuf);
      gl.enableVertexAttribArray(1);
      gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.POINTS, 0, geometry.count);
    };

    init();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (gl) {
          // Cleanup WebGL resources if needed
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1, // Behind hero-content (if z-index adjusted) or just rely on DOM order
        pointerEvents: "none", // Allow clicks to pass through
      }}
    />
  );
};

export default ParticleBackground;
