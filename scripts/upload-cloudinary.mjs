import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const dataDir = path.join(rootDir, 'data');
const mapFilePath = path.join(dataDir, 'cloudinaryImages.json');

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'dgaiqqh7k';
const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET || 'renovation_preset';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.ico']);

const MIME_MAP = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function getAllImageFiles(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllImageFiles(fullPath, fileList);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (IMAGE_EXTENSIONS.has(ext)) {
        fileList.push(fullPath);
      }
    }
  }
  return fileList;
}

function cleanFolder(dirRel) {
  if (!dirRel || dirRel === '.' || dirRel === '') return 'renovation-contractor-sg/root';
  const clean = dirRel.replace(/\\/g, '/').replace(/[^a-zA-Z0-9_\-\/]/g, '_');
  return `renovation-contractor-sg/${clean}`;
}

async function uploadSingleFile(filePath, index, total, existingMap) {
  const relPath = path.relative(publicDir, filePath).replace(/\\/g, '/');
  const webPath = '/' + relPath;
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);
  const dirRel = path.dirname(relPath);
  const folder = cleanFolder(dirRel);

  // Skip if already uploaded and not forced
  if (existingMap && existingMap[webPath] && !process.argv.includes('--force')) {
    console.log(`[${index + 1}/${total}] Skipped (already mapped): ${webPath}`);
    return existingMap[webPath];
  }

  const mimeType = MIME_MAP[ext] || 'image/jpeg';
  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer], { type: mimeType });

  let attempts = 0;
  while (attempts < 3) {
    attempts++;
    try {
      const formData = new FormData();
      formData.append('upload_preset', UPLOAD_PRESET);
      formData.append('folder', folder);
      formData.append('file', blob, fileName);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      console.log(`[${index + 1}/${total}] Uploaded: ${webPath} -> ${data.secure_url}`);

      return {
        localPath: webPath,
        cloudinaryUrl: data.secure_url,
        publicId: data.public_id,
        format: data.format || ext.replace('.', ''),
        bytes: data.bytes,
        width: data.width || null,
        height: data.height || null,
        uploadedAt: data.created_at || new Date().toISOString(),
      };
    } catch (err) {
      console.warn(`[${index + 1}/${total}] (Attempt ${attempts}/3) Failed ${webPath}: ${err.message}`);
      if (attempts >= 3) {
        return {
          localPath: webPath,
          error: err.message,
        };
      }
      await new Promise(r => setTimeout(r, 1000 * attempts));
    }
  }
}

// Controlled concurrency
async function mapConcurrent(items, limit, fn) {
  const results = new Array(items.length);
  let currentIndex = 0;

  async function worker() {
    while (currentIndex < items.length) {
      const idx = currentIndex++;
      results[idx] = await fn(items[idx], idx, items.length);
    }
  }

  const workers = Array.from({ length: Math.min(limit, items.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

async function main() {
  console.log('==================================================');
  console.log('       Cloudinary Image Uploader (SG Renovation)  ');
  console.log('==================================================');
  console.log(`Cloud Name    : ${CLOUD_NAME}`);
  console.log(`Upload Preset : ${UPLOAD_PRESET}`);
  console.log(`Source Folder : ${publicDir}\n`);

  if (!fs.existsSync(publicDir)) {
    console.error(`Directory not found: ${publicDir}`);
    process.exit(1);
  }

  const files = getAllImageFiles(publicDir);
  console.log(`Found ${files.length} images to upload.\n`);

  let existingData = { urlMap: {}, images: [] };
  if (fs.existsSync(mapFilePath)) {
    try {
      existingData = JSON.parse(fs.readFileSync(mapFilePath, 'utf-8'));
    } catch (e) {
      // ignore
    }
  }
  const existingMap = {};
  if (Array.isArray(existingData.images)) {
    for (const img of existingData.images) {
      if (img.cloudinaryUrl) {
        existingMap[img.localPath] = img;
      }
    }
  }

  // Upload with concurrency of 5
  const uploadResults = await mapConcurrent(files, 5, (file, idx, total) =>
    uploadSingleFile(file, idx, total, existingMap)
  );

  const successfulUploads = uploadResults.filter(r => r && r.cloudinaryUrl);
  const failedUploads = uploadResults.filter(r => r && r.error);

  const urlMap = {};
  for (const item of successfulUploads) {
    urlMap[item.localPath] = item.cloudinaryUrl;
  }

  const outputData = {
    uploadedAt: new Date().toISOString(),
    cloudName: CLOUD_NAME,
    uploadPreset: UPLOAD_PRESET,
    totalImages: files.length,
    successCount: successfulUploads.length,
    failedCount: failedUploads.length,
    urlMap,
    images: successfulUploads,
  };

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(mapFilePath, JSON.stringify(outputData, null, 2), 'utf-8');

  console.log('\n==================================================');
  console.log('                UPLOAD COMPLETE                   ');
  console.log('==================================================');
  console.log(`Total Scanned : ${files.length}`);
  console.log(`Successfully Uploaded : ${successfulUploads.length}`);
  console.log(`Failed : ${failedUploads.length}`);
  console.log(`Mapping saved to: ${mapFilePath}`);
}

main().catch(err => {
  console.error('Fatal error during upload:', err);
  process.exit(1);
});
