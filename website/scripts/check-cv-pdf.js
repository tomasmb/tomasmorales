/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const pdfPath = path.join(__dirname, '../public/cv_tomas_morales.pdf');

if (fs.existsSync(pdfPath)) {
  console.log('✅ CV PDF already exists, skipping generation');
  process.exit(0);
} else {
  console.log('⚠️  CV PDF not found, generating...');
  try {
    execSync('npm run generate:cv', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Failed to generate CV PDF');
    process.exit(1);
  }
}
