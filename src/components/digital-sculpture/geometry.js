import * as THREE from 'three';

/**
 * Topographic Landscape — 3D Arête-and-Cirque Alpine Terrain & Marching Squares Generator.
 *
 * Visual Target: Panel "01 / TOPOGRAPHIC LANDSCAPE"
 * - Large foreground slope entering from the lower left with a twin-lobe gully.
 * - Open lower-right valley entrance winding toward the center-left and distant horizon.
 * - Multiple overlapping, sharp-pointed alpine peaks with bright arête ridges and dark concave bowls.
 * - Prominent sharp mountain massif in the upper right, framed cleanly below the top sky.
 * - Densely layered smaller sharp peaks receding toward a high horizon.
 * - True constant-elevation horizontal cross-section contours (Marching Squares).
 * - Sparse, coherent magenta topographic routes following valleys and ridge saddles.
 */

/* ---------- Deterministic Noise Primitives ---------- */

function createNoise2D(seed = 2049) {
  const perm = new Uint8Array(512);
  let s = seed >>> 0;
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    const j = s % (i + 1);
    const tmp = p[i];
    p[i] = p[j];
    p[j] = tmp;
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  const gradX = [1, -1, 1, -1, 1, -1, 0, 0, 0.7071, -0.7071, 0.7071, -0.7071];
  const gradY = [0, 0, 1, 1, -1, -1, 1, -1, 0.7071, -0.7071, -0.7071, -0.7071];

  return function noise2D(x, y) {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const xf = x - xi;
    const yf = y - yi;

    const u = xf * xf * xf * (xf * (xf * 6.0 - 15.0) + 10.0);
    const v = yf * yf * yf * (yf * (yf * 6.0 - 15.0) + 10.0);

    const X = xi & 255;
    const Y = yi & 255;

    const g00 = perm[X + perm[Y]] % 12;
    const g10 = perm[X + 1 + perm[Y]] % 12;
    const g01 = perm[X + perm[Y + 1]] % 12;
    const g11 = perm[X + 1 + perm[Y + 1]] % 12;

    const n00 = gradX[g00] * xf + gradY[g00] * yf;
    const n10 = gradX[g10] * (xf - 1.0) + gradY[g10] * yf;
    const n01 = gradX[g01] * xf + gradY[g01] * (yf - 1.0);
    const n11 = gradX[g11] * (xf - 1.0) + gradY[g11] * (yf - 1.0);

    const nx0 = n00 + u * (n10 - n00);
    const nx1 = n01 + u * (n11 - n01);
    return nx0 + v * (nx1 - nx0);
  };
}

