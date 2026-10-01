const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const targets = [
  { name: '01-index-picker-1280.png', url: 'http://localhost:8085/index.html', size: '1280,900' },
  { name: '02-coulomb-step1-1280.png', url: 'http://localhost:8085/index.html?course=inverse-square#course', size: '1280,900' },
  { name: '03-coulomb-parameters-1280.png', url: 'http://localhost:8085/index.html?course=inverse-square&step=inverse-parameters#course', size: '1280,900' },
  { name: '04-charging-deviations-1280.png', url: 'http://localhost:8085/index.html?course=capacitor-exponential&step=charging-deviations#course', size: '1280,900' },
  { name: '05-selbst-auswerten-1280.png', url: 'http://localhost:8085/selbst-auswerten.html', size: '1280,900' },
  { name: '06-dokumentation-model-1280.png', url: 'http://localhost:8085/dokumentation.html?course=proportional-linear&section=deviations', size: '1280,900' },
  { name: '07-dokumentation-practice-1280.png', url: 'http://localhost:8085/dokumentation.html?course=capacitor-exponential&section=physical', size: '1280,900' },
  { name: '08-groesster-einzelfehler-1280.png', url: 'http://localhost:8085/groesster-einzelfehler.html', size: '1280,900' },
  { name: '09-mobile-375.png', url: 'http://localhost:8085/index.html?course=inverse-square#course', size: '375,812' },
  { name: '10-tablet-split-512.png', url: 'http://localhost:8085/selbst-auswerten.html', size: '512,768' },
  { name: '11-tablet-portrait-768.png', url: 'http://localhost:8085/index.html?course=inverse-square#course', size: '768,1024' },
  { name: '12-medium-width-980.png', url: 'http://localhost:8085/index.html?course=inverse-square#course', size: '980,900' },
  { name: '13-rail-stack-1080.png', url: 'http://localhost:8085/index.html?course=inverse-square#course', size: '1080,900' }
];

const results = [];
for (const t of targets) {
  const filePath = path.resolve('scratch', t.name);
  try {
    execFileSync(chromePath, [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      `--window-size=${t.size}`,
      `--screenshot=${filePath}`,
      t.url
    ], { timeout: 15000 });
    const stat = fs.statSync(filePath);
    results.push({ name: t.name, size: t.size, bytes: stat.size, ok: true });
    console.log(`Captured ${t.name} (${t.size}): ${stat.size} bytes`);
  } catch (err) {
    results.push({ name: t.name, size: t.size, ok: false, error: err.message });
    console.error(`Failed ${t.name}:`, err.message);
  }
}
fs.writeFileSync('scratch/capture-results.json', JSON.stringify(results, null, 2));
console.log('Finished capturing all views.');
