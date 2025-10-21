/* eslint-disable @typescript-eslint/no-require-imports */
const { mdToPdf } = require('md-to-pdf');
const path = require('path');
const fs = require('fs');

async function generateCV() {
  const inputPath = path.join(__dirname, '../public/cv_oct_8_f.md');
  const outputPath = path.join(__dirname, '../public/cv_tomas_morales.pdf');

  // Create temporary CSS file
  const cssPath = path.join(__dirname, '../public/cv-styles.css');
  const cssContent = `
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 11pt;
  line-height: 1.6;
  color: #333;
  max-width: 800px;
  margin: 0 auto;
}
h1 {
  font-size: 24pt;
  margin-bottom: 8pt;
  color: #000;
}
h2 {
  font-size: 16pt;
  margin-top: 16pt;
  margin-bottom: 8pt;
  color: #000;
  border-bottom: 2px solid #000;
  padding-bottom: 4pt;
}
h3 {
  font-size: 13pt;
  margin-top: 12pt;
  margin-bottom: 6pt;
  color: #000;
}
p {
  margin: 6pt 0;
}
ul {
  margin: 6pt 0;
  padding-left: 20pt;
}
li {
  margin: 4pt 0;
}
strong {
  font-weight: 600;
  color: #000;
}
a {
  color: #0066cc;
  text-decoration: none;
}
hr {
  border: none;
  border-top: 1px solid #ccc;
  margin: 12pt 0;
}
`;

  try {
    console.log('Converting CV from markdown to PDF...');

    // Write CSS file
    fs.writeFileSync(cssPath, cssContent);

    await mdToPdf(
      { path: inputPath },
      {
        dest: outputPath,
        pdf_options: {
          format: 'A4',
          margin: {
            top: '20mm',
            right: '20mm',
            bottom: '20mm',
            left: '20mm',
          },
          printBackground: true,
        },
        stylesheet: cssPath,
      }
    );

    // Clean up CSS file
    fs.unlinkSync(cssPath);

    console.log('✅ CV PDF generated successfully at:', outputPath);
  } catch (error) {
    // Clean up CSS file even if there's an error
    if (fs.existsSync(cssPath)) {
      fs.unlinkSync(cssPath);
    }
    console.error('❌ Error generating CV PDF:', error);
    process.exit(1);
  }
}

generateCV();
