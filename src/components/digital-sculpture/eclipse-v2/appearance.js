// All geometry is expressed in a 260-unit radius. Atmospheric glow is cached at
// display resolution; the particle-based data ring is animated every frame.
export const RADIUS = 260;
export const EXTENT = 540;
const TAU = Math.PI * 2;

export function seededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function lobe(angle, centre, width) {
  const distance = Math.atan2(Math.sin(angle - centre), Math.cos(angle - centre));
  return Math.exp(-((distance / width) ** 2));
}

// Canvas angles run clockwise: cyan at 10 and 4 o'clock, pink at 3 and 6.
export function lightAt(angle) {
  const cyan = lobe(angle, 3.94, 0.29) + lobe(angle, 0.64, 0.26);
  const pink = Math.min(1, lobe(angle, -0.12, 0.50) + lobe(angle, 1.39, 0.40));
  const quiet = 1 - 0.76 * lobe(angle, 2.65, 0.32) - 0.66 * lobe(angle, 4.86, 0.25);
  const cluster = 0.52 + 0.24 * Math.sin(angle * 17 + 1.8) + 0.15 * Math.sin(angle * 37 - 0.6) + 0.09 * Math.sin(angle * 71);
  return {
    cyan,
    pink,
    energy: Math.max(0.08, quiet * (0.24 + cyan * 0.78 + pink * 0.36)),
    cluster: Math.max(0.12, cluster * quiet),
  };
}

function colourAt(angle, whiten = 0) {
  const { pink, cyan } = lightAt(angle);
  const mix = Math.min(1, pink * 1.22) * (1 - Math.min(1, cyan * 0.92));
  // Rich electric cyan [18, 228, 255] to vivid saturated pink/magenta [255, 38, 134]
  const colour = [
    18 + 237 * mix,
    228 - 190 * mix,
    255 - 121 * mix,
  ];
  return colour.map((channel) => Math.round(channel + (255 - channel) * whiten));
}

function rgba(colour, alpha) {
  return `rgba(${colour.join(',')},${Math.max(0, Math.min(1, alpha))})`;
}

// Pulse wave envelope: steep leading edge with a smooth fading trail behind it
function pulseActivation(angle, pulseCentre, trailWidth) {
  const diff = ((pulseCentre - angle) % TAU + TAU) % TAU;
  if (diff > TAU - 0.24) {
    const t = (diff - (TAU - 0.24)) / 0.24;
    return t * t * (3 - 2 * t);
  }
  if (diff < trailWidth) {
    return Math.exp(-diff / (trailWidth * 0.36));
  }
  return 0;
}

