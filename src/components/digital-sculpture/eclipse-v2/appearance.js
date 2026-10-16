// All geometry is expressed in a 260-unit radius. The seeded resting frame is
// cached at the display resolution; only light and nearby filaments move.
export const RADIUS = 260;
export const EXTENT = 530;
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
  const cyan = lobe(angle, 3.94, 0.27) + lobe(angle, 0.64, 0.24);
  const pink = Math.min(1, lobe(angle, -0.12, 0.48) + lobe(angle, 1.39, 0.38));
  const quiet = 1 - 0.7 * lobe(angle, 2.65, 0.3) - 0.58 * lobe(angle, 4.86, 0.22);
  const cluster = 0.52 + 0.23 * Math.sin(angle * 19 + 1.8) + 0.15 * Math.sin(angle * 43 - 0.6) + 0.1 * Math.sin(angle * 79);
  return { cyan, pink, energy: quiet * (0.28 + cyan * 0.72 + pink * 0.3), cluster: Math.max(0.12, cluster) };
}

function colourAt(angle, whiten = 0) {
  const { pink, cyan } = lightAt(angle);
  const mix = Math.min(1, pink * 1.16) * (1 - Math.min(1, cyan));
  const colour = [115 + 140 * mix, 203 - 149 * mix, 232 - 74 * mix];
  return colour.map((channel) => Math.round(channel + (255 - channel) * whiten));
}

function rgba(colour, alpha) {
  return `rgba(${colour.join(',')},${Math.max(0, Math.min(1, alpha))})`;
}

export function createCorona(settings, compact) {
  const random = seededRandom(settings.seed);
  const filaments = [];
  const dust = [];
  const count = Math.round((compact ? 2050 : 3600) * settings.detailDensity);
  for (let i = 0; i < count; i++) {
    const angle = random() * TAU;
    const light = lightAt(angle);
    if (random() > 0.25 + light.cluster * 0.75) continue;
    const tier = random();
    const length = tier < 0.77 ? 1 + random() ** 2 * 19 : tier < 0.975 ? 12 + random() ** 2 * 63 : 65 + random() * 123;
    // Stagger roots: medium/long threads do not all begin at the silhouette.
    const start = RADIUS + 0.45 + random() ** 2 * (tier > 0.77 ? 17 : 8);
    filaments.push({
      angle, start, length,
      bend: (random() - 0.5) * (tier < 0.77 ? 6 : 13),
      width: 0.23 + random() * 0.45,
      alpha: (0.21 + random() ** 2 * 0.76) * (0.5 + light.energy * 0.9) * (tier > 0.975 ? 0.5 : 1),
      colour: colourAt(angle, random() < 0.15 ? 0.8 : Math.min(0.4, light.cyan * 0.4)),
      bead: tier > 0.83 && random() < 0.28,
      phase: random() * TAU,
    });
  }
  for (let i = 0; i < (compact ? 5200 : 11000) * settings.detailDensity; i++) {
    const angle = random() * TAU;
    const light = lightAt(angle);
    const distance = random() ** (i % 4 === 0 ? 0.9 : 2.3) * 254;
    const radius = RADIUS + 1.3 + distance;
    const fade = (1 - distance / 255) ** 1.6;
    const bright = random() > 0.986;
    dust.push({
      angle, radius, phase: random(),
      x: Math.cos(angle) * radius, y: Math.sin(angle) * radius,
      size: bright ? 0.65 + random() * 0.7 : 0.22 + random() * 0.5,
      alpha: (bright ? 0.9 : 0.13 + random() * 0.56) * fade * (0.5 + light.cluster * 0.7),
      colour: colourAt(angle, bright ? 0.5 : random() * 0.18),
    });
  }
  return { filaments, dust };
}

export function drawFilament(ctx, filament, response = 0, opacity = 1) {
  const { angle, start, length, bend, width, alpha, colour, bead } = filament;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const end = start + length + response * Math.min(length * 0.22, 9);
  const curl = bend + response * 5;
  ctx.beginPath();
  ctx.moveTo(cos * start, sin * start);
  ctx.quadraticCurveTo(cos * (start + length * 0.52) - sin * curl, sin * (start + length * 0.52) + cos * curl, cos * end - sin * curl * 0.35, sin * end + cos * curl * 0.35);
  ctx.lineWidth = width;
  ctx.strokeStyle = rgba(colour, alpha * opacity);
  ctx.stroke();
  if (bead) {
    ctx.beginPath();
    ctx.arc(cos * end - sin * curl * 0.35, sin * end + cos * curl * 0.35, width * 1.7, 0, TAU);
    ctx.fillStyle = rgba(colour, Math.min(0.85, alpha * 2) * opacity);
    ctx.fill();
  }
}

function glow(ctx, x, y, radius, colour, strength) {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, rgba(colour, strength));
  gradient.addColorStop(0.15, rgba(colour, strength * 0.58));
  gradient.addColorStop(0.45, rgba(colour, strength * 0.16));
  gradient.addColorStop(1, rgba(colour, 0));
  ctx.fillStyle = gradient;
  ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
}

