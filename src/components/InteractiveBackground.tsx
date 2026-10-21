import React, { useEffect, useRef, useState } from 'react';
import { PixelSprite } from './PixelSprite';
import { useRealPngExists } from './SmartImage';

interface EmberParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  pulseSpeed: number;
  phase: number;
  life?: number;
  maxLife?: number;
}

type PearlLayer = 'far' | 'mid' | 'near';

interface PearlConfig {
  id: number;
  layer: PearlLayer;
  size: 48 | 64 | 80 | 96 | 128 | 160;
  baseOpacity: number;
  blurPx: number;
  maxShift: number;
  xPct: number;
  yPct: number;
  ampY: number;
  ampX: number;
  periodSec: number;
  phase: number;
  rotPhase: number;
  mobileVisible: boolean;
}

interface PearlRuntimeState {
  xPct: number;
  yPct: number;
  isVanished: boolean;
  reappearAt: number;
  cooldownUntil: number;
  scale: number;
}

// Keep mid & near pearls out of the center 40% of the screen width (i.e. avoid 30%..70%)
function randomEdgeXPct(side?: 'left' | 'right'): number {
  const chosenSide = side || (Math.random() < 0.5 ? 'left' : 'right');
  if (chosenSide === 'left') {
    return 4 + Math.random() * 23; // 4% .. 27%
  }
  return 73 + Math.random() * 23; // 73% .. 96%
}

function randomFarXPct(): number {
  // Far layer can be anywhere, biased slightly toward edges
  if (Math.random() < 0.7) {
    return randomEdgeXPct();
  }
  return 18 + Math.random() * 64;
}

function randomYPct(): number {
  return 8 + Math.random() * 82; // 8% .. 90%
}

