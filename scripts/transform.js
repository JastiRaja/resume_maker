const fs = require('fs');
const path = require('path');

const targetPath = path.resolve(__dirname, '..', 'src', 'components', 'ResumePreviewLayouts.tsx');
let content = fs.readFileSync(targetPath, 'utf8');

let countText = 0;
// Replace className={`... ${themeColorText} ...`}
content = content.replace(/className=\{`([^`]*)\$\{themeColorText\}([^`]*)`}/g, (match, before, after) => {
    countText++;
    const classes = (before + after).replace(/\s+/g, ' ').trim();
    if (classes) return `className="${classes}" style={{ color: themeColorText }}`;
    return `style={{ color: themeColorText }}`;
});

let countBg = 0;
// Replace className={`... ${themeColorBg} ...`}
content = content.replace(/className=\{`([^`]*)\$\{themeColorBg\}([^`]*)`}/g, (match, before, after) => {
    countBg++;
    const classes = (before + after).replace(/\s+/g, ' ').trim();
    if (classes) return `className="${classes}" style={{ backgroundColor: themeColorBg }}`;
    return `style={{ backgroundColor: themeColorBg }}`;
});

let countBorder = 0;
// Replace className={`... ${themeColorBorder} ...`}
content = content.replace(/className=\{`([^`]*)\$\{themeColorBorder\}([^`]*)`}/g, (match, before, after) => {
    countBorder++;
    const classes = (before + after).replace(/\s+/g, ' ').trim();
    if (classes) return `className="${classes}" style={{ borderColor: themeColorBorder }}`;
    return `style={{ borderColor: themeColorBorder }}`;
});

console.log(`Replaced Text: ${countText}, Bg: ${countBg}, Border: ${countBorder}`);

fs.writeFileSync(targetPath, content, 'utf8');