export function createCorona(settings, compact) {
  const random = seededRandom(settings.seed);
  const density = (settings.particleDensity ?? 1) * (settings.detailDensity ?? 1);
  const sizeScale = settings.particleSize ?? 1.0;

  const streams = [];
  const dust = [];
  const filaments = [];

  // 1. Curved Radial Data Streams (sequences of discrete luminous dots along loosely radial paths)
  const targetStreams = Math.round((compact ? 320 : 560) * density);
  for (let i = 0; i < targetStreams; i++) {
    const angle = (i / targetStreams) * TAU + (random() - 0.5) * (TAU / targetStreams) * 0.82;
    const light = lightAt(angle);

    // Keep quiet stretches calmer while preserving a coherent circular silhouette
    if (random() > 0.24 + light.cluster * 0.76) continue;

    const tier = random();
    const length = tier < 0.48
      ? 14 + (random() ** 1.4) * 28
      : tier < 0.86
        ? 44 + (random() ** 1.3) * 78
        : 125 + random() * 135;

    // Stagger inner starting radii near the rim so dots define the circle without merging into a white band
    const start = RADIUS + 1.6 + (random() ** 1.5) * (tier > 0.48 ? 11 : 6.5);

    // Slight organic curvature along the outward path
    const bendDir = Math.sin(angle * 3 + 0.7) * 0.04 + (random() - 0.5) * 0.22;
    const bend = bendDir * (12 + length * 0.20);

    const dotCount = tier < 0.48
      ? 4 + Math.floor(random() * 3)
      : tier < 0.86
        ? 6 + Math.floor(random() * 5)
        : 9 + Math.floor(random() * 6);

    const flowRate = (0.22 + random() * 0.18) * (tier < 0.48 ? 1.12 : tier < 0.86 ? 0.94 : 0.78);
    const breathPhase = random() * TAU;
    const dots = [];

    for (let k = 0; k < dotCount; k++) {
      // Evenly staggered progress with organic spacing variation (maintaining clear dark gaps)
      const s0 = ((k + 0.14 + random() * 0.72) / dotCount) % 1;
      const isLeader = k === 0 || (k === dotCount - 1 && tier > 0.75 && random() < 0.35);
      // Reserve near-white core tint for only the brightest cyan highlight cores
      const whiten = isLeader && light.cyan > 0.72
        ? 0.58
        : Math.min(0.22, light.cyan * 0.22);

      dots.push({
        s0,
        perpOffset: (random() - 0.5) * 1.8,
        size: (isLeader ? 0.95 + random() * 0.55 : 0.58 + (random() ** 1.5) * 0.68) * sizeScale,
        // Keep resting alpha restrained so moving pulses & outward flow stand out clearly
        alpha: (0.16 + (random() ** 1.5) * 0.38) * (0.38 + light.energy * 0.72),
        colour: colourAt(angle, whiten),
        hotColour: colourAt(angle, Math.min(0.92, whiten + 0.54)),
        isLeader,
      });
    }

    streams.push({
      angle,
      cos: Math.cos(angle),
      sin: Math.sin(angle),
      start,
      length,
      bend,
      flowRate,
      breathPhase,
      energy: light.energy,
      cyan: light.cyan,
      pink: light.pink,
      dots,
    });
  }

  // 2. Staggered Inner-Rim & Peripheral Outward-Drifting Data Dust
  const dustCount = Math.round((compact ? 520 : 980) * density);
  for (let i = 0; i < dustCount; i++) {
    const angle = random() * TAU;
    const light = lightAt(angle);
    if (random() > 0.24 + light.cluster * 0.76) continue;

    const nearRim = i < dustCount * 0.38;
    const span = nearRim
      ? 10 + (random() ** 1.5) * 26
      : 32 + (random() ** 1.8) * 210;
    const startRadius = nearRim
      ? RADIUS + 1.2 + random() * 5.5
      : RADIUS + 4.0 + (random() ** 1.6) * 24;
    const bright = random() > 0.90;
    const whiten = bright && light.cyan > 0.62 ? 0.45 : random() * 0.14;

    dust.push({
      angle,
      cos: Math.cos(angle),
      sin: Math.sin(angle),
      startRadius,
      span,
      s0: random(),
      flowRate: nearRim ? 0.10 + random() * 0.12 : 0.14 + random() * 0.18,
      sway: (random() - 0.5) * (nearRim ? 2.5 : 7.5),
      breathPhase: random() * TAU,
      size: (bright ? 0.92 + random() * 0.52 : 0.48 + random() * 0.55) * sizeScale,
      alpha: (bright ? 0.46 : 0.14 + random() * 0.28) * (0.42 + light.energy * 0.68),
      colour: colourAt(angle, whiten),
      hotColour: colourAt(angle, Math.min(0.88, whiten + 0.48)),
      energy: light.energy,
    });
  }

  return { streams, dust, filaments };
}

export function drawFilament(ctx, filament, response = 0, opacity = 1) {
  if (!filament) return;
  const { angle, start, length, width = 0.5, alpha = 0.2, colour = [66, 210, 255] } = filament;
  const r = start + length * 0.5 + response * 4;
  ctx.beginPath();
  ctx.arc(Math.cos(angle) * r, Math.sin(angle) * r, width * 1.4, 0, TAU);
  ctx.fillStyle = rgba(colour, alpha * opacity);
  ctx.fill();
}

