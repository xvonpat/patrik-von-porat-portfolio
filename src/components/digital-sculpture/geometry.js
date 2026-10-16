import * as THREE from 'three';

/**
 * Topographic Landscape & Contour Flow — 3D Terrain & Marching Squares Geometry Generator.
 *
 * Supports two distinct themes:
 * 1. 'contour-flow' (Option B, Default):
 *    - Broad, elongated rolling ridges with smooth elevation contours.
 *    - Sweeping S-shaped valley river of light flowing from lower-center to upper-right.
 *    - Concentric nested contour loops around rounded summits.
 *    - Predominantly dark and calm left-hand text area.
 *    - Delicate magenta routes following outer valley contours and foreground slope.
 * 2. 'alpine-landscape' (Option A, Alpine Peaks):
 *    - Sharp-pointed alpine peaks with bright arête ridges and dark cirque bowls.
 *    - Prominent sharp massif on the upper right and receding skyline.
 */

/* ---------- Deterministic Noise Primitives ---------- */

function createNoise2D(seed = 1984) {
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

function smoothMax(a, b, k = 1.15) {
  const h = Math.max(k - Math.abs(a - b), 0.0) / k;
  return Math.max(a, b) + h * h * k * 0.25;
}

/* ==========================================================================
   THEME 1: B / CONTOUR FLOW (S-Valley Corridor & Rolling Connected Ridges)
   ========================================================================== */

/**
 * Sweeping S-shaped valley waypoints:
 * Curving from lower-center/right (z ~ 16, x ~ 5.5) around the foreground ridge,
 * sweeping toward the center (z ~ 0, x ~ 2.2), and arcing up into the upper right (z ~ -35, x ~ 17.5).
 */
const CONTOUR_FLOW_VALLEY_WAYPOINTS = [
  { z: 16.0, x: 7.5 },
  { z: 12.0, x: 8.5 },
  { z: 7.5, x: 6.2 },
  { z: 3.5, x: 3.6 },
  { z: 0.0, x: 2.4 },
  { z: -4.5, x: 3.2 },
  { z: -9.0, x: 5.8 },
  { z: -14.0, x: 8.8 },
  { z: -20.0, x: 12.0 },
  { z: -28.0, x: 15.5 },
  { z: -38.0, x: 19.0 },
  { z: -45.0, x: 21.0 },
];

export function getContourFlowValleyX(z) {
  const pts = CONTOUR_FLOW_VALLEY_WAYPOINTS;
  if (z >= pts[0].z) return pts[0].x;
  const last = pts.length - 1;
  if (z <= pts[last].z) return pts[last].x;

  let idx = 0;
  for (let i = 0; i < last; i++) {
    if (z <= pts[i].z && z >= pts[i + 1].z) {
      idx = i;
      break;
    }
  }

  const p0 = pts[Math.max(0, idx - 1)];
  const p1 = pts[idx];
  const p2 = pts[idx + 1];
  const p3 = pts[Math.min(last, idx + 2)];

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

/**
 * Broad, smooth rolling mountain massif with rounded summit and asymmetrical flanks.
 * Creates smooth concentric nested contour loops around crests without sharp needle points.
 */
function rollingMassif(x, z, p, warpX, warpZ) {
  const dx0 = x - p.x;
  const dz0 = z - p.z;
  const maxR = Math.max(p.wWest, p.wEast, p.wSouth, p.wNorth) * 1.55;
  if (dx0 * dx0 > maxR * maxR || dz0 * dz0 > maxR * maxR) {
    return { h: 0.0, crest: 0.0 };
  }

  const cosA = Math.cos(p.rot);
  const sinA = Math.sin(p.rot);
  const wx = dx0 + warpX * 0.45;
  const wz = dz0 + warpZ * 0.45;

  const lx = wx * cosA + wz * sinA;
  const lz = -wx * sinA + wz * cosA;

  const rx = lx < 0.0 ? p.wWest : p.wEast;
  const rz = lz < 0.0 ? p.wNorth : p.wSouth;

  const nx = lx / rx;
  const nz = lz / rz;
  const r = Math.sqrt(nx * nx + nz * nz);
  if (r >= 1.35) return { h: 0.0, crest: 0.0 };

  const normR = Math.min(1.0, r / 1.0);
  // Rounded cosine dome profile producing closed nested contour loops
  const profile = Math.pow(0.5 + 0.5 * Math.cos(normR * Math.PI), p.steep ?? 1.25);
  const h = p.h * profile;

  // Crest factor: highest at the summit
  const crest = Math.pow(Math.max(0.0, 1.0 - normR), 1.4);
  return { h, crest };
}

/**
 * Smooth connecting saddle ridge joining rolling massifs into continuous undulating ranges.
 */
function rollingSaddleRidge(x, z, s, warpX, warpZ) {
  const wx = x + warpX * 0.42;
  const wz = z + warpZ * 0.42;

  const segDx = s.x1 - s.x0;
  const segDz = s.z1 - s.z0;
  const segLenSq = segDx * segDx + segDz * segDz;
  if (segLenSq < 1e-4) return { h: 0.0, crest: 0.0 };

  const t = Math.max(0.0, Math.min(1.0, ((wx - s.x0) * segDx + (wz - s.z0) * segDz) / segLenSq));
  const cx = s.x0 + t * segDx;
  const cz = s.z0 + t * segDz;

  const distAbs = Math.hypot(wx - cx, wz - cz);
  const effWidth = s.width ?? 4.2;
  const u = distAbs / effWidth;
  if (u >= 1.0) return { h: 0.0, crest: 0.0 };

  const linearH = s.h0 + t * (s.h1 - s.h0);
  const sag = 1.0 - (s.sag ?? 0.22) * 4.0 * t * (1.0 - t);
  const crestH = linearH * sag;

  const crossProfile = 0.5 + 0.5 * Math.cos(u * Math.PI);
  const h = crestH * Math.pow(crossProfile, s.steep ?? 1.28);
  const crest = Math.max(0.0, 1.0 - u * 1.5);
  return { h, crest };
}

export function createContourFlowEvaluator(seed = 1984, heightMultiplier = 1.0) {
  const noise = createNoise2D(seed);

  // Smooth, continuous undulating multifractal terrain base
  const smoothFbm = (x, z, octaves = 3) => {
    let sum = 0.0;
    let amp = 0.48;
    let freq = 0.12;
    let px = x;
    let pz = z;

    for (let i = 0; i < octaves; i++) {
      const n = noise(px * freq + i * 13.7, pz * freq + i * 29.3);
      sum += n * amp;
      const nx = px * 0.8 - pz * 0.6;
      const nz = px * 0.6 + pz * 0.8;
      px = nx;
      pz = nz;
      freq *= 1.95;
      amp *= 0.50;
    }
    return sum;
  };

  // Broad rolling mountain massifs (Option B reference)
  const massifs = [
    // 1. FOREGROUND CENTER-RIGHT RIDGE (The rounded hill in the bottom-center of Option B)
    { x: 1.5, z: 8.2, h: 2.20, wWest: 4.8, wEast: 3.8, wSouth: 4.4, wNorth: 3.8, steep: 1.22, rot: 0.24 },

    // 2. MID-RIGHT MOUNTAIN RIDGE (Flanking the eastern side of the S-valley)
    { x: 8.5, z: 0.5, h: 3.40, wWest: 4.0, wEast: 6.4, wSouth: 4.8, wNorth: 4.4, steep: 1.24, rot: -0.20 },
    { x: 13.8, z: -1.0, h: 2.95, wWest: 4.8, wEast: 6.0, wSouth: 4.5, wNorth: 4.2, steep: 1.20, rot: 0.18 },

    // 3. MID-LEFT MOUNTAIN RIDGE (Flanking the western side of the S-valley at its central apex)
    { x: -3.2, z: -4.5, h: 2.70, wWest: 4.4, wEast: 3.2, wSouth: 3.8, wNorth: 4.0, steep: 1.25, rot: 0.30 },

    // 4. UPPER-RIGHT MASSIF GROUP (Framing the eastern canyon of the S-valley)
    { x: 15.8, z: -15.5, h: 4.30, wWest: 4.8, wEast: 7.2, wSouth: 5.4, wNorth: 5.0, steep: 1.26, rot: 0.26 },
    { x: 21.5, z: -14.5, h: 3.60, wWest: 5.4, wEast: 7.0, wSouth: 5.2, wNorth: 4.8, steep: 1.22, rot: -0.20 },
    { x: 24.5, z: -23.0, h: 3.75, wWest: 6.0, wEast: 7.2, wSouth: 5.4, wNorth: 5.0, steep: 1.24, rot: 0.15 },

    // 5. UPPER-LEFT SUBDUED RIDGE (Soft terrain in the upper left)
    { x: -8.0, z: -12.5, h: 2.20, wWest: 4.8, wEast: 3.6, wSouth: 4.2, wNorth: 3.8, steep: 1.20, rot: -0.25 },
    { x: -14.5, z: -14.0, h: 2.40, wWest: 5.5, wEast: 4.5, wSouth: 4.5, wNorth: 4.2, steep: 1.22, rot: 0.20 },

    // 6. FAR LEFT LOWLANDS (Behind the main headline — kept low, calm and deep)
    { x: -16.0, z: 6.0, h: 0.50, wWest: 6.0, wEast: 5.0, wSouth: 5.0, wNorth: 4.5, steep: 1.15, rot: 0.0 },

    // 7. HORIZON ROLLING SKYLINE
    { x: 0.0, z: -28.0, h: 3.20, wWest: 6.0, wEast: 6.0, wSouth: 5.0, wNorth: 4.5, steep: 1.24, rot: 0.15 },
    { x: 8.0, z: -29.0, h: 3.50, wWest: 6.5, wEast: 6.5, wSouth: 5.2, wNorth: 4.8, steep: 1.26, rot: -0.20 },
    { x: -8.0, z: -28.5, h: 2.80, wWest: 5.8, wEast: 5.5, wSouth: 4.8, wNorth: 4.5, steep: 1.22, rot: 0.18 },
  ];

  // Connecting saddles between rolling massifs
  const saddles = [
    // Mid-right chain
    { x0: 8.5, z0: 0.5, h0: 3.25, x1: 13.8, z1: -1.0, h1: 2.85, width: 4.4, sag: 0.20, steep: 1.25 },
    // Upper-right massif chain
    { x0: 15.8, z0: -15.5, h0: 4.10, x1: 21.5, z1: -14.5, h1: 3.45, width: 4.8, sag: 0.22, steep: 1.24 },
    { x0: 21.5, z0: -14.5, h0: 3.45, x1: 24.5, z1: -23.0, h1: 3.60, width: 5.2, sag: 0.24, steep: 1.24 },
    // Mid-left to upper-left chain
    { x0: -3.2, z0: -4.5, h0: 2.55, x1: -8.0, z1: -12.5, h1: 2.10, width: 4.2, sag: 0.28, steep: 1.24 },
    { x0: -8.0, z0: -12.5, h0: 2.10, x1: -14.5, z1: -14.0, h1: 2.25, width: 4.8, sag: 0.22, steep: 1.22 },
  ];

  function sampleTerrain(x, z) {
    // 1. Sweeping S-valley corridor
    const vx = getContourFlowValleyX(z);
    const distValley = Math.abs(x - vx);
    const valleyHalfWidth = 2.45 + Math.max(0.0, (-z + 8.0) * 0.032);
    const valleyNorm = distValley / valleyHalfWidth;
    const valleyCarve = 1.0 - Math.exp(-valleyNorm * valleyNorm * 1.35);
    const valleyFactor = Math.exp(-valleyNorm * valleyNorm * 0.95);

    // Multi-streamline micro-terracing inside the river corridor:
    // Creates parallel flowing contours along the valley banks and bed
    const streamRipples =
      (Math.sin(valleyNorm * Math.PI * 5.0) * 0.048 +
       Math.cos(valleyNorm * Math.PI * 9.0) * 0.024) *
      valleyFactor *
      (1.0 - smoothstep(0.9, 1.3, valleyNorm));

    // Smooth U-shaped canyon valley profile that transitions to the mountain flanks
    const canyonProfile = Math.pow(Math.min(1.0, valleyNorm), 1.5) * 1.55;

    // 2. Smooth multi-scale organic domain warp
    const warpX = noise(x * 0.08, z * 0.08) * 1.85 + noise(x * 0.18, z * 0.18) * 0.45;
    const warpZ = noise(x * 0.08 + 24.2, z * 0.08 + 19.4) * 1.85 + noise(x * 0.18 + 8.5, z * 0.18 + 14.2) * 0.45;

    // 3. Evaluate rolling mountain massifs and connecting saddles
    let rangeHeight = 0.0;
    let maxCrest = 0.0;

    for (let i = 0; i < massifs.length; i++) {
      const { h, crest } = rollingMassif(x, z, massifs[i], warpX, warpZ);
      if (h > 0.0) {
        if (rangeHeight <= 0.0) {
          rangeHeight = h;
          maxCrest = crest;
        } else {
          const prevH = rangeHeight;
          rangeHeight = smoothMax(prevH, h, 0.90) + 0.10 * Math.min(prevH, h);
          maxCrest = Math.max(maxCrest, crest);
        }
      }
    }

    for (let i = 0; i < saddles.length; i++) {
      const { h, crest } = rollingSaddleRidge(x, z, saddles[i], warpX, warpZ);
      if (h > 0.0) {
        const prevH = rangeHeight;
        rangeHeight = smoothMax(prevH, h, 0.92) + 0.06 * Math.min(prevH, h);
        maxCrest = Math.max(maxCrest, crest * 0.85);
      }
    }

    // 4. Subtle undulating background substrate
    const substrate = (smoothFbm(x + warpX * 0.4, z + warpZ * 0.4, 3) * 0.65 + 0.35) * 0.55;
    const mountains = (rangeHeight + substrate) * valleyCarve;

    // 5. Valley floor with gentle river-terrace gradient and canyon profile
    const valleyFloorBase =
      -0.45 +
      0.020 * Math.max(0.0, 12.0 - z) +
      canyonProfile +
      streamRipples;

    let y = THREE.MathUtils.lerp(valleyFloorBase, mountains, valleyCarve);

    // Far horizon soft taper beyond z = -28
    const farTaper = 1.0 - smoothstep(-28.0, -44.0, z) * 0.85;
    y *= farTaper * heightMultiplier;

    return { y, valleyFactor, vx, valleyFloorBase, arete: maxCrest * valleyCarve };
  }

  function getHeight(x, z) {
    return sampleTerrain(x, z).y;
  }

  return { sampleTerrain, getHeight };
}

/* ==========================================================================
   THEME 2: ALPINE LANDSCAPE (Option A, Alpine Massifs & Cirque Bowls)
   ========================================================================== */

const ALPINE_VALLEY_WAYPOINTS = [
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

export function getAlpineValleyX(z) {
  const pts = ALPINE_VALLEY_WAYPOINTS;
  if (z >= pts[0].z) return pts[0].x;
  const last = pts.length - 1;
  if (z <= pts[last].z) return pts[last].x;

  let idx = 0;
  for (let i = 0; i < last; i++) {
    if (z <= pts[i].z && z >= pts[i + 1].z) {
      idx = i;
      break;
    }
  }

  const p0 = pts[Math.max(0, idx - 1)];
  const p1 = pts[idx];
  const p2 = pts[idx + 1];
  const p3 = pts[Math.min(last, idx + 2)];

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

function asymmetricPeakMassif(x, z, p, warpX, warpZ, ridgeNoise) {
  const dx0 = x - p.x;
  const dz0 = z - p.z;
  const maxR = Math.max(p.wWest, p.wEast, p.wSouth, p.wNorth) * 1.65;
  if (dx0 * dx0 > maxR * maxR || dz0 * dz0 > maxR * maxR) {
    return { h: 0.0, arete: 0.0 };
  }

  const cosA = Math.cos(p.rot);
  const sinA = Math.sin(p.rot);
  const wx = dx0 + warpX * 0.65;
  const wz = dz0 + warpZ * 0.65;

  const lx = wx * cosA + wz * sinA;
  const lz = -wx * sinA + wz * cosA;

  const rx = lx < 0.0 ? p.wWest : p.wEast;
  const rz = lz < 0.0 ? p.wNorth : p.wSouth;

  const nx = lx / rx;
  const nz = lz / rz;
  const r = Math.sqrt(nx * nx + nz * nz);
  if (r >= 1.45) return { h: 0.0, arete: 0.0 };

  const theta = Math.atan2(nz, nx) + p.phase + r * (p.twist ?? 0.38);

  const w1 = 1.0 - Math.abs(Math.sin(theta * 1.5 + warpX * 0.35));
  const w2 = 1.0 - Math.abs(Math.sin(theta * 2.5 - warpZ * 0.38 + p.phase * 0.7));
  const w3 = 0.5 + 0.5 * Math.cos(theta * 1.0 + p.phase);
  const arete =
    Math.pow(w1, 2.1) * (0.48 + 0.24 * w3) +
    Math.pow(w2, 2.5) * 0.38;

  const spurReach = 0.54 + 0.62 * arete;
  const normR = r / spurReach;
  if (normR >= 1.0) return { h: 0.0, arete: 0.0 };

  const broadness = p.broad ?? 0.0;
  const effNormR = broadness > 0.0
    ? Math.pow(normR, 1.0 + broadness * 0.45)
    : normR;
  const baseProfile = Math.pow(1.0 - effNormR, p.steep);

  const gullyCarve = 1.0 + (0.30 * arete + 0.22 * (ridgeNoise - 0.38)) * normR * (1.0 - normR * 0.35);
  const h = Math.max(0.0, p.h * baseProfile * gullyCarve);

  const sharpCrestWeight = 1.0 - broadness * 0.45;
  const areteCrest = arete * Math.pow(1.0 - normR * 0.62, 1.15) * sharpCrestWeight;
  return { h, arete: areteCrest };
}

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
  const spurWave = 1.0 - Math.abs(Math.sin(t * segLen * 0.55 - distAbs * 0.32 + warpX * 0.4));
  const effWidth = width * (0.76 + 0.38 * Math.pow(spurWave, 1.8));
  const u = distAbs / Math.max(0.3, effWidth);
  if (u >= 1.0) return { h: 0.0, arete: 0.0 };

  const sagProfile = 1.0 - (s.sag ?? 0.28) * 4.0 * t * (1.0 - t);
  const linearH = s.h0 + t * (s.h1 - s.h0);
  const crestH = linearH * sagProfile * (0.90 + 0.20 * ridgeNoise);

  const crossProfile = Math.pow(1.0 - u, s.steep ?? 1.42);
  const h = Math.max(0.0, crestH * crossProfile);
  const arete = Math.pow(Math.max(0.0, 1.0 - u * 1.8), 1.6) * (0.45 + 0.45 * spurWave);

  return { h, arete };
}

export function createAlpineEvaluator(seed = 2049, heightMultiplier = 1.0) {
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

  const massifs = [
    { x: 7.6, z: -16.6, h: 6.20, wWest: 4.2, wEast: 6.4, wSouth: 5.2, wNorth: 5.0, steep: 1.56, broad: 0.0, rot: 0.38, phase: 0.4, twist: 0.42 },
    { x: 12.4, z: -15.4, h: 4.75, wWest: 4.8, wEast: 6.8, wSouth: 5.4, wNorth: 4.8, steep: 1.32, broad: 0.55, rot: -0.28, phase: 1.6, twist: 0.32 },
    { x: 4.4, z: -13.8, h: 3.95, wWest: 3.4, wEast: 4.6, wSouth: 4.2, wNorth: 3.8, steep: 1.52, broad: 0.15, rot: 0.55, phase: 2.3, twist: 0.36 },
    { x: 2.2, z: -10.8, h: 2.35, wWest: 2.8, wEast: 4.0, wSouth: 3.4, wNorth: 3.2, steep: 1.44, broad: 0.35, rot: 0.30, phase: 0.9, twist: 0.30 },
    { x: 17.8, z: -14.6, h: 3.90, wWest: 5.2, wEast: 7.2, wSouth: 5.5, wNorth: 5.0, steep: 1.36, broad: 0.45, rot: 0.18, phase: 3.1, twist: 0.28 },
    { x: 24.0, z: -15.8, h: 3.40, wWest: 5.8, wEast: 7.5, wSouth: 5.8, wNorth: 5.4, steep: 1.30, broad: 0.50, rot: -0.22, phase: 1.2, twist: 0.25 },
    { x: 8.6, z: -6.4, h: 3.45, wWest: 3.6, wEast: 5.4, wSouth: 4.4, wNorth: 3.8, steep: 1.54, broad: 0.05, rot: 0.42, phase: 1.8, twist: 0.38 },
    { x: 4.5, z: -4.8, h: 2.25, wWest: 2.8, wEast: 4.2, wSouth: 3.6, wNorth: 3.2, steep: 1.38, broad: 0.40, rot: -0.35, phase: 0.6, twist: 0.32 },
    { x: 14.2, z: -5.4, h: 3.15, wWest: 4.8, wEast: 6.6, wSouth: 5.0, wNorth: 4.4, steep: 1.28, broad: 0.60, rot: 0.22, phase: 2.7, twist: 0.28 },
    { x: 20.5, z: -6.2, h: 2.85, wWest: 5.4, wEast: 7.0, wSouth: 5.2, wNorth: 4.8, steep: 1.34, broad: 0.45, rot: -0.18, phase: 1.1, twist: 0.25 },
    { x: 7.4, z: 1.4, h: 1.45, wWest: 3.0, wEast: 4.6, wSouth: 3.6, wNorth: 3.2, steep: 1.32, broad: 0.50, rot: 0.32, phase: 2.1, twist: 0.26 },
    { x: 12.8, z: 0.8, h: 2.15, wWest: 4.2, wEast: 5.8, wSouth: 4.4, wNorth: 3.8, steep: 1.42, broad: 0.30, rot: -0.24, phase: 0.8, twist: 0.30 },
    { x: 18.5, z: 1.6, h: 2.25, wWest: 5.0, wEast: 6.5, wSouth: 4.8, wNorth: 4.2, steep: 1.30, broad: 0.55, rot: 0.15, phase: 1.9, twist: 0.24 },
    { x: -14.5, z: 5.8, h: 1.35, wWest: 6.8, wEast: 6.4, wSouth: 5.8, wNorth: 5.2, steep: 1.22, broad: 0.65, rot: -0.18, phase: 1.4, twist: 0.22 },
    { x: -7.5, z: 4.8, h: 0.82, wWest: 5.4, wEast: 4.8, wSouth: 4.6, wNorth: 4.2, steep: 1.20, broad: 0.70, rot: 0.24, phase: 2.6, twist: 0.20 },
    { x: -4.2, z: -6.8, h: 1.85, wWest: 4.2, wEast: 3.0, wSouth: 3.6, wNorth: 3.4, steep: 1.34, broad: 0.45, rot: -0.32, phase: 0.7, twist: 0.30 },
    { x: -8.8, z: -8.2, h: 2.85, wWest: 5.2, wEast: 4.0, wSouth: 4.4, wNorth: 4.0, steep: 1.46, broad: 0.25, rot: 0.40, phase: 2.0, twist: 0.34 },
    { x: -14.8, z: -7.6, h: 3.15, wWest: 5.8, wEast: 4.8, wSouth: 4.8, wNorth: 4.4, steep: 1.32, broad: 0.50, rot: -0.22, phase: 1.1, twist: 0.28 },
    { x: -5.4, z: -13.8, h: 2.65, wWest: 4.4, wEast: 3.4, wSouth: 3.8, wNorth: 3.6, steep: 1.42, broad: 0.30, rot: 0.36, phase: 1.5, twist: 0.32 },
    { x: -10.6, z: -15.2, h: 3.55, wWest: 5.4, wEast: 4.4, wSouth: 4.6, wNorth: 4.2, steep: 1.52, broad: 0.15, rot: -0.38, phase: 2.8, twist: 0.36 },
    { x: -16.8, z: -14.6, h: 3.75, wWest: 6.2, wEast: 5.0, wSouth: 5.0, wNorth: 4.6, steep: 1.36, broad: 0.40, rot: 0.20, phase: 0.5, twist: 0.30 },
  ];

  const saddles = [
    { x0: 2.2, z0: -10.8, h0: 2.20, x1: 4.4, z1: -13.8, h1: 3.70, wLeft: 2.8, wRight: 3.8, sag: 0.22, steep: 1.42 },
    { x0: 4.4, z0: -13.8, h0: 3.70, x1: 7.6, z1: -16.6, h1: 5.80, wLeft: 3.4, wRight: 4.8, sag: 0.26, steep: 1.48 },
    { x0: 7.6, z0: -16.6, h0: 5.80, x1: 12.4, z1: -15.4, h1: 4.50, wLeft: 3.8, wRight: 5.4, sag: 0.28, steep: 1.40 },
    { x0: 12.4, z0: -15.4, h0: 4.50, x1: 17.8, z1: -14.6, h1: 3.70, wLeft: 4.2, wRight: 5.8, sag: 0.24, steep: 1.34 },
    { x0: 12.4, z0: -15.4, h0: 3.80, x1: 14.2, z1: -5.4, h1: 2.95, wLeft: 3.8, wRight: 5.2, sag: 0.34, steep: 1.36 },
    { x0: 4.5, z0: -4.8, h0: 2.10, x1: 8.6, z1: -6.4, h1: 3.25, wLeft: 2.8, wRight: 4.2, sag: 0.25, steep: 1.44 },
    { x0: 8.6, z0: -6.4, h0: 3.25, x1: 14.2, z1: -5.4, h1: 2.95, wLeft: 3.4, wRight: 4.8, sag: 0.28, steep: 1.36 },
    { x0: 14.2, z0: -5.4, h0: 2.95, x1: 20.5, z1: -6.2, h1: 2.70, wLeft: 4.0, wRight: 5.2, sag: 0.24, steep: 1.32 },
    { x0: 7.4, z0: 1.4, h0: 1.35, x1: 12.8, z1: 0.8, h1: 2.00, wLeft: 3.0, wRight: 4.2, sag: 0.24, steep: 1.34 },
    { x0: 12.8, z0: 0.8, h0: 2.00, x1: 18.5, z1: 1.6, h1: 2.10, wLeft: 3.6, wRight: 4.8, sag: 0.22, steep: 1.30 },
  ];

  function sampleTerrain(x, z) {
    const vx = getAlpineValleyX(z);
    const distValley = Math.abs(x - vx);
    const valleyHalfWidth = 1.85 + Math.max(0.0, (-z + 8.0) * 0.028);
    const valleyNorm = distValley / valleyHalfWidth;
    const valleyCarve = 1.0 - Math.exp(-valleyNorm * valleyNorm * 1.18);
    const valleyFactor = Math.exp(-valleyNorm * valleyNorm * 0.85);

    const distanceDetailScale = 1.0 - smoothstep(-14.0, -32.0, z) * 0.55;
    const warpX =
      noise(x * 0.09, z * 0.09) * 1.65 +
      noise(x * 0.22, z * 0.22) * 0.40 * distanceDetailScale;
    const warpZ =
      noise(x * 0.09 + 31.4, z * 0.09 + 17.8) * 1.65 +
      noise(x * 0.22 + 11.2, z * 0.22 + 23.5) * 0.40 * distanceDetailScale;
    const rNoise = ridgedFbm(x + warpX * 0.68, z + warpZ * 0.68, 4);

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

    const fgCalmMask = smoothstep(-1.0, 6.0, z);
    const tectonicStrength = (1.0 - fgCalmMask * 0.72) * distanceDetailScale;
    const tectonic =
      (rNoise * 1.35 + noise(x * 0.13, z * 0.13) * 0.24) * tectonicStrength;

    const mountains = (rangeHeight + tectonic) * valleyCarve;
    const valleyFloorBase =
      -0.38 +
      0.022 * Math.max(0.0, 11.0 - z) +
      noise(x * 0.22 + warpX * 0.20, z * 0.22 + warpZ * 0.20) * 0.09;

    let y = THREE.MathUtils.lerp(valleyFloorBase, mountains, valleyCarve);
    const farTaper = 1.0 - smoothstep(-29.0, -44.0, z) * 0.88;
    y *= farTaper * heightMultiplier;

    return { y, valleyFactor, vx, valleyFloorBase, arete: maxArete * valleyCarve };
  }

  function getHeight(x, z) {
    return sampleTerrain(x, z).y;
  }

  return { sampleTerrain, getHeight };
}

/* ==========================================================================
   3D Geometry Builders (Marching Squares Contours & Magenta Routes)
   ========================================================================== */

export function createSculptureGeometries({
  theme = 'contour-flow',
  isMobile = false,
  terrainScale,
  contourSpacing,
} = {}) {
  const isContourFlow = theme !== 'alpine-landscape';
  const seed = terrainScale?.seed ?? (isContourFlow ? 1984 : 2049);
  const width = terrainScale?.width ?? 86.0;
  const heightMult = terrainScale?.heightMultiplier ?? 1.0;

  const gridX = isMobile ? (terrainScale?.gridXMobile ?? 190) : (terrainScale?.gridXDesktop ?? 320);
  const gridZ = isMobile ? (terrainScale?.gridZMobile ?? 170) : (terrainScale?.gridZDesktop ?? 280);

  const elevStep = contourSpacing?.elevationStep ?? (isContourFlow ? 0.072 : 0.085);
  const minElev = contourSpacing?.minElevation ?? (isContourFlow ? -0.6 : -0.8);
  const maxElev = contourSpacing?.maxElevation ?? (isContourFlow ? 5.8 : 6.8);

  const zMin = -45.0;
  const zMax = 16.0;
  const actualDepth = zMax - zMin;

  const { sampleTerrain } = isContourFlow
    ? createContourFlowEvaluator(seed, heightMult)
    : createAlpineEvaluator(seed, heightMult);

  const cols = gridX + 1;
  const rows = gridZ + 1;
  const vertCount = cols * rows;

  const heights = new Float32Array(vertCount);
  const valleys = new Float32Array(vertCount);
  const aretes = new Float32Array(vertCount);
  const slopes = new Float32Array(vertCount);
  const ridges = new Float32Array(vertCount);

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
      const { y, valleyFactor, arete } = sampleTerrain(x, z);
      const idx = rowOffset + i;
      heights[idx] = y;
      valleys[idx] = valleyFactor;
      aretes[idx] = arete;
    }
  }

  // 2. Compute normals, slopes, and ridge factors
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

      const avgNeighbors = 0.25 * (hL + hR + hD + hU);
      const laplacianRidge = Math.max(0.0, y - avgNeighbors) * (isContourFlow ? 12.0 : 16.0);
      const ridge = THREE.MathUtils.clamp(
        laplacianRidge + aretes[idx] * (isContourFlow ? 0.95 : 1.15),
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

  // Triangles for occluding terrain mesh
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

  /* ---------- 3. Cell-Driven Marching Squares for Constant-Elevation Contours ---------- */

  const contourPositions = [];
  const contourData = []; // [elevation, slope, ridgeFactor, valleyFactor]

  const magentaPositions = [];
  const magentaData = []; // [uArc, routeId, weight, elevation]

  const yLift = 0.026;
  const yMagentaLift = 0.038;

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

  // Magenta route matcher for Option B: Contour Flow
  const getContourFlowMagentaMatch = (k, level, mx, mz) => {
    // 1. Outer bank of the midground S-valley bend (z between -9 and 1.5, x between 3.8 and 8.8)
    if (mx > 3.8 && mx < 8.8 && mz > -9.5 && mz < 2.0) {
      const targetK = Math.round(1.05 / elevStep);
      if (k === targetK) {
        const uArc = THREE.MathUtils.clamp((mz - 1.5) / -10.5, 0.0, 1.0);
        return { routeId: 1.2, uArc, weight: 1.0 };
      }
    }

    // 2. Lower slope loop around the foreground ridge (z between 5.5 and 13.0, x between 0.8 and 6.8)
    if (mx > 0.8 && mx < 6.8 && mz > 5.5 && mz < 13.0) {
      const targetK = Math.round(0.65 / elevStep);
      if (k === targetK) {
        const uArc = THREE.MathUtils.clamp((mz - 5.5) / 7.5, 0.0, 1.0);
        return { routeId: 2.3, uArc, weight: 0.95 };
      }
    }

    // 3. Upper slope of the mid-right/upper-right massif (z between -18.5 and -9.5, x between 7.0 and 14.5)
    if (mx > 7.0 && mx < 14.5 && mz > -18.5 && mz < -9.5) {
      const targetK = Math.round(1.95 / elevStep);
      if (k === targetK) {
        const uArc = THREE.MathUtils.clamp((mz - -9.5) / -8.5, 0.0, 1.0);
        return { routeId: 3.4, uArc, weight: 0.88 };
      }
    }

    return null;
  };

  // Magenta route matcher for Option A: Alpine Landscape
  const getAlpineMagentaMatch = (k, level, mx, mz) => {
    if (mx > 1.2 && mx < 6.2 && mz > -17.5 && mz < -9.5) {
      const targetK = Math.round(2.15 / elevStep);
      if (k === targetK || k === targetK + 1) {
        const uArc = THREE.MathUtils.clamp((mz - -9.5) / -8.0, 0.0, 1.0);
        const w = k === targetK ? 1.0 : 0.55;
        return { routeId: 1.2, uArc, weight: w };
      }
    }
    if (mx > -11.5 && mx < -0.8 && mz > -4.5 && mz < 2.2) {
      const targetK = Math.round(0.68 / elevStep);
      if (k === targetK) {
        const uArc = THREE.MathUtils.clamp((-mx - 0.8) / 10.7, 0.0, 1.0);
        return { routeId: 2.4, uArc, weight: 0.92 };
      }
    }
    if (mx > -16.0 && mx < -4.0 && mz > -23.5 && mz < -14.5) {
      const targetK = Math.round(1.18 / elevStep);
      if (k === targetK) {
        const uArc = THREE.MathUtils.clamp((-mx - 4.0) / 12.0, 0.0, 1.0);
        return { routeId: 3.5, uArc, weight: 0.80 };
      }
    }
    return null;
  };

  const getMagentaRouteMatch = isContourFlow ? getContourFlowMagentaMatch : getAlpineMagentaMatch;

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
      const cellValley = 0.25 * (valleys[i00] + valleys[i10] + valleys[i11] + valleys[i01]);

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
              contourData.push(
                level,
                cellSlope,
                effRidge,
                cellValley,
                level,
                cellSlope,
                effRidge,
                cellValley
              );
            }
          }
        }
      }
    }
  }

  const contourGeometry = new THREE.BufferGeometry();
  contourGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array(contourPositions), 3)
  );
  contourGeometry.setAttribute(
    'aContourData',
    new THREE.BufferAttribute(new Float32Array(contourData), 4)
  );
  contourGeometry.computeBoundingSphere();

  const magentaGeometry = new THREE.BufferGeometry();
  magentaGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array(magentaPositions), 3)
  );
  magentaGeometry.setAttribute(
    'aRouteData',
    new THREE.BufferAttribute(new Float32Array(magentaData), 4)
  );
  magentaGeometry.computeBoundingSphere();

  return {
    terrainGeometry,
    contourGeometry,
    magentaGeometry,
  };
}

