/**
 * Generates placeholder images: flat brand-blue blocks with the target
 * filename printed on them, per the design brief. Rerun with `pnpm placeholders`.
 * All outputs are TODO(stakeholder) swap targets.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = path.join(root, 'public');

const BLUE = '#1D5F82';
const INK = '#0B0D10';

function svgBlock({ width, height, label, sublabel = '', bg = BLUE }) {
  const fontSize = Math.round(Math.min(width, height) / 14);
  return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${bg}"/>
  <rect x="0" y="${height - 6}" width="${width}" height="6" fill="${INK}" opacity="0.35"/>
  <text x="50%" y="48%" text-anchor="middle" font-family="Menlo, Consolas, monospace"
        font-size="${fontSize}" fill="#F5F7F8">${label}</text>
  ${
    sublabel
      ? `<text x="50%" y="58%" text-anchor="middle" font-family="Menlo, Consolas, monospace"
        font-size="${Math.round(fontSize * 0.6)}" fill="#F5F7F8" opacity="0.7">${sublabel}</text>`
      : ''
  }
</svg>`);
}

async function jpeg(file, opts) {
  const out = path.join(pub, file);
  await mkdir(path.dirname(out), { recursive: true });
  await sharp(svgBlock({ ...opts, label: opts.label ?? `/${file}` }))
    .jpeg({ quality: 80 })
    .toFile(out);
  console.log('wrote', file);
}

// Hero: darker gradient-friendly block.
await jpeg('hero.jpg', {
  width: 1600,
  height: 1200,
  bg: '#14181E',
  label: '/hero.jpg',
  sublabel: 'TODO(stakeholder): truck photo, front three-quarter, dusk',
});

// OG card 1200×630.
await jpeg('og.jpg', {
  width: 1200,
  height: 630,
  label: 'AVANGARD EXPRESS INC',
  sublabel: 'TODO(stakeholder): real OG image /og.jpg',
});

// Static map placeholder.
await jpeg('map.jpg', {
  width: 1200,
  height: 600,
  bg: '#14181E',
  label: '/map.jpg',
  sublabel: 'TODO(stakeholder): static map tile of the office',
});

// Fleet photos.
for (let i = 1; i <= 6; i++) {
  const file = `fleet/fleet-0${i}.jpg`;
  await jpeg(file, { width: 1200, height: 900, label: `/${file}` });
}