function glow(ctx, x, y, radius, colour, strength) {
  if (strength <= 0.002) return;
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, rgba(colour, Math.min(1, strength)));
  gradient.addColorStop(0.18, rgba(colour, Math.min(1, strength * 0.56)));
  gradient.addColorStop(0.48, rgba(colour, Math.min(1, strength * 0.18)));
  gradient.addColorStop(1, rgba(colour, 0));
  ctx.fillStyle = gradient;
  ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
}

// Saturated atmospheric bloom behind the particle corona
export function drawLight(ctx, settings, time = 0, strength = 1) {
  const glowScale = settings.glowIntensity ?? 1.0;
  const flares = [
    { angle: 3.94, width: 0.22, colour: [38, 220, 255], gain: settings.cyanGlow * glowScale },
    { angle: 0.64, width: 0.20, colour: [42, 228, 255], gain: settings.cyanGlow * 1.12 * glowScale },
    { angle: -0.12, width: 0.39, colour: [255, 28, 130], gain: settings.pinkGlow * 0.80 * glowScale },
    { angle: 1.39, width: 0.30, colour: [255, 24, 126], gain: settings.pinkGlow * 0.84 * glowScale },
  ];
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  // Clip to the exterior so scattered light never fogs the dark centre void
  ctx.beginPath();
  ctx.rect(-EXTENT, -EXTENT, EXTENT * 2, EXTENT * 2);
  ctx.arc(0, 0, RADIUS - 0.25, 0, TAU, true);
  ctx.clip('evenodd');
  for (const flare of flares) {
    const pulse = 0.92 + 0.08 * Math.sin(time * 0.9 + flare.angle * 2);
    for (let j = -7; j <= 7; j++) {
      const angle = flare.angle + (j * flare.width) / 7;
      const weight = Math.exp(-((j / 4.3) ** 2));
      const x = Math.cos(angle) * (RADIUS + 4);
      const y = Math.sin(angle) * (RADIUS + 4);
      glow(ctx, x, y, 88, flare.colour, 0.11 * weight * flare.gain * pulse * strength);
      glow(ctx, x, y, 28, flare.colour, 0.26 * weight * flare.gain * pulse * strength);
    }
    if (flare.colour[0] < 100) {
      const x = Math.cos(flare.angle) * (RADIUS + 2);
      const y = Math.sin(flare.angle) * (RADIUS + 2);
      glow(ctx, x, y, 20, [160, 242, 255], 0.72 * flare.gain * pulse * strength);
      glow(ctx, x, y, 7, [238, 254, 255], 0.85 * flare.gain * pulse * strength);
    }
  }
  ctx.restore();
}

export function paintRestingCorona(ctx, corona, settings) {
  const random = seededRandom(settings.seed + 73);

  // Subtle broken micro-segments along the inner shadow edge (preserves dark gaps, never a white band)
  const segmentCount = Math.round(420 * (settings.detailDensity ?? 1));
  for (let i = 0; i < segmentCount; i++) {
    const angle = (i / segmentCount) * TAU + (random() - 0.5) * 0.005;
    const light = lightAt(angle);
    if (random() > 0.35 + light.energy * 0.55) continue;
    const radius = RADIUS + 0.8 + random() * 1.4;
    ctx.beginPath();
    ctx.arc(0, 0, radius, angle, angle + 0.0032);
    ctx.lineWidth = 0.45 + random() * 0.35;
    ctx.strokeStyle = rgba(
      colourAt(angle, Math.min(0.25, light.cyan * 0.25)),
      settings.rimOpacity * 0.28 * (0.35 + light.energy * 0.75)
    );
    ctx.stroke();
  }

  // Paint the rich cyan and pink atmospheric corona glow
  drawLight(ctx, settings);
}

