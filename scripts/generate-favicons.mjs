import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function buildIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + count * dirEntrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(count, 4); // Number of images

  const entries = [];
  for (const { width, height, buffer } of pngBuffers) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(width >= 256 ? 0 : width, 0);
    entry.writeUInt8(height >= 256 ? 0 : height, 1);
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // Size
    entry.writeUInt32LE(offset, 12); // Offset
    entries.push(entry);
    offset += buffer.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers.map((p) => p.buffer)]);
}

async function run() {
  const inputLogo = path.join(rootDir, 'public', 'brand-logo.png');
  if (!fs.existsSync(inputLogo)) {
    throw new Error('public/brand-logo.png not found');
  }

  // 1. Process logo into transparent format
  const { data, info } = await sharp(inputLogo).raw().toBuffer({ resolveWithObject: true });
  const transData = Buffer.from(data);
  for (let i = 0; i < transData.length; i += 4) {
    const r = transData[i], g = transData[i+1], b = transData[i+2];
    if (r > 240 && g > 240 && b > 240) {
      transData[i+3] = 0;
    }
  }

  const logoTrans = await sharp(transData, {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    .resize(450, 450, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // Create rounded-rect white SVG badge mask (for maximum contrast on dark & light tabs)
  const roundedWhiteSvg = Buffer.from(`
    <svg width="512" height="512">
      <rect width="512" height="512" rx="96" fill="#ffffff"/>
    </svg>
  `);

  const badgeMaster = await sharp(roundedWhiteSvg)
    .composite([{ input: logoTrans, gravity: 'center' }])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(rootDir, 'public', 'macnel-brand-badge.png'), badgeMaster);

  // 2. Generate multi-size ICO (16x16, 32x32, 48x48)
  const sizes = [16, 32, 48];
  const pngBuffers = [];
  for (const s of sizes) {
    const buf = await sharp(badgeMaster).resize(s, s).png().toBuffer();
    pngBuffers.push({ width: s, height: s, buffer: buf });
  }

  const icoBuffer = buildIco(pngBuffers);
  fs.writeFileSync(path.join(rootDir, 'src', 'app', 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(rootDir, 'public', 'favicon.ico'), icoBuffer);
  console.log('✓ Generated favicon.ico (16, 32, 48)');

  // 3. Generate icon.png (96x96)
  const iconPng = await sharp(badgeMaster).resize(96, 96).png().toBuffer();
  fs.writeFileSync(path.join(rootDir, 'src', 'app', 'icon.png'), iconPng);
  fs.writeFileSync(path.join(rootDir, 'public', 'icon.png'), iconPng);
  console.log('✓ Generated icon.png (96x96)');

  // 4. Generate apple-icon.png (180x180)
  const appleIcon = await sharp(badgeMaster).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(rootDir, 'src', 'app', 'apple-icon.png'), appleIcon);
  fs.writeFileSync(path.join(rootDir, 'public', 'apple-touch-icon.png'), appleIcon);
  console.log('✓ Generated apple-icon.png (180x180)');

  // 5. Generate PWA icons
  const pwa192 = await sharp(badgeMaster).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(rootDir, 'public', 'icon-192.png'), pwa192);

  const pwa512 = await sharp(badgeMaster).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(rootDir, 'public', 'icon-512.png'), pwa512);
  console.log('✓ Generated icon-192.png and icon-512.png');

  // 6. Generate SVG icon embedding the crisp badge image
  const base64Data = badgeMaster.toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image href="data:image/png;base64,${base64Data}" width="512" height="512"/>
</svg>`;
  fs.writeFileSync(path.join(rootDir, 'src', 'app', 'icon.svg'), svgContent);
  fs.writeFileSync(path.join(rootDir, 'public', 'icon.svg'), svgContent);
  console.log('✓ Generated icon.svg');
}

run().catch((err) => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
