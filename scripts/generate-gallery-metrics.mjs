/**
 * Generates src/data/gallery-file-manifest.json
 *
 * - Records the byte size of every image file under public/images, keyed by its public URL path.
 * - Records filename history by parsing rename migrations (UPDATE ... "filename" = 'new' ... WHERE "filename" = 'old').
 *
 * Runs automatically before `npm run build` (prebuild) so the Payload admin
 * "Gallery Storage Metrics" view works on Vercel, where public/ is not on the
 * serverless filesystem.
 */
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const MIGRATIONS_DIR = path.join(ROOT, 'src', 'migrations');
const OUTPUT = path.join(ROOT, 'src', 'data', 'gallery-file-manifest.json');
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);

function walk(dir, out = {}) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
    } else if (IMAGE_EXT.has(path.extname(entry.name).toLowerCase())) {
      const urlPath = '/' + path.relative(PUBLIC_DIR, full).split(path.sep).join('/');
      out[urlPath] = fs.statSync(full).size;
    }
  }
  return out;
}

function parseFilenameHistory() {
  const history = {};
  if (!fs.existsSync(MIGRATIONS_DIR)) return history;
  const files = fs.readdirSync(MIGRATIONS_DIR).filter((f) => f.endsWith('.ts')).sort();
  const pattern = /UPDATE\s+"gallery_images"\s+SET[\s\S]*?"filename"\s*=\s*'([^']+)'[\s\S]*?WHERE\s+"filename"\s*=\s*'([^']+)'/g;

  for (const file of files) {
    const content = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf8');
    const upSection = content.split(/export\s+async\s+function\s+down/)[0];
    for (const statement of upSection.split(';')) {
      pattern.lastIndex = 0;
      const match = pattern.exec(statement);
      if (!match) continue;
      const [, newName, oldName] = match;
      if (newName === oldName) continue;
      // Key by the new image URL when available, since the same filename can exist in several albums.
      const urlMatch = /"image_url"\s*=\s*'([^']+)'/.exec(statement);
      const key = urlMatch ? urlMatch[1] : newName;
      const oldKey = urlMatch ? urlMatch[1].replace(newName, oldName) : oldName;
      // Follow chains: if the old entry was itself a rename target, keep the earliest original.
      history[key] = history[oldKey] || oldName;
      if (oldKey !== key && history[oldKey]) delete history[oldKey];
    }
  }
  return history;
}

const manifest = {
  generatedAt: new Date().toISOString(),
  files: walk(IMAGES_DIR),
  filenameHistory: parseFilenameHistory(),
};

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, JSON.stringify(manifest, null, 2) + '\n', 'utf8');

console.log(
  `Gallery manifest: ${Object.keys(manifest.files).length} image files, ${Object.keys(manifest.filenameHistory).length} renamed entries -> ${path.relative(ROOT, OUTPUT)}`,
);
