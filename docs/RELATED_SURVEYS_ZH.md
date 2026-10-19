# 同期 RSI Survey 与 Awesome 对照

核查日期：2026-10-17。比较的是作者原文和仓库当前结构，不按star数排序，也不复制其整份论文清单。

| 工作 | 首次公开 | 组织方式 | 本清单借鉴什么 |
| --- | --- | --- | --- |
| [From Existing Methods to New Research Ideas](https://arxiv.org/abs/2610.14625) / [Prism-Shadow Awesome RSI](https://github.com/Prism-Shadow/awesome-rsi) | 2026-10-10，arXiv v1 | 原文九个设计维度；仓库首页方法按更新对象、benchmark另按评测模式 | 首页只保留一个方法浏览轴，其他维度放元数据 |
| [The Path to Recursive Self-Improving Agents](https://www.preprints.org/manuscript/202608.0051/v1) / [D2I仓库](https://github.com/D2I-ai/awesome-recursive-self-improving-agents) | 2026-08-03发布，非7月28日投稿日 | harness、data system、trainer及跨组件共同改进；另有L1–L5框架 | 分开组件更新和改进机制更新；不照搬长而细的首页目录 |
| [The Last AI Built by Humans](https://arxiv.org/abs/2609.11873) / [作者仓库](https://github.com/theseus-labs-rsi/awesome-rsi) | 2026-09-10，arXiv v1 | 以改进责任的自治程度组织五级框架 | 自治层级不是更新对象，不与方法类别并列，也不自动作为论文评分 |
| [LobeHub Awesome RSI](https://github.com/lobehub/awesome-rsi) | 仓库创建日期本次未审计 | 覆盖模型、上下文、harness、具身、多智能体、自动研究、评测、安全等 | 作为覆盖检查；不把应用领域、更新对象、评测目标混成一条分类轴 |

Prism-Shadow最新survey与GDPevo有多位共同作者；两者的公开作者列表可直接核对。它是本次最贴近的参考，而不是碰巧名称相似的第三方清单。

## 为什么改掉原来的四域目录

Model/Data/Environment/Harness适合Agentic Robots的系统综述，但在这里会把更新对象、学习材料和运行场所混在一起。再加上“Embodied”“Recovery”“Frameworks”等交叉子类，读者很难判断同一篇应该放哪里。

新首页保留Surveys、Methods、Benchmarks、Verification四个论文入口；Methods下仅四类：Model、Memory and Skills、Harness、Data and Environments。后者合并样本较少的数据与任务/环境生成工作，是本清单的浏览折中，不宣称是survey原有分类。多对象方法只设一个主位置，其余信息保留在注释。

所有类别下直接显示论文表，不再加解释性caption、重复前缀或“这不是严格RSI”等逐节提醒。原始证据限制、成本和评测深度保留在metadata与阅读指南，不因首页变短而删除。

## GDPevo带来的约束

[GDPevo](https://arxiv.org/abs/2608.03764)把supervision type与evolution method明确分开。因此base/self/fewshot/reflect不是方法更新对象，不拿来和Model/Harness并列。它本身放Benchmarks；其技能式实验说明可保留技能的作用，但不单独证明skill creator或改进算法持续变强。

## 核查边界

Prism survey检查v1分类节及配套README；D2I检查公开框架、发布日期与仓库taxonomy；The Last AI检查v1框架，最新v3于2026-09-22发布但未完成逐版内容核对。三篇均不在本轮无依据标成主会录用，也不把不同survey的L1–L5定义拼成统一标准。
