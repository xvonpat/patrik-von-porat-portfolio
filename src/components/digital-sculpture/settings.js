/**
 * Topographic Landscape & Contour Flow — Tunable Settings & Theme Registry.
 *
 * Provides full support for selectable themes:
 * - 'contour-flow' (Default): Option B — Dark flowing landscape with broad rolling ridges,
 *   a sweeping S-shaped luminous valley, fine contour lines, and calm text negative space.
 * - 'alpine-landscape': Option A — High alpine survey with sharp arête ridges, peaks,
 *   and cirque valleys.
 */

export const CONTOUR_FLOW_SETTINGS = {
  id: 'contour-flow',
  label: 'Contour Flow (River Valley Survey)',

  /** Terrain evaluated on the GPU: a meandering river valley between rolling hills */
  terrain: {
    width: 110,
    depth: 110,
    offset: [8, -22],          // Plane centre (x, z)
    segmentsDesktop: 520,
    segmentsMobile: 260,
    course: [4, -0.36],               // River x at z = 0, and how far it drifts right per unit into the distance
    river: [4.5, 0.11, 1.8, 0.27],    // amplitude/frequency of two meander terms
    valley: [6.5, 2.2, 2.4, 1.8],     // valley half-width, valley height, channel half-width, channel depth
    hills: [4.2, 0.045, 0.12],        // amplitude, base frequency, ridge sharpness
  },

  /** Hair-thin elevation lines */
  lines: {
    spacing: 0.07,             // Height between contours (smaller = denser)
    width: 1.05,               // Line width in pixels
    light: [-0.55, 0.62, 0.55],
  },

  palette: {
    teal: '#1b5c63',
    cyan: '#5ee6e6',
    rose: '#e8607e',
    surface: '#020506',
  },

  camera: {
    fovDesktop: 40,
    fovMobile: 48,
    positionDesktop: [5, 12, 20],
    targetDesktop: [9, 0, -14],
    positionMobile: [2, 26, 26],
    targetMobile: [4, 0, -6],
    fog: [20, 85],             // Fade to black between these camera distances
    parallax: [1.2, 0.6],
  },

  motion: {
    drift: 0.12,               // Contours per second flowing downhill
    pulseSpeed: 0.035,         // A soft brightening wave travelling along the valley
    pulseLength: 46,
    pulseStrength: 0.55,
    breathSpeed: 0.45,
    breathAmount: 0.025,
  },

  rendering: {
    maxPixelRatioDesktop: 2.0,
    maxPixelRatioMobile: 1.5,
    desktopFps: 60,
    mobileFps: 30,
  },
};

export const ALPINE_PEAKS_SETTINGS = {
  id: 'alpine-landscape',
  label: 'Topographic Landscape (Alpine Peaks)',

  cameraFraming: {
    fovDesktop: 32,
    fovMobile: 40,
    positionDesktop: [-0.4, 6.2, 18.0],
    targetDesktop: [0.8, 1.15, -16.0],
    positionMobile: [0.5, 6.6, 20.0],
    targetMobile: [1.0, 1.1, -16.0],
  },

  contourSpacing: {
    elevationStep: 0.085,
    minElevation: -0.8,
    maxElevation: 6.8,
    nearFadeDistance: 2.5,
    farFadeDistance: 48.0,
  },

  terrainScale: {
    seed: 2049,
    width: 84.0,
    depth: 68.0,
    heightMultiplier: 1.0,
    gridXDesktop: 300,
    gridZDesktop: 260,
    gridXMobile: 180,
    gridZMobile: 160,
  },

  cyanBrightness: {
    intensity: 0.88,
    cyanColor: '#4ec5e6',
    deepCyanColor: '#184359',
    ridgeWhiteColor: '#cbeeff',
    valleyMistColor: '#102836',
    valleyMistIntensity: 0.28,
    valleyStreamColor: '#4ec5e6',
    valleyStreamIntensity: 1.0,
  },

  magentaIntensity: {
    intensity: 1.15,
    primaryColor: '#f23d93',
    coreColor: '#ffd1e8',
    pulseSpeed: 0.45,
  },

  parallaxStrength: {
    hoverPositionX: 0.55,
    hoverPositionY: 0.24,
    hoverTargetX: 0.30,
    hoverTargetY: 0.14,
    dampingSpeed: 3.8,
    dragSensitivity: 0.0015,
    maxYaw: 0.15,
    maxPitchUp: 0.08,
    maxPitchDown: 0.05,
    inertiaDamping: 3.5,
    returnDelayMs: 2200,
    returnSpeed: 1.5,
  },

  rendering: {
    maxPixelRatioDesktop: 2.0,
    maxPixelRatioMobile: 1.5,
    mobileFps: 30,
  },
};

