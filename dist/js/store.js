import { SAMPLE_NOTES } from './data.js';
const KEY = 'zhixu.workspace.v1';
const fresh = () => ({version: 1, notes: [], conversations: [], attempts: [], completedTasks: []});
let data = fresh();
export let storageAvailable = true;
try {
  const parsed = JSON.parse(localStorage.getItem(KEY) || 'null');
  if (parsed?.version === 1 && ['notes','conversations','attempts','completedTasks'].every(k=>Array.isArray(parsed[k]))) data = parsed;
} catch { storageAvailable = false; }
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(data)); storageAvailable = true; }
  catch { storageAvailable = false; window.dispatchEvent(new CustomEvent('storage-unavailable')); }
}
export const store = {
  get notes() { return [...SAMPLE_NOTES, ...data.notes]; },
  get conversations() { return data.conversations; },
  get attempts() { return data.attempts; },
  get completedTasks() { return data.completedTasks; },
  getNote(id) { return this.notes.find(n=>n.id===id); },
  saveNote(note) {
    if (SAMPLE_NOTES.some(n=>n.id===note.id)) throw new Error('示例资料只读');
    const existing = data.notes.findIndex(n=>n.id===note.id);
    const value = {...note, sample:false, updatedAt:new Date().toISOString()};
    if (existing < 0) data.notes.unshift(value); else data.notes[existing] = value;
    save(); return value;
  },
  deleteNote(id) { data.notes = data.notes.filter(n=>n.id!==id); save(); },
  addConversation(item) { data.conversations.push({...item,id:crypto.randomUUID(),createdAt:new Date().toISOString()}); data.conversations = data.conversations.slice(-50); save(); },
  attempt(questionId, option, correct) { data.attempts.push({questionId, option, correct, createdAt:new Date().toISOString()}); data.attempts = data.attempts.slice(-200); save(); },
  toggleTask(id) { data.completedTasks = data.completedTasks.includes(id) ? data.completedTasks.filter(x=>x!==id) : [...data.completedTasks,id]; save(); },
  export() { return JSON.stringify({...data,exportedAt:new Date().toISOString()},null,2); }
};
