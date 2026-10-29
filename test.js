'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {server,manifest,getCatalog,all,story}=require('./server');
const complete=id=>Array.from({length:Math.ceil(all.length/100)},(_,i)=>getCatalog('Marvel',id,{skip:i*100}).metas).flat();
test('catalog integrity and identity',()=>{
 assert.equal(new Set(all.map(x=>x.id)).size,all.length);
 for(const x of all){assert.match(x.id,/^tt\d+$/);assert.ok(['movie','series'].includes(x.type));assert.ok(x.name);assert.match(x.releaseDate,/^\d{4}-\d{2}-\d{2}$/);assert.ok(Number.isFinite(Date.parse(x.releaseDate)));assert.ok(x.tags.length);}
});
test('every advertised menu loads and pagination has no duplicate or missing results',()=>{
 for(const c of manifest.catalogs){const rows=complete(c.id);assert.ok(rows.length,c.id);assert.equal(new Set(rows.map(x=>x.id)).size,rows.length);assert.equal(getCatalog('Marvel',c.id,{skip:100000}).metas.length,0);}
});
test('type and tag boundaries',()=>{
 assert.ok(complete('marvel_movies').every(x=>x.type==='movie'));
 assert.ok(complete('marvel_series').every(x=>x.type==='series'));
 for(const key of ['animation','spiderman','xmen','fantasticfour','tv']) for(const x of complete('marvel_'+key)) assert.ok(all.find(r=>r.id===x.id).tags.includes(key));
 const ids=complete('marvel_spiderman').map(x=>x.id);
 for(const id of ['tt0145487','tt2250912','tt4633694','tt9362722','tt0185116','tt16027074']) assert.ok(ids.includes(id),id);
});
test('MCU story and release are separate, stable, and contain only intended titles',()=>{
 const release=complete('marvel_mcu_release');const ordered=complete('marvel_mcu_story');
 assert.equal(release[0].id,'tt0371746');assert.equal(ordered[0].id,'tt0458339');
 assert.equal(story.length,new Set(story).size);
 assert.ok(story.every(id=>all.some(x=>x.id===id&&x.tags.includes('mcu'))));
 assert.ok(ordered.every(x=>x.type==='movie'));
 assert.ok(ordered.findIndex(x=>x.id==='tt3480822')<ordered.findIndex(x=>x.id==='tt4154756'));
 assert.ok(!ordered.some(x=>x.id==='tt10676052'||x.id==='tt6263850'));
});
test('future titles are segregated, search works before pagination',()=>{
 const date=new Date().toISOString().slice(0,10);
 for(const c of manifest.catalogs){const ids=complete(c.id).map(x=>x.id);assert.ok(all.filter(x=>ids.includes(x.id)).every(x=>c.id==='marvel_upcoming'?x.releaseDate>date:x.releaseDate<=date));}
 const rows=getCatalog('Marvel','marvel_spiderman',{search:'No Way Home'}).metas;
 assert.deepEqual(rows.map(x=>x.id),['tt10872600']);
 assert.equal(getCatalog('movie','marvel_movies').metas.length,0);
 assert.equal(getCatalog('Marvel','not_real').metas.length,0);
});
test('HTTP routes, CORS, search parsing, health, and graceful errors',async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const base='http://127.0.0.1:'+server.address().port;
 try{
  const m=await fetch(base+'/manifest.json');assert.equal(m.headers.get('access-control-allow-origin'),'*');assert.equal((await m.json()).catalogs.length,10);
  const health=await(await fetch(base+'/health')).json();assert.equal(health.entries,all.length);assert.equal(health.referenceOnly,0);
  const found=await(await fetch(base+'/catalog/Marvel/marvel_spiderman/search=No%20Way%20Home.json')).json();assert.equal(found.metas[0].id,'tt10872600');
  assert.equal((await fetch(base+'/catalog/Marvel/marvel_movies/skip=100.json')).status,200);
  assert.equal((await fetch(base+'/catalog/%XX/marvel_movies.json')).status,400);
  assert.equal((await fetch(base+'/missing')).status,404);
  assert.equal((await fetch(base+'/manifest.json',{method:'POST'})).status,405);
  assert.equal((await fetch(base+'/',{method:'OPTIONS'})).status,204);
  assert.ok((await(await fetch(base+'/')).text()).includes('ko-fi.com/dolphindiver'));
 }finally{await new Promise(r=>server.close(r));}
});
