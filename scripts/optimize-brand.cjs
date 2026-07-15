const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const BRAND_DIR = path.join(__dirname, '..', 'public', 'brand');

async function optimize() {
  fs.mkdirSync(BRAND_DIR, { recursive: true });

  // Avatar (navbar — small but retina-ready). Resize to 192px (sharp at 2x for 96px max).
  const avatarSrc = path.join(BRAND_DIR, 'avatar-portrait.png');
  if (fs.existsSync(avatarSrc)) {
    await sharp(avatarSrc)
      .resize(192, 192, { fit: 'cover' })
      .png({ quality: 88, compressionLevel: 9 })
      .toFile(avatarSrc + '.tmp');
    fs.renameSync(avatarSrc + '.tmp', avatarSrc);
    await sharp(avatarSrc).webp({ quality: 82 }).toFile(avatarSrc.replace('.png', '.webp'));
    console.log('avatar-portrait optimized');
  }

  // Brand logo (hero — up to 240px). Resize to 480px to cover 2x retina.
  const logoSrc = path.join(BRAND_DIR, 'brand-logo.png');
  if (fs.existsSync(logoSrc)) {
    await sharp(logoSrc)
      .resize(480, 480, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png({ quality: 88, compressionLevel: 9 })
      .toFile(logoSrc + '.tmp');
    fs.renameSync(logoSrc + '.tmp', logoSrc);
    await sharp(logoSrc).webp({ quality: 85 }).toFile(logoSrc.replace('.png', '.webp'));
    console.log('brand-logo optimized');
  }
}

optimize().catch((err) => { console.error(err); process.exit(1); });
