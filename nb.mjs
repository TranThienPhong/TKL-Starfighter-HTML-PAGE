import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: process.env.CHROME });
const pg=await b.newPage({viewport:{width:1440,height:900}});
await pg.goto('file:///home/kaitran/TKL-Starfighter-HTML-PAGE/index.html',{waitUntil:'networkidle',timeout:60000});
await pg.waitForTimeout(1200);
await pg.locator('p', {hasText:'I was a Marine'}).first().scrollIntoViewIfNeeded();
await pg.evaluate(()=>window.scrollBy(0,-300)); await pg.waitForTimeout(300);
await pg.screenshot({path:'/tmp/shot/newblock.png'});
await b.close(); console.log('ok');
