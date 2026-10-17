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

/**
 * Custom Shaders for the Digital Eclipse:
 * 1. eclipseFilamentMaterial: High-intensity radial strokes with traveling light waves,
 *    near-white roots, electric cyan & vivid pink tips, and pointer-attracted bending.
 * 2. eclipseHaloMaterial: Saturated non-destructive additive corona bloom with pure black void mask.
 * 3. eclipseParticleMaterial: Shimmering starlight sparks and streamer endpoint beads.
 * 4. eclipseVoidMaterial: Solid black occlusion disc for absolute dark void.
 */
export function createEclipseMaterials(settings) {
  const cyanSettings = settings?.cyanBrightness || {};
  const pinkSettings = settings?.magentaIntensity || {};
  const animSettings = settings?.animation || {};
  const innerRadius = settings?.eclipseGeometry?.innerRadiusDesktop || 1.36;
  const haloRadius = settings?.eclipseGeometry?.haloRadiusDesktop || 3.6;

  const haloCyan = new THREE.Color(cyanSettings.haloCyan || '#00e5ff');
  const haloPink = new THREE.Color(pinkSettings.haloPink || '#ff2d78');
  const voidColor = new THREE.Color(settings?.voidColor || '#040609');

  const pulseSpeed = animSettings.pulseSpeed ?? 0.84;
  const outwardFlowSpeed = animSettings.outwardFlowSpeed ?? 0.30;
  const breathingAmplitude = animSettings.breathingAmplitude ?? 0.09;
  const breathingSpeed = animSettings.breathingSpeed ?? 1.25;
  const glowIntensity = animSettings.glowIntensity ?? 1.08;

  /* ---------- 1. Subtle Inner-Rim Micro-Segment Material ---------- */
  const eclipseFilamentMaterial = new THREE.ShaderMaterial({
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uHover: { value: 0.0 },
      uPulseSpeed: { value: pulseSpeed },
      uCyanIntensity: { value: cyanSettings.intensity || 1.35 },
      uPinkIntensity: { value: pinkSettings.intensity || 1.30 },
      uSectionCalm: { value: 0.0 },
    },
    vertexShader: `
      attribute vec4 aParams; // [theta, length, isTip, phase]
      attribute vec3 aNormal;
      attribute float aAlpha;

      varying vec3 vColor;
      varying float vAlpha;

      uniform float uTime;
      uniform float uPulseSpeed;
      uniform float uSectionCalm;

      #define TWO_PI 6.28318530718

      float signedAngleDiff(float a, float b) {
        return mod(a - b + 9.42477796, TWO_PI) - 3.14159265;
      }

      void main() {
        float theta = aParams.x;
        float pulse1Angle = mod(uTime * uPulseSpeed, TWO_PI);
        float d1 = signedAngleDiff(theta, pulse1Angle);
        float sigma1 = d1 > 0.0 ? 0.24 : 0.72;
        float pulse = exp(-(d1 * d1) / (2.0 * sigma1 * sigma1));

        vColor = color * (1.0 + pulse * 0.55);
        vAlpha = aAlpha * (0.75 + pulse * 0.65) * (1.0 - uSectionCalm * 0.70);

        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        if (vAlpha <= 0.004) discard;
        gl_FragColor = vec4(vColor, clamp(vAlpha, 0.0, 1.0));
      }
    `,
  });

  /* ---------- 2. Atmospheric Corona Halo + Travelling Pulse Glow Material ---------- */
  const eclipseHaloMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    depthTest: true,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uInnerRadius: { value: innerRadius },
      uHaloHalfSize: { value: haloRadius },
      uCyanColor: { value: haloCyan },
      uPinkColor: { value: haloPink },
      uCyanIntensity: { value: (cyanSettings.intensity || 1.35) * glowIntensity },
      uPinkIntensity: { value: (pinkSettings.intensity || 1.30) * glowIntensity },
      uPulseSpeed: { value: pulseSpeed },
      uBreathingSpeed: { value: breathingSpeed },
      uSectionCalm: { value: 0.0 },
    },
    vertexShader: `
      varying vec3 vWorldPos;
      varying vec2 vUv;

      void main() {
        vUv = uv;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: `
      varying vec3 vWorldPos;
      varying vec2 vUv;

      uniform float uTime;
      uniform float uInnerRadius;
      uniform float uHaloHalfSize;
      uniform vec3 uCyanColor;
      uniform vec3 uPinkColor;
      uniform float uCyanIntensity;
      uniform float uPinkIntensity;
      uniform float uPulseSpeed;
      uniform float uBreathingSpeed;
      uniform float uSectionCalm;

      #define PI 3.14159265359
      #define TWO_PI 6.28318530718

      float circDist(float a, float b) {
        float d = abs(a - b);
        return min(d, TWO_PI - d);
      }

      float signedAngleDiff(float a, float b) {
        return mod(a - b + 9.42477796, TWO_PI) - PI;
      }

      void main() {
        vec2 pos = vUv * 2.0 - 1.0;
        vec2 localPos = pos * uHaloHalfSize;
        float r = length(localPos);
        float theta = atan(localPos.y, localPos.x);
        if (theta < 0.0) theta += TWO_PI;

        if (r < uInnerRadius) {
          discard;
        }
        float innerEdge = smoothstep(uInnerRadius, uInnerRadius + 0.025, r);
        float dr = r - uInnerRadius;

        // 1. Primary & Secondary Cyan Flares
        float dDiamond = circDist(theta, 5.52);
        float wDiamond = exp(-pow(dDiamond / 0.40, 2.0));
        float dUpperCyan = circDist(theta, 2.44);
        float wUpperCyan = exp(-pow(dUpperCyan / 0.46, 2.0));
        float cyanWeight = min(1.0, 1.55 * wDiamond + 1.20 * wUpperCyan);

        // 2. Right & Lower Pink Clusters
        float dPinkRight = circDist(theta, 0.42);
        float wPinkRight = exp(-pow(dPinkRight / 0.54, 2.0));
        float dPinkLower = circDist(theta, 4.36);
        float wPinkLower = exp(-pow(dPinkLower / 0.50, 2.0));
        float pinkWeight = min(1.0, 1.30 * wPinkRight + 1.10 * wPinkLower) * (1.0 - 0.85 * wDiamond);

        // 3. Quiet stretches
        float dQuiet1 = circDist(theta, 1.40);
        float wQuiet1 = exp(-pow(dQuiet1 / 0.46, 2.0));
        float dQuiet2 = circDist(theta, 3.40);
        float wQuiet2 = exp(-pow(dQuiet2 / 0.50, 2.0));
        float quietFactor = max(0.08, 1.0 - 0.85 * wQuiet1 - 0.80 * wQuiet2);

        // 4. Travelling activation pulse halos around circumference
        float p1Angle = mod(uTime * uPulseSpeed, TWO_PI);
        float dp1 = signedAngleDiff(theta, p1Angle);
        float sig1 = dp1 > 0.0 ? 0.25 : 0.78;
        float pulse1 = exp(-(dp1 * dp1) / (2.0 * sig1 * sig1));

        float p2Angle = mod(-uTime * uPulseSpeed * 0.76 + 3.14, TWO_PI);
        float dp2 = signedAngleDiff(theta, p2Angle);
        float sig2 = dp2 < 0.0 ? 0.24 : 0.68;
        float pulse2 = exp(-(dp2 * dp2) / (2.0 * sig2 * sig2)) * 0.82;

        float breathe = 1.0 + 0.10 * sin(uTime * uBreathingSpeed + theta * 2.0);
        float innerBloom = exp(-dr / (0.08 * breathe)) * 0.48;
        float midHalo = exp(-dr / (0.34 * breathe)) * 0.26;
        float outerCorona = exp(-dr / 0.95) * 0.08;

        float pulseHalo = (pulse1 + pulse2) * exp(-dr / 0.26) * 0.34;
        float totalHalo = ((innerBloom + midHalo + outerCorona) * quietFactor + pulseHalo) * innerEdge;

        vec3 baseCol = uCyanColor * max(cyanWeight, pulse1 * 0.85) * uCyanIntensity
                     + uPinkColor * max(pinkWeight, pulse2 * 0.85) * uPinkIntensity;
        float diamondCore = (wDiamond + pulse1 * 0.35) * exp(-dr / 0.05);
        baseCol += vec3(0.75, 0.90, 1.0) * diamondCore * 0.32;

        float alpha = clamp(totalHalo * (1.0 - uSectionCalm * 0.70), 0.0, 0.78);
        if (alpha <= 0.003) discard;

        gl_FragColor = vec4(baseCol, alpha);
      }
    `,
  });

  /* ---------- 3. Animated Data Ring Particle Material ---------- */
  const eclipseParticleMaterial = new THREE.ShaderMaterial({
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uInnerRadius: { value: innerRadius },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uHover: { value: 0.0 },
      uPulseSpeed: { value: pulseSpeed },
      uOutwardFlowSpeed: { value: outwardFlowSpeed },
      uBreathingAmplitude: { value: breathingAmplitude },
      uBreathingSpeed: { value: breathingSpeed },
      uGlowIntensity: { value: glowIntensity },
      uSectionCalm: { value: 0.0 },
    },
    vertexShader: `
      attribute vec4 aParams; // [baseTheta, streamLen, dotFrac, phase]
      attribute vec4 aStream; // [startR, curve, speed, baseSize]
      attribute float aBaseAlpha;

      varying vec3 vColor;
      varying float vAlpha;
      varying float vPulseBoost;

      uniform float uTime;
      uniform float uInnerRadius;
      uniform vec2 uPointer;
      uniform float uHover;
      uniform float uPulseSpeed;
      uniform float uOutwardFlowSpeed;
      uniform float uBreathingAmplitude;
      uniform float uBreathingSpeed;
      uniform float uGlowIntensity;
      uniform float uSectionCalm;

      #define PI 3.14159265359
      #define TWO_PI 6.28318530718

      float signedAngleDiff(float a, float b) {
        return mod(a - b + 9.42477796, TWO_PI) - PI;
      }

      void main() {
        float baseTheta = aParams.x;
        float streamLen = aParams.y;
        float dotFrac = aParams.z;
        float phase = aParams.w;

        float startR = aStream.x;
        float curve = aStream.y;
        float speed = aStream.z;
        float baseSize = aStream.w;

        // 1. Continuous staggered outward data flow along curved paths (smooth recycle without popping)
        float flowFrac = fract(dotFrac + uTime * uOutwardFlowSpeed * speed + phase);
        float birthFade = smoothstep(0.0, 0.14, flowFrac);
        float deathFade = 1.0 - smoothstep(0.66, 1.0, flowFrac);
        float flowEnvelope = birthFade * deathFade;

        // 2. Gentle radial breathing (4-6s cycle with local angular variation)
        float breathWave = sin(uTime * uBreathingSpeed - baseTheta * 2.0 + phase * TWO_PI) * 0.65
                         + sin(uTime * uBreathingSpeed * 0.62 + baseTheta * 3.0) * 0.35;
        float breathScale = 1.0 + breathWave * uBreathingAmplitude;
        float breathRadialOffset = breathWave * uBreathingAmplitude * 0.08;

        // 3. Travelling activation pulses around the circumference (~7.5s and ~9.6s)
        float p1Angle = mod(uTime * uPulseSpeed, TWO_PI);
        float dp1 = signedAngleDiff(baseTheta, p1Angle);
        float sig1 = dp1 > 0.0 ? 0.22 : 0.68;
        float pulse1 = exp(-(dp1 * dp1) / (2.0 * sig1 * sig1));

        float p2Angle = mod(-uTime * uPulseSpeed * 0.78 + 3.14159, TWO_PI);
        float dp2 = signedAngleDiff(baseTheta, p2Angle);
        float sig2 = dp2 < 0.0 ? 0.20 : 0.62;
        float pulse2 = exp(-(dp2 * dp2) / (2.0 * sig2 * sig2)) * 0.85;

        float radialPulseAtten = max(0.25, 1.0 - flowFrac * 0.55);
        float pulseBoost = min(1.35, (pulse1 + pulse2) * radialPulseAtten);

        // Compute curved radial position
        float effLen = streamLen * breathScale * (1.0 + pulseBoost * 0.12);
        float r = max(uInnerRadius + 0.008, startR + breathRadialOffset + flowFrac * effLen);
        float theta = baseTheta + (flowFrac * curve) / max(1.0, r) + sin(uTime * 0.45 + phase * TWO_PI) * 0.008;

        vec3 displaced = vec3(r * cos(theta), r * sin(theta), position.z);

        // 4. Pointer interaction: gentle radial & tangential displacement + local brightness boost
        float ptrBoost = 0.0;
        if (uHover > 0.01) {
          float ptrDist = length(displaced.xy - uPointer);
          float reach = 1.15;
          if (ptrDist < reach) {
            float falloff = pow(1.0 - ptrDist / reach, 2.0) * uHover;
            ptrBoost = falloff;
            vec2 dir = normalize(displaced.xy - uPointer + vec2(0.0001));
            vec2 radialDir = vec2(cos(theta), sin(theta));
            displaced.xy += (dir * 0.08 + radialDir * 0.06) * falloff;
          }
        }

        float totalExcite = pulseBoost + ptrBoost * 0.95;
        vPulseBoost = totalExcite;

        // Increase brightness and slightly shift toward hot white-cyan/pink core when pulse passes
        vec3 hotTint = mix(color, vec3(0.95, 0.99, 1.0), min(0.58, totalExcite * 0.42));
        vColor = hotTint * (0.85 + totalExcite * 1.15) * uGlowIntensity;
        vAlpha = clamp(
          aBaseAlpha * flowEnvelope * (0.72 + totalExcite * 0.95) * (1.0 - uSectionCalm * 0.70),
          0.0,
          0.98
        );

        vec4 mvPosition = viewMatrix * modelMatrix * vec4(displaced, 1.0);
        float sizeBoost = 1.0 + pulseBoost * 0.52 + ptrBoost * 0.60;
        gl_PointSize = clamp(baseSize * sizeBoost * (24.0 / -mvPosition.z), 1.2, 8.5);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vAlpha;
      varying float vPulseBoost;

      void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);
        float dist = length(coord);
        if (dist > 0.5 || vAlpha <= 0.004) discard;

        // Distinct crisp dot core + soft local halo so dots stay separated with dark gaps
        float core = smoothstep(0.24, 0.04, dist);
        float halo = smoothstep(0.5, 0.12, dist) * (0.32 + min(0.45, vPulseBoost * 0.30));
        float shape = min(1.0, core + halo);

        vec3 finalCol = mix(vColor, vec3(0.96, 0.99, 1.0), core * min(0.45, vPulseBoost * 0.30));
        gl_FragColor = vec4(finalCol, vAlpha * shape);
      }
    `,
  });

  /* ---------- 4. Void Occlusion Disc Material ---------- */
  const eclipseVoidMaterial = new THREE.MeshBasicMaterial({
    color: voidColor,
    depthWrite: true,
    depthTest: true,
  });

  return {
    eclipseFilamentMaterial,
    eclipseHaloMaterial,
    eclipseParticleMaterial,
    eclipseVoidMaterial,
  };
}