// 14 pearls on Desktop (6 far, 5 mid, 3 near); 6 pearls on Mobile (2 far, 3 mid, 1 near)
const INITIAL_PEARLS: PearlConfig[] = [
  // FAR LAYER: 6 pearls, 48-64px, opacity .35, blur 1.5px, mouse shift up to 8px (2 visible on mobile)
  {
    id: 1,
    layer: 'far',
    size: 48,
    baseOpacity: 0.35,
    blurPx: 1.5,
    maxShift: 8,
    xPct: 9,
    yPct: 14,
    ampY: 12,
    ampX: 5,
    periodSec: 8.5,
    phase: 0.4,
    rotPhase: 1.1,
    mobileVisible: true,
  },
  {
    id: 2,
    layer: 'far',
    size: 64,
    baseOpacity: 0.35,
    blurPx: 1.5,
    maxShift: 8,
    xPct: 88,
    yPct: 22,
    ampY: 15,
    ampX: 6,
    periodSec: 10.2,
    phase: 1.9,
    rotPhase: 2.4,
    mobileVisible: true,
  },
  {
    id: 3,
    layer: 'far',
    size: 48,
    baseOpacity: 0.35,
    blurPx: 1.5,
    maxShift: 8,
    xPct: 22,
    yPct: 48,
    ampY: 11,
    ampX: 4,
    periodSec: 7.4,
    phase: 3.1,
    rotPhase: 0.7,
    mobileVisible: false,
  },
  {
    id: 4,
    layer: 'far',
    size: 64,
    baseOpacity: 0.35,
    blurPx: 1.5,
    maxShift: 8,
    xPct: 78,
    yPct: 56,
    ampY: 14,
    ampX: 5,
    periodSec: 9.6,
    phase: 4.5,
    rotPhase: 3.8,
    mobileVisible: false,
  },
  {
    id: 5,
    layer: 'far',
    size: 48,
    baseOpacity: 0.35,
    blurPx: 1.5,
    maxShift: 8,
    xPct: 16,
    yPct: 82,
    ampY: 13,
    ampX: 5,
    periodSec: 11.4,
    phase: 2.2,
    rotPhase: 5.0,
    mobileVisible: false,
  },
  {
    id: 6,
    layer: 'far',
    size: 64,
    baseOpacity: 0.35,
    blurPx: 1.5,
    maxShift: 8,
    xPct: 84,
    yPct: 84,
    ampY: 16,
    ampX: 6,
    periodSec: 8.9,
    phase: 5.4,
    rotPhase: 1.6,
    mobileVisible: false,
  },

  // MID LAYER: 5 pearls, 80-96px, opacity .6, no blur, mouse shift up to 20px, out of center 40% (3 visible on mobile)
  {
    id: 7,
    layer: 'mid',
    size: 80,
    baseOpacity: 0.6,
    blurPx: 0,
    maxShift: 20,
    xPct: 6,
    yPct: 30,
    ampY: 18,
    ampX: 7,
    periodSec: 7.8,
    phase: 0.9,
    rotPhase: 0.5,
    mobileVisible: true,
  },
  {
    id: 8,
    layer: 'mid',
    size: 96,
    baseOpacity: 0.6,
    blurPx: 0,
    maxShift: 20,
    xPct: 91,
    yPct: 36,
    ampY: 22,
    ampX: 8,
    periodSec: 9.1,
    phase: 2.7,
    rotPhase: 2.1,
    mobileVisible: true,
  },
  {
    id: 9,
    layer: 'mid',
    size: 80,
    baseOpacity: 0.6,
    blurPx: 0,
    maxShift: 20,
    xPct: 12,
    yPct: 66,
    ampY: 20,
    ampX: 6,
    periodSec: 10.6,
    phase: 4.1,
    rotPhase: 3.3,
    mobileVisible: true,
  },
  {
    id: 10,
    layer: 'mid',
    size: 96,
    baseOpacity: 0.6,
    blurPx: 0,
    maxShift: 20,
    xPct: 86,
    yPct: 70,
    ampY: 19,
    ampX: 7,
    periodSec: 6.8,
    phase: 1.3,
    rotPhase: 4.4,
    mobileVisible: false,
  },
  {
    id: 11,
    layer: 'mid',
    size: 80,
    baseOpacity: 0.6,
    blurPx: 0,
    maxShift: 20,
    xPct: 24,
    yPct: 18,
    ampY: 17,
    ampX: 6,
    periodSec: 8.3,
    phase: 5.8,
    rotPhase: 1.9,
    mobileVisible: false,
  },

  // NEAR LAYER: 3 pearls, 128-160px, opacity .85, blur 2px, mouse shift up to 40px, out of center 40% (1 visible on mobile)
  {
    id: 12,
    layer: 'near',
    size: 128,
    baseOpacity: 0.85,
    blurPx: 2,
    maxShift: 40,
    xPct: 5,
    yPct: 52,
    ampY: 26,
    ampX: 9,
    periodSec: 9.4,
    phase: 1.5,
    rotPhase: 0.8,
    mobileVisible: true,
  },
  {
    id: 13,
    layer: 'near',
    size: 160,
    baseOpacity: 0.85,
    blurPx: 2,
    maxShift: 40,
    xPct: 92,
    yPct: 14,
    ampY: 28,
    ampX: 10,
    periodSec: 11.2,
    phase: 3.6,
    rotPhase: 2.9,
    mobileVisible: false,
  },
  {
    id: 14,
    layer: 'near',
    size: 128,
    baseOpacity: 0.85,
    blurPx: 2,
    maxShift: 40,
    xPct: 90,
    yPct: 82,
    ampY: 24,
    ampX: 8,
    periodSec: 7.2,
    phase: 4.9,
    rotPhase: 4.1,
    mobileVisible: false,
  },
];

const ENDER_PEARL_PNG_PATH = '/assets/backgrounds/ender-pearl.png';

