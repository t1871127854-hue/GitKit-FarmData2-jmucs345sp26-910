#!/usr/bin/env node
/**
 * 批量修复 GitHub Issues
 * 修复剩余 7 个拼写错误
 */

const fs = require('fs');
const path = require('path');

const workspace = process.cwd();

// 修复任务列表
const fixes = [
  {
    issue: '#14',
    file: 'INSTALL.md',
    old: 'comman',
    new: 'command',
    desc: 'Fix typo in "command"'
  },
  {
    issue: '#35',
    file: 'ONBOARDING.md',
    old: 'initializtion',
    new: 'initialization',
    desc: 'Fix typo in "initialization"'
  },
  {
    issue: '#31',
    file: 'ONBOARDING.md',
    old: 'activites',
    new: 'activities',
    desc: 'Fix typo in "activities"'
  },
  {
    issue: '#29',
    file: 'CONTRIBUTING.md',
    old: 'FarmdData2',
    new: 'FarmData2',
    desc: 'Fix typo in "FarmData2"'
  },
  {
    issue: '#28',
    file: 'CONTRIBUTING.md',
    old: 'Covenent',
    new: 'Covenant',
    desc: 'Fix typo in "Covenant"'
  },
  {
    issue: '#25',
    file: 'INSTALL.md',
    old: 'Intallling',
    new: 'Installing',
    desc: 'Fix typo in "Installing"'
  },
  {
    issue: '#7',
    file: 'ONBOARDING.md',
    old: 'ext field',
    new: 'text field',
    desc: 'Fix Missing "t" Typo'
  }
];

console.log('🔧 批量修复 GitHub Issues\n');
console.log(`📋 任务列表：${fixes.length} 个\n`);

const results = [];

fixes.forEach((fix, index) => {
  const filePath = path.join(workspace, fix.file);
  
  console.log(`[${index + 1}/${fixes.length}] Issue ${fix.issue}: ${fix.desc}`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`   ⚠️  文件不存在：${fix.file}\n`);
    results.push({ ...fix, success: false, error: '文件不存在' });
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const regex = new RegExp(fix.old, 'g');
  const matches = content.match(regex);
  
  if (!matches) {
    console.log(`   ⚠️  未找到 "${fix.old}"\n`);
    results.push({ ...fix, success: false, error: '未找到匹配' });
    return;
  }
  
  console.log(`   📍 找到 ${matches.length} 处 "${fix.old}"`);
  
  const newContent = content.replace(regex, fix.new);
  fs.writeFileSync(filePath, newContent, 'utf-8');
  
  console.log(`   ✅ 修复完成：${fix.old} → ${fix.new}\n`);
  
  results.push({ ...fix, success: true, count: matches.length });
});

// 统计
console.log('━━━━━━━━━━━━━━━━━━━');
console.log('📊 修复统计');
console.log('━━━━━━━━━━━━━━━━━━━\n');

const successCount = results.filter(r => r.success).length;
console.log(`✅ 成功：${successCount}/${fixes.length}`);

if (successCount > 0) {
  console.log('\n📝 修改文件：');
  const modifiedFiles = [...new Set(results.filter(r => r.success).map(r => r.file))];
  modifiedFiles.forEach(file => {
    console.log(`   - ${file}`);
  });
}

console.log('\n✅ 准备提交...\n');
