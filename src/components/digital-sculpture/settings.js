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
  label: 'Contour Flow (S-Valley)',

  /** Camera framing for elevated oblique view of the sweeping S-valley */
  cameraFraming: {
    fovDesktop: 33,
    fovMobile: 42,
    positionDesktop: [-1.8, 9.0, 19.2],
    targetDesktop: [3.8, 1.1, -15.0],
    positionMobile: [0.2, 9.8, 22.5],
    targetMobile: [2.8, 0.8, -15.0],
  },

  /** Fine, high-density constant-elevation contour line spacing */
  contourSpacing: {
    elevationStep: 0.054,
    minElevation: -0.6,
    maxElevation: 5.6,
    nearFadeDistance: 2.5,
    farFadeDistance: 50.0,
  },

  /** 3D terrain dimensions and grid resolution */
  terrainScale: {
    seed: 1984,
    width: 86.0,
    depth: 70.0,
    heightMultiplier: 1.0,
    gridXDesktop: 330,
    gridZDesktop: 290,
    gridXMobile: 190,
    gridZMobile: 170,
  },

  /** Restrained cyan & glowing stream palette (Option B reference) */
  cyanBrightness: {
    intensity: 0.96,
    cyanColor: '#38bdf8',
    deepCyanColor: '#13374b',
    ridgeWhiteColor: '#e0f7ff',
    valleyMistColor: '#0a1d27',
    valleyMistIntensity: 0.30,
    valleyStreamColor: '#5eead4',
    valleyStreamIntensity: 1.45,
  },

  /** Delicate magenta routes winding along outer valley contours and foreground ridge */
  magentaIntensity: {
    intensity: 1.15,
    primaryColor: '#f43f5e',
    coreColor: '#ffe4e6',
    pulseSpeed: 0.38,
  },

  /** Smooth pointer parallax and cushioned drag viewing angle limits */
  parallaxStrength: {
    hoverPositionX: 0.48,
    hoverPositionY: 0.22,
    hoverTargetX: 0.28,
    hoverTargetY: 0.12,
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

export const DIGITAL_ECLIPSE_SETTINGS = {
  id: 'digital-eclipse',
  label: 'Digital Eclipse (Radial Corona & Cosmic Filaments)',

  cameraFraming: {
    mode: 'front-facing',
    fovDesktop: 38,
    fovMobile: 44,
    positionDesktop: [0, 0, 10.0],
    targetDesktop: [0, 0, 0],
    positionMobile: [0, 0, 10.8],
    targetMobile: [0, 0, 0],
    eclipseCenterDesktop: [2.55, 0.10, 0],
    eclipseCenterMobile: [0.0, -0.62, 0],
  },

  eclipseGeometry: {
    innerRadiusDesktop: 1.36,
    innerRadiusMobile: 0.84,
    streamCountDesktop: 520,
    streamCountMobile: 300,
    particleCountDesktop: 6400,
    particleCountMobile: 3200,
    particleSize: 1.0,
    particleDensity: 1.0,
    haloRadiusDesktop: 3.6,
    haloRadiusMobile: 2.3,
  },

  cyanBrightness: {
    intensity: 1.42,
    electricCyan: '#00f0ff',
    cyanHighlight: '#f0fdfa',
    deepCyan: '#0891b2',
    haloCyan: '#00d8f6',
  },

  magentaIntensity: {
    intensity: 1.38,
    vividPink: '#f43f5e',
    magentaHighlight: '#ffe4e6',
    deepMagenta: '#be123c',
    haloPink: '#ff2875',
  },

  voidColor: '#040609',

  animation: {
    pulseSpeed: 0.84,          // ~7.5s per full revolution around the ring (rad/s)
    outwardFlowSpeed: 0.28,    // Outward data stream cycle speed along radial paths
    breathingAmplitude: 0.088, // Corona expansion/relaxation amplitude
    breathingSpeed: 1.25,      // ~5.0s breathing period (rad/s)
    shimmerSpeed: 1.45,
    particleDriftSpeed: 0.28,
    breathingScale: 0.088,
    glowIntensity: 1.38,
  },

  parallaxStrength: {
    hoverPositionX: 0.35,
    hoverPositionY: 0.20,
    hoverTargetX: 0.15,
    hoverTargetY: 0.10,
    dampingSpeed: 3.6,
    dragSensitivity: 0.0012,
    maxYaw: 0.12,
    maxPitchUp: 0.07,
    maxPitchDown: 0.07,
    inertiaDamping: 3.8,
    returnDelayMs: 1800,
    returnSpeed: 1.8,
  },

  rendering: {
    maxPixelRatioDesktop: 2.0,
    maxPixelRatioMobile: 1.5,
    mobileFps: 30,
  },
};

/** A separate atmospheric eclipse version; the original remains selectable. */
export const DIGITAL_ECLIPSE_V2_SETTINGS = {
  id: 'digital-eclipse-v2',
  label: 'Digital Eclipse II (Atmospheric Corona)',
  corona: {
    seed: 7319,
    detailDensity: 1,
    particleDensity: 1,
    particleSize: 1.05,
    rimOpacity: 0.45,
    cyanGlow: 1.85,
    pinkGlow: 1.72,
    glowIntensity: 1.35,
  },
  animation: {
    speed: 1,
    pulseSpeed: 0.84,          // ~7.5s per full revolution around the ring (rad/s)
    outwardFlowSpeed: 0.30,    // Outward data packet flow rate along curved paths
    breathingAmplitude: 0.09,  // Corona expansion/relaxation amplitude (~5s period)
    breathingSpeed: 1.25,      // ~5.0s breathing cycle frequency (rad/s)
    parallaxPixels: 5,
    pointerReach: 95,
  },
  rendering: {
    maxPixelRatioDesktop: 1.75,
    maxPixelRatioMobile: 1.5,
    desktopFps: 60,
    mobileFps: 30,
  },
};

export const SCULPTURE_THEMES = {
  'digital-eclipse-v2': DIGITAL_ECLIPSE_V2_SETTINGS,
  'digital-eclipse': DIGITAL_ECLIPSE_SETTINGS,
  'contour-flow': CONTOUR_FLOW_SETTINGS,
  'alpine-landscape': ALPINE_PEAKS_SETTINGS,
};

export function getSculptureSettings(themeName) {
  if (!themeName) return DIGITAL_ECLIPSE_SETTINGS;
  const key = String(themeName).toLowerCase().trim();
  if (key === 'eclipse-v2' || key === 'digital-eclipse-v2' || key === 'd') {
    return DIGITAL_ECLIPSE_V2_SETTINGS;
  }
  if (key === 'eclipse' || key === 'digital-eclipse' || key === 'c') {
    return DIGITAL_ECLIPSE_SETTINGS;
  }
  if (key === 'flow' || key === 'contour-flow' || key === 'b') {
    return CONTOUR_FLOW_SETTINGS;
  }
  if (key === 'alpine' || key === 'alpine-peaks' || key === 'alpine-landscape' || key === 'a') {
    return ALPINE_PEAKS_SETTINGS;
  }
  return SCULPTURE_THEMES[key] || DIGITAL_ECLIPSE_SETTINGS;
}

/** Default active settings (Digital Eclipse) */
export const SCULPTURE_SETTINGS = DIGITAL_ECLIPSE_SETTINGS;
