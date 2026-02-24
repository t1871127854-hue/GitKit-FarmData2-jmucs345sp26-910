#!/usr/bin/env node
/**
 * 实战：修复 GitHub Issue #5
 * 修复 ONBOARDING.md 中的 "comonent" → "component"
 */

const fs = require('fs');
const path = require('path');

const workspace = process.cwd();
const file = path.join(workspace, 'ONBOARDING.md');

console.log('🔧 修复 Issue #5: Fix "comonent" Typo\n');

// 读取文件
const content = fs.readFileSync(file, 'utf-8');

// 查找并替换
const oldText = 'comonent';
const newText = 'component';

const regex = new RegExp(oldText, 'g');
const matches = content.match(regex);

if (!matches) {
  console.log('❌ 未找到拼写错误');
  process.exit(1);
}

console.log(`📍 找到 ${matches.length} 处 "${oldText}"`);

// 替换
const newContent = content.replace(regex, newText);
fs.writeFileSync(file, newContent, 'utf-8');

console.log(`✅ 修复完成：${oldText} → ${newText}\n`);

// 显示修改位置
const lines = newContent.split('\n');
lines.forEach((line, index) => {
  if (line.includes(newText)) {
    console.log(`   第 ${index + 1} 行：...${line.trim()}...`);
  }
});

console.log('\n✅ 准备提交...\n');