// Live frame-rate-independent particle data ring renderer
export function drawCoronaParticles(ctx, corona, coronaSettings, animSettings, elapsed, pointerState) {
  if (!corona?.streams) return;

  const pulseSpeed = animSettings?.pulseSpeed ?? 0.84;
  const outwardFlowSpeed = animSettings?.outwardFlowSpeed ?? 0.30;
  const breathingAmplitude = animSettings?.breathingAmplitude ?? 0.09;
  const breathingSpeed = animSettings?.breathingSpeed ?? 1.25;
  const glowScale = coronaSettings?.glowIntensity ?? 1.35;

  // Two coordinated travelling activation pulses around the circumference (~7.5s and ~9.6s revolutions)
  const p1Centre = ((elapsed * pulseSpeed) % TAU + TAU) % TAU;
  const p2Centre = ((elapsed * pulseSpeed * 0.78 + 2.95) % TAU + TAU) % TAU;

  const hasPointer = pointerState && pointerState.active > 0.005;
  const ptrX = pointerState?.localX ?? 0;
  const ptrY = pointerState?.localY ?? 0;
  const ptrReach = pointerState?.reach ?? 95;
  const ptrActive = pointerState?.active ?? 0;

  // 1. Soft travelling coloured glow halos accompanying the activation pulses
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  for (const [centre, gain] of [[p1Centre, 1.0], [p2Centre, 0.84]]) {
    for (let step = 0; step < 6; step++) {
      const trailAngle = ((centre - step * 0.13) % TAU + TAU) % TAU;
      const trailWeight = Math.exp(-step * 0.48) * gain;
      const light = lightAt(trailAngle);
      const col = colourAt(trailAngle, light.cyan > 0.6 ? 0.16 : 0);
      const gx = Math.cos(trailAngle) * (RADIUS + 12);
      const gy = Math.sin(trailAngle) * (RADIUS + 12);
      glow(ctx, gx, gy, 58, col, 0.17 * trailWeight * (0.52 + light.energy * 0.68) * glowScale);
      glow(ctx, gx, gy, 22, col, 0.24 * trailWeight * (0.48 + light.energy * 0.72) * glowScale);
    }
  }
  ctx.restore();

  // 2. Outward-flowing curved particle sequences
  for (let i = 0; i < corona.streams.length; i++) {
    const stream = corona.streams[i];
    // Gentle 4-6s radial breathing with local variation
    const breath = Math.sin(elapsed * breathingSpeed + stream.angle * 2 + stream.breathPhase);
    const breathMult = 1 + breathingAmplitude * breath;
    const breathOffset = (breath * 0.5 + 0.5) * 4.5;

    const streamLen = stream.length * breathMult;
    const dots = stream.dots;

    for (let k = 0; k < dots.length; k++) {
      const dot = dots[k];
      // Continuous outward flow along path with staggered phase
      const s = (dot.s0 + elapsed * stream.flowRate * outwardFlowSpeed) % 1;

      // Smooth fade-in at inner edge and fade-out at outer tip (zero recycling pop)
      const birthFade = s < 0.14 ? s / 0.14 : 1;
      const outerFade = (1 - s) ** 1.5;
      const flowEnvelope = birthFade * outerFade;
      if (flowEnvelope <= 0.015) continue;

      // Travelling pulse activation with slight outward propagation lag
      const laggedAngle = ((stream.angle - s * 0.28) % TAU + TAU) % TAU;
      const w1 = pulseActivation(laggedAngle, p1Centre, 1.35);
      const w2 = pulseActivation(laggedAngle, p2Centre, 1.15) * 0.85;
      const pulse = Math.max(w1, w2);

      // Position along slightly curved radial trajectory
      const r = stream.start + breathOffset * (0.3 + 0.7 * s) + s * streamLen;
      const curveOffset = stream.bend * (s ** 1.35) + dot.perpOffset;
      let x = stream.cos * r - stream.sin * curveOffset;
      let y = stream.sin * r + stream.cos * curveOffset;

      // Pointer proximity displacement and local brightness boost
      let ptrBoost = 0;
      if (hasPointer) {
        const dx = x - ptrX;
        const dy = y - ptrY;
        const dist = Math.hypot(dx, dy);
        if (dist < ptrReach && dist > 0.001) {
          ptrBoost = ((1 - dist / ptrReach) ** 2) * ptrActive;
          const invD = 1 / dist;
          x += (dx * invD * 13 - dy * invD * 5) * ptrBoost;
          y += (dy * invD * 13 + dx * invD * 5) * ptrBoost;
        }
      }

      const activation = Math.min(1.5, pulse * (0.65 + stream.energy * 0.55) + ptrBoost * 1.15);
      const alpha = Math.min(0.98, dot.alpha * flowEnvelope * (1 + activation * 2.4));
      if (alpha <= 0.02) continue;

      const radius = dot.size * (1 + activation * 0.28) * (0.76 + 0.32 * (1 - s * 0.5));
      const activeColour = activation > 0.36 ? dot.hotColour : dot.colour;

      // Subtle feathered local halo around activated or leader dots (avoids large bokeh circles)
      if (activation > 0.25 || (dot.isLeader && alpha > 0.34)) {
        const haloAlpha = Math.min(0.24, alpha * (0.10 + activation * 0.11) * glowScale);
        ctx.fillStyle = rgba(dot.colour, haloAlpha);
        ctx.beginPath();
        ctx.arc(x, y, radius * (1.75 + activation * 0.45), 0, TAU);
        ctx.fill();
      }

      // Crisp individual luminous dot core
      ctx.fillStyle = rgba(activeColour, alpha);
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, TAU);
      ctx.fill();
    }
  }

  // 3. Peripheral & inner-rim outward-drifting data dust
  for (let i = 0; i < corona.dust.length; i++) {
    const particle = corona.dust[i];
    const s = (particle.s0 + elapsed * particle.flowRate * outwardFlowSpeed) % 1;
    const birthFade = s < 0.15 ? s / 0.15 : 1;
    const outerFade = (1 - s) ** 1.6;
    const envelope = birthFade * outerFade;
    if (envelope <= 0.02) continue;

    const breath = Math.sin(elapsed * breathingSpeed + particle.angle * 2 + particle.breathPhase);
    const r = particle.startRadius + s * particle.span * (1 + breathingAmplitude * 0.75 * breath);
    const swayOffset = Math.sin(elapsed * 0.65 + particle.breathPhase) * particle.sway * s;

    let x = particle.cos * r - particle.sin * swayOffset;
    let y = particle.sin * r + particle.cos * swayOffset;

    const laggedAngle = ((particle.angle - s * 0.32) % TAU + TAU) % TAU;
    const pulse = Math.max(
      pulseActivation(laggedAngle, p1Centre, 1.25),
      pulseActivation(laggedAngle, p2Centre, 1.05) * 0.8
    );

    let ptrBoost = 0;
    if (hasPointer) {
      const dx = x - ptrX;
      const dy = y - ptrY;
      const dist = Math.hypot(dx, dy);
      if (dist < ptrReach && dist > 0.001) {
        ptrBoost = ((1 - dist / ptrReach) ** 2) * ptrActive;
        x += (dx / dist) * 10 * ptrBoost;
        y += (dy / dist) * 10 * ptrBoost;
      }
    }

    const activation = pulse * 0.85 + ptrBoost;
    const alpha = Math.min(0.95, particle.alpha * envelope * (1 + activation * 2.2));
    if (alpha <= 0.02) continue;

    const radius = particle.size * (1 + activation * 0.26);
    if (activation > 0.38) {
      ctx.fillStyle = rgba(particle.colour, Math.min(0.20, alpha * 0.16 * glowScale));
      ctx.beginPath();
      ctx.arc(x, y, radius * 1.85, 0, TAU);
      ctx.fill();
    }
    ctx.fillStyle = rgba(activation > 0.35 ? particle.hotColour : particle.colour, alpha);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, TAU);
    ctx.fill();
  }
}

export function drawDrift(ctx, dust, time) {
  if (!dust) return;
  for (let i = 0; i < dust.length; i += 47) {
    const particle = dust[i];
    const cycle = (time * 0.08 + (particle.s0 ?? particle.phase ?? 0)) % 1;
    const radius = (particle.startRadius ?? particle.radius ?? RADIUS + 8) + cycle * 24;
    ctx.fillStyle = rgba(particle.colour, particle.alpha * Math.sin(cycle * Math.PI) * 0.65);
    ctx.beginPath();
    ctx.arc(Math.cos(particle.angle) * radius, Math.sin(particle.angle) * radius, particle.size, 0, TAU);
    ctx.fill();
  }
}

