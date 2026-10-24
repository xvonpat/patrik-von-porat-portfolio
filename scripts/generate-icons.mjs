// Generates the vonporat.com favicon set from the PvP mark.
// Design: the mark in an aurora gradient (purple → cyan) on an obsidian rounded tile.
// Run with: node scripts/generate-icons.mjs
import sharp from 'sharp';
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const MARK = path.join(ROOT, 'public/images/brand/pvp-mark.png');

const OBSIDIAN = '#0b0c10';
const GRADIENT = ['#a855f7', '#5ee6e6'];
// Small sizes get brighter ends and a thicker mark so the gradient stays readable.
const GRADIENT_SMALL = ['#c084fc', '#67f0f0'];

const SS = 8; // supersampling factor

async function markAlpha(width, thicken) {
  let img = sharp(MARK).resize({ width }).ensureAlpha().extractChannel('alpha');
  if (thicken > 0) {
    // Blur, then push the soft edge back up to opaque: a cheap dilation of the strokes.
    img = sharp(await img.png().toBuffer()).blur(thicken).linear(2.2, -40);
  }
  // Force a single channel: re-encoded masks can come back as RGB.
  return img.extractChannel(0).raw().toBuffer({ resolveWithObject: true });
}

async function gradientMark(width, colors, thicken) {
  const { data, info } = await markAlpha(width, thicken);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${info.width}" height="${info.height}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${colors[0]}"/><stop offset="1" stop-color="${colors[1]}"/>
    </linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`;
  // Two passes: in a single pipeline sharp applies removeAlpha after joinChannel.
  const rgb = await sharp(Buffer.from(svg)).removeAlpha().raw().toBuffer();
  return sharp(rgb, { raw: { width: info.width, height: info.height, channels: 3 } })
    .joinChannel(data, { raw: { width: info.width, height: info.height, channels: 1 } })
    .png()
    .toBuffer();
}

/**
 * @param {number} size   output size in px
 * @param {object} o
 * @param {'rounded'|'square'} o.shape  rounded tile, or full square (Apple and maskable add their own mask)
 * @param {number} o.scale  mark width as a share of the tile
 */
async function renderIcon(size, { shape = 'rounded', scale = 0.78 } = {}) {
  const small = size <= 32;
  const S = size * SS;
  const radius = shape === 'rounded' ? S * 0.22 : 0;
  const tile = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}"><rect width="${S}" height="${S}" rx="${radius}" ry="${radius}" fill="${OBSIDIAN}"/></svg>`
  );
  const markScale = small ? Math.min(0.9, scale + 0.1) : scale;
  const thicken = size <= 16 ? SS * 0.55 : size <= 32 ? SS * 0.3 : 0;
  const mark = await gradientMark(Math.round(S * markScale), small ? GRADIENT_SMALL : GRADIENT, thicken);
  const meta = await sharp(mark).metadata();
  const big = await sharp(tile)
    .composite([{ input: mark, left: Math.round((S - meta.width) / 2), top: Math.round((S - meta.height) / 2) }])
    .png()
    .toBuffer();
  return sharp(big).resize(size, size, { kernel: 'lanczos3' }).png({ compressionLevel: 9 }).toBuffer();
}

// Minimal ICO writer with PNG-encoded entries (supported by all current browsers).
function buildIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);
  const dir = Buffer.alloc(16 * entries.length);
  let offset = 6 + dir.length;
  entries.forEach(({ size, png }, i) => {
    const o = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, o);
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1);
    dir.writeUInt8(0, o + 2);
    dir.writeUInt8(0, o + 3);
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(png.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += png.length;
  });
  return Buffer.concat([header, dir, ...entries.map((e) => e.png)]);
}

const out = async (rel, buf) => {
  const file = path.join(ROOT, rel);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, buf);
  console.log(`${rel}  ${buf.length} bytes`);
};

const ico = await Promise.all([16, 32, 48].map(async (size) => ({ size, png: await renderIcon(size) })));
await out('src/app/favicon.ico', buildIco(ico));

// Modern browsers: crisp PNG icon (picked from <link rel="icon">).
await out('src/app/(app)/icon.png', await renderIcon(512));
// Apple touch icon: full-bleed square, iOS rounds the corners itself.
await out('src/app/(app)/apple-icon.png', await renderIcon(180, { shape: 'square', scale: 0.7 }));
// Web app manifest icons.
await out('public/icons/icon-192.png', await renderIcon(192));
await out('public/icons/icon-512.png', await renderIcon(512));
// Maskable: full-bleed, mark kept inside the 80% safe zone.
await out('public/icons/icon-maskable-512.png', await renderIcon(512, { shape: 'square', scale: 0.56 }));
