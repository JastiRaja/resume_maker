const fs = require('fs');
const path = require('path');

const targetPath = path.resolve(__dirname, 'src/components/ResumePreviewLayouts.tsx');
let content = fs.readFileSync(targetPath, 'utf8');

// Replace standard cases for text, bg, border
const textRegex = new RegExp('className=\\{`([^`]*)\\\\$\\{themeColorText\\}([^`]*)`\\}', 'g');
let count = 0;
content = content.replace(textRegex, (match, p1, p2) => {
    count++;
    const cls = `${p1} ${p2}`.replace(/\s+/g, ' ').trim();
    if (!cls) return `style={{ color: themeColorText }}`;
    return `className="${cls}" style={{ color: themeColorText }}`;
});
console.log(`Replaced ${count} text usages.`);

const bgRegex = new RegExp('className=\\{`([^`]*)\\\\$\\{themeColorBg\\}([^`]*)`\\}', 'g');
count = 0;
content = content.replace(bgRegex, (match, p1, p2) => {
    count++;
    const cls = `${p1} ${p2}`.replace(/\s+/g, ' ').trim();
    if (!cls) return `style={{ backgroundColor: themeColorBg }}`;
    return `className="${cls}" style={{ backgroundColor: themeColorBg }}`;
});
console.log(`Replaced ${count} bg usages.`);

const borderRegex = new RegExp('className=\\{`([^`]*)\\\\$\\{themeColorBorder\\}([^`]*)`\\}', 'g');
count = 0;
content = content.replace(borderRegex, (match, p1, p2) => {
    count++;
    const cls = `${p1} ${p2}`.replace(/\s+/g, ' ').trim();
    if (!cls) return `style={{ borderColor: themeColorBorder }}`;
    return `className="${cls}" style={{ borderColor: themeColorBorder }}`;
});
console.log(`Replaced ${count} border usages.`);

// Manual fixes for edge cases if any
content = content.replace(/className="([a-zA-Z0-9\s-]+)" style=\{\{ color: themeColorText \}\} text-sm hover:underline font-medium`/g, '...');

fs.writeFileSync(targetPath, content, 'utf8');
console.log('Done transforming ResumePreviewLayouts.tsx');
