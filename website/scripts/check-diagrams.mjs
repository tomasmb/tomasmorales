import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function checkDiagrams() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 1024 } });
  const page = await context.newPage();

  // Listen to console messages
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  const projects = ['crypto-arbitrage-bot', 'ztudia', 'tradesilike'];

  for (const project of projects) {
    console.log(`\n\nChecking ${project}...`);
    await page.goto(`http://localhost:3001/en/projects/${project}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Find the diagram container (has the specific styling classes)
    const diagramContainer = page.locator('div.p-6.md\\:p-8.border');
    const containerExists = await diagramContainer.count();

    console.log(`Found ${containerExists} diagram containers`);

    if (containerExists > 0) {
      // Get the SVG inside the diagram container
      const diagramSvg = diagramContainer.locator('svg');
      const svgExists = await diagramSvg.count();

      if (svgExists > 0) {
        const svgBox = await diagramSvg.boundingBox();
        console.log('SVG bounding box:', svgBox);

        // Take screenshot of the whole container
        await diagramContainer.screenshot({
          path: join(__dirname, `../public/screenshots/${project}-section.png`)
        });
        console.log(`✓ Section screenshot saved for ${project}`);

        // Also take just the SVG
        await diagramSvg.screenshot({
          path: join(__dirname, `../public/screenshots/${project}-diagram.png`)
        });
        console.log(`✓ SVG screenshot saved for ${project}`);

        // Check for overflow
        const containerBox = await diagramContainer.boundingBox();
        console.log('Container bounding box:', containerBox);

        if (svgBox && containerBox) {
          const hasOverflow = svgBox.width > containerBox.width || svgBox.height > containerBox.height;
          console.log(`Overflow detected: ${hasOverflow}`);
          if (hasOverflow) {
            console.log(`  SVG: ${svgBox.width}x${svgBox.height}`);
            console.log(`  Container: ${containerBox.width}x${containerBox.height}`);
          }
        }

        // Check if SVG is centered
        if (svgBox && containerBox) {
          const svgCenterX = svgBox.x + svgBox.width / 2;
          const containerCenterX = containerBox.x + containerBox.width / 2;
          const centerOffset = Math.abs(svgCenterX - containerCenterX);
          console.log(`Center offset: ${centerOffset.toFixed(2)}px`);
          console.log(`Centered: ${centerOffset < 5 ? 'Yes' : 'No (should adjust)'}`);
        }
      } else {
        console.log(`✗ No SVG found in diagram container for ${project}`);
      }
    } else {
      console.log(`✗ No diagram container found for ${project}`);
    }
  }

  await browser.close();
}

checkDiagrams().catch(console.error);
