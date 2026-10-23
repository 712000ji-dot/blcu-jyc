import assert from 'node:assert/strict';
import {readdirSync,readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {SAMPLE_NOTES,EXAMPLES,QUESTIONS,PHASES} from '../dist/js/data.js';
import {demoProvider} from '../dist/js/demo-provider.js';
import {escapeHTML} from '../dist/js/ui.js';
for(const file of readdirSync('dist/js').filter(f=>f.endsWith('.js'))){const r=spawnSync(process.execPath,['--check',`dist/js/${file}`],{encoding:'utf8'});assert.equal(r.status,0,r.stderr);}
for(const x of EXAMPLES){const note=SAMPLE_NOTES.find(n=>n.id===x.sourceId);assert.ok(note?.content.includes(x.quote),'Citation quote must occur in source');assert.equal(demoProvider.answer(x.question).unsupported,false);}
assert.equal(demoProvider.answer('这是一个没有预置答案的新问题').unsupported,true);
for(const q of QUESTIONS){assert.ok(q.correct>=0&&q.correct<q.options.length);assert.ok(SAMPLE_NOTES.some(n=>n.id===q.sourceId));}
assert.equal(new Set(PHASES.flatMap(p=>p.tasks.map(t=>t.id))).size,PHASES.flatMap(p=>p.tasks).length);
assert.equal(escapeHTML('<script>"&\''),'&lt;script&gt;&quot;&amp;&#39;');
const memory=new Map();globalThis.localStorage={getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v)};
const {store}=await import('../dist/js/store.js');
store.saveNote({id:'check-note',title:'test',content:'safe',category:'test'});assert.equal(store.getNote('check-note').title,'test');
store.saveNote({id:'check-note',title:'edited',content:'safe',category:'test'});assert.equal(store.notes.filter(n=>n.id==='check-note').length,1);
assert.throws(()=>store.saveNote({...SAMPLE_NOTES[0],title:'overwrite'}));store.deleteNote('check-note');assert.equal(store.getNote('check-note'),undefined);
store.attempt('q-stack',1,true);assert.equal(JSON.parse(store.export()).attempts.length,1);
store.toggleTask('p1-qa');assert.ok(store.completedTasks.includes('p1-qa'));store.toggleTask('p1-qa');assert.ok(!store.completedTasks.includes('p1-qa'));
for(const doc of ['project-plan.md','architecture.md'])assert.ok(readFileSync('dist/docs/'+doc,'utf8').length>500);
const html=readFileSync('dist/index.html','utf8');assert.ok(html.includes('lang="zh-CN"'));
console.log('PASS: JavaScript syntax, source citations, honest demo fallback, question references, unique task IDs, safe HTML, note CRUD/read-only samples, attempts/export, roadmap persistence, documentation.');
