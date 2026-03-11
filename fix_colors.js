const fs = require('fs');
const path = 'd:/My Projects/resume_maker/src/components/ResumePreviewLayouts.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/className=\{`([^`]*)\$\{themeColorText\}([^`]*)`\}/g, (match, p1, p2) => {
  const cls = (p1 + p2).trim().replace(/\s+/g, ' ');
  return `className="${cls}" style={{ color: themeColorText }}`;
});

content = content.replace(/className=\{`([^`]*)\$\{themeColorBg\}([^`]*)`\}/g, (match, p1, p2) => {
  const cls = (p1 + p2).trim().replace(/\s+/g, ' ');
  return `className="${cls}" style={{ backgroundColor: themeColorBg }}`;
});

content = content.replace(/className=\{`([^`]*)\$\{themeColorBorder\}([^`]*)`\}/g, (match, p1, p2) => {
  const cls = (p1 + p2).trim().replace(/\s+/g, ' ');
  return `className="${cls}" style={{ borderColor: themeColorBorder }}`;
});

// Also replace cases where they are concatenated in arrays or mixed, but wait, the regex above handles the simple cases. Let's see if there are others.

fs.writeFileSync(path, content, 'utf8');
console.log('Done');