/** Harmonic Nexus: 3D Cymatic Strings & Attractor Field unifying Music, Visual Art, and Systems. */
export const HARMONIC_NEXUS_SETTINGS = {
  id: 'harmonic-nexus',
  label: 'Harmonic Nexus (3D Cymatic Strings & Attractor)',

  cameraFraming: {
    mode: 'front-facing',
    fovDesktop: 38,
    fovMobile: 44,
    positionDesktop: [0, 0, 10.0],
    targetDesktop: [0, 0, 0],
    positionMobile: [0, 0, 10.8],
    targetMobile: [0, 0, 0],
    nexusCenterDesktop: [2.48, 0.08, 0],
    nexusCenterMobile: [0.0, -0.58, 0],
  },

  nexusGeometry: {
    seed: 4099,
    scaleDesktop: 1.0,
    scaleMobile: 0.72,
    coreRadius: 1.12,
    haloRadius: 3.85,
    strandCountDesktop: 76,
    strandCountMobile: 44,
    particleCountDesktop: 6800,
    particleCountMobile: 3400,
  },

  palette: {
    electricCyan: '#00f0ff',
    obsidianViolet: '#a855f7',
    vividPink: '#f43f5e',
    highlightWhite: '#f0fdfa',
    voidColor: '#040609',
  },

  parallaxStrength: {
    hoverPositionX: 0.42,
    hoverPositionY: 0.24,
    hoverTargetX: 0.18,
    hoverTargetY: 0.12,
    dampingSpeed: 3.8,
    dragSensitivity: 0.0014,
    maxYaw: 0.22,
    maxPitchUp: 0.14,
    maxPitchDown: 0.14,
    inertiaDamping: 3.6,
    returnDelayMs: 2000,
    returnSpeed: 1.6,
  },

  rendering: {
    maxPixelRatioDesktop: 2.0,
    maxPixelRatioMobile: 1.5,
    mobileFps: 30,
  },
};

/** Chladni Plate: sand settling into the nodal lines of a vibrating plate, one tone at a time. */
export const CHLADNI_PLATE_SETTINGS = {
  id: 'chladni-plate',
  label: 'Chladni Plate (Sand on a Vibrating Plate)',

  plate: {
    seed: 1787,
    // [n, m, sign] square-plate modes, ordered from calm to intricate.
    modes: [
      [2, 5, 1],
      [3, 6, 1],
      [4, 7, -1],
      [5, 8, 1],
      [2, 9, 1],
      [4, 9, 1],
      [3, 8, -1],
      [6, 9, -1],
    ],
    holdSeconds: 9,            // How long each figure stays before the next tone
    radiusDesktop: 0.21,       // Plate radius as a share of viewport width (capped by height)
    centreXDesktop: 0.73,
    rimOpacity: 0.07,
  },

  sand: {
    countDesktop: 14000,
    countMobile: 7000,
    grainSize: 2.1,            // CSS pixels before DPR
    throw: 0.03,               // How far vibration throws a grain per step (scaled by amplitude)
    jitter: 0.0008,            // Residual shimmer so settled lines stay alive
    pullStart: 0.004,          // Drift towards nodal lines right after a tone change...
    pullEnd: 0.012,            // ...growing to this once the figure has settled
    settleSeconds: 3,
    kickStrength: 2.2,         // Extra throw when a new tone starts
    kickDecay: 2.4,
    pointerReach: 0.16,        // Plate units
    pointerStrength: 0.9,
  },

  palette: {
    bone: '#efe6d8',
    cyan: '#00f0ff',
    violet: '#a855f7',
    magenta: '#f43f5e',
  },

  rendering: {
    maxPixelRatioDesktop: 2.0,
    maxPixelRatioMobile: 1.5,
    desktopFps: 60,
    mobileFps: 30,
  },
};

