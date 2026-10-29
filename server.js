'use strict';
const http = require('node:http');
const { URL, URLSearchParams } = require('node:url');
const all = require('./catalog.json');
const story = require('./story-order.json');
const version = '1.0.0';
const today = () => new Date().toISOString().slice(0, 10);
const menu = [
 ['mcu_story','MCU Story Order'], ['mcu_release','MCU Release Order'],
 ['movies','Movies'], ['series','Series'], ['animation','Animation'],
 ['spiderman','Spider-Man'], ['xmen','X-Men'], ['fantasticfour','Fantastic Four'],
 ['tv','Marvel Television'], ['upcoming','Coming Soon']
];
const manifest = {
 id:'community.dolphindiver.marvel.timeline', version,
 name:'Marvel Timeline — Free Catalog',
 description:'Independent fan catalog by DolphinDiver: Marvel movies, series, animation, Spider-Man, X-Men, Fantastic Four and suggested MCU watch orders. Catalogs only; no streams hosted. Optional support: https://ko-fi.com/dolphindiver',
 resources:['catalog'], types:['Marvel','movie','series'],
 catalogs:menu.map(([id,name])=>({type:'Marvel',id:`marvel_${id}`,name,extra:[{name:'search',isRequired:false},{name:'skip',isRequired:false}]})),
 behaviorHints:{configurable:false}
};
function releaseSort(a,b) { return a.releaseDate.localeCompare(b.releaseDate) || a.name.localeCompare(b.name) || a.id.localeCompare(b.id); }
function upcoming(x) { return x.releaseDate > today(); }
function preview(x) {
 return {id:x.id,type:x.type,name:x.name,poster:x.poster || `https://images.metahub.space/poster/medium/${x.id}/img`,posterShape:'poster',releaseInfo:String(x.year),description:`${x.tags.includes('mcu')?'MCU':x.tags.includes('imprint')?'Marvel-related imprint adaptation':'Marvel adaptation'} • ${x.year}${upcoming(x)?' • Upcoming; dates may change':''}`};
}
function getCatalog(type,id,extra={}) {
 if(type!=='Marvel') return {metas:[]};
 const key=id.replace(/^marvel_/,'');
 if(!menu.some(([k])=>k===key)||id!==`marvel_${key}`) return {metas:[]};
 let rows=all.filter(x=>key==='upcoming'?upcoming(x):!upcoming(x));
 if(key==='movies') rows=rows.filter(x=>x.type==='movie');
 else if(key==='series') rows=rows.filter(x=>x.type==='series');
 else if(key==='mcu_story') rows=rows.filter(x=>story.includes(x.id));
 else if(key==='mcu_release') rows=rows.filter(x=>x.tags.includes('mcu'));
 else if(key!=='upcoming') rows=rows.filter(x=>x.tags.includes(key));
 rows.sort(key==='mcu_story'?(a,b)=>story.indexOf(a.id)-story.indexOf(b.id):releaseSort);
 const q=String(extra.search||'').trim().toLowerCase();
 if(q) rows=rows.filter(x=>`${x.name} ${x.year}`.toLowerCase().includes(q));
 const raw=String(extra.skip||'0');
 const skip=/^\d+$/.test(raw)?Math.min(Number(raw),100000):0;
 return {metas:rows.slice(skip,skip+100).map(preview)};
}
function send(res,status,body,contentType='application/json; charset=utf-8') {
 res.writeHead(status,{'Content-Type':contentType,'Access-Control-Allow-Origin':'*','Cache-Control':status===200?'public, max-age=120':'no-store','X-Content-Type-Options':'nosniff'});
 res.end(contentType.startsWith('application/json')?JSON.stringify(body):body);
}
const server=http.createServer((req,res)=>{
 if(req.method==='OPTIONS') {res.writeHead(204,{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET, HEAD, OPTIONS'});return res.end();}
 if(!['GET','HEAD'].includes(req.method))return send(res,405,{error:'Method not allowed'});
 try {
  const url=new URL(req.url,'http://localhost');
  if(url.pathname==='/manifest.json') return send(res,200,manifest);
  if(url.pathname==='/health') return send(res,200,{status:'ok',version,entries:all.length,imdbLinked:all.length,referenceOnly:0,catalogs:menu.length,upcoming:all.filter(upcoming).length});
  if(url.pathname==='/')return send(res,200,`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Marvel Timeline</title><style>body{background:#140b12;color:#f8f3f5;font:18px/1.6 system-ui;margin:0;padding:40px 24px}main{max-width:760px;margin:auto}h1{font-size:44px;line-height:1.1}a{color:#ffb6bf}button,.button{display:inline-block;background:#a91431;border:0;border-radius:12px;color:white;padding:12px 20px;text-decoration:none;margin:8px 8px 8px 0}input{box-sizing:border-box;width:100%;padding:14px;background:#251b23;color:white;border:1px solid #765764;border-radius:8px}small{color:#d4c0c8}</style><main><h1>Marvel Timeline</h1><p>Free Marvel catalogs and suggested watch orders for Stremio, by DolphinDiver.</p><p>Movies · Series · Animation · Spider-Man · X-Men · Fantastic Four</p><a class="button" id="install">Install in Stremio</a><a class="button" href="https://ko-fi.com/dolphindiver">Optional support on Ko-fi</a><p>Or copy this manifest URL into Stremio or Addon Manager:</p><input id="url" readonly aria-label="Add-on manifest URL"><p><small>Independent fan project. Not affiliated with Marvel, Disney, Sony, or Stremio. Catalogs only; no video streams hosted. Playback requires other add-ons. Coverage and artwork are a work in progress.</small></p><a href="https://github.com/moviediver88/marvel-timeline-stremio">Instructions and feedback</a></main><script>const manifest=location.origin+'/manifest.json';document.getElementById('url').value=manifest;document.getElementById('install').href=manifest.replace(/^https?:/, 'stremio:');</script></html>`,'text/html; charset=utf-8');
  const match=url.pathname.match(/^\/catalog\/([^/]+)\/([^/]+)(?:\/([^/]*))?\.json$/);
  if(match) {
   const extra=Object.fromEntries(new URLSearchParams(match[3]||''));
   for(const [k,v] of url.searchParams) extra[k]=v;
   return send(res,200,getCatalog(decodeURIComponent(match[1]),decodeURIComponent(match[2]),extra));
  }
  return send(res,404,{error:'Not found'});
 } catch {return send(res,400,{error:'Invalid request'});}
});
if(require.main===module) server.listen(Number(process.env.PORT||7000),'0.0.0.0',()=>console.log(`Marvel Timeline ${version} ready`));
module.exports={server,manifest,getCatalog,all,story};
