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
  const innerRadius = settings?.eclipseGeometry?.innerRadiusDesktop || 1.36;
  const haloRadius = settings?.eclipseGeometry?.haloRadiusDesktop || 3.6;

  const electricCyan = new THREE.Color(cyanSettings.electricCyan || '#00f0ff');
  const cyanHighlight = new THREE.Color(cyanSettings.cyanHighlight || '#f0fdfa');
  const haloCyan = new THREE.Color(cyanSettings.haloCyan || '#00e5ff');

  const vividPink = new THREE.Color(pinkSettings.vividPink || '#f43f5e');
  const pinkHighlight = new THREE.Color(pinkSettings.magentaHighlight || '#ffe4e6');
  const haloPink = new THREE.Color(pinkSettings.haloPink || '#ff2d78');

  const voidColor = new THREE.Color(settings?.voidColor || '#040609');

  /* ---------- 1. Radial Filament Line Material ---------- */
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
      uCyanIntensity: { value: cyanSettings.intensity || 1.35 },
      uPinkIntensity: { value: pinkSettings.intensity || 1.30 },
      uSectionCalm: { value: 0.0 },
    },
    vertexShader: `
      attribute vec4 aParams; // [theta, length, isTip, phase]
      attribute vec3 aNormal; // unit radial direction [cosT, sinT, 0]
      attribute float aAlpha; // per-vertex alpha (root vs tip)

      varying vec3 vColor;
      varying float vAlpha;

      uniform float uTime;
      uniform vec2 uPointer;
      uniform float uHover;
      uniform float uSectionCalm;

      void main() {
        float theta = aParams.x;
        float lengthVal = aParams.y;
        float isTip = aParams.z;
        float phase = aParams.w;

        // Animated traveling light waves along circumference
        float wave1 = sin(uTime * 1.5 - theta * 3.0 + phase * 6.28);
        float wave2 = sin(uTime * 2.4 + theta * 4.0);
        float pulse = smoothstep(0.45, 1.0, wave1) * 0.30 + smoothstep(0.75, 1.0, wave2) * 0.20;

        // Subtle radial breathing
        float breathe = sin(uTime * 1.2 + phase * 6.28) * 0.018 * lengthVal;

        // Pointer proximity deflection and attraction
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        float ptrDist = length(worldPos.xy - uPointer);
        float ptrAttract = smoothstep(2.4, 0.3, ptrDist) * uHover;

        // Displace tip outwards and slightly toward pointer
        vec3 displaced = position;
        if (isTip > 0.5) {
          displaced += aNormal * (breathe + pulse * 0.04 * lengthVal);
          vec2 toPtr = uPointer - worldPos.xy;
          displaced.xy += toPtr * ptrAttract * 0.12;
        }

        vColor = color * (1.0 + pulse * 0.25 + ptrAttract * 0.20);
        vAlpha = aAlpha * (1.0 + pulse * 0.25) * (1.0 - uSectionCalm * 0.70);

        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(displaced, 1.0);
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

  /* ---------- 2. Atmospheric Corona Halo Material ---------- */
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
      uCyanIntensity: { value: cyanSettings.intensity || 1.35 },
      uPinkIntensity: { value: pinkSettings.intensity || 1.30 },
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
      uniform float uSectionCalm;

      #define PI 3.14159265359
      #define TWO_PI 6.28318530718

      float circDist(float a, float b) {
        float d = abs(a - b);
        return min(d, TWO_PI - d);
      }

      void main() {
        // Calculate radius and angle in local model space centered at (0,0)
        vec2 pos = vUv * 2.0 - 1.0;
        vec2 localPos = pos * uHaloHalfSize;
        float r = length(localPos);
        float theta = atan(localPos.y, localPos.x);
        if (theta < 0.0) theta += TWO_PI;

        // Completely mask the dark interior void with smooth micro-feather
        if (r < uInnerRadius) {
          discard;
        }
        float innerEdge = smoothstep(uInnerRadius, uInnerRadius + 0.02, r);
        float dr = r - uInnerRadius;

        // 1. Diamond Cyan Flare at lower-right (~316° / 5.52 rad)
        float dDiamond = circDist(theta, 5.52);
        float wDiamond = exp(-pow(dDiamond / 0.40, 2.0));

        // 2. Secondary Upper-Left Cyan Flare (~140° / 2.44 rad)
        float dUpperCyan = circDist(theta, 2.44);
        float wUpperCyan = exp(-pow(dUpperCyan / 0.46, 2.0));

        float cyanWeight = min(1.0, 1.55 * wDiamond + 1.20 * wUpperCyan);

        // 3. Right Vivid Pink Cluster (~24° / 0.42 rad)
        float dPinkRight = circDist(theta, 0.42);
        float wPinkRight = exp(-pow(dPinkRight / 0.54, 2.0));

        // 4. Lower-Arc Pink Cluster (~250° / 4.36 rad)
        float dPinkLower = circDist(theta, 4.36);
        float wPinkLower = exp(-pow(dPinkLower / 0.50, 2.0));

        float pinkWeight = min(1.0, 1.30 * wPinkRight + 1.10 * wPinkLower) * (1.0 - 0.85 * wDiamond);

        // 5. Distinct Dark / Quiet stretches
        float dQuiet1 = circDist(theta, 1.40);
        float wQuiet1 = exp(-pow(dQuiet1 / 0.46, 2.0));
        float dQuiet2 = circDist(theta, 3.40);
        float wQuiet2 = exp(-pow(dQuiet2 / 0.50, 2.0));
        float quietFactor = max(0.06, 1.0 - 0.88 * wQuiet1 - 0.82 * wQuiet2);

        // Multi-tier radial exponential falloffs (ethereal, deep, rich atmospheric corona)
        float innerBloom = exp(-dr / 0.08) * 0.55;
        float midHalo = exp(-dr / 0.32) * 0.28;
        float outerCorona = exp(-dr / 0.95) * 0.08;

        // Subtle radial streamer rays in the light scattering
        float rayNoise = 0.88 + 0.12 * sin(theta * 28.0 + uTime * 0.15) + 0.08 * cos(theta * 53.0 - uTime * 0.1);

        float totalHalo = (innerBloom + midHalo + outerCorona) * rayNoise * quietFactor * innerEdge;

        // Color blending with saturated electric cyan & vivid pink halos
        vec3 col = uCyanColor * cyanWeight * uCyanIntensity + uPinkColor * pinkWeight * uPinkIntensity;
        // Diamond flare white-hot highlight core
        float diamondCore = wDiamond * exp(-dr / 0.05);
        col += vec3(0.75, 0.88, 1.0) * diamondCore * 0.40;

        // Subtle traveling pulse
        float pulse = sin(uTime * 1.4 - theta * 2.0) * 0.07;
        totalHalo *= (1.0 + pulse);

        float alpha = clamp(totalHalo * (1.0 - uSectionCalm * 0.70), 0.0, 0.80);
        if (alpha <= 0.003) discard;

        gl_FragColor = vec4(col, alpha);
      }
    `,
  });

  /* ---------- 3. Cosmic Dust & Bead Particle Material ---------- */
  const eclipseParticleMaterial = new THREE.ShaderMaterial({
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uInnerRadius: { value: innerRadius },
      uCyanIntensity: { value: cyanSettings.intensity || 1.35 },
      uPinkIntensity: { value: pinkSettings.intensity || 1.30 },
      uSectionCalm: { value: 0.0 },
    },
    vertexShader: `
      attribute vec4 aParams; // [theta, radius, phase, size]
      varying vec3 vColor;
      varying float vAlpha;

      uniform float uTime;
      uniform float uInnerRadius;
      uniform float uSectionCalm;

      void main() {
        float theta = aParams.x;
        float r = aParams.y;
        float phase = aParams.z;
        float baseSize = aParams.w;

        // Gentle orbital & radial drift
        float currentTheta = theta + sin(uTime * 0.25 + phase * 6.28) * 0.025;
        float currentR = r + cos(uTime * 0.35 + phase * 6.28) * 0.03;

        vec3 displaced = vec3(currentR * cos(currentTheta), currentR * sin(currentTheta), position.z);

        // Twinkling shimmer with distance-based attenuation
        float twinkle = 0.65 + 0.35 * sin(uTime * 2.2 + phase * 12.56);
        float distFalloff = max(0.12, 1.0 - (r - uInnerRadius) / 2.3);

        vColor = color;
        vAlpha = twinkle * distFalloff * (1.0 - uSectionCalm * 0.70);

        vec4 mvPosition = viewMatrix * modelMatrix * vec4(displaced, 1.0);
        gl_PointSize = clamp(baseSize * (22.0 / -mvPosition.z) * twinkle, 1.0, 4.0);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);
        float dist = length(coord);
        if (dist > 0.5) discard;

        float softEdge = smoothstep(0.5, 0.06, dist);
        gl_FragColor = vec4(vColor, vAlpha * softEdge);
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