/** Ink in Water: drops of ink blooming and curling in still water (GPU fluid simulation). */
export const INK_IN_WATER_SETTINGS = {
  id: 'ink-in-water',
  label: 'Ink in Water (Fluid Simulation)',

  fluid: {
    simResolutionDesktop: 128,
    simResolutionMobile: 96,
    dyeResolutionDesktop: 768,
    dyeResolutionMobile: 384,
    curl: 22,                  // Vorticity: how eagerly the ink curls into tendrils
    pressure: 0.8,
    pressureIterations: 20,
    velocityDissipation: 0.35,
    dyeDissipation: 0.22,      // Low: ink lingers and slowly dissolves
    displayIntensity: 1,
    pointerForce: 0.5,
    pointerInk: 0.02,
    pointerRadius: 0.18,
  },

  drops: {
    initialCount: 3,           // A small opening bloom so the hero is never empty
    interval: [1.8, 3.4],      // Seconds between drops
    maxLive: 4,
    spawnXDesktop: [0.6, 0.86],
    spawnXMobile: [0.25, 0.8],
    spawnY: [0.7, 0.86],
    fallSpeed: 0.22,           // uv per second
    sideways: 0.08,
    drag: 0.55,
    push: 0.35,
    life: 2.4,
    inkAmount: 0.05,
    radius: 0.32,
  },

  palette: {
    inks: ['#a855f7', '#00f0ff', '#a855f7', '#f43f5e'],
    bone: '#efe6d8',
  },

  rendering: {
    maxPixelRatioDesktop: 1.5,
    maxPixelRatioMobile: 1.25,
    desktopFps: 60,
    mobileFps: 30,
  },
};

/**
 * Ferrofluid Pickup (prototype): gloss-black magnetic fluid rising in spikes over the six
 * pole pieces of a guitar pickup. Selectable in Site Settings; preview via `?theme=ferrofluid`.
 */
export const FERROFLUID_PICKUP_SETTINGS = {
  id: 'ferrofluid-pickup',
  label: 'Ferrofluid Pickup (Magnetic Fluid over Six Pole Pieces)',

  pickup: {
    spacing: 0.84,             // Distance between pole pieces
    angle: -0.6,               // Slant of the pole row on the fluid plane (radians)
    centreDesktop: [2.35, 0.1], // Row centre (x, z)
    centreMobile: [0, 0.4],
    poleRadius: 0.3,           // Reach of each pole's field
    strength: 1.0,
    breath: 0.14,              // Each pole swells and relaxes at its own rate
    breathSpeed: 0.5,
    strumEvery: 11,            // Seconds between strums travelling across the row
    strumSeconds: 1.5,
    strumStrength: 0.55,
  },

  fluid: {
    moundHeight: 0.36,
    spikeHeight: 0.7,
    spikeSharpness: 1.7,       // Higher = more concave, needle-like spikes
    spikeThreshold: 0.2,       // Field strength at which the surface breaks into spikes
    latticeSpacing: 0.23,
    planeSize: [13, 9],
    segmentsDesktop: [680, 470],
    segmentsMobile: [340, 240],
    poolRadius: [6, 4.2],      // The pool fades to black inside the mesh edge
  },

  pointer: {
    radius: 0.5,
    strength: 0.95,
    follow: 6,                 // How quickly the fluid follows the mouse
    height: 0.15,
  },

  palette: {
    violet: '#a855f7',
    cyan: '#00f0ff',
    bone: '#efe6d8',
  },

  /** Softbox intensities (HDR) and exposure for the reflections. */
  lights: {
    violet: 9,
    cyan: 7,
    bone: 6,
    horizon: 1.5,            // Glow mirrored in the flat pool
    reflectance: 0.13,       // Mirror strength when the fluid is seen head-on
    exposure: 1.0,
  },

  camera: {
    fovDesktop: 36,
    fovMobile: 44,
    positionDesktop: [0, 2.6, 7.2],
    targetDesktop: [0, 0.55, 0],
    positionMobile: [0, 5, 12.5],
    targetMobile: [0, 2.2, 0],
    parallax: [0.35, 0.2],
  },

  rendering: {
    maxPixelRatioDesktop: 1.5,
    maxPixelRatioMobile: 1.25,
    desktopFps: 60,
    mobileFps: 30,
  },
};

