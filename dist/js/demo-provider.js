import { EXAMPLES } from './data.js';
// Explicit local demo boundary. Replace this adapter with a server-side API later.
// Imported user notes are intentionally never presented as model-generated context.
export const demoProvider = {
  mode: 'preset-demo',
  answer(question) {
    const example = EXAMPLES.find(item=>item.question === question.trim());
    if (!example) return {question, answer:'这条问题已记录。当前版本尚未接入真实 AI，因此不会自动解答自由问题，也不会检索你新增的笔记。\n\n你可以先体验下方的三个预置问题；真实资料问答安排在开发路线图的第一阶段。', sourceId:null, demo:true, unsupported:true};
    return {question, ...example, demo:true, unsupported:false};
  }
};
