export const escapeHTML = value => String(value??'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const paths = {
  grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  book:'<path d="M12 6c-3-3-7-3-10-1v15c3-2 7-2 10 1 3-3 7-3 10-1V5c-3-2-7-2-10 1Zm0 0v15"/>',
  chat:'<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H5l-3 2V11.5A8.5 8.5 0 0 1 10.5 3h2a8.5 8.5 0 0 1 8.5 8.5Z"/><path d="M7 10h10M7 14h6"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  practice:'<rect x="4" y="4" width="16" height="18" rx="2"/><path d="M9 4V2h6v2M8 11l2 2 5-5M8 17h8"/>',
  route:'<circle cx="6" cy="5" r="2"/><circle cx="18" cy="19" r="2"/><path d="M8 5h7a4 4 0 0 1 0 8H9a3 3 0 0 0 0 6h7"/>',
  arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
  diagonal:'<path d="M6 18 18 6M6 6h12v12"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Zm0 0v6h6M8 13h8M8 17h5"/>',
  search:'<circle cx="10.5" cy="10.5" r="7"/><path d="m16 16 5 5"/>',
  close:'<path d="m6 6 12 12M18 6 6 18"/>',
  download:'<path d="M12 3v12m-5-5 5 5 5-5M4 15v6h16v-6"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="m9 3-1 3-3 1-2 5 2 5 3 1 1 3h6l1-3 3-1 2-5-2-5-3-1-1-3Z"/>',
  spark:'<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5ZM20 2v4m-2-2h4"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  layers:'<path d="m12 3 10 5-10 5L2 8Zm-10 9 10 5 10-5M2 16l10 5 10-5"/>',
  code:'<path d="m8 7-5 5 5 5m8-10 5 5-5 5M14 4l-4 16"/>',
  link:'<path d="m10 13 4-4m-5 7-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m0 1 2-2a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0"/>',
  edit:'<path d="m15 4 5 5M4 20l5-1L21 7a3.5 3.5 0 0 0-5-5L4 14Z"/>',
  trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/>'
};
export function icon(name, cls='') { return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.file}</svg>`; }
let timer;
export function toast(message) { const el=document.querySelector('#toast'); el.textContent=message; el.hidden=false; clearTimeout(timer); timer=setTimeout(()=>el.hidden=true,4000); }
export function downloadFile(content,name,type='application/json') { const url=URL.createObjectURL(new Blob([content],{type})); const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000); }
export function graph() { return `<svg class="graph-art" viewBox="0 0 300 160" role="img" aria-label="广度优先搜索示意：从 A 出发，先到 B、C，再到 D、E"><path d="M150 27 78 79 40 135M78 79l37 56M150 27l72 52" fill="none" stroke="#bbcbba" stroke-width="2"/><path d="M150 27 78 79m72-52 72 52" stroke="#527565" stroke-width="2.5" fill="none"/>${[[150,27,'A',true],[78,79,'B',false],[222,79,'C',false],[40,135,'D',false],[115,135,'E',false]].map(([x,y,l,root])=>`<circle cx="${x}" cy="${y}" r="17" fill="${root?'#2a5546':'#f9fbf3'}" stroke="${root?'#2a5546':'#a8bfa8'}"/><text x="${x}" y="${y+5}" text-anchor="middle" fill="${root?'#fff':'#355347'}" font-size="13" font-family="monospace">${l}</text>`).join('')}<text x="244" y="31" fill="#768273" font-size="11" font-family="monospace">L0</text><text x="267" y="83" fill="#768273" font-size="11" font-family="monospace">L1</text><text x="167" y="139" fill="#768273" font-size="11" font-family="monospace">L2</text></svg>`; }