function smoothstep(edge0, edge1, x) {
  const t = Math.max(0.0, Math.min(1.0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3.0 - 2.0 * t);
}

/* ---------- Winding Central Valley Spine ---------- */

const VALLEY_WAYPOINTS = [
  { z: 16.0, x: 8.8 },
  { z: 10.5, x: 4.8 },
  { z: 6.0, x: 1.2 },
  { z: 1.5, x: -1.1 },
  { z: -3.0, x: 0.3 },
  { z: -7.5, x: -1.4 },
  { z: -12.5, x: -0.8 },
  { z: -18.0, x: -4.2 },
  { z: -25.0, x: -7.8 },
  { z: -33.0, x: -11.2 },
  { z: -45.0, x: -14.5 },
];

export function getValleyCenterX(z) {
  if (z >= VALLEY_WAYPOINTS[0].z) return VALLEY_WAYPOINTS[0].x;
  const last = VALLEY_WAYPOINTS.length - 1;
  if (z <= VALLEY_WAYPOINTS[last].z) return VALLEY_WAYPOINTS[last].x;

  let idx = 0;
  for (let i = 0; i < last; i++) {
    if (z <= VALLEY_WAYPOINTS[i].z && z >= VALLEY_WAYPOINTS[i + 1].z) {
      idx = i;
      break;
    }
  }

  const p0 = VALLEY_WAYPOINTS[Math.max(0, idx - 1)];
  const p1 = VALLEY_WAYPOINTS[idx];
  const p2 = VALLEY_WAYPOINTS[idx + 1];
  const p3 = VALLEY_WAYPOINTS[Math.min(last, idx + 2)];

  const span = p1.z - p2.z;
  const t = span > 1e-4 ? (p1.z - z) / span : 0.0;
  const t2 = t * t;
  const t3 = t2 * t;

  return (
    0.5 *
    (2.0 * p1.x +
      (-p0.x + p2.x) * t +
      (2.0 * p0.x - 5.0 * p1.x + 4.0 * p2.x - p3.x) * t2 +
      (-p0.x + 3.0 * p1.x - 3.0 * p2.x + p3.x) * t3)
  );
}

/* ---------- Connected Mountain Range Primitives (Asymmetric Massifs + Dipping Saddle Ridges) ---------- */

function smoothMax(a, b, k = 1.15) {
  const h = Math.max(k - Math.abs(a - b), 0.0) / k;
  return Math.max(a, b) + h * h * k * 0.25;
}

/**
 * Asymmetric 3D mountain massif with:
 * - 4 independent directional flank widths (wWest, wEast, wSouth, wNorth) for asymmetrical slopes
 * - Crooked, non-uniformly spaced oblique ridge spurs and deep branching valleys between spurs
 * - Configurable summit character: broad rounded peak (steepness ~ 1.15-1.30) vs sharp summit (1.55-1.78)
 */
function asymmetricPeakMassif(x, z, p, warpX, warpZ, ridgeNoise) {
  const dx0 = x - p.x;
  const dz0 = z - p.z;
  const maxR = Math.max(p.wWest, p.wEast, p.wSouth, p.wNorth) * 1.65;
  if (dx0 * dx0 > maxR * maxR || dz0 * dz0 > maxR * maxR) {
    return { h: 0.0, arete: 0.0 };
  }

  // Rotate into the mountain massif's strike orientation and apply strong organic domain warp
  const cosA = Math.cos(p.rot);
  const sinA = Math.sin(p.rot);
  const wx = dx0 + warpX * 0.65;
  const wz = dz0 + warpZ * 0.65;

  const lx = wx * cosA + wz * sinA;
  const lz = -wx * sinA + wz * cosA;

  // Asymmetrical directional radii (steeper escarpment on one side, broader flank on the other)
  const rx = lx < 0.0 ? p.wWest : p.wEast;
  const rz = lz < 0.0 ? p.wNorth : p.wSouth;

  const nx = lx / rx;
  const nz = lz / rz;
  const r = Math.sqrt(nx * nx + nz * nz);
  if (r >= 1.45) return { h: 0.0, arete: 0.0 };

  // Twist angle with radial distance so ridge spurs curve naturally as they descend into valleys
  const theta = Math.atan2(nz, nx) + p.phase + r * (p.twist ?? 0.38);

  // Irregular, asymmetric multi-harmonic ridge spurs (avoids uniform 4-pointed star cones)
  const w1 = 1.0 - Math.abs(Math.sin(theta * 1.5 + warpX * 0.35));
  const w2 = 1.0 - Math.abs(Math.sin(theta * 2.5 - warpZ * 0.38 + p.phase * 0.7));
  const w3 = 0.5 + 0.5 * Math.cos(theta * 1.0 + p.phase);
  const arete =
    Math.pow(w1, 2.1) * (0.48 + 0.24 * w3) +
    Math.pow(w2, 2.5) * 0.38;

  // Flank extends outward along crooked ridge spurs and pulls inward in branching valleys
  const spurReach = 0.54 + 0.62 * arete;
  const normR = r / spurReach;
  if (normR >= 1.0) return { h: 0.0, arete: 0.0 };

  // Summit character: broad peak (rounded apex) vs sharp alpine summit (pointed apex)
  const broadness = p.broad ?? 0.0; // 0 = sharp summit, 1 = broad peak
  const effNormR = broadness > 0.0
    ? Math.pow(normR, 1.0 + broadness * 0.45)
    : normR;
  const baseProfile = Math.pow(1.0 - effNormR, p.steep);

  // Carve branching gullies and secondary crags along the slopes
  const gullyCarve = 1.0 + (0.30 * arete + 0.22 * (ridgeNoise - 0.38)) * normR * (1.0 - normR * 0.35);
  const h = Math.max(0.0, p.h * baseProfile * gullyCarve);

  const sharpCrestWeight = 1.0 - broadness * 0.45;
  const areteCrest = arete * Math.pow(1.0 - normR * 0.62, 1.15) * sharpCrestWeight;
  return { h, arete: areteCrest };
}

/**
 * Connects two mountain massifs with an asymmetrical, dipping saddle ridge (col)
 * and branching side-spurs so peaks form continuous mountain ranges instead of isolated cones.
 */
function connectingSaddleRidge(x, z, s, warpX, warpZ, ridgeNoise) {
  const wx = x + warpX * 0.58;
  const wz = z + warpZ * 0.58;

  const segDx = s.x1 - s.x0;
  const segDz = s.z1 - s.z0;
  const segLenSq = segDx * segDx + segDz * segDz;
  if (segLenSq < 1e-4) return { h: 0.0, arete: 0.0 };

  const t = Math.max(0.0, Math.min(1.0, ((wx - s.x0) * segDx + (wz - s.z0) * segDz) / segLenSq));
  const segLen = Math.sqrt(segLenSq);

  const cx = s.x0 + t * segDx;
  const cz = s.z0 + t * segDz;

  const nx = -segDz / segLen;
  const nz = segDx / segLen;
  const dPerp = (wx - cx) * nx + (wz - cz) * nz;
  const distAbs = Math.hypot(wx - cx, wz - cz);

  const width = dPerp < 0.0 ? s.wLeft : s.wRight;
  // Oblique side-spurs along the connecting ridge
  const spurWave = 1.0 - Math.abs(Math.sin(t * segLen * 0.55 - distAbs * 0.32 + warpX * 0.4));
  const effWidth = width * (0.76 + 0.38 * Math.pow(spurWave, 1.8));
  const u = distAbs / Math.max(0.3, effWidth);
  if (u >= 1.0) return { h: 0.0, arete: 0.0 };

  // Dipping catenary saddle profile between the two peaks, modulated by craggy ridge noise
  const sagProfile = 1.0 - (s.sag ?? 0.28) * 4.0 * t * (1.0 - t);
  const linearH = s.h0 + t * (s.h1 - s.h0);
  const crestH = linearH * sagProfile * (0.90 + 0.20 * ridgeNoise);

  const crossProfile = Math.pow(1.0 - u, s.steep ?? 1.42);
  const h = Math.max(0.0, crestH * crossProfile);
  const arete = Math.pow(Math.max(0.0, 1.0 - u * 1.8), 1.6) * (0.45 + 0.45 * spurWave);

  return { h, arete };
}

/* ---------- Complete Deterministic Terrain Evaluator ---------- */

export function createTerrainEvaluator(seed = 2049, heightMultiplier = 1.0) {
  const noise = createNoise2D(seed);

  const ridgedFbm = (x, z, octaves = 4) => {
    let sum = 0.0;
    let amp = 0.52;
    let freq = 0.16;
    let weight = 1.0;
    let px = x;
    let pz = z;

    for (let i = 0; i < octaves; i++) {
      const n = noise(px * freq + i * 19.7, pz * freq + i * 37.3);
      let signal = 1.0 - Math.abs(n);
      signal = signal * signal * weight;
      weight = Math.min(1.0, Math.max(0.15, signal * 2.0));
      sum += signal * amp;

      const nx = px * 0.7986 - pz * 0.6018;
      const nz = px * 0.6018 + pz * 0.7986;
      px = nx;
      pz = nz;
      freq *= 2.02;
      amp *= 0.47;
    }
    return sum;
  };

  // Asymmetrical mountain massifs (broad peaks, sharp summits, and foothills)
  const massifs = [
    // 1. RIGHT-HAND PROMINENT MOUNTAIN GROUP (Main focal range on the right)
    // Principal sharp summit massif on the upper right
    { x: 7.6, z: -16.6, h: 6.20, wWest: 4.2, wEast: 6.4, wSouth: 5.2, wNorth: 5.0, steep: 1.56, broad: 0.0, rot: 0.38, phase: 0.4, twist: 0.42 },
    // Broad high eastern massif connected to the main summit
    { x: 12.4, z: -15.4, h: 4.75, wWest: 4.8, wEast: 6.8, wSouth: 5.4, wNorth: 4.8, steep: 1.32, broad: 0.55, rot: -0.28, phase: 1.6, twist: 0.32 },
    // Western craggy shoulder descending toward the central valley (carries the upper-right magenta saddle trail)
    { x: 4.4, z: -13.8, h: 3.95, wWest: 3.4, wEast: 4.6, wSouth: 4.2, wNorth: 3.8, steep: 1.52, broad: 0.15, rot: 0.55, phase: 2.3, twist: 0.36 },
    // Lower valley-edge spur of the main massif
    { x: 2.2, z: -10.8, h: 2.35, wWest: 2.8, wEast: 4.0, wSouth: 3.4, wNorth: 3.2, steep: 1.44, broad: 0.35, rot: 0.30, phase: 0.9, twist: 0.30 },
    // Far-right continuation range
    { x: 17.8, z: -14.6, h: 3.90, wWest: 5.2, wEast: 7.2, wSouth: 5.5, wNorth: 5.0, steep: 1.36, broad: 0.45, rot: 0.18, phase: 3.1, twist: 0.28 },
    { x: 24.0, z: -15.8, h: 3.40, wWest: 5.8, wEast: 7.5, wSouth: 5.8, wNorth: 5.4, steep: 1.30, broad: 0.50, rot: -0.22, phase: 1.2, twist: 0.25 },

    // 2. MID-RIGHT CONNECTED SPUR RANGE (In front of the main massif, separated by a branching valley at z ~ -10)
    // Sharp mid-right crag
    { x: 8.6, z: -6.4, h: 3.45, wWest: 3.6, wEast: 5.4, wSouth: 4.4, wNorth: 3.8, steep: 1.54, broad: 0.05, rot: 0.42, phase: 1.8, twist: 0.38 },
    // Lower western foothill spur near the central valley bend
    { x: 4.5, z: -4.8, h: 2.25, wWest: 2.8, wEast: 4.2, wSouth: 3.6, wNorth: 3.2, steep: 1.38, broad: 0.40, rot: -0.35, phase: 0.6, twist: 0.32 },
    // Broad eastern ridge massif
    { x: 14.2, z: -5.4, h: 3.15, wWest: 4.8, wEast: 6.6, wSouth: 5.0, wNorth: 4.4, steep: 1.28, broad: 0.60, rot: 0.22, phase: 2.7, twist: 0.28 },
    { x: 20.5, z: -6.2, h: 2.85, wWest: 5.4, wEast: 7.0, wSouth: 5.2, wNorth: 4.8, steep: 1.34, broad: 0.45, rot: -0.18, phase: 1.1, twist: 0.25 },

    // 3. LOWER-RIGHT FOREGROUND FOOTHILLS (Low, asymmetric foothills keeping the bottom-right valley open)
    { x: 7.4, z: 1.4, h: 1.45, wWest: 3.0, wEast: 4.6, wSouth: 3.6, wNorth: 3.2, steep: 1.32, broad: 0.50, rot: 0.32, phase: 2.1, twist: 0.26 },
    { x: 12.8, z: 0.8, h: 2.15, wWest: 4.2, wEast: 5.8, wSouth: 4.4, wNorth: 3.8, steep: 1.42, broad: 0.30, rot: -0.24, phase: 0.8, twist: 0.30 },
    { x: 18.5, z: 1.6, h: 2.25, wWest: 5.0, wEast: 6.5, wSouth: 4.8, wNorth: 4.2, steep: 1.30, broad: 0.55, rot: 0.15, phase: 1.9, twist: 0.24 },

    // 4. LOWER-LEFT FOREGROUND SUBDUED FOOTHILLS (Replaces the dominant rounded mound with a low, natural slope)
    { x: -14.5, z: 5.8, h: 1.35, wWest: 6.8, wEast: 6.4, wSouth: 5.8, wNorth: 5.2, steep: 1.22, broad: 0.65, rot: -0.18, phase: 1.4, twist: 0.22 },
    { x: -7.5, z: 4.8, h: 0.82, wWest: 5.4, wEast: 4.8, wSouth: 4.6, wNorth: 4.2, steep: 1.20, broad: 0.70, rot: 0.24, phase: 2.6, twist: 0.20 },

    // 5. MID-LEFT & UPPER-LEFT CONNECTED RANGES (Subdued, varied ridges behind the left-hand text)
    { x: -4.2, z: -6.8, h: 1.85, wWest: 4.2, wEast: 3.0, wSouth: 3.6, wNorth: 3.4, steep: 1.34, broad: 0.45, rot: -0.32, phase: 0.7, twist: 0.30 },
    { x: -8.8, z: -8.2, h: 2.85, wWest: 5.2, wEast: 4.0, wSouth: 4.4, wNorth: 4.0, steep: 1.46, broad: 0.25, rot: 0.40, phase: 2.0, twist: 0.34 },
    { x: -14.8, z: -7.6, h: 3.15, wWest: 5.8, wEast: 4.8, wSouth: 4.8, wNorth: 4.4, steep: 1.32, broad: 0.50, rot: -0.22, phase: 1.1, twist: 0.28 },
    // Upper-left range across the western branching valley
    { x: -5.4, z: -13.8, h: 2.65, wWest: 4.4, wEast: 3.4, wSouth: 3.8, wNorth: 3.6, steep: 1.42, broad: 0.30, rot: 0.36, phase: 1.5, twist: 0.32 },
    { x: -10.6, z: -15.2, h: 3.55, wWest: 5.4, wEast: 4.4, wSouth: 4.6, wNorth: 4.2, steep: 1.52, broad: 0.15, rot: -0.38, phase: 2.8, twist: 0.36 },
    { x: -16.8, z: -14.6, h: 3.75, wWest: 6.2, wEast: 5.0, wSouth: 5.0, wNorth: 4.6, steep: 1.36, broad: 0.40, rot: 0.20, phase: 0.5, twist: 0.30 },

    // 6. DISTANT HORIZON RANGES (Receding layered ranges across the high horizon)
    { x: -1.6, z: -20.5, h: 3.45, wWest: 4.6, wEast: 4.4, wSouth: 4.2, wNorth: 4.0, steep: 1.44, broad: 0.25, rot: 0.35, phase: 1.3, twist: 0.30 },
    { x: 2.8, z: -22.4, h: 4.25, wWest: 5.0, wEast: 5.6, wSouth: 4.6, wNorth: 4.4, steep: 1.50, broad: 0.15, rot: -0.30, phase: 2.4, twist: 0.32 },
    { x: 10.2, z: -23.8, h: 4.40, wWest: 5.8, wEast: 6.4, wSouth: 5.2, wNorth: 4.8, steep: 1.42, broad: 0.30, rot: 0.25, phase: 0.9, twist: 0.28 },
    { x: 18.5, z: -22.8, h: 3.80, wWest: 6.4, wEast: 6.8, wSouth: 5.5, wNorth: 5.0, steep: 1.30, broad: 0.50, rot: -0.20, phase: 1.7, twist: 0.24 },
    { x: -8.2, z: -21.8, h: 3.50, wWest: 5.2, wEast: 4.6, wSouth: 4.5, wNorth: 4.2, steep: 1.38, broad: 0.35, rot: 0.28, phase: 2.2, twist: 0.28 },
    { x: -14.8, z: -22.6, h: 4.05, wWest: 6.0, wEast: 5.2, wSouth: 4.8, wNorth: 4.6, steep: 1.46, broad: 0.20, rot: -0.32, phase: 0.4, twist: 0.30 },
    // Far horizon skyline (z ~ -28.5)
    { x: -12.0, z: -28.6, h: 4.15, wWest: 6.5, wEast: 6.0, wSouth: 5.2, wNorth: 5.0, steep: 1.40, broad: 0.30, rot: 0.30, phase: 1.6, twist: 0.25 },
    { x: -3.5, z: -28.2, h: 3.85, wWest: 5.8, wEast: 5.8, wSouth: 4.8, wNorth: 4.8, steep: 1.34, broad: 0.40, rot: -0.25, phase: 2.9, twist: 0.24 },
    { x: 5.5, z: -29.0, h: 4.35, wWest: 6.2, wEast: 6.6, wSouth: 5.4, wNorth: 5.0, steep: 1.44, broad: 0.25, rot: 0.28, phase: 0.7, twist: 0.26 },
    { x: 15.0, z: -27.8, h: 4.00, wWest: 6.8, wEast: 7.0, wSouth: 5.6, wNorth: 5.2, steep: 1.32, broad: 0.45, rot: -0.30, phase: 2.0, twist: 0.22 },
  ];

  // Dipping saddle ridges connecting adjacent massifs into continuous mountain chains
  const saddles = [
    // Right-hand main massif range connections
    { x0: 2.2, z0: -10.8, h0: 2.20, x1: 4.4, z1: -13.8, h1: 3.70, wLeft: 2.8, wRight: 3.8, sag: 0.22, steep: 1.42 },
    { x0: 4.4, z0: -13.8, h0: 3.70, x1: 7.6, z1: -16.6, h1: 5.80, wLeft: 3.4, wRight: 4.8, sag: 0.26, steep: 1.48 },
    { x0: 7.6, z0: -16.6, h0: 5.80, x1: 12.4, z1: -15.4, h1: 4.50, wLeft: 3.8, wRight: 5.4, sag: 0.28, steep: 1.40 },
    { x0: 12.4, z0: -15.4, h0: 4.50, x1: 17.8, z1: -14.6, h1: 3.70, wLeft: 4.2, wRight: 5.8, sag: 0.24, steep: 1.34 },
    // High ridge bridge between main massif and mid-right spur range (carving a branching valley to the west)
    { x0: 12.4, z0: -15.4, h0: 3.80, x1: 14.2, z1: -5.4, h1: 2.95, wLeft: 3.8, wRight: 5.2, sag: 0.34, steep: 1.36 },
    // Mid-right spur range connections
    { x0: 4.5, z0: -4.8, h0: 2.10, x1: 8.6, z1: -6.4, h1: 3.25, wLeft: 2.8, wRight: 4.2, sag: 0.25, steep: 1.44 },
    { x0: 8.6, z0: -6.4, h0: 3.25, x1: 14.2, z1: -5.4, h1: 2.95, wLeft: 3.4, wRight: 4.8, sag: 0.28, steep: 1.36 },
    { x0: 14.2, z0: -5.4, h0: 2.95, x1: 20.5, z1: -6.2, h1: 2.70, wLeft: 4.0, wRight: 5.2, sag: 0.24, steep: 1.32 },
    // Lower-right foreground foothill connections
    { x0: 7.4, z0: 1.4, h0: 1.35, x1: 12.8, z1: 0.8, h1: 2.00, wLeft: 3.0, wRight: 4.2, sag: 0.24, steep: 1.34 },
    { x0: 12.8, z0: 0.8, h0: 2.00, x1: 18.5, z1: 1.6, h1: 2.10, wLeft: 3.6, wRight: 4.8, sag: 0.22, steep: 1.30 },
    // Mid-left & upper-left range connections
    { x0: -4.2, z0: -6.8, h0: 1.75, x1: -8.8, z1: -8.2, h1: 2.70, wLeft: 3.6, wRight: 3.2, sag: 0.24, steep: 1.36 },
    { x0: -8.8, z0: -8.2, h0: 2.70, x1: -14.8, z1: -7.6, h1: 2.95, wLeft: 4.2, wRight: 3.8, sag: 0.26, steep: 1.32 },
    { x0: -5.4, z0: -13.8, h0: 2.50, x1: -10.6, z1: -15.2, h1: 3.40, wLeft: 3.8, wRight: 3.6, sag: 0.25, steep: 1.40 },
    { x0: -10.6, z0: -15.2, h0: 3.40, x1: -16.8, z1: -14.6, h1: 3.55, wLeft: 4.4, wRight: 4.0, sag: 0.24, steep: 1.36 },
    // Distant horizon connections
    { x0: -14.8, z0: -22.6, h0: 3.80, x1: -8.2, z1: -21.8, h1: 3.35, wLeft: 4.4, wRight: 4.2, sag: 0.24, steep: 1.36 },
    { x0: -8.2, z0: -21.8, h0: 3.35, x1: -1.6, z1: -20.5, h1: 3.30, wLeft: 4.2, wRight: 4.0, sag: 0.26, steep: 1.38 },
    { x0: -1.6, z0: -20.5, h0: 3.30, x1: 2.8, z1: -22.4, h1: 4.05, wLeft: 4.2, wRight: 4.6, sag: 0.24, steep: 1.42 },
    { x0: 2.8, z0: -22.4, h0: 4.05, x1: 10.2, z1: -23.8, h1: 4.20, wLeft: 4.6, wRight: 5.2, sag: 0.25, steep: 1.40 },
  ];

  function sampleTerrain(x, z) {
    // 1. Winding central valley corridor
    const vx = getValleyCenterX(z);
    const distValley = Math.abs(x - vx);
    const valleyHalfWidth = 1.85 + Math.max(0.0, (-z + 8.0) * 0.028);
    const valleyNorm = distValley / valleyHalfWidth;
    const valleyCarve = 1.0 - Math.exp(-valleyNorm * valleyNorm * 1.18);
    const valleyFactor = Math.exp(-valleyNorm * valleyNorm * 0.85);

    // 2. Multi-scale domain warp & ridged multifractal detail (attenuated with distance so far ridges stay clean)
    const distanceDetailScale = 1.0 - smoothstep(-14.0, -32.0, z) * 0.55;
    const warpX =
      noise(x * 0.09, z * 0.09) * 1.65 +
      noise(x * 0.22, z * 0.22) * 0.40 * distanceDetailScale;
    const warpZ =
      noise(x * 0.09 + 31.4, z * 0.09 + 17.8) * 1.65 +
      noise(x * 0.22 + 11.2, z * 0.22 + 23.5) * 0.40 * distanceDetailScale;
    const rNoise = ridgedFbm(x + warpX * 0.68, z + warpZ * 0.68, 4);

    // 3. Evaluate Asymmetrical Mountain Massifs & Connecting Saddle Ridges
    let rangeHeight = 0.0;
    let maxArete = 0.0;

    for (let i = 0; i < massifs.length; i++) {
      const { h, arete } = asymmetricPeakMassif(x, z, massifs[i], warpX, warpZ, rNoise);
      if (h > 0.0) {
        if (rangeHeight <= 0.0) {
          rangeHeight = h;
          maxArete = arete;
        } else {
          const prevH = rangeHeight;
          rangeHeight = smoothMax(prevH, h, 0.85) + 0.14 * Math.min(prevH, h);
          maxArete = Math.max(maxArete, arete * (h >= prevH * 0.8 ? 1.0 : 0.7));
        }
      }
    }

    for (let i = 0; i < saddles.length; i++) {
      const { h, arete } = connectingSaddleRidge(x, z, saddles[i], warpX, warpZ, rNoise);
      if (h > 0.0) {
        const prevH = rangeHeight;
        rangeHeight = smoothMax(prevH, h, 0.90) + 0.08 * Math.min(prevH, h);
        maxArete = Math.max(maxArete, arete * 0.75);
      }
    }

    // 4. Continuous anisotropic tectonic ridged substrate connecting foothills & valleys
    const fgCalmMask = smoothstep(-1.0, 6.0, z);
    const tectonicStrength = (1.0 - fgCalmMask * 0.72) * distanceDetailScale;
    const tectonic =
      (rNoise * 1.35 + noise(x * 0.13, z * 0.13) * 0.24) * tectonicStrength;

    const mountains = (rangeHeight + tectonic) * valleyCarve;

    // 5. Valley floor with gentle river-terrace gradient
    const valleyFloorBase =
      -0.38 +
      0.022 * Math.max(0.0, 11.0 - z) +
      noise(x * 0.22 + warpX * 0.20, z * 0.22 + warpZ * 0.20) * 0.09;

    let y = THREE.MathUtils.lerp(valleyFloorBase, mountains, valleyCarve);

    // Far horizon taper beyond z = -29
    const farTaper = 1.0 - smoothstep(-29.0, -44.0, z) * 0.88;
    y *= farTaper * heightMultiplier;

    return { y, valleyFactor, vx, valleyFloorBase, arete: maxArete * valleyCarve };
  }

  function getHeight(x, z) {
    return sampleTerrain(x, z).y;
  }

  return { sampleTerrain, getHeight };
}

/* ---------- 3D Geometry Builders ---------- */

export function createSculptureGeometries({
  isMobile = false,
  terrainScale,
  contourSpacing,
} = {}) {
  const seed = terrainScale?.seed ?? 2049;
  const width = terrainScale?.width ?? 84.0;
  const heightMult = terrainScale?.heightMultiplier ?? 1.0;

  const gridX = isMobile ? (terrainScale?.gridXMobile ?? 180) : (terrainScale?.gridXDesktop ?? 300);
  const gridZ = isMobile ? (terrainScale?.gridZMobile ?? 160) : (terrainScale?.gridZDesktop ?? 260);

  const elevStep = contourSpacing?.elevationStep ?? 0.082;
  const minElev = contourSpacing?.minElevation ?? -0.8;
  const maxElev = contourSpacing?.maxElevation ?? 7.5;

  // World Z spans from -45 (far horizon) to +16 (near foreground)
  const zMin = -45.0;
  const zMax = 16.0;
  const actualDepth = zMax - zMin;

  const { sampleTerrain } = createTerrainEvaluator(seed, heightMult);

  const cols = gridX + 1;
  const rows = gridZ + 1;
  const vertCount = cols * rows;

  const heights = new Float32Array(vertCount);
  const valleys = new Float32Array(vertCount);
  const aretes = new Float32Array(vertCount);
  const slopes = new Float32Array(vertCount);
  const ridges = new Float32Array(vertCount);
  const valleyTrailField = new Float32Array(vertCount);

  const worldX = new Float32Array(cols);
  const worldZ = new Float32Array(rows);

  for (let i = 0; i < cols; i++) {
    const u = (i / gridX) * 2.0 - 1.0;
    const uBiased = 0.74 * u + 0.26 * u * u * u;
    worldX[i] = uBiased * (width * 0.5);
  }
  for (let j = 0; j < rows; j++) {
    const v = j / gridZ;
    const vBiased = 0.76 * v + 0.24 * (1.0 - (1.0 - v) * (1.0 - v));
    worldZ[j] = zMin + vBiased * actualDepth;
  }

  // 1. Sample heightfield on the grid
  for (let j = 0; j < rows; j++) {
    const z = worldZ[j];
    const rowOffset = j * cols;
    for (let i = 0; i < cols; i++) {
      const x = worldX[i];
      const { y, valleyFactor, vx, valleyFloorBase, arete } = sampleTerrain(x, z);
      const idx = rowOffset + i;
      heights[idx] = y;
      valleys[idx] = valleyFactor;
      aretes[idx] = arete;
      valleyTrailField[idx] = (x - vx) + (y - valleyFloorBase) * 0.90 * (x >= vx ? 1.0 : -1.0);
    }
  }

  // 2. Compute normals, slopes, and sharp arête/ridge curvature factors
  const terrainPositions = new Float32Array(vertCount * 3);
  const terrainNormals = new Float32Array(vertCount * 3);
  const terrainData = new Float32Array(vertCount * 4); // [elevation, slope, ridgeFactor, valleyFactor]

  for (let j = 0; j < rows; j++) {
    const z = worldZ[j];
    const jPrev = Math.max(0, j - 1);
    const jNext = Math.min(rows - 1, j + 1);
    const dz = Math.max(0.02, worldZ[jNext] - worldZ[jPrev]);

    for (let i = 0; i < cols; i++) {
      const idx = j * cols + i;
      const x = worldX[i];
      const y = heights[idx];

      const iPrev = Math.max(0, i - 1);
      const iNext = Math.min(cols - 1, i + 1);
      const dx = Math.max(0.02, worldX[iNext] - worldX[iPrev]);

      const hL = heights[j * cols + iPrev];
      const hR = heights[j * cols + iNext];
      const hD = heights[jPrev * cols + i];
      const hU = heights[jNext * cols + i];

      const dYdX = (hR - hL) / dx;
      const dYdZ = (hU - hD) / dz;
      const slope = Math.sqrt(dYdX * dYdX + dYdZ * dYdZ);

      // Combine Laplacian convexity with our analytical arête spine metric
      // so only true ridge crests & arêtes flare bright cyan-white, leaving bowls dark!
      const avgNeighbors = 0.25 * (hL + hR + hD + hU);
      const laplacianRidge = Math.max(0.0, y - avgNeighbors) * 16.0;
      const ridge = THREE.MathUtils.clamp(
        laplacianRidge + aretes[idx] * 1.15,
        0.0,
        1.8
      );

      slopes[idx] = slope;
      ridges[idx] = ridge;

      const invLen = 1.0 / Math.sqrt(dYdX * dYdX + 1.0 + dYdZ * dYdZ);
      const p3 = idx * 3;
      terrainPositions[p3] = x;
      terrainPositions[p3 + 1] = y;
      terrainPositions[p3 + 2] = z;

      terrainNormals[p3] = -dYdX * invLen;
      terrainNormals[p3 + 1] = invLen;
      terrainNormals[p3 + 2] = -dYdZ * invLen;

      const p4 = idx * 4;
      terrainData[p4] = y;
      terrainData[p4 + 1] = slope;
      terrainData[p4 + 2] = ridge;
      terrainData[p4 + 3] = valleys[idx];
    }
  }

  // Build triangle indices for the occluding terrain mesh
  const triIndices = new Uint32Array(gridX * gridZ * 6);
  let tPtr = 0;
  for (let j = 0; j < gridZ; j++) {
    const r0 = j * cols;
    const r1 = (j + 1) * cols;
    for (let i = 0; i < gridX; i++) {
      const a = r0 + i;
      const b = r0 + i + 1;
      const c = r1 + i;
      const d = r1 + i + 1;
      triIndices[tPtr++] = a;
      triIndices[tPtr++] = c;
      triIndices[tPtr++] = b;
      triIndices[tPtr++] = b;
      triIndices[tPtr++] = c;
      triIndices[tPtr++] = d;
    }
  }

  const terrainGeometry = new THREE.BufferGeometry();
  terrainGeometry.setAttribute('position', new THREE.BufferAttribute(terrainPositions, 3));
  terrainGeometry.setAttribute('normal', new THREE.BufferAttribute(terrainNormals, 3));
  terrainGeometry.setAttribute('aTerrainData', new THREE.BufferAttribute(terrainData, 4));
  terrainGeometry.setIndex(new THREE.BufferAttribute(triIndices, 1));
  terrainGeometry.computeBoundingSphere();

  /* ---------- 3. Cell-Driven Marching Squares for Constant-Elevation Contours & Magenta Routes ---------- */

  const contourPositions = [];
  const contourData = []; // [elevation, slope, ridgeFactor, spatialPhase]

  const magentaPositions = [];
  const magentaData = []; // [uArc, routeId, weight, elevation]

  const yLift = 0.014;
  const yMagentaLift = 0.024;

  const msTable = [
    [],
    [[3, 0]],
    [[0, 1]],
    [[3, 1]],
    [[1, 2]],
    [[3, 2], [0, 1]],
    [[0, 2]],
    [[3, 2]],
    [[2, 3]],
    [[2, 0]],
    [[0, 3], [1, 2]],
    [[2, 1]],
    [[1, 3]],
    [[1, 0]],
    [[0, 3]],
    [],
  ];

  // Check if a constant-elevation contour segment belongs to a sparse magenta route
  const getMagentaRouteMatch = (k, level, mx, mz) => {
    // 1. Upper-Right Peak Left Saddle & Arête Flank Trail (matches Panel 01's upper-right pink path)
    if (mx > 1.2 && mx < 6.2 && mz > -17.5 && mz < -9.5) {
      const targetK = Math.round(2.15 / elevStep);
      if (k === targetK || k === targetK + 1) {
        const uArc = THREE.MathUtils.clamp((mz - -9.5) / -8.0, 0.0, 1.0);
        const w = k === targetK ? 1.0 : 0.55;
        return { routeId: 1.2, uArc, weight: w };
      }
    }

    // 2. Mid-Left Valley Pass Contour (matches Panel 01's horizontal-winding pink line on the left)
    if (mx > -11.5 && mx < -0.8 && mz > -4.5 && mz < 2.2) {
      const targetK = Math.round(0.68 / elevStep);
      if (k === targetK) {
        const uArc = THREE.MathUtils.clamp((-mx - 0.8) / 10.7, 0.0, 1.0);
        return { routeId: 2.4, uArc, weight: 0.92 };
      }
    }

    // 3. Distant Upper-Left Basin Contour
    if (mx > -16.0 && mx < -4.0 && mz > -23.5 && mz < -14.5) {
      const targetK = Math.round(1.18 / elevStep);
      if (k === targetK) {
        const uArc = THREE.MathUtils.clamp((-mx - 4.0) / 12.0, 0.0, 1.0);
        return { routeId: 3.5, uArc, weight: 0.80 };
      }
    }

    return null;
  };

  for (let j = 0; j < gridZ; j++) {
    const z0 = worldZ[j];
    const z1 = worldZ[j + 1];
    const r0 = j * cols;
    const r1 = (j + 1) * cols;

    for (let i = 0; i < gridX; i++) {
      const x0 = worldX[i];
      const x1 = worldX[i + 1];

      const i00 = r0 + i;
      const i10 = r0 + i + 1;
      const i11 = r1 + i + 1;
      const i01 = r1 + i;

      const h00 = heights[i00];
      const h10 = heights[i10];
      const h11 = heights[i11];
      const h01 = heights[i01];

      const cellMin = Math.min(h00, h10, h11, h01);
      const cellMax = Math.max(h00, h10, h11, h01);

      const cellSlope = 0.25 * (slopes[i00] + slopes[i10] + slopes[i11] + slopes[i01]);
      const cellRidge = 0.25 * (ridges[i00] + ridges[i10] + ridges[i11] + ridges[i01]);

      // A. Constant-elevation contours
      if (cellMax >= minElev && cellMin <= maxElev) {
        const kStart = Math.max(
          Math.ceil(minElev / elevStep),
          Math.ceil(cellMin / elevStep)
        );
        const kEnd = Math.min(
          Math.floor(maxElev / elevStep),
          Math.floor(cellMax / elevStep)
        );

        for (let k = kStart; k <= kEnd; k++) {
          const level = k * elevStep;
          let mask = 0;
          if (h00 >= level) mask |= 1;
          if (h10 >= level) mask |= 2;
          if (h11 >= level) mask |= 4;
          if (h01 >= level) mask |= 8;

          const segs = msTable[mask];
          if (!segs || segs.length === 0) continue;

          const isIndex = Math.abs(k) % 5 === 0 ? 1.25 : 1.0;
          const effRidge = cellRidge * isIndex;

          for (let s = 0; s < segs.length; s++) {
            const [eA, eB] = segs[s];

            const getEdgePt = (edge) => {
              switch (edge) {
                case 0: {
                  const t = Math.abs(h10 - h00) > 1e-5 ? (level - h00) / (h10 - h00) : 0.5;
                  return [x0 + t * (x1 - x0), z0];
                }
                case 1: {
                  const t = Math.abs(h11 - h10) > 1e-5 ? (level - h10) / (h11 - h10) : 0.5;
                  return [x1, z0 + t * (z1 - z0)];
                }
                case 2: {
                  const t = Math.abs(h11 - h01) > 1e-5 ? (level - h01) / (h11 - h01) : 0.5;
                  return [x0 + t * (x1 - x0), z1];
                }
                default: {
                  const t = Math.abs(h01 - h00) > 1e-5 ? (level - h00) / (h01 - h00) : 0.5;
                  return [x0, z0 + t * (z1 - z0)];
                }
              }
            };

            const [ax, az] = getEdgePt(eA);
            const [bx, bz] = getEdgePt(eB);

            const mx = 0.5 * (ax + bx);
            const mz = 0.5 * (az + bz);
            const magMatch = getMagentaRouteMatch(k, level, mx, mz);

            if (magMatch) {
              magentaPositions.push(
                ax,
                level + yMagentaLift,
                az,
                bx,
                level + yMagentaLift,
                bz
              );
              magentaData.push(
                magMatch.uArc,
                magMatch.routeId,
                magMatch.weight,
                level,
                magMatch.uArc,
                magMatch.routeId,
                magMatch.weight,
                level
              );
            } else {
              contourPositions.push(ax, level + yLift, az, bx, level + yLift, bz);
              const phaseA = ax * 0.16 + az * 0.12 + k * 0.31;
              const phaseB = bx * 0.16 + bz * 0.12 + k * 0.31;
              contourData.push(
                level,
                cellSlope,
                effRidge,
                phaseA,
                level,
                cellSlope,
                effRidge,
                phaseB
              );
            }
          }
        }
      }

      // B. Terrain-conforming Main Valley Magenta Route via Marching Squares on valleyTrailField
      if (z0 > -34.0 && z1 < 14.5) {
        const f00 = valleyTrailField[i00];
        const f10 = valleyTrailField[i10];
        const f11 = valleyTrailField[i11];
        const f01 = valleyTrailField[i01];

        const fMin = Math.min(f00, f10, f11, f01);
        const fMax = Math.max(f00, f10, f11, f01);

        const trailLevels = [
          { iso: 0.22, routeId: 0.0, weight: 1.0 },
          { iso: 0.55, routeId: 0.4, weight: 0.48 },
        ];

        for (let tIdx = 0; tIdx < trailLevels.length; tIdx++) {
          const { iso, routeId, weight } = trailLevels[tIdx];
          if (fMax < iso || fMin > iso) continue;

          let mask = 0;
          if (f00 >= iso) mask |= 1;
          if (f10 >= iso) mask |= 2;
          if (f11 >= iso) mask |= 4;
          if (f01 >= iso) mask |= 8;

          const segs = msTable[mask];
          if (!segs || segs.length === 0) continue;

          for (let s = 0; s < segs.length; s++) {
            const [eA, eB] = segs[s];

            const getTrailEdgePt = (edge) => {
              switch (edge) {
                case 0: {
                  const t = Math.abs(f10 - f00) > 1e-5 ? (iso - f00) / (f10 - f00) : 0.5;
                  return [x0 + t * (x1 - x0), h00 + t * (h10 - h00), z0];
                }
                case 1: {
                  const t = Math.abs(f11 - f10) > 1e-5 ? (iso - f10) / (f11 - f10) : 0.5;
                  return [x1, h10 + t * (h11 - h10), z0 + t * (z1 - z0)];
                }
                case 2: {
                  const t = Math.abs(f11 - f01) > 1e-5 ? (iso - f01) / (f11 - f01) : 0.5;
                  return [x0 + t * (x1 - x0), h01 + t * (h11 - h01), z1];
                }
                default: {
                  const t = Math.abs(f01 - f00) > 1e-5 ? (iso - f00) / (f01 - f00) : 0.5;
                  return [x0, h00 + t * (h01 - h00), z0 + t * (z1 - z0)];
                }
              }
            };

            const [ax, ay, az] = getTrailEdgePt(eA);
            const [bx, by, bz] = getTrailEdgePt(eB);

            const uArcA = THREE.MathUtils.clamp((14.0 - az) / 46.0, 0.0, 1.0);
            const uArcB = THREE.MathUtils.clamp((14.0 - bz) / 46.0, 0.0, 1.0);

            magentaPositions.push(
              ax,
              ay + yMagentaLift,
              az,
              bx,
              by + yMagentaLift,
              bz
            );
            magentaData.push(
              uArcA,
              routeId,
              weight,
              ay,
              uArcB,
              routeId,
              weight,
              by
            );
          }
        }
      }
    }
  }

  const contourGeometry = new THREE.BufferGeometry();
  contourGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(contourPositions, 3)
  );
  contourGeometry.setAttribute(
    'aContourData',
    new THREE.Float32BufferAttribute(contourData, 4)
  );
  contourGeometry.computeBoundingSphere();

  const magentaGeometry = new THREE.BufferGeometry();
  magentaGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(magentaPositions, 3)
  );
  magentaGeometry.setAttribute(
    'aRouteData',
    new THREE.Float32BufferAttribute(magentaData, 4)
  );
  magentaGeometry.computeBoundingSphere();

  return {
    terrainGeometry,
    contourGeometry,
    magentaGeometry,
  };
}