/**
 * Obsidian Shard (prototype): one piece of volcanic glass lit like a product photograph.
 * Not selectable in Site Settings yet; preview via `?theme=obsidian`.
 */
export const OBSIDIAN_SHARD_SETTINGS = {
  id: 'obsidian-shard',
  label: 'Obsidian Shard (Volcanic Glass)',

  shard: {
    seed: 7,
    width: [0.62, 1.0],         // Distance from the axis to each side face
    flatten: 0.42,              // How much thinner the blade is front to back
    lean: [0.26, 0.48],         // How strongly every other side face leans in towards the tip
    tip: 2.9,
    base: 1.55,
    boundingRadius: 3.0,
    tilt: [0.18, 0.5, 0.3],     // Resting pose (radians)
    centreDesktop: [1.85, 0.25, 0],
    centreMobile: [0.35, -0.9, 0],
  },

  glass: {
    ripple: 0.15,               // Depth of the conchoidal ripples
    rippleFrequency: 11,
    absorption: 2.8,            // Higher = blacker glass, light only through thin edges
    edgeHighlight: 0.85,
  },

  palette: {
    violet: '#a855f7',
    cyan: '#00f0ff',
    bone: '#efe6d8',
  },

  lights: {
    key: 10,
    violet: 8,
    cyan: 7,
    exposure: 1.0,
    keyDir: [-0.25, 0.7, 0.6],
    keyReach: [0.6, 0.3],       // How far the mouse carries the key light
    lampReach: 0.2,
  },

  camera: {
    fovDesktop: 34,
    fovMobile: 42,
    distanceDesktop: 7.6,
    distanceMobile: 12.5,
    parallax: [0.25, 0.15],
  },

  motion: {
    turnSpeed: 0.05,            // Radians per second
    pointerTurn: 0.22,
    pointerTilt: 0.1,
    pointerEase: 2.5,
  },

  rendering: {
    maxPixelRatioDesktop: 1.5,
    maxPixelRatioMobile: 1.25,
    samplesDesktop: 2,          // Anti-aliasing: samples per pixel side
    samplesMobile: 1,
    desktopFps: 60,
    mobileFps: 30,
  },
};

export const SCULPTURE_THEMES = {
  'obsidian-shard': OBSIDIAN_SHARD_SETTINGS,
  'ferrofluid-pickup': FERROFLUID_PICKUP_SETTINGS,
  'harmonic-nexus': HARMONIC_NEXUS_SETTINGS,
  'chladni-plate': CHLADNI_PLATE_SETTINGS,
  'ink-in-water': INK_IN_WATER_SETTINGS,
  'contour-flow': CONTOUR_FLOW_SETTINGS,
  'alpine-landscape': ALPINE_PEAKS_SETTINGS,
};

export function getSculptureSettings(themeName) {
  if (!themeName) return HARMONIC_NEXUS_SETTINGS;
  const key = String(themeName).toLowerCase().trim();
  if (key === 'nexus' || key === 'harmonic' || key === 'harmonic-nexus' || key === 'e') {
    return HARMONIC_NEXUS_SETTINGS;
  }
  if (key === 'chladni' || key === 'chladni-plate' || key === 'f') {
    return CHLADNI_PLATE_SETTINGS;
  }
  if (key === 'ink' || key === 'ink-in-water' || key === 'g') {
    return INK_IN_WATER_SETTINGS;
  }
  if (key === 'ferro' || key === 'ferrofluid' || key === 'pickup' || key === 'ferrofluid-pickup') {
    return FERROFLUID_PICKUP_SETTINGS;
  }
  if (key === 'obsidian' || key === 'shard' || key === 'obsidian-shard') {
    return OBSIDIAN_SHARD_SETTINGS;
  }
  if (key === 'flow' || key === 'contour-flow' || key === 'b') {
    return CONTOUR_FLOW_SETTINGS;
  }
  if (key === 'alpine' || key === 'alpine-peaks' || key === 'alpine-landscape' || key === 'a') {
    return ALPINE_PEAKS_SETTINGS;
  }
  return SCULPTURE_THEMES[key] || HARMONIC_NEXUS_SETTINGS;
}

/** Default active settings (Harmonic Nexus) */
export const SCULPTURE_SETTINGS = HARMONIC_NEXUS_SETTINGS;