/**
 * Calculates smooth angular color and density weights for the Digital Eclipse.
 * Accurately models the reference concept image:
 * - Diamond Cyan Flare at lower-right (~316° / 5.52 rad): dazzling burst with white core
 * - Secondary Cyan Flare at upper-left (~140° / 2.44 rad): electric cyan burst
 * - Vivid Pink / Magenta cluster along right arc (~24° / 0.42 rad)
 * - Lower-arc Pink cluster (~250° / 4.36 rad)
 * - Distinct dark/quiet stretches: Top-right (~80° / 1.40 rad) and Mid-left (~195° / 3.40 rad)
 */
export function getEclipseAngularWeights(theta) {
  const TWO_PI = Math.PI * 2;
  const t = ((theta % TWO_PI) + TWO_PI) % TWO_PI;

  const circDist = (a, b) => {
    const d = Math.abs(a - b);
    return Math.min(d, TWO_PI - d);
  };

  // 1. Primary Diamond Cyan Flare (Lower-Right ~316° / 5.52 rad)
  const dDiamond = circDist(t, 5.52);
  const wDiamond = Math.exp(-Math.pow(dDiamond / 0.38, 2));

  // 2. Secondary Upper-Left Cyan Flare (~140° / 2.44 rad)
  const dUpperCyan = circDist(t, 2.44);
  const wUpperCyan = Math.exp(-Math.pow(dUpperCyan / 0.44, 2));

  const cyanWeight = Math.min(1.0, 1.6 * wDiamond + 1.25 * wUpperCyan);

  // 3. Right Vivid Pink Cluster (~24° / 0.42 rad)
  const dPinkRight = circDist(t, 0.42);
  const wPinkRight = Math.exp(-Math.pow(dPinkRight / 0.52, 2));

  // 4. Lower-Arc Pink Cluster (~250° / 4.36 rad)
  const dPinkLower = circDist(t, 4.36);
  const wPinkLower = Math.exp(-Math.pow(dPinkLower / 0.48, 2));

  let pinkWeight = Math.min(1.0, 1.35 * wPinkRight + 1.15 * wPinkLower);
  // Prevent pink from competing with the core of the diamond cyan flare
  pinkWeight = Math.max(0.0, pinkWeight * (1.0 - 0.85 * wDiamond));

  // 5. Quiet / Dark zones
  // Top-Right quiet stretch (~80° / 1.40 rad)
  const dQuiet1 = circDist(t, 1.40);
  const wQuiet1 = Math.exp(-Math.pow(dQuiet1 / 0.46, 2));

  // Mid-Left quiet stretch (~195° / 3.40 rad)
  const dQuiet2 = circDist(t, 3.40);
  const wQuiet2 = Math.exp(-Math.pow(dQuiet2 / 0.50, 2));

  const quietFactor = Math.max(0.0, 1.0 - 0.88 * wQuiet1 - 0.82 * wQuiet2);

  // Overall activity intensity: in quiet stretches drops to 0.08-0.12; in flares goes up to 1.3
  let intensity = (0.08 + 0.92 * Math.max(cyanWeight, pinkWeight * 0.85)) * quietFactor;
  intensity = Math.max(0.06, Math.min(1.35, intensity));

  return {
    cyanWeight,
    pinkWeight,
    intensity,
    wDiamond,
    wUpperCyan,
    isDiamondCore: dDiamond < 0.18,
    isUpperCyanCore: dUpperCyan < 0.15,
  };
}

