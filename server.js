'use strict';
const http = require('node:http');
const { URL, URLSearchParams } = require('node:url');
const all = require('./catalog.json');
const story = require('./story-order.json');
const version = '1.1.0';
const configuration = require('./configure');
const today = () => new Date().toISOString().slice(0, 10);
const menu = [
 ['mcu_story','MCU Story Order'], ['mcu_release','MCU Release Order'],
 ['movies','Movies'], ['series','Series'], ['animation','Animation'],
 ['spiderman','Spider-Man'], ['xmen','X-Men'], ['fantasticfour','Fantastic Four'],
 ['tv','Marvel Television'], ['upcoming','Coming Soon']
];
const manifest = {
 id:'community.dolphindiver.marvel.timeline', version,
 name:'Marvel Timeline',
 logo:'https://raw.githubusercontent.com/moviediver88/marvel-timeline-stremio/main/Cinematic%20Silver%20M%20with%20Red%20Glow.png',
 description:'Explore Marvel movies, TV series and animation in MCU story and release orders. Includes Spider-Man, X-Men, Fantastic Four, Marvel Television and upcoming releases. Independent fan catalog; no streams hosted. Not affiliated with Marvel. Optional support: https://ko-fi.com/dolphindiver',
 resources:['catalog'], types:['Marvel','movie','series'],
 catalogs:menu.map(([id,name])=>({type:'Marvel',id:`marvel_${id}`,name,extra:[{name:'search',isRequired:false},{name:'skip',isRequired:false}]})),
 behaviorHints:{configurable:true,configurationRequired:false},
 config:configuration.settings(menu.map(([id,name])=>({id:`marvel_${id}`,name})))
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
  let route=url.pathname;
  let selected=manifest.catalogs;
  const configured=route.match(/^\/([^/]+)\/(manifest\.json|configure|catalog\/.*)$/);
  if(configured){selected=configuration.selection(configured[1],manifest.catalogs);route='/'+configured[2];}
  if(route==='/'||route==='/configure')return send(res,200,configuration.page(manifest,selected),'text/html; charset=utf-8');
  if(route==='/manifest.json')return send(res,200,{...manifest,catalogs:selected,config:configuration.settings(manifest.catalogs).map(c=>({...c,default:selected.some(x=>x.id===c.key)?'checked':''}))});
  if(url.pathname==='/health') return send(res,200,{status:'ok',version,entries:all.length,imdbLinked:all.length,referenceOnly:0,catalogs:menu.length,upcoming:all.filter(upcoming).length});
  const match=route.match(/^\/catalog\/([^/]+)\/([^/]+)(?:\/([^/]*))?\.json$/);
  if(match) {
   if(configured&&!selected.some(c=>c.id===decodeURIComponent(match[2])))return send(res,404,{error:'Catalog not selected'});
   const extra=Object.fromEntries(new URLSearchParams(match[3]||''));
   for(const [k,v] of url.searchParams) extra[k]=v;
   return send(res,200,getCatalog(decodeURIComponent(match[1]),decodeURIComponent(match[2]),extra));
  }
  return send(res,404,{error:'Not found'});
 } catch {return send(res,400,{error:'Invalid request'});}
});
if(require.main===module) server.listen(Number(process.env.PORT||7000),'0.0.0.0',()=>console.log(`Marvel Timeline ${version} ready`));
module.exports={server,manifest,getCatalog,all,story};
