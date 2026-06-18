import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: '/home/kaitran/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome' });
const pg = await b.newPage({ viewport:{width:390,height:840} });
await pg.goto('file:///home/kaitran/TKL-Starfighter-HTML-PAGE/index.html',{waitUntil:'networkidle',timeout:60000});
await pg.waitForTimeout(1500);
const info = await pg.evaluate(() => {
  const vw = document.documentElement.clientWidth;
  const overflow = document.documentElement.scrollWidth - vw;
  const offenders = [];
  document.querySelectorAll('*').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width > vw + 1) {
      offenders.push({ tag: el.tagName, cls: (el.className||'').toString().slice(0,80), w: Math.round(r.width) });
    }
  });
  // dedupe-ish: top 25 widest
  offenders.sort((a,b)=>b.w-a.w);
  return { vw, overflow, count: offenders.length, top: offenders.slice(0,25) };
});
console.log('viewport', info.vw, 'horizontal overflow px:', info.overflow, 'wide-elements:', info.count);
for (const o of info.top) console.log();
await pg.screenshot({path:'/tmp/shot/m_hero.png'});
await b.close();
