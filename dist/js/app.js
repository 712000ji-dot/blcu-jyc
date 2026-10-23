import { EXAMPLES, QUESTIONS } from './data.js';
import { store } from './store.js';
import { demoProvider } from './demo-provider.js';
import { icon, escapeHTML as e, toast, downloadFile } from './ui.js';
import { NAV, overview, resources, noteCards, chat, practice, roadmap } from './views.js';
const main = document.querySelector('#main');
const state = { route:'overview',tab:'plan',questionIndex:0,choice:null,submitted:false };
document.querySelector('.skip-link').addEventListener('click',event=>{event.preventDefault();main.focus();main.scrollIntoView({block:'start'});});
document.querySelector('#export-data').innerHTML=icon('download');
document.querySelector('#roadmap-shortcut').innerHTML=icon('settings');
document.querySelector('#export-data').addEventListener('click',()=>{downloadFile(store.export(),'知序-学习数据.json');toast('已导出当前浏览器中的学习数据');});
window.addEventListener('storage-unavailable',()=>toast('浏览器存储空间不可用，请及时导出数据。'));
function render() {
  document.querySelector('#navigation').innerHTML=NAV.map(n=>`<a class="nav-link ${n.id===state.route?'active':''}" href="#/${n.id}" ${n.id===state.route?'aria-current="page"':''}>${icon(n.icon)}<span>${n.label}</span>${n.id==='roadmap'?'<span class="nav-beta">PLAN</span>':''}</a>`).join('');
  document.querySelector('#page-label').textContent=NAV.find(n=>n.id===state.route)?.label||'学习总览';
  main.innerHTML=({overview,resources,chat,practice:()=>practice(state),roadmap:()=>roadmap(state.tab)}[state.route]||overview)();
}
function route() {
  const id=location.hash.replace('#/','').split('?')[0];state.route=NAV.some(n=>n.id===id)?id:'overview'; render();window.scrollTo({top:0});
}
window.addEventListener('hashchange',()=>{route();main.focus({preventScroll:true});});route();
function addQuestion(question) {
  store.addConversation(demoProvider.answer(question));
  if(state.route!=='chat')location.hash='/chat';else render();
  requestAnimationFrame(()=>{const history=document.querySelector('#chat-history');if(history)history.scrollTop=history.scrollHeight;});
}
let returnFocus;
function closeModal() { document.querySelector('#modal-root').innerHTML='';document.body.style.overflow='';returnFocus?.focus(); }
function modal(title,content,wide=false) {
  returnFocus=document.activeElement;
  document.querySelector('#modal-root').innerHTML=`<div class="modal-backdrop"><section class="modal ${wide?'wide':''}" role="dialog" aria-modal="true" aria-labelledby="modal-title"><header class="modal-header"><h2 id="modal-title">${e(title)}</h2><button class="icon-btn" data-action="close-modal" aria-label="关闭">${icon('close')}</button></header>${content}</section></div>`;
  document.body.style.overflow='hidden';
  requestAnimationFrame(()=>document.querySelector('.modal input,.modal textarea,.modal button')?.focus());
}
function editNote(note={}) {
  modal(note.id?'编辑笔记':'添加课程笔记',`<form id="note-form" data-id="${e(note.id||'')}"><p class="muted">仅保存在当前浏览器。后续可接入检索与真实 AI 问答。</p><div class="form-field"><label for="note-title">笔记标题</label><input class="input" id="note-title" name="title" maxlength="80" value="${e(note.title||'')}" placeholder="例如：链表的插入与删除" required></div><div class="form-field"><label for="note-category">知识点</label><input class="input" id="note-category" name="category" maxlength="30" value="${e(note.category||'我的笔记')}" required></div><div class="form-field"><label for="note-content">笔记内容</label><textarea class="input" id="note-content" name="content" rows="10" maxlength="50000" placeholder="写下概念、例子和自己的理解…" required>${e(note.content||'')}</textarea></div><div class="modal-actions"><button type="button" class="btn secondary" data-action="close-modal">取消</button><button type="submit" class="btn primary">保存笔记 ${icon('check')}</button></div></form>`,true);
}
function readNote(id,highlight='') {
  const n=store.getNote(id);if(!n)return toast('这份资料不存在');
  let content=e(n.content);if(highlight&&n.content.includes(highlight))content=content.replace(e(highlight),`<mark>${e(highlight)}</mark>`);
  modal(n.title,`<div class="note-reading-meta"><span class="badge ${n.sample?'muted':'green'}">${n.sample?'知序自写示例 · 只读':'我的笔记 · 本地保存'}</span><span class="tag">${e(n.category)}</span></div><div class="reading-content">${content}</div><div class="modal-actions">${n.sample?`<button class="btn secondary" data-action="source-chat" data-id="${e(n.id)}">体验相关示例 ${icon('chat')}</button>`:`<button class="btn ghost danger" data-action="delete-note" data-id="${e(n.id)}">${icon('trash')}删除</button><button class="btn secondary" data-action="edit-note" data-id="${e(n.id)}">${icon('edit')}编辑笔记</button>`}<button class="btn primary" data-action="close-modal">完成</button></div>`,true);
  requestAnimationFrame(()=>document.querySelector('.reading-content mark')?.scrollIntoView({block:'center'}));
}
document.addEventListener('click',event=>{
  const element=event.target.closest('[data-action],[data-example],[data-note],[data-choice],[data-review],[data-tab]');
  if(!element)return;
  if(element.dataset.example){const x=EXAMPLES.find(x=>x.id===element.dataset.example);if(x)addQuestion(x.question);return;}
  if(element.dataset.note){readNote(element.dataset.note,element.dataset.highlight);return;}
  if(element.dataset.choice!==undefined){if(state.submitted)return;state.choice=Number(element.dataset.choice);render();document.querySelector(`[data-choice="${state.choice}"]`)?.focus();return;}
  if(element.dataset.review){state.questionIndex=QUESTIONS.findIndex(q=>q.id===element.dataset.review);state.choice=null;state.submitted=false;render();return;}
  if(element.dataset.tab){state.tab=element.dataset.tab;render();document.querySelector(`[data-tab="${state.tab}"]`)?.focus();return;}
  const action=element.dataset.action;
  if(action==='close-modal')closeModal();
  if(action==='new-note')editNote();
  if(action==='edit-note')editNote(store.getNote(element.dataset.id));
  if(action==='import-note')document.querySelector('#note-file')?.click();
  if(action==='source-chat'){const x=EXAMPLES.find(x=>x.sourceId===element.dataset.id);closeModal();if(x)addQuestion(x.question);}
  if(action==='delete-note'){const id=element.dataset.id;modal('删除这份笔记？',`<p>删除后将从当前浏览器移除。你可以先导出学习数据留存。</p><div class="modal-actions"><button class="btn secondary" data-action="close-modal">取消</button><button class="btn primary" data-action="confirm-delete" data-id="${e(id)}">确认删除</button></div>`);}
  if(action==='confirm-delete'){store.deleteNote(element.dataset.id);closeModal();render();toast('笔记已删除');}
  if(action==='submit-answer'&&state.choice!==null&&!state.submitted){const q=QUESTIONS[state.questionIndex];store.attempt(q.id,state.choice,state.choice===q.correct);state.submitted=true;render();}
  if(action==='next-question'){state.questionIndex=(state.questionIndex+1)%QUESTIONS.length;state.choice=null;state.submitted=false;render();}
});
document.addEventListener('submit',event=>{
  if(event.target.id==='chat-form'){event.preventDefault();const question=new FormData(event.target).get('question').trim();if(question)addQuestion(question);}
  if(event.target.id==='note-form'){
    event.preventDefault();const values=new FormData(event.target);const title=values.get('title').trim(),content=values.get('content').trim(),category=values.get('category').trim();
    if(!title||!content||!category)return toast('请填写标题、知识点和笔记内容');
    const existing=store.getNote(event.target.dataset.id);
    store.saveNote({id:existing?.id||crypto.randomUUID(),title,category,content,courseId:'ds',createdAt:existing?.createdAt||new Date().toISOString()});closeModal();render();toast('笔记已保存；当前尚未接入 AI 检索');
  }
});
document.addEventListener('input',event=>{
  if(event.target.id==='note-search'){document.querySelector('#note-grid').innerHTML=noteCards(event.target.value);document.querySelector('#note-count').textContent=event.target.value?'正在筛选资料':`${store.notes.length} 份资料 · 数据结构与算法`;}
});
document.addEventListener('change',async event=>{
  if(event.target.matches('[data-task]')){store.toggleTask(event.target.dataset.task);toast('个人计划记录已更新');}
  if(event.target.id==='note-file'){
    const file=event.target.files?.[0];if(!file)return;
    if(!/\.(txt|md)$/i.test(file.name))return toast('请导入 .txt 或 .md 文件');
    if(file.size>1024*1024)return toast('原型暂支持 1 MB 以内的文本文件');
    try {const text=await file.text();if(!text.trim())return toast('文件内容为空');if(text.length>50000)return toast('原型暂支持 50,000 字以内的笔记，请拆分后导入');editNote({title:file.name.replace(/\.(txt|md)$/i,''),content:text,category:'导入笔记'});}catch {toast('读取文件失败，请重试');}
    event.target.value='';
  }
});
document.addEventListener('keydown',event=>{
  const box=document.querySelector('.modal');if(!box)return;
  if(event.key==='Escape'){event.preventDefault();closeModal();}
  if(event.key==='Tab'){
    const all=[...box.querySelectorAll('button,a[href],input,textarea,select,[tabindex="0"]')].filter(x=>!x.disabled);const first=all[0],last=all.at(-1);
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
  }
});
