import * as THREE from 'three';

/**
 * Custom Shaders for the 3D Topographic Landscape & Contour Flow:
 * 1. terrainMaterial: Almost-black occluding 3D terrain mesh with subtle valley mist,
 *    ridge rim-lighting, and sub-pixel anti-aliased elevation isolines.
 * 2. contourMaterial: 3D Marching Squares constant-elevation contour lines with
 *    glowing S-valley stream, slope/ridge luminance, distance depth fade, and slow shimmer.
 * 3. magentaMaterial: Sparse, coherent magenta valley and ridge routes with
 *    animated travelling light pulses.
 */
export function createSculptureMaterials(settings) {
  const { contourSpacing, cyanBrightness, magentaIntensity } = settings;

  const cyanColor = new THREE.Color(cyanBrightness.cyanColor || '#4ec5e6');
  const deepCyanColor = new THREE.Color(cyanBrightness.deepCyanColor || '#184359');
  const ridgeWhiteColor = new THREE.Color(cyanBrightness.ridgeWhiteColor || '#e0f7ff');
  const valleyMistColor = new THREE.Color(cyanBrightness.valleyMistColor || '#102836');
  const valleyStreamColor = new THREE.Color(cyanBrightness.valleyStreamColor || '#5eead4');

  const magentaPrimary = new THREE.Color(magentaIntensity.primaryColor || '#f43f5e');
  const magentaCore = new THREE.Color(magentaIntensity.coreColor || '#ffe4e6');

  /* ---------- 1. Occluding Dark Terrain Surface Material ---------- */

  const terrainMaterial = new THREE.ShaderMaterial({
    transparent: false,
    depthTest: true,
    depthWrite: true,
    polygonOffset: true,
    polygonOffsetFactor: 1.5,
    polygonOffsetUnits: 2.0,
    uniforms: {
      uTime: { value: 0 },
      uElevStep: { value: contourSpacing.elevationStep || 0.072 },
      uCyanIntensity: { value: cyanBrightness.intensity || 0.94 },
      uMistIntensity: { value: cyanBrightness.valleyMistIntensity || 0.30 },
      uCyanColor: { value: cyanColor },
      uDeepCyanColor: { value: deepCyanColor },
      uRidgeWhiteColor: { value: ridgeWhiteColor },
      uValleyMistColor: { value: valleyMistColor },
      uValleyStreamColor: { value: valleyStreamColor },
      uMagentaColor: { value: magentaPrimary },
    },
    vertexShader: `
      attribute vec4 aTerrainData; // [elevation, slope, ridgeFactor, valleyFactor]

      varying vec3 vWorldPos;
      varying vec3 vNormal;
      varying vec3 vViewPos;
      varying vec4 vData;

      void main() {
        vData = aTerrainData;
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPosition.xyz;
        vec4 mvPosition = viewMatrix * worldPosition;
        vViewPos = mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uElevStep;
      uniform float uCyanIntensity;
      uniform float uMistIntensity;
      uniform vec3 uCyanColor;
      uniform vec3 uDeepCyanColor;
      uniform vec3 uRidgeWhiteColor;
      uniform vec3 uValleyMistColor;
      uniform vec3 uValleyStreamColor;
      uniform vec3 uMagentaColor;

      varying vec3 vWorldPos;
      varying vec3 vNormal;
      varying vec3 vViewPos;
      varying vec4 vData;

      void main() {
        float elev = vData.x;
        float slope = vData.y;
        float ridge = vData.z;
        float valley = vData.w;

        float dist = length(vViewPos);

        // Gradual distance-based fading toward the background colour (#040609)
        float distFade = 1.0 - smoothstep(20.0, 52.0, dist);
        float zDepthFade = 1.0 - smoothstep(-11.0, -35.0, vWorldPos.z);
        float xEdgeFade = 1.0 - smoothstep(24.0, 37.0, abs(vWorldPos.x));
        float visibility = distFade * (0.32 + 0.68 * zDepthFade) * xEdgeFade;

        // Almost-black charcoal obsidian terrain surface (#040609)
        vec3 baseObsidian = vec3(0.015, 0.023, 0.035);

        // Subtle atmospheric mist in valley basins to separate overlapping ranges
        float mistDepth = smoothstep(2.0, -18.0, vWorldPos.z) * (1.0 - smoothstep(-22.0, -36.0, vWorldPos.z));
        float basinMist = smoothstep(2.0, -0.3, elev) * (0.35 + 0.65 * valley);
        float mistAmount = (basinMist * 0.48 + mistDepth * 0.28) * uMistIntensity * visibility;
        vec3 col = baseObsidian + uValleyMistColor * mistAmount;

        // Subtle stream mist along the S-valley
        float streamGlow = pow(valley, 2.2) * 0.12 * visibility;
        col += uValleyStreamColor * streamGlow;

        // Subtle magenta ambient reflection along outer curves and saddles
        float saddleDist = length((vWorldPos.xz - vec2(6.5, -8.0)) * vec2(0.28, 0.24));
        float saddleGlow = exp(-saddleDist * saddleDist * 2.2) * 0.10;
        float valleyMagenta = pow(valley, 2.8) * smoothstep(1.2, -0.3, elev) * 0.10;
        col += uMagentaColor * (valleyMagenta + saddleGlow) * visibility;

        // Sub-pixel anti-aliased constant-elevation isolines on the surface (reduced detail with distance)
        float scaledElev = elev / uElevStep;
        float fw = max(fwidth(scaledElev), 0.001);
        float distToLine = abs(fract(scaledElev + 0.5) - 0.5);
        float lineAlpha = 1.0 - smoothstep(0.026, 0.026 + fw * 1.05, distToLine);
        lineAlpha *= clamp(1.0 / (1.0 + fw * 1.25), 0.08, 0.78);

        // Selective ridge highlight: restrained cyan everywhere, brighter on prominent crests
        float depthWhiteMask = 1.0 - smoothstep(-14.5, -22.5, vWorldPos.z);
        float sharpRidge = pow(clamp(ridge, 0.0, 1.0), 1.45);
        float rightMassifFocus = smoothstep(-0.5, 9.0, vWorldPos.x) * (1.0 - smoothstep(-18.0, -24.5, vWorldPos.z));
        float selectiveHighlight = clamp(sharpRidge * 0.68 * (0.35 + 0.65 * rightMassifFocus) * depthWhiteMask, 0.0, 0.84);

        vec3 lineCol = mix(uDeepCyanColor, uCyanColor, clamp(slope * 0.52 + sharpRidge * 0.42 + 0.12, 0.0, 0.92) * (0.35 + 0.65 * zDepthFade));
        lineCol = mix(lineCol, uValleyStreamColor, pow(valley, 1.6) * 0.70);
        lineCol = mix(lineCol, uRidgeWhiteColor, selectiveHighlight);

        // Subdue left-hand side slightly in shader (paired with the broad CSS readabilityMask)
        float rightOpenSpace = smoothstep(-3.0, 3.2, vWorldPos.x);
        float textZoneSuppress = mix(0.58, 1.0, rightOpenSpace);

        float finalLineStrength = lineAlpha * uCyanIntensity * visibility * textZoneSuppress;
        col += lineCol * finalLineStrength * (0.22 + 0.42 * sharpRidge * zDepthFade);

        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });

  /* ---------- 2. 3D Constant-Elevation Contour Lines Material ---------- */

  const contourMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthTest: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uCyanIntensity: { value: cyanBrightness.intensity || 0.94 },
      uNearFade: { value: contourSpacing.nearFadeDistance || 2.5 },
      uFarFade: { value: contourSpacing.farFadeDistance || 50.0 },
      uCyanColor: { value: cyanColor },
      uDeepCyanColor: { value: deepCyanColor },
      uRidgeWhiteColor: { value: ridgeWhiteColor },
      uValleyStreamColor: { value: valleyStreamColor },
    },
    vertexShader: `
      attribute vec4 aContourData; // [elevation, slope, ridgeFactor, valleyFactor]

      varying vec3 vWorldPos;
      varying vec3 vViewPos;
      varying vec4 vContourData;

      void main() {
        vContourData = aContourData;
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPosition.xyz;
        vec4 mvPosition = viewMatrix * worldPosition;
        vViewPos = mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uCyanIntensity;
      uniform float uNearFade;
      uniform float uFarFade;
      uniform vec3 uCyanColor;
      uniform vec3 uDeepCyanColor;
      uniform vec3 uRidgeWhiteColor;
      uniform vec3 uValleyStreamColor;

      varying vec3 vWorldPos;
      varying vec3 vViewPos;
      varying vec4 vContourData;

      void main() {
        float elev = vContourData.x;
        float slope = vContourData.y;
        float ridge = vContourData.z;
        float valley = vContourData.w;

        float dist = length(vViewPos);

        // Gradual distance-based fading toward the background colour
        float nearFade = smoothstep(1.2, uNearFade, dist);
        // Continuous distance decay starting from the mid-ground so distant ranges visibly recede
        float distAtten = 1.0 - smoothstep(18.0, 52.0, dist);
        float zDepthAtten = 1.0 - smoothstep(-10.0, -34.5, vWorldPos.z);
        float depthFactor = distAtten * (0.30 + 0.70 * zDepthAtten);
        float xEdgeFade = 1.0 - smoothstep(24.0, 36.0, abs(vWorldPos.x));
        float visibility = nearFade * depthFactor * xEdgeFade;
        if (visibility <= 0.004) discard;

        // Base contour line color: slate-cyan to cyan
        float sharpRidge = pow(clamp(ridge, 0.0, 1.0), 1.45);
        float rightMassifFocus = smoothstep(-0.5, 8.5, vWorldPos.x) * (1.0 - smoothstep(-18.0, -24.0, vWorldPos.z));
        float elevCrest = smoothstep(1.6, 5.2, elev) * rightMassifFocus;
        float depthWhiteMask = (1.0 - smoothstep(-15.0, -23.0, vWorldPos.z)) * (1.0 - smoothstep(24.0, 38.0, dist));

        float cyanMix = clamp((slope * 0.46 + sharpRidge * 0.48 + 0.24) * (0.38 + 0.62 * zDepthAtten), 0.0, 1.0);
        vec3 col = mix(uDeepCyanColor, uCyanColor, cyanMix);

        // Glowing S-Valley stream river (Option B reference)
        float streamHighlight = clamp(pow(valley, 1.15) * 1.50, 0.0, 1.0);
        col = mix(col, uValleyStreamColor, streamHighlight * 0.94);

        // Selective brighter highlight on ridge crests and nested summit loops
        float whiteSelect = clamp((sharpRidge * (0.36 + 0.52 * rightMassifFocus) + elevCrest * 0.28) * depthWhiteMask, 0.0, 0.84);
        col = mix(col, uRidgeWhiteColor, whiteSelect);

        // Smooth spatial phase along the contours for slow data pulse
        float phase = vWorldPos.x * 0.16 + vWorldPos.z * 0.12 + elev * 2.8;
        float pulseWave = sin(phase - uTime * 0.60);
        float pulseHighlight = smoothstep(0.86, 1.0, pulseWave) * 0.16 * depthWhiteMask;
        col = mix(col, uRidgeWhiteColor, pulseHighlight);

        // Subdue left-hand side slightly in shader while preserving full detail in the open space to the right
        float rightOpenSpace = smoothstep(-3.0, 3.2, vWorldPos.x);
        float textReadability = mix(0.55, 1.0, rightOpenSpace);

        // Keep foreground contours thin and clearly defined, while distant contours become dimmer and softer
        float contrastBoost = 0.32 + 0.54 * clamp(sharpRidge * 0.65 + slope * 0.24 + rightMassifFocus * 0.25, 0.0, 1.0);
        float streamAlphaBoost = 1.0 + streamHighlight * 0.55;
        float alpha = (contrastBoost + pulseHighlight) * visibility * uCyanIntensity * textReadability * streamAlphaBoost;

        gl_FragColor = vec4(col, clamp(alpha, 0.0, 0.88));
      }
    `,
  });

  /* ---------- 3. Coherent Magenta Valley & Ridge Routes Material ---------- */

  const magentaMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthTest: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uMagentaIntensity: { value: magentaIntensity.intensity || 1.15 },
      uPulseSpeed: { value: magentaIntensity.pulseSpeed || 0.38 },
      uPrimaryColor: { value: magentaPrimary },
      uCoreColor: { value: magentaCore },
    },
    vertexShader: `
      attribute vec4 aRouteData; // [uArc, routeId, weight, elevation]

      varying vec3 vWorldPos;
      varying vec3 vViewPos;
      varying vec4 vRouteData;

      void main() {
        vRouteData = aRouteData;
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPosition.xyz;
        vec4 mvPosition = viewMatrix * worldPosition;
        vViewPos = mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uMagentaIntensity;
      uniform float uPulseSpeed;
      uniform vec3 uPrimaryColor;
      uniform vec3 uCoreColor;

      varying vec3 vWorldPos;
      varying vec3 vViewPos;
      varying vec4 vRouteData;

      void main() {
        float uArc = vRouteData.x;
        float routeId = vRouteData.y;
        float weight = vRouteData.z;

        float dist = length(vViewPos);
        // Gradual distance fade so the magenta route leads the eye into the valley and fades softly in the distance
        float farFade = 1.0 - smoothstep(22.0, 48.0, dist);
        float zHorizonFade = 1.0 - smoothstep(-16.0, -34.0, vWorldPos.z);
        float endTaper = smoothstep(0.0, 0.06, uArc) * smoothstep(1.0, 0.90, uArc);
        float visibility = farFade * (0.25 + 0.75 * zHorizonFade) * endTaper;
        if (visibility <= 0.005) discard;

        // Animated light pulses travelling along the valley and ridge routes
        float wave1 = sin(uArc * 15.708 - uTime * uPulseSpeed * 3.0 + routeId * 2.3);
        float wave2 = sin(uArc * 7.854 - uTime * uPulseSpeed * 1.6 - routeId * 1.5);
        float pulse = smoothstep(0.76, 1.0, wave1) * 0.60 + smoothstep(0.82, 1.0, wave2) * 0.40;

        vec3 col = mix(uPrimaryColor, uCoreColor, clamp(0.18 + pulse * 0.72, 0.0, 1.0));
        float alpha = (0.58 * weight + pulse * 0.36 * weight) * visibility * uMagentaIntensity;

        gl_FragColor = vec4(col, clamp(alpha, 0.0, 0.92));
      }
    `,
  });

  return {
    terrainMaterial,
    contourMaterial,
    magentaMaterial,
  };
}
