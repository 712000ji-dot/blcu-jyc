export const COURSE = { id: 'ds', title: '数据结构与算法', subtitle: '第一门课程 · 从基础开始' };
// Original sample notes. Stable IDs let answers resolve their real source.
export const SAMPLE_NOTES = [
  { id: 'linear', title: '线性结构：栈与队列', category: '线性结构', sample: true, createdAt: '2026-10-22T00:00:00Z', content: '§1 出入顺序\n栈遵循后进先出（LIFO）；队列遵循先进先出（FIFO）。先后加入 A、B、C 后，栈的移除顺序为 C、B、A，队列为 A、B、C。\n\n§2 典型应用\n函数调用和表达式求值常使用栈。任务排队和广度优先搜索常使用队列。这里讨论的是抽象数据结构，具体操作复杂度还取决于实现。' },
  { id: 'search', title: '查找：二分法的前提', category: '查找算法', sample: true, createdAt: '2026-10-22T00:00:00Z', content: '§1 有序关系\n标准二分查找要求数组已经按比较规则有序。每次比较中间元素后，可以排除不可能包含目标的一半区间。在支持随机访问的有序数组上，查找时间复杂度为 O(log n)。\n\n§2 边界约定\n使用闭区间 [left, right] 时，循环条件是 left <= right。若中点不是目标，下一轮必须排除已经检查的中点。无序数组的中间元素无法帮助我们判断目标位于哪一侧。' },
  { id: 'graph', title: '图遍历：BFS 与最短路径', category: '图与遍历', sample: true, createdAt: '2026-10-22T00:00:00Z', content: '§1 广度优先搜索\nBFS 使用先进先出的队列维护待访问节点，从起点向外逐层扩展。\n\n§2 无权最短路径\n在无权图中，BFS 使用队列按与起点的边数距离逐层访问节点。节点首次入队时标记已发现，并记录前驱，因此可以恢复从起点到该节点的最短路径。这里的最短指经过的边数最少。\n\n§3 适用边界\nBFS 的上述保证适用于无权图，或所有边权相同的图。边权不同的一般加权图不能直接用普通 BFS 保证权重和最小。' }
];
export const EXAMPLES = [
  { id: 'stack', question: '栈和队列的出入顺序有什么区别？', answer: '栈是后进先出，队列是先进先出。\n\n比如依次放入 A、B、C：\n• 栈：先取 C，再取 B，最后取 A。\n• 队列：先取 A，再取 B，最后取 C。\n\n可以把栈想成一叠盘子，把队列想成排队等待的人。', sourceId: 'linear', section: '§1 出入顺序', quote: '栈遵循后进先出（LIFO）；队列遵循先进先出（FIFO）。' },
  { id: 'binary', question: '为什么不能直接对无序数组使用标准二分查找？', answer: '二分查找需要借助有序关系，确定哪一半区间不可能包含目标。\n\n无序数组中，中间值与目标值的大小关系无法确定目标在哪一侧，因此不能放心排除一半数据。\n\n如果先排序再查找，还要计入排序的成本。对于只有一次查找的场景，直接遍历也可能更合适。', sourceId: 'search', section: '§1 有序关系', quote: '标准二分查找要求数组已经按比较规则有序。' },
  { id: 'bfs', question: 'BFS 为什么能找到无权图的最短路径？', answer: 'BFS 用队列逐层探索：先访问与起点相距 1 条边的节点，再访问相距 2 条边的节点，依次向外扩展。\n\n一个节点首次被发现时，对应的边数已经最少。记录每个节点的前驱，就可以还原路径。\n\n适用前提：无权图，或所有边权相同。这里的“最短”指经过的边数最少。', sourceId: 'graph', section: '§2 无权最短路径', quote: '节点首次入队时标记已发现，并记录前驱，因此可以恢复从起点到该节点的最短路径。' }
];
export const QUESTIONS = [
  { id: 'q-stack', topic: '栈与队列', prompt: '依次将 A、B、C 压入一个空栈，再连续弹出三次。弹出顺序是？', options: ['A → B → C', 'C → B → A', 'B → A → C', 'C → A → B'], correct: 1, explanation: '栈遵循后进先出。C 最后入栈，所以最先弹出，然后是 B、A。', sourceId: 'linear' },
  { id: 'q-binary', topic: '二分查找', prompt: '对支持随机访问的有序数组进行标准二分查找，其时间复杂度是？', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correct: 2, explanation: '每轮搜索区间约减半，经过约 log₂ n 轮即可结束。这里假设数组已排序，不包含排序成本。', sourceId: 'search' },
  { id: 'q-bfs', topic: '图遍历', prompt: '普通 BFS 能直接保证找到哪一种图中经过边数最少的路径？', options: ['任意带负权的图', '任意权重不同的图', '只有完全图', '无权图'], correct: 3, explanation: 'BFS 按边数距离逐层扩展。在无权图中，首次发现节点时已得到经过边数最少的路径。', sourceId: 'graph' }
];
export const PHASES = [
  { id: 'p0', name: '搭起学习空间', subtitle: '当前交付 · 结构原型', estimate: '当前版本', status: '框架已就绪', deliverable: '五个页面、本地笔记管理、固定示例问答、练习与可执行路线图。', dependency: '无外部模型与数据库依赖。', acceptance: '可以新增和编辑笔记；示例答案可打开来源；练习记录刷新后保留；手机端可操作。', tasks: [{id:'p0-shell',text:'搭建五个入口与响应式导航',built:true},{id:'p0-notes',text:'实现笔记的新增、编辑、搜索、删除',built:true},{id:'p0-demo',text:'打通示例问答、来源和固定练习',built:true},{id:'p0-docs',text:'整理架构、范围与验收文档',built:true}] },
  { id: 'p1', name: '跑通真实问答', subtitle: '第一阶段 · 小范围验证', estimate: '第 1–2 周', status: '待开发', deliverable: '先支持一门课程、文本 / Markdown 资料和带出处的真实模型回答。', dependency: '服务端模型凭据、数据隔离方案、选定可用的模型服务。', acceptance: '20 个固定问题人工验收；找不到依据时明确说明；引用必须来自本次提供的资料；记录延迟与调用成本。', tasks: [{id:'p1-provider',text:'实现服务端模型适配器，浏览器不保存密钥'},{id:'p1-storage',text:'建立资料与会话存储、用户数据访问边界'},{id:'p1-qa',text:'以小规模资料上下文实现问答与真实引用'},{id:'p1-eval',text:'建立 20 题评测集，记录基线结果'}] },
  { id: 'p2', name: '让检索更可靠', subtitle: '第二阶段 · 质量与规模', estimate: '第 3–4 周', status: '待开发', deliverable: '资料切分、向量 / 关键词混合检索、引用定位和评测报告。', dependency: '第一阶段问答链路与评测基线稳定。', acceptance: '在同一评测集比较检索命中与引用准确率；覆盖无答案问题；记录成本和速度，保留可回退的基线。', tasks: [{id:'p2-chunk',text:'建立资料切分、版本与索引流水线'},{id:'p2-retrieve',text:'比较关键词检索和向量检索'},{id:'p2-eval',text:'评估重排序的质量、延迟和成本'},{id:'p2-cite',text:'点击引用定位到原文片段'}] },
  { id: 'p3', name: '形成学习闭环', subtitle: '第三阶段 · 练习与反馈', estimate: '第 5–7 周', status: '待开发', deliverable: '知识点关联、可审核的练习生成、错题记录和复习安排。', dependency: '可靠的资料检索、真实答题记录和用户反馈。', acceptance: '练习与知识点可追溯；人工抽查题目和答案；使用真实答题结果检验复习建议，不以聊天次数代替学习效果。', tasks: [{id:'p3-quiz',text:'生成练习并建立人工审核入口'},{id:'p3-attempt',text:'记录答题、错因与知识点'},{id:'p3-review',text:'实现规则式复习安排并收集反馈'},{id:'p3-pilot',text:'邀请 3–5 位同学完成真实学习任务'}] },
  { id: 'p4', name: '深入实战与研究', subtitle: '第四阶段 · 根据反馈选一条深化', estimate: '第 8 周起', status: '可选拓展', deliverable: '选择代码实战、协作课程或模型研究中的一条，继续复用现有数据与评测。', dependency: '前三阶段验证了真实需求；具备足够数据和明确问题。', acceptance: '先提出可测量假设，再开展工具调用、检索优化或微调对照实验。', tasks: [{id:'p4-direction',text:'基于反馈选定一个深化问题'},{id:'p4-code',text:'按需接入隔离的代码执行工具'},{id:'p4-research',text:'按需通过 HTTP 接入独立 Python 研究服务'},{id:'p4-report',text:'用固定评测与对照实验报告改进'}] }
];