// Saturated bloom is painted independently from the sharp, non-additive rim.
export function drawLight(ctx, settings, time = 0, strength = 1) {
  const flares = [
    { angle: 3.94, width: 0.21, colour: [66, 210, 255], gain: settings.cyanGlow },
    { angle: 0.64, width: 0.19, colour: [68, 221, 255], gain: settings.cyanGlow * 1.1 },
    { angle: -0.12, width: 0.38, colour: [255, 30, 130], gain: settings.pinkGlow * 0.77 },
    { angle: 1.39, width: 0.29, colour: [255, 24, 126], gain: settings.pinkGlow * 0.82 },
  ];
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  // Clip to the exterior, so scattered light never fogs the void.
  ctx.beginPath();
  ctx.rect(-EXTENT, -EXTENT, EXTENT * 2, EXTENT * 2);
  ctx.arc(0, 0, RADIUS - 0.25, 0, TAU, true);
  ctx.clip('evenodd');
  for (const flare of flares) {
    const pulse = 0.93 + 0.07 * Math.sin(time * 0.43 + flare.angle * 2);
    for (let j = -7; j <= 7; j++) {
      const angle = flare.angle + j * flare.width / 7;
      const weight = Math.exp(-((j / 4.3) ** 2));
      const x = Math.cos(angle) * (RADIUS + 3);
      const y = Math.sin(angle) * (RADIUS + 3);
      glow(ctx, x, y, 83, flare.colour, 0.11 * weight * flare.gain * pulse * strength);
      glow(ctx, x, y, 26, flare.colour, 0.28 * weight * flare.gain * pulse * strength);
    }
    if (flare.colour[0] < 100) {
      const x = Math.cos(flare.angle) * (RADIUS + 1);
      const y = Math.sin(flare.angle) * (RADIUS + 1);
      glow(ctx, x, y, 18, [177, 240, 255], 0.88 * flare.gain * pulse * strength);
      glow(ctx, x, y, 6, [243, 255, 255], 1 * flare.gain * pulse * strength);
    }
  }
  ctx.restore();
}

export function paintRestingCorona(ctx, corona, settings) {
  const random = seededRandom(settings.seed + 73);
  for (const particle of corona.dust) {
    ctx.fillStyle = rgba(particle.colour, particle.alpha);
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, TAU);
    ctx.fill();
  }
  for (const filament of corona.filaments) drawFilament(ctx, filament);

  // Small tangential loops break up radial regularity without thickening the rim.
  for (let i = 0; i < 1000 * settings.detailDensity; i++) {
    const angle = random() * TAU;
    const light = lightAt(angle);
    const start = RADIUS + 1 + random() ** 2 * 24;
    const span = 0.002 + random() * 0.019;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * start, Math.sin(angle) * start);
    ctx.quadraticCurveTo(Math.cos(angle + span / 2) * (start + random() * 8), Math.sin(angle + span / 2) * (start + random() * 8), Math.cos(angle + span) * start, Math.sin(angle + span) * start);
    ctx.strokeStyle = rgba(colourAt(angle), (0.08 + random() * 0.3) * light.energy);
    ctx.lineWidth = 0.35;
    ctx.stroke();
  }
  // One finely sampled edge, rather than thousands of overlapping white roots.
  for (let i = 0; i < 1800; i++) {
    const angle = i / 1800 * TAU;
    const light = lightAt(angle);
    const radius = RADIUS + Math.sin(angle * 151) * 0.17 + random() * 0.36;
    ctx.beginPath();
    ctx.arc(0, 0, radius, angle, angle + TAU / 1800 * 1.08);
    ctx.lineWidth = 0.55 + random() * 0.6;
    ctx.strokeStyle = rgba(colourAt(angle, 0.5 + Math.min(1, light.cyan) * 0.4), settings.rimOpacity * (0.55 + light.energy * 1.1) * (0.7 + random() * 0.3));
    ctx.stroke();
  }
  drawLight(ctx, settings);
  // Tiny near-white cores are confined to two short arcs. Their coloured
  // shadows scatter outward without turning the entire perimeter white.
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  for (const centre of [3.94, 0.64]) {
    ctx.shadowColor = '#42dfff';
    ctx.shadowBlur = 9;
    for (let i = -45; i < 45; i++) {
      const angle = centre + i * 0.0028;
      const peak = Math.exp(-((i / 30) ** 2));
      const r = RADIUS + 0.3 + random() * 0.65;
      ctx.beginPath();
      ctx.arc(0, 0, r, angle, angle + 0.0033);
      ctx.lineWidth = 0.55 + peak * 1.15;
      ctx.strokeStyle = rgba([218, 252, 255], peak * settings.cyanGlow);
      ctx.stroke();
      if (i % 2 === 0) {
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * (r + 1), Math.sin(angle) * (r + 1));
        const end = r + 2 + random() * 15 * peak;
        ctx.lineTo(Math.cos(angle + 0.002) * end, Math.sin(angle + 0.002) * end);
        ctx.lineWidth = 0.4;
        ctx.strokeStyle = rgba([181, 239, 255], peak * 0.7);
        ctx.stroke();
      }
    }
  }
  ctx.restore();
}

export function drawDrift(ctx, dust, time) {
  for (let i = 0; i < dust.length; i += 47) {
    const particle = dust[i];
    const cycle = (time * 0.018 + particle.phase) % 1;
    const radius = particle.radius + cycle * 12;
    ctx.fillStyle = rgba(particle.colour, particle.alpha * Math.sin(cycle * Math.PI) * 0.65);
    ctx.beginPath();
    ctx.arc(Math.cos(particle.angle) * radius, Math.sin(particle.angle) * radius, particle.size * 1.1, 0, TAU);
    ctx.fill();
  }
}
