import {test,expect} from '@playwright/test';
test('homepage, campaign steps and accordion work',async({page})=>{
 await page.goto('/');await expect(page.getByRole('heading',{level:1})).toContainText('Loudr makes reaching');
 await page.getByRole('button',{name:/02 Tell us how many/}).click();await page.getByRole('button',{name:'500 posts',exact:true}).click();await expect(page.getByRole('button',{name:'500 posts',exact:true})).toHaveAttribute('aria-pressed','true');
 await page.getByRole('button',{name:'Do you guarantee streams?',exact:true}).click();await expect(page.getByRole('button',{name:'Do you guarantee streams?',exact:true})).toHaveAttribute('aria-expanded','true');await expect(page.getByRole('button',{name:'When will my campaign start?',exact:true})).toHaveAttribute('aria-expanded','false');
 await page.setViewportSize({width:1440,height:1000});await page.goto('/');await page.screenshot({path:'test-results/home-desktop.png',fullPage:false});
});
test('proof cards stack and expand with scroll',async({page})=>{
 await page.setViewportSize({width:1440,height:900});await page.goto('/');const proof=page.locator('#proof');const metrics=await proof.evaluate(node=>({top:(node as HTMLElement).offsetTop,height:(node as HTMLElement).offsetHeight}));
 const centers=async()=>page.locator('.proof-card').evaluateAll(nodes=>nodes.map(node=>{const r=node.getBoundingClientRect();return r.left+r.width/2}));
 await page.evaluate(y=>scrollTo(0,y),metrics.top-500);await page.waitForTimeout(150);const stacked=await centers();
 await page.evaluate(y=>scrollTo(0,y),metrics.top);await page.waitForTimeout(150);const expanded=await centers();
 expect(Math.max(...stacked)-Math.min(...stacked)).toBeLessThan(100);expect(Math.max(...expanded)-Math.min(...expanded)).toBeGreaterThan(800);
});
test('artist headshots orbit the music icon',async({page})=>{
 await page.goto('/');await page.getByRole('heading',{name:'Empowering independent artists to get heard'}).scrollIntoViewIfNeeded();const avatars=page.locator('.orbit-avatar img');await expect(avatars).toHaveCount(6);await expect(avatars.first()).toBeVisible();const before=await avatars.first().boundingBox();await page.waitForTimeout(500);const after=await avatars.first().boundingBox();expect(before&&after&&Math.hypot(after.x-before.x,after.y-before.y)).toBeGreaterThan(1);
});
test('mobile navigation and layout',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');await page.getByRole('button',{name:'Open navigation'}).click();await expect(page.getByRole('navigation',{name:'Main navigation'})).toBeVisible();await page.getByRole('navigation').getByRole('link',{name:'How to start'}).click();await expect(page.getByRole('button',{name:'Open navigation'})).toHaveAttribute('aria-expanded','false');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);await page.goto('/');await page.screenshot({path:'test-results/home-mobile.png',fullPage:true});
});
test('contact validation and success confirmation',async({page,request})=>{
 const invalid=await request.post('/api/contact',{data:{name:'Test'}});expect(invalid.status()).toBe(400);
 await page.route('**/api/contact',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({message:'Your campaign request has been sent.'})}));
 await page.goto('/contact');await page.getByLabel('Name *',{exact:true}).fill('Test Artist');await page.getByLabel('Email *').fill('artist@example.com');await page.getByLabel('Artist name *').fill('Test Artist');await page.getByLabel('TikTok sound link *').fill('https://www.tiktok.com/music/test-song-123');await page.getByLabel('Genre *').fill('Alternative');await page.getByLabel('Number of posts wanted *').fill('200');await page.getByRole('button',{name:'Send campaign request'}).click();await expect(page.getByRole('dialog')).toBeVisible();await expect(page.getByRole('heading',{name:'Your music is in good hands.'})).toBeVisible();await page.getByRole('button',{name:'Done'}).click();await expect(page.getByRole('dialog')).toBeHidden();
});
test('supporting pages, CMS config and article route',async({page,request})=>{
 for(const route of ['/about','/contact','/blog','/privacy','/terms']){const response=await page.goto(route);expect(response?.status()).toBe(200);await expect(page.getByRole('heading',{level:1})).toBeVisible()}
 await page.goto('/blog');await page.getByRole('link',{name:/Get your sound ready for a Loudr campaign/}).click();await expect(page.getByRole('heading',{level:1})).toHaveText('Get your sound ready for a Loudr campaign');const missing=await page.goto('/blog/does-not-exist');expect(missing?.status()).toBe(404);expect((await request.get('/admin/config.yml')).status()).toBe(200);
});
