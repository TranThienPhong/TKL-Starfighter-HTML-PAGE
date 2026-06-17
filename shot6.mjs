import { chromium } from 'playwright-core';
const b = await chromium.launch();
const pg = await b.newPage({ viewport:{width:1440,height:760} });
await pg.goto('file:///home/kaitran/TKL-Starfighter-HTML-PAGE/index.html',{waitUntil:'networkidle',timeout:60000});
await pg.waitForTimeout(2000);
await pg.screenshot({path:'/tmp/shot/hero_new.png'});
await b.close(); console.log('ok');
