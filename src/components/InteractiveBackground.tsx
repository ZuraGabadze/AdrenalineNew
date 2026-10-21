import React, { useEffect, useRef } from 'react';

interface EmberParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  pulseSpeed: number;
  phase: number;
}

const VOXEL_CUBES = [
  { id: 1, left: '7%', top: '18%', size: 42, depth: 0.035, rotX: 22, rotY: -32 },
  { id: 2, left: '88%', top: '15%', size: 52, depth: 0.05, rotX: -18, rotY: 38 },
  { id: 3, left: '14%', top: '68%', size: 34, depth: 0.025, rotX: 30, rotY: 24 },
  { id: 4, left: '84%', top: '64%', size: 46, depth: 0.045, rotX: -24, rotY: -28 },
  { id: 5, left: '52%', top: '82%', size: 30, depth: 0.02, rotX: 16, rotY: 42 },
];

export const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const cubeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const particleCount = prefersReducedMotion ? 16 : isMobile ? 32 : 68;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const particles: EmberParticle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(0.35 + Math.random() * 0.75),
      size: Math.random() > 0.7 ? 4 : 3,
      alpha: 0.2 + Math.random() * 0.55,
      pulseSpeed: 0.015 + Math.random() * 0.025,
      phase: Math.random() * Math.PI * 2,
    }));

    const mouse = {
      targetX: width * 0.5,
      targetY: height * 0.35,
      x: width * 0.5,
      y: height * 0.35,
      active: false,
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const nx = Math.max(-30, Math.min(30, e.gamma)) / 30;
        const ny = Math.max(-30, Math.min(30, e.beta - 45)) / 30;
        mouse.targetX = width * 0.5 + nx * (width * 0.25);
        mouse.targetY = height * 0.4 + ny * (height * 0.2);
      }
    };

    window.addEventListener('resize', resize, { passive: true });
    if (!isMobile) {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
    } else {
      window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });
    }

    let rafId = 0;
    let isHidden = document.hidden;
    let tick = 0;

    const onVisibilityChange = () => {
      isHidden = document.hidden;
      if (!isHidden && !prefersReducedMotion && !rafId) {
        rafId = window.requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const render = () => {
      rafId = 0;
      if (isHidden) return;

      tick += 0.012;
      if (isMobile && !mouse.active) {
        mouse.targetX = width * 0.5 + Math.sin(tick * 0.8) * (width * 0.22);
        mouse.targetY = height * 0.38 + Math.cos(tick * 0.6) * (height * 0.16);
      }

      // Lerp cursor position
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${mouse.x - 280}px, ${mouse.y - 280}px, 0)`;
      }

      // Parallax voxel cubes
      const offsetX = mouse.x - width * 0.5;
      const offsetY = mouse.y - height * 0.5;
      for (let i = 0; i < VOXEL_CUBES.length; i++) {
        const el = cubeRefs.current[i];
        if (!el) continue;
        const cfg = VOXEL_CUBES[i];
        const px = -offsetX * cfg.depth;
        const py = -offsetY * cfg.depth;
        const rx = cfg.rotX + py * 0.35;
        const ry = cfg.rotY + px * 0.35;
        el.style.transform = `translate3d(${px}px, ${py}px, 0) rotateX(${rx}deg) rotateY(${ry}deg)`;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          p.phase += p.pulseSpeed;

          // Gentle cursor interaction
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 22500 && distSq > 4) {
            const dist = Math.sqrt(distSq);
            const force = (150 - dist) / 150;
            p.x += (dx / dist) * force * 0.9;
            p.y += (dy / dist) * force * 0.6;
          }

          if (p.y < -12) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -12) p.x = width + 10;
          if (p.x > width + 12) p.x = -10;
        }

        const currentAlpha = Math.max(0.1, Math.min(0.85, p.alpha + Math.sin(p.phase) * 0.18));
        ctx.fillStyle = i % 3 === 0 ? `rgba(255, 166, 64, ${currentAlpha})` : `rgba(255, 122, 0, ${currentAlpha})`;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
      }

      if (!prefersReducedMotion) {
        rafId = window.requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('deviceorientation', onDeviceOrientation);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Base Dark Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,122,0,0.08)_0%,_rgba(5,5,5,1)_70%)]" />

      {/* Faint Perspective Floor Grid */}
      <div
        className="absolute inset-x-0 bottom-0 h-[44vh] opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,122,0,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,122,0,0.18) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          transform: 'perspective(520px) rotateX(68deg) translateY(80px) scale(1.4)',
          transformOrigin: 'bottom center',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
        }}
      />

      {/* Soft Cursor Spotlight Glow */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[560px] h-[560px] rounded-full opacity-25 blur-3xl will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(255,122,0,0.28) 0%, rgba(232,93,0,0.06) 50%, transparent 72%)',
        }}
      />

      {/* 3D Parallax Floating Voxel Cubes */}
      <div className="absolute inset-0 perspective-1000">
        {VOXEL_CUBES.map((cube, idx) => {
          const half = cube.size / 2;
          return (
            <div
              key={cube.id}
              ref={(el) => {
                cubeRefs.current[idx] = el;
              }}
              className={`absolute preserve-3d will-change-transform ${
                idx > 2 ? 'hidden md:block' : ''
              }`}
              style={{
                left: cube.left,
                top: cube.top,
                width: `${cube.size}px`,
                height: `${cube.size}px`,
                transform: `rotateX(${cube.rotX}deg) rotateY(${cube.rotY}deg)`,
              }}
            >
              {[
                `rotateY(0deg) translateZ(${half}px)`,
                `rotateY(180deg) translateZ(${half}px)`,
                `rotateY(90deg) translateZ(${half}px)`,
                `rotateY(-90deg) translateZ(${half}px)`,
                `rotateX(90deg) translateZ(${half}px)`,
                `rotateX(-90deg) translateZ(${half}px)`,
              ].map((t, faceIdx) => (
                <div
                  key={faceIdx}
                  className="absolute inset-0 bg-[#0D0D0D]/80 border border-[#FF7A00]/25 shadow-[inset_0_0_10px_rgba(255,122,0,0.12)]"
                  style={{ transform: t }}
                />
              ))}
            </div>
          );
        })}
      </div>

      {/* Ember Particles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block" />
    </div>
  );
};