export const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const pearlRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasCustomPearlPng = useRealPngExists(ENDER_PEARL_PNG_PATH);
  const [isMobileView, setIsMobileView] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let isMobile = window.innerWidth < 768;
    setIsMobileView(isMobile);

    const baseParticleCount = prefersReducedMotion ? 16 : isMobile ? 32 : 68;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      isMobile = width < 768;
      setIsMobileView(isMobile);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const particles: EmberParticle[] = Array.from({ length: baseParticleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(0.35 + Math.random() * 0.75),
      size: Math.random() > 0.7 ? 4 : 3,
      alpha: 0.2 + Math.random() * 0.55,
      pulseSpeed: 0.015 + Math.random() * 0.025,
      phase: Math.random() * Math.PI * 2,
    }));

    // Spawn 6-8 orange sparks when a pearl teleports
    const spawnTeleportBurst = (originX: number, originY: number) => {
      const burstCount = 6 + Math.floor(Math.random() * 3); // 6 to 8 sparks
      for (let i = 0; i < burstCount; i++) {
        const angle = (Math.PI * 2 * i) / burstCount + (Math.random() - 0.5) * 0.4;
        const speed = 1.8 + Math.random() * 2.6;
        particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.4,
          size: Math.random() > 0.4 ? 4 : 3,
          alpha: 0.95,
          pulseSpeed: 0.08,
          phase: Math.random() * Math.PI,
          life: 0,
          maxLife: 26 + Math.floor(Math.random() * 12),
        });
      }
    };

    const pearlStates: PearlRuntimeState[] = INITIAL_PEARLS.map((p) => ({
      xPct: p.xPct,
      yPct: p.yPct,
      isVanished: false,
      reappearAt: 0,
      cooldownUntil: 0,
      scale: 1,
    }));

    const mouse = {
      targetX: width * 0.5,
      targetY: height * 0.35,
      x: width * 0.5,
      y: height * 0.35,
      rawX: -9999,
      rawY: -9999,
      active: false,
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.rawX = e.clientX;
      mouse.rawY = e.clientY;
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
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });

    let rafId = 0;
    let isHidden = document.hidden;
    const startTime = performance.now();

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

      const now = performance.now();
      const elapsedSec = (now - startTime) / 1000;

      if (isMobile && !mouse.active) {
        mouse.targetX = width * 0.5 + Math.sin(elapsedSec * 0.6) * (width * 0.22);
        mouse.targetY = height * 0.38 + Math.cos(elapsedSec * 0.45) * (height * 0.16);
      }

      // Lerp cursor position for smooth parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${mouse.x - 280}px, ${mouse.y - 280}px, 0)`;
      }

      // Normalized mouse offset in [-1, 1]
      const normX = width > 0 ? (mouse.x - width * 0.5) / (width * 0.5) : 0;
      const normY = height > 0 ? (mouse.y - height * 0.5) / (height * 0.5) : 0;

      // Update Ender Pearls
      for (let i = 0; i < INITIAL_PEARLS.length; i++) {
        const cfg = INITIAL_PEARLS[i];
        const st = pearlStates[i];
        const el = pearlRefs.current[i];
        if (!el) continue;

        if (isMobile && !cfg.mobileVisible) {
          continue;
        }

        // Check if vanished pearl should reappear (~600ms later at a new random position in the same depth layer)
        if (st.isVanished && now >= st.reappearAt) {
          st.isVanished = false;
          st.xPct = cfg.layer === 'far' ? randomFarXPct() : randomEdgeXPct();
          st.yPct = randomYPct();
          st.scale = 0.25;
        }

        if (!st.isVanished && st.scale < 1) {
          st.scale = Math.min(1, st.scale + 0.08);
        }

        const baseX = (st.xPct / 100) * width;
        const baseY = (st.yPct / 100) * height;

        // Sine bobbing + slow drift + gentle rotation (+-6deg)
        const omega = (Math.PI * 2) / cfg.periodSec;
        const bobY = prefersReducedMotion ? 0 : Math.sin(elapsedSec * omega + cfg.phase) * cfg.ampY;
        const driftX = prefersReducedMotion
          ? 0
          : Math.cos(elapsedSec * omega * 0.7 + cfg.phase) * cfg.ampX;
        const rotDeg = prefersReducedMotion
          ? 0
          : Math.sin(elapsedSec * omega * 0.85 + cfg.rotPhase) * 6;

        // Layer parallax shift (up to 8px far, 20px mid, 40px near)
        const shiftX = prefersReducedMotion ? 0 : -normX * cfg.maxShift;
        const shiftY = prefersReducedMotion ? 0 : -normY * cfg.maxShift;

        const centerX = baseX + driftX + shiftX;
        const centerY = baseY + bobY + shiftY;

        // Desktop Teleport Effect: cursor within ~60px of pearl center
        if (
          !prefersReducedMotion &&
          !isMobile &&
          mouse.active &&
          !st.isVanished &&
          now >= st.cooldownUntil
        ) {
          const dx = mouse.rawX - centerX;
          const dy = mouse.rawY - centerY;
          if (dx * dx + dy * dy <= 60 * 60) {
            st.isVanished = true;
            st.reappearAt = now + 600;
            st.cooldownUntil = now + 3000;
            st.scale = 0.1;
            spawnTeleportBurst(centerX, centerY);
          }
        }

        const drawX = Math.round(centerX - cfg.size * 0.5);
        const drawY = Math.round(centerY - cfg.size * 0.5);
        const currentOpacity = st.isVanished ? 0 : cfg.baseOpacity * st.scale;

        el.style.opacity = currentOpacity.toFixed(3);
        el.style.transform = `translate3d(${drawX}px, ${drawY}px, 0) rotate(${rotDeg.toFixed(
          2
        )}deg) scale(${st.scale.toFixed(3)})`;
      }

      // Render orange ember particles & teleport burst sparks
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const isBurstSpark = p.maxLife !== undefined;

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          p.phase += p.pulseSpeed;

          if (isBurstSpark) {
            p.vx *= 0.94;
            p.vy *= 0.94;
            p.life = (p.life || 0) + 1;
            if (p.life >= (p.maxLife || 30)) {
              particles.splice(i, 1);
              continue;
            }
          } else {
            // Gentle cursor interaction for ambient embers
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
        }

        const lifeRatio = isBurstSpark ? 1 - (p.life || 0) / (p.maxLife || 30) : 1;
        const currentAlpha = isBurstSpark
          ? Math.max(0, p.alpha * lifeRatio)
          : Math.max(0.1, Math.min(0.85, p.alpha + Math.sin(p.phase) * 0.18));

        ctx.fillStyle =
          isBurstSpark || i % 3 === 0
            ? `rgba(255, 166, 64, ${currentAlpha})`
            : `rgba(255, 122, 0, ${currentAlpha})`;
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
          background:
            'radial-gradient(circle, rgba(255,122,0,0.28) 0%, rgba(232,93,0,0.06) 50%, transparent 72%)',
        }}
      />

      {/* Parallax Minecraft Ender Pearl Layer (3 depth layers: far, mid, near) */}
      <div className="absolute inset-0 pointer-events-none">
        {INITIAL_PEARLS.map((pearl, idx) => {
          const hiddenOnMobile = isMobileView && !pearl.mobileVisible;
          return (
            <div
              key={pearl.id}
              ref={(el) => {
                pearlRefs.current[idx] = el;
              }}
              data-pearl-layer={pearl.layer}
              className={`absolute top-0 left-0 pointer-events-none ender-pearl-halo ${
                hiddenOnMobile ? 'hidden' : ' flex items-center justify-center'
              }`}
              style={{
                width: `${pearl.size}px`,
                height: `${pearl.size}px`,
                opacity: pearl.baseOpacity,
                filter: pearl.blurPx > 0 ? `blur(${pearl.blurPx}px)` : undefined,
                willChange: 'transform, opacity',
                transition: 'opacity 180ms ease-out',
              }}
            >
              {hasCustomPearlPng ? (
                <img
                  src={ENDER_PEARL_PNG_PATH}
                  alt=""
                  className="w-full h-full object-contain pixelated"
                  style={{
                    width: `${pearl.size}px`,
                    height: `${pearl.size}px`,
                    imageRendering: 'pixelated',
                  }}
                />
              ) : (
                <PixelSprite name="ender_pearl" size={pearl.size} alt="" />
              )}
            </div>
          );
        })}
      </div>

      {/* Ember Particles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block" />
    </div>
  );
};