/**
 * Builds all 3D geometries for the Digital Eclipse:
 * 1. eclipseFilamentsGeometry: Multi-scale radial strokes (dense faint rim stardust, spicules, streamers)
 * 2. eclipseParticlesGeometry: Cosmic dust sparks & streamer endpoint beads
 * 3. eclipseHaloGeometry: Quad plane for saturated additive corona bloom
 * 4. eclipseVoidGeometry: Solid black occlusion disc
 */
export function createDigitalEclipseGeometries({ isMobile = false, settings }) {
  const geomSettings = settings?.eclipseGeometry || {};
  const innerRadius = isMobile
    ? (geomSettings.innerRadiusMobile || 0.84)
    : (geomSettings.innerRadiusDesktop || 1.36);

  const rimCount = isMobile
    ? (geomSettings.rimCountMobile || 3600)
    : (geomSettings.rimCountDesktop || 7500);

  const spiculeCount = isMobile
    ? (geomSettings.spiculeCountMobile || 1200)
    : (geomSettings.spiculeCountDesktop || 2200);

  const streamerCount = isMobile
    ? (geomSettings.streamerCountMobile || 80)
    : (geomSettings.streamerCountDesktop || 160);

  const particleCount = isMobile
    ? (geomSettings.particleCountMobile || 1400)
    : (geomSettings.particleCountDesktop || 2800);

  const haloRadius = isMobile
    ? (geomSettings.haloRadiusMobile || 2.3)
    : (geomSettings.haloRadiusDesktop || 3.6);

  const maxTotalLines = rimCount + spiculeCount + streamerCount;

  // Pre-allocate buffers for LineSegments (2 vertices per line: root & tip)
  const linePositions = new Float32Array(maxTotalLines * 2 * 3);
  const lineColors = new Float32Array(maxTotalLines * 2 * 3);
  const lineNormals = new Float32Array(maxTotalLines * 2 * 3);
  const lineParams = new Float32Array(maxTotalLines * 2 * 4); // [theta, length, isTip, phase]
  const lineAlphas = new Float32Array(maxTotalLines * 2);

  let lineOffset = 0;

  // Pseudo-random deterministic generator for consistent placement
  let seed = 42;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  const streamerTips = [];

  const addFilament = (theta, length, rootAlpha, tipAlpha) => {
    const cosT = Math.cos(theta);
    const sinT = Math.sin(theta);

    const weights = getEclipseAngularWeights(theta);
    const { cyanWeight, pinkWeight, isDiamondCore, isUpperCyanCore } = weights;

    // Organic jittered starting radius so strokes do not overlap on a hard ring edge
    const rootR = innerRadius + rand() * 0.038;
    const tipR = rootR + length;

    const zRoot = (rand() - 0.5) * 0.015;
    const zTip = (rand() - 0.5) * 0.045;

    const p0 = [rootR * cosT, rootR * sinT, zRoot];
    const p1 = [tipR * cosT, tipR * sinT, zTip];

    // Determine colors: NO automatic near-white roots!
    let rootColor = [0.0, 0.65, 0.88]; // deep electric cyan
    let tipColor = [0.0, 0.94, 1.0];

    if (cyanWeight > pinkWeight * 1.05) {
      // In cyan arcs: pure cyan gradient
      rootColor = [0.0, 0.65, 0.88];
      tipColor = [0.0, 0.94, 1.0];

      // Reserve white core ONLY for a tiny fraction (< 3%) of strokes in the diamond flare
      if (isDiamondCore && rand() < 0.07) {
        rootColor = [0.94, 0.98, 1.0];
        tipColor = [0.55, 0.92, 1.0];
      } else if (isUpperCyanCore && rand() < 0.04) {
        rootColor = [0.90, 0.96, 1.0];
        tipColor = [0.45, 0.90, 1.0];
      }
    } else if (pinkWeight > 0.15) {
      // In pink/magenta arcs: vivid magenta/pink, NOT white
      rootColor = [0.86, 0.12, 0.42];
      tipColor = [0.98, 0.32, 0.62];
      if (rand() < 0.03 && pinkWeight > 0.75) {
        rootColor = [0.98, 0.82, 0.90]; // soft pink highlight
      }
    } else {
      // In quiet arcs: subdued, dim blue-grey
      rootColor = [0.08, 0.22, 0.32];
      tipColor = [0.14, 0.36, 0.48];
    }

    const phase = rand();
    const vIdx = lineOffset * 2;

    // Root vertex
    linePositions[vIdx * 3 + 0] = p0[0];
    linePositions[vIdx * 3 + 1] = p0[1];
    linePositions[vIdx * 3 + 2] = p0[2];

    lineColors[vIdx * 3 + 0] = rootColor[0];
    lineColors[vIdx * 3 + 1] = rootColor[1];
    lineColors[vIdx * 3 + 2] = rootColor[2];

    lineNormals[vIdx * 3 + 0] = cosT;
    lineNormals[vIdx * 3 + 1] = sinT;
    lineNormals[vIdx * 3 + 2] = 0;

    lineParams[vIdx * 4 + 0] = theta;
    lineParams[vIdx * 4 + 1] = length;
    lineParams[vIdx * 4 + 2] = 0.0; // root
    lineParams[vIdx * 4 + 3] = phase;

    lineAlphas[vIdx] = rootAlpha;

    // Tip vertex
    linePositions[(vIdx + 1) * 3 + 0] = p1[0];
    linePositions[(vIdx + 1) * 3 + 1] = p1[1];
    linePositions[(vIdx + 1) * 3 + 2] = p1[2];

    lineColors[(vIdx + 1) * 3 + 0] = tipColor[0];
    lineColors[(vIdx + 1) * 3 + 1] = tipColor[1];
    lineColors[(vIdx + 1) * 3 + 2] = tipColor[2];

    lineNormals[(vIdx + 1) * 3 + 0] = cosT;
    lineNormals[(vIdx + 1) * 3 + 1] = sinT;
    lineNormals[(vIdx + 1) * 3 + 2] = 0;

    lineParams[(vIdx + 1) * 4 + 0] = theta;
    lineParams[(vIdx + 1) * 4 + 1] = length;
    lineParams[(vIdx + 1) * 4 + 2] = 1.0; // tip
    lineParams[(vIdx + 1) * 4 + 3] = phase;

    lineAlphas[vIdx + 1] = tipAlpha;

    lineOffset++;
    return [p1[0], p1[1], p1[2], tipColor, theta, phase];
  };

  // 1. Layer 1: Dense, very short, faint rim stardust strokes
  for (let i = 0; i < rimCount; i++) {
    const theta = (i / rimCount) * Math.PI * 2 + (rand() - 0.5) * 0.007;
    const weights = getEclipseAngularWeights(theta);
    // In quiet zones, reject ~65% of rim strokes to break the solid perimeter
    if (weights.intensity < 0.28 && rand() > (0.20 + weights.intensity * 2.0)) {
      continue;
    }
    const len = (0.012 + rand() * 0.038) * (0.45 + 0.55 * weights.intensity);
    // Delicate low alpha: roots never bloom into saturated solid white
    const rootAlpha = (0.12 + 0.26 * weights.intensity) * (0.7 + 0.3 * rand());
    const tipAlpha = 0.0;
    addFilament(theta, len, rootAlpha, tipAlpha);
  }

  // 2. Layer 2: Medium spicules (corona rays)
  for (let i = 0; i < spiculeCount; i++) {
    const theta = rand() * Math.PI * 2;
    const weights = getEclipseAngularWeights(theta);
    // Spicules only emerge from active zones
    if (rand() > Math.pow(weights.intensity, 0.95)) continue;

    const len = (0.05 + Math.pow(rand(), 1.5) * 0.22) * weights.intensity;
    const rootAlpha = (0.18 + 0.32 * weights.intensity) * (0.8 + 0.2 * rand());
    const tipAlpha = 0.02;
    const tipData = addFilament(theta, len, rootAlpha, tipAlpha);

    // Occasional tiny spark on medium spicule tips (~12% in active zones)
    if (rand() < 0.12 && weights.intensity > 0.45) {
      streamerTips.push(tipData);
    }
  }

  // 3. Layer 3: Long energetic streamers with terminal luminous beads
  for (let i = 0; i < streamerCount; i++) {
    const theta = rand() * Math.PI * 2;
    const weights = getEclipseAngularWeights(theta);
    // Streamers concentrated heavily in diamond flare & upper-left flare
    if (rand() > Math.pow(weights.intensity, 1.35)) continue;

    const isDiamond = weights.isDiamondCore;
    const len = (0.32 + Math.pow(rand(), 1.2) * 0.48) * (isDiamond ? 1.30 : 1.0);
    const rootAlpha = (0.25 + 0.45 * weights.intensity);
    const tipAlpha = 0.08;
    const tipData = addFilament(theta, len, rootAlpha, tipAlpha);
    streamerTips.push(tipData);
  }

  // Trim arrays to actual lines generated
  const actualLines = lineOffset;
  const actualPositions = linePositions.subarray(0, actualLines * 2 * 3);
  const actualColors = lineColors.subarray(0, actualLines * 2 * 3);
  const actualNormals = lineNormals.subarray(0, actualLines * 2 * 3);
  const actualParams = lineParams.subarray(0, actualLines * 2 * 4);
  const actualAlphas = lineAlphas.subarray(0, actualLines * 2);

  const eclipseFilamentsGeometry = new THREE.BufferGeometry();
  eclipseFilamentsGeometry.setAttribute('position', new THREE.BufferAttribute(actualPositions, 3));
  eclipseFilamentsGeometry.setAttribute('color', new THREE.BufferAttribute(actualColors, 3));
  eclipseFilamentsGeometry.setAttribute('aNormal', new THREE.BufferAttribute(actualNormals, 3));
  eclipseFilamentsGeometry.setAttribute('aParams', new THREE.BufferAttribute(actualParams, 4));
  eclipseFilamentsGeometry.setAttribute('aAlpha', new THREE.BufferAttribute(actualAlphas, 1));
  eclipseFilamentsGeometry.computeBoundingSphere();

  // 4. Cosmic Dust Particles & Streamer Endpoint Beads
  const totalParticles = particleCount + streamerTips.length;
  const partPositions = new Float32Array(totalParticles * 3);
  const partColors = new Float32Array(totalParticles * 3);
  const partParams = new Float32Array(totalParticles * 4); // [theta, radius, phase, size]

  // Add beads at the tips of streamers and selected spicules
  for (let i = 0; i < streamerTips.length; i++) {
    const tip = streamerTips[i];
    partPositions[i * 3 + 0] = tip[0];
    partPositions[i * 3 + 1] = tip[1];
    partPositions[i * 3 + 2] = tip[2] + 0.005;

    partColors[i * 3 + 0] = tip[3][0];
    partColors[i * 3 + 1] = tip[3][1];
    partColors[i * 3 + 2] = tip[3][2];

    const r = Math.hypot(tip[0], tip[1]);
    partParams[i * 4 + 0] = tip[4]; // theta
    partParams[i * 4 + 1] = r;
    partParams[i * 4 + 2] = tip[5]; // phase
    partParams[i * 4 + 3] = 1.6 + rand() * 1.6; // delicate luminous bead
  }

  // Add floating cosmic dust particles (starlight embers)
  for (let i = 0; i < particleCount; i++) {
    const idx = streamerTips.length + i;
    const theta = rand() * Math.PI * 2;
    const weights = getEclipseAngularWeights(theta);

    // Stardust density biased near the ring with gentle drift outward
    const r = innerRadius + 0.02 + Math.pow(rand(), 2.8) * (isMobile ? 1.6 : 2.4);
    const z = (rand() - 0.5) * 0.06;

    const cosT = Math.cos(theta);
    const sinT = Math.sin(theta);

    partPositions[idx * 3 + 0] = r * cosT;
    partPositions[idx * 3 + 1] = r * sinT;
    partPositions[idx * 3 + 2] = z;

    let col = [0.0, 0.94, 1.0];
    if (weights.pinkWeight > weights.cyanWeight) {
      col = [0.96, 0.28, 0.54];
    } else if (rand() > 0.85) {
      col = [0.92, 0.98, 1.0]; // bright starlight spark
    }

    partColors[idx * 3 + 0] = col[0];
    partColors[idx * 3 + 1] = col[1];
    partColors[idx * 3 + 2] = col[2];

    partParams[idx * 4 + 0] = theta;
    partParams[idx * 4 + 1] = r;
    partParams[idx * 4 + 2] = rand();
    partParams[idx * 4 + 3] = 0.9 + rand() * 1.5;
  }

  const eclipseParticlesGeometry = new THREE.BufferGeometry();
  eclipseParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(partPositions, 3));
  eclipseParticlesGeometry.setAttribute('color', new THREE.BufferAttribute(partColors, 3));
  eclipseParticlesGeometry.setAttribute('aParams', new THREE.BufferAttribute(partParams, 4));
  eclipseParticlesGeometry.computeBoundingSphere();

  // 5. Corona Halo Plane (soft saturated scattering glow)
  const haloPlaneSize = haloRadius * 2.0;
  const eclipseHaloGeometry = new THREE.PlaneGeometry(haloPlaneSize, haloPlaneSize, 1, 1);

  // 6. Void Occlusion Disc (absolute pitch black interior void)
  const eclipseVoidGeometry = new THREE.CircleGeometry(innerRadius * 0.996, 96);

  return {
    eclipseFilamentsGeometry,
    eclipseParticlesGeometry,
    eclipseHaloGeometry,
    eclipseVoidGeometry,
    innerRadius,
    haloRadius,
  };
}
