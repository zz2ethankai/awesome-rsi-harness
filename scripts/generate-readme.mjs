import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'data/papers.json'), 'utf8'));
const taxonomy = JSON.parse(fs.readFileSync(path.join(root, 'data/taxonomy.json'), 'utf8'));
const capabilityMap = JSON.parse(fs.readFileSync(path.join(root, 'data/capability-map.json'), 'utf8'));
const mapped = new Map(capabilityMap.papers.map(p => [p.id, p]));
assert.equal(mapped.size, capabilityMap.papers.length, 'Duplicate map IDs');
for (const p of mapped.values()) assert(capabilityMap.levels.some(l => l.id === p.level), `Unknown map level: ${p.id}`);
// The PPT and embodied index share the same classification source.
for (const domain of taxonomy) {
  if (domain.domain === 'Methods') domain.domain = 'General Methods';
  for (const group of domain.groups) group.ids = group.ids.filter(id => !mapped.has(id));
}
taxonomy.unshift({domain:'Embodied RSI', groups:capabilityMap.levels.map(level => ({
  name:level.name, ids:capabilityMap.papers.filter(p => p.level === level.id).map(p => p.id)
}))});
const papers = new Map(catalog.papers.map(p => [p.id, p]));
assert.equal(papers.size, catalog.papers.length, 'Duplicate paper IDs');
const audit = JSON.parse(fs.readFileSync(path.join(root, 'data/content-audit.json'), 'utf8'));
const audited = new Map(audit.papers.map(p => [p.id, p]));
assert.equal(audited.size, audit.papers.length, 'Duplicate audit IDs');
assert.deepEqual([...audited.keys()].sort(), [...papers.keys()].sort(), 'Audit must cover exactly the catalog');
for (const [id, record] of audited) {
  assert(Object.hasOwn(audit.meta_path_values, record.meta_path), `Unknown meta path: ${id}`);
  assert(Array.isArray(record.targets) && record.role && record.retained && record.feedback && record.test && record.gap, `Incomplete audit: ${id}`);
  Object.assign(papers.get(id), { content_role: record.role, update_targets: record.targets, meta_path: record.meta_path });
  papers.get(id).capability_level = mapped.get(id)?.level ?? null;
}
for (const [id, update] of Object.entries(audit.review_updates)) {
  assert(papers.has(id), `Unknown review update: ${id}`);
  Object.assign(papers.get(id), update, { checked: 'sections' });
}
const placed = new Set();
const safe = value => String(value).replaceAll('|', '\\|').replaceAll('\n', ' ');
const lines = [];
for (const domain of taxonomy) {
  lines.push(`## ${domain.domain}`, '');
  for (const group of domain.groups) {
    if (group.name) lines.push(`### ${group.name}`, '');
    if (!group.ids.length) {
      lines.push(group.name?.startsWith('L4') ? 'No entry with sufficient evidence yet.' : 'No curated entry yet.', '');
      continue;
    }
    lines.push('| Paper Title | Code |', '| --- | --- |');
    for (const id of group.ids) {
      const p = papers.get(id);
      assert(p, `Unknown paper: ${id}`);
      assert(!placed.has(id), `Duplicate primary placement: ${id}`);
      placed.add(id);
      p.domain = domain.domain;
      p.subtopic = group.name;
      assert.equal(new URL(p.paper_url).protocol, 'https:');
      if (p.code) assert.equal(new URL(p.code).hostname, 'github.com');
      lines.push(`| [${safe(p.title)}](${p.paper_url}) | ${p.code ? `[Code](${p.code})` : '-'} |`);
    }
    lines.push('');
  }
}
assert.equal(placed.size, papers.size, 'Every paper needs a primary placement');
catalog.coverage.selected = papers.size;
catalog.coverage.selected_from_window = catalog.papers.filter(p => p.hf_observed_dates.length).length;
const readmePath = path.join(root, 'README.md');
const current = fs.readFileSync(readmePath, 'utf8');
const begin = '<!-- BEGIN PAPER TABLES -->';
const end = '<!-- END PAPER TABLES -->';
assert.equal(current.split(begin).length, 2);
assert.equal(current.split(end).length, 2);
assert(current.indexOf(begin) < current.indexOf(end));
const generated = current.slice(0, current.indexOf(begin) + begin.length) + '\n\n' + lines.join('\n') + '\n' + current.slice(current.indexOf(end));
const slugs = new Set([...generated.matchAll(/^#+ (.+)$/gm)].map(m => m[1].toLowerCase().replace(/[^\p{L}\p{N}_\s-]/gu, '').replaceAll(' ', '-')));
const plannedExports = new Set(['data/papers.csv', 'data/papers.ris', 'data/content-audit.csv', 'docs/PAPER_MATRIX_ZH.md']);
for (const [, target] of generated.matchAll(/\]\(([^)]+)\)/g)) {
  if (target.startsWith('#')) assert(slugs.has(target.slice(1)), `Broken anchor: ${target}`);
  else if (!target.startsWith('https://')) assert(plannedExports.has(target) || fs.existsSync(path.join(root, target)), `Missing file: ${target}`);
}
const fields = ['id', 'title', 'domain', 'subtopic', 'first_publication_date', 'hf_observed_dates', 'checked', 'note', 'paper_url', 'code'];
const cell = value => '"' + String(Array.isArray(value) ? value.join('; ') : value ?? '').replaceAll('"', '""') + '"';
const csv = '\ufeff' + [fields, ...catalog.papers.map(p => fields.map(k => p[k]))].map(row => row.map(cell).join(',')).join('\n') + '\n';
const auditFields = ['id', 'title', 'role', 'targets', 'retained', 'feedback', 'meta_path', 'test', 'gap', 'checked', 'source'];
const auditRows = audit.papers.map(a => ({ ...a, title: papers.get(a.id).title, checked: papers.get(a.id).checked, source: papers.get(a.id).paper_url }));
const auditCsv = '\ufeff' + [auditFields, ...auditRows.map(p => auditFields.map(k => p[k]))].map(row => row.map(cell).join(',')).join('\n') + '\n';
const matrix = ['# RSI 逐篇证据矩阵', '', `核查日期：${audit.accessed_on}。共${papers.size}项，包含survey、方法、支撑研究与评测。不是严格RSI的数量统计。`, '', 'meta_path表示机制路径，不是成熟度等级。abstract条目尚未逐节核验；sections只表示所列章节；没有独立复现。编码定义见[审计数据](../data/content-audit.json)，分析见[内容体系](CONTENT_SYSTEM_ZH.md)。', '', '| 工作 | 角色/核查深度 | 持久对象与反馈 | 改进路径 | 测试与主要缺口 |', '| --- | --- | --- | --- | --- |', ...auditRows.map(a => `| [${safe(a.title)}](${a.source}) | ${a.role}; ${a.checked} | ${safe(a.retained)}；${safe(a.feedback)} | ${a.meta_path} | ${safe(a.test)}；${safe(a.gap)} |`), ''].join('\n');
const ris = catalog.papers.map(p => ['TY  - RPRT', `TI  - ${p.title}`, `UR  - ${p.paper_url}`, `L1  - ${p.pdf_url}`, ...(p.first_publication_date ? [`DA  - ${p.first_publication_date.replaceAll('-', '/')}`] : []), `AN  - ${p.id.includes(':') ? p.id : 'arXiv:' + p.id}`, `KW  - RSI`, `KW  - ${p.domain}`, `N1  - ${p.note}`, 'ER  -'].join('\n')).join('\n\n') + '\n';
const outputs = new Map([[readmePath, generated], [path.join(root, 'data/papers.csv'), csv], [path.join(root, 'data/papers.ris'), ris], [path.join(root, 'data/papers.json'), JSON.stringify(catalog, null, 2) + '\n'], [path.join(root, 'data/content-audit.csv'), auditCsv], [path.join(root, 'docs/PAPER_MATRIX_ZH.md'), matrix]]);
// Check local links against all intended outputs before writing any file.
for (const target of ['data/papers.csv', 'data/papers.ris']) assert(outputs.has(path.join(root, target)));
for (const [file, content] of outputs) {
  if (process.argv.includes('--check')) assert.equal(fs.readFileSync(file, 'utf8'), content, `Stale generated file: ${file}`);
  else fs.writeFileSync(file, content);
}
console.log(`${process.argv.includes('--check') ? 'Validated' : 'Generated'} ${papers.size} papers across ${taxonomy.length} tracks.`);
