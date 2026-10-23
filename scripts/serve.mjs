import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.md':'text/markdown; charset=utf-8','.json':'application/json'};
const server=http.createServer(async(req,res)=>{
  try {const url=new URL(req.url,'http://localhost');const decoded=decodeURIComponent(url.pathname);const target=path.resolve(root,'.'+(decoded==='/'?'/index.html':decoded));if(!target.startsWith(root+path.sep)){res.writeHead(403);return res.end('Forbidden');}const content=await fs.readFile(target);res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(content);}catch{res.writeHead(404);res.end('Not found');}
});
server.listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
