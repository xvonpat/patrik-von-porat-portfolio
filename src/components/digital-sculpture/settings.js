/**
 * Topographic Landscape — Tunable Settings.
 *
 * Exposes clearly named parameters for camera framing, contour spacing,
 * terrain scale, cyan brightness, magenta intensity, and parallax strength.
 */
export const SCULPTURE_SETTINGS = {
  /** Camera framing for desktop and mobile viewports. */
  cameraFraming: {
    fovDesktop: 32,
    fovMobile: 40,
    /** Elevated oblique mountain-survey camera position and target [x, y, z]. */
    positionDesktop: [-0.4, 6.2, 18.0],
    targetDesktop: [0.8, 1.15, -16.0],
    positionMobile: [0.5, 6.6, 20.0],
    targetMobile: [1.0, 1.1, -16.0],
  },

  /** Constant-elevation contour line spacing and density. */
  contourSpacing: {
    /** Vertical elevation interval between constant-elevation slices. */
    elevationStep: 0.085,
    /** Minimum and maximum elevation levels to slice. */
    minElevation: -0.8,
    maxElevation: 6.8,
    /** Line opacity and distance fade control. */
    nearFadeDistance: 2.5,
    farFadeDistance: 48.0,
  },

  /** Deterministic 3D terrain dimensions and vertical scale. */
  terrainScale: {
    /** Deterministic seed for repeatable mountain and valley layout. */
    seed: 2049,
    /** World width (X) and depth (Z) — oversized so edges never enter the viewport. */
    width: 84.0,
    depth: 68.0,
    /** Overall vertical elevation multiplier. */
    heightMultiplier: 1.0,
    /** Grid resolution for terrain mesh and Marching Squares contour extraction. */
    gridXDesktop: 300,
    gridZDesktop: 260,
    gridXMobile: 180,
    gridZMobile: 160,
  },

  /** Cyan-white elevation contour appearance (mostly restrained cyan with selective highlights). */
  cyanBrightness: {
    /** Overall brightness multiplier for elevation contours. */
    intensity: 0.88,
    /** Primary contour color — restrained atmospheric cyan. */
    cyanColor: '#4ec5e6',
    /** Deep slope/bowl & distant contour tint — muted slate-cyan. */
    deepCyanColor: '#184359',
    /** Selective ridge crest highlight color — soft icy cyan-white. */
    ridgeWhiteColor: '#cbeeff',
    /** Subtle smoky mist in deep valleys and mountain bases. */
    valleyMistColor: '#102836',
    valleyMistIntensity: 0.28,
  },

  /** Sparse, coherent magenta routes winding through valleys and saddles. */
  magentaIntensity: {
    /** Overall luminance of the magenta paths. */
    intensity: 1.15,
    /** Primary route color — Aurora magenta/pink. */
    primaryColor: '#f23d93',
    /** Bright core highlight on pulse peaks. */
    coreColor: '#ffd1e8',
    /** Speed of light pulses travelling along the magenta routes. */
    pulseSpeed: 0.45,
  },

  /** Pointer parallax and constrained drag viewing angle adjustments. */
  parallaxStrength: {
    /** Damped camera shift on pointer move [x, y] in world units. */
    hoverPositionX: 0.55,
    hoverPositionY: 0.24,
    /** Subtle target shift on pointer move. */
    hoverTargetX: 0.30,
    hoverTargetY: 0.14,
    /** Smoothing speed for pointer parallax. */
    dampingSpeed: 3.8,
    /** Radians of camera angle adjustment per pixel dragged. */
    dragSensitivity: 0.0015,
    /** Constrained viewing angle limits (radians) so terrain never flips or clips. */
    maxYaw: 0.15,
    maxPitchUp: 0.08,
    maxPitchDown: 0.05,
    /** Inertial decay rate after releasing drag. */
    inertiaDamping: 3.5,
    /** Inactivity delay before easing back to reference framing (ms). */
    returnDelayMs: 2200,
    /** Speed of smooth return to reference pose. */
    returnSpeed: 1.5,
  },

  /** Adaptive rendering quality limits. */
  rendering: {
    maxPixelRatioDesktop: 2.0,
    maxPixelRatioMobile: 1.5,
    mobileFps: 30,
  },
};
