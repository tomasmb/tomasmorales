const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateOGImage() {
  const width = 1200;
  const height = 630;

  // Read the source image
  const photoPath = path.join(__dirname, '../public/tomas_web.jpg');
  const outputPath = path.join(__dirname, '../public/og-image.jpg');

  // Create a gradient background with modern colors
  const bgSvg = `
    <svg width="${width}" height="${height}">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0a0a0a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad)"/>
    </svg>
  `;

  // Process the photo: circular crop
  const photoSize = 320;
  const photo = await sharp(photoPath)
    .resize(photoSize, photoSize, {
      fit: 'cover',
      position: 'center'
    })
    .toBuffer();

  // Create circular mask
  const circleSvg = `
    <svg width="${photoSize}" height="${photoSize}">
      <circle cx="${photoSize/2}" cy="${photoSize/2}" r="${photoSize/2}" fill="white"/>
    </svg>
  `;

  const circularPhoto = await sharp(photo)
    .composite([{
      input: Buffer.from(circleSvg),
      blend: 'dest-in'
    }])
    .toBuffer();

  // Text overlay
  const textSvg = `
    <svg width="${width}" height="${height}">
      <style>
        .title {
          fill: #ffffff;
          font-size: 64px;
          font-weight: 700;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        .subtitle {
          fill: #a3a3a3;
          font-size: 36px;
          font-weight: 400;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      </style>
      <text x="520" y="280" class="title">Tomas Morales</text>
      <text x="520" y="340" class="subtitle">AI Product Engineer</text>
    </svg>
  `;

  // Composite everything
  await sharp(Buffer.from(bgSvg))
    .composite([
      {
        input: circularPhoto,
        top: Math.floor((height - photoSize) / 2),
        left: 120
      },
      {
        input: Buffer.from(textSvg),
        top: 0,
        left: 0
      }
    ])
    .jpeg({ quality: 90 })
    .toFile(outputPath);

  console.log('✅ OG image generated successfully!');

  // Get file size
  const stats = fs.statSync(outputPath);
  console.log(`📦 File size: ${Math.round(stats.size / 1024)}KB`);
}

generateOGImage().catch(console.error);
