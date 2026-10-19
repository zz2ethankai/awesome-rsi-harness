# Agentic RSI 阅读指南

首页分类已精简为Surveys、Methods、Benchmarks和Verification；[同期survey对照](RELATED_SURVEYS_ZH.md)记录分类依据。

## 阅读顺序

先读[Rethinking Harness Evolution](https://arxiv.org/abs/2607.12227)，明确同预算与新任务测试，再读[Self-Evolving Agent Harness](https://arxiv.org/abs/2610.18813)区分更新对象和接受规则。随后看[Harness²](https://arxiv.org/abs/2610.14224)、[SwarmRSI](https://arxiv.org/abs/2610.20431)、[WorkRover](https://arxiv.org/abs/2610.18067)、[Verifier Hardening](https://arxiv.org/abs/2610.15924)，最后进入具体领域。

具身方向优先CoDA、EMHO、CarryOn、RSI-Nav、VLAW和EmbodiedCLBench。软件与训练方向优先Cortex、VIEWCRAFT、ReTerm、RSIPO和ClawLoop。优先级表示主题相关性，不是质量或效果排行榜。

## 分类时要区分什么

| 层次 | 核心问题 |
| --- | --- |
| 持久适应 | 哪些权重、技能、记忆、程序或环境被后续运行继承？ |
| 改进器适应候选 | 经验是否还改变以后怎样提案、诊断、选数据或接受更新？ |
| 改进过程变强的证据 | 冻结或等预算对照下，新任务上的改进速度、收益或成本是否更好？ |
| 评测与支撑 | 是测量工具或基础设施，还是已经展示上述机制和收益？ |

这些不是单一成熟度排行榜。固定循环也可能有效，但不能因此断言系统改进了自己的改进算法。

## 容易误读的结果

- [Harness² §4](https://arxiv.org/html/2610.14224v1)：部分改进库复用是回顾性测试，不等于纯在线适应。
- [SwarmRSI AppendixC.2](https://arxiv.org/html/2610.20431v1)：有12个held-out任务和3seeds的继承实验，但代数与已见源任务数量一起增加。
- [WorkRover方法](https://arxiv.org/html/2610.18067v1)：FCR选的是已测候选中的最小有效修复，并非全局最小；修复verifier不能放宽原任务语义。
- [CarryOn Tables3–5](https://arxiv.org/html/2610.21453v1)：80%恢复结果包含累计反思和重试，不是冻结技能后的等预算独立首轮成功率；仿真安全率不混作真机数据。
- [Terminal-RSI §5](https://arxiv.org/html/2610.22192v1)：奖励、初始化和学习率共同改变，作者明确指出组件归因还需要匹配计算的对照。
- [Doc2Harness](https://arxiv.org/html/2610.20344v1)：mock驱动的契约测试衡量harness工程正确性，不直接等于真实agent的最终任务能力。
- [VLAW v2](https://arxiv.org/html/2602.12063v2)：阈值筛选减少误收也减少召回；摘要39.2个百分点与表2均值差40.8个百分点的口径尚未解释，不混用。

## 每篇的最小证据卡

记录改什么、反馈从哪来、保留什么、谁批准、如何防回归、所有成本、独立测什么、task/来源簇/seed分母、对照对象和证据缺口。未知不是没有；正文核查不是独立复现；作者命名为RSI也不替代机制判断。
