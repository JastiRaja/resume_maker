const fs = require('fs');
const path = require('path');

// Extract templates from src/data/resumeTemplates.ts
const content = fs.readFileSync(path.join(__dirname, '../src/data/resumeTemplates.ts'), 'utf8');

// Match resumeTemplates array
const jsonMatch = content.match(/const resumeTemplatesBase: ResumeTemplate\[\] = (\[[\s\S]*?\n\]);/);

if (!jsonMatch) {
  console.error('Could not find resumeTemplatesBase');
  process.exit(1);
}

let templates;
try {
  templates = eval(jsonMatch[1]);
} catch (e) {
  console.error('Failed to parse templates:', e);
  process.exit(1);
}

const ACTION_VERBS = new Set([
  'architected', 'engineered', 'spearheaded', 'orchestrated', 'mentored', 'optimized',
  'integrated', 'delivered', 'designed', 'built', 'developed', 'led', 'implemented',
  'managed', 'established', 'automated', 'streamlined', 'generated', 'scaled',
  'championed', 'transformed', 'formulated', 'negotiated', 'directed', 'curated',
  'executed', 'pioneered', 'launched', 'improved', 'increased', 'reduced', 'created'
]);

function evaluateATSScore(template) {
  const data = template.sampleData;
  let score = 0;
  const breakdown = {};
  const strengths = [];
  const improvements = [];

  // 1. Contact Info (Max 15 pts)
  let contactScore = 0;
  if (data.personalInfo?.firstName && data.personalInfo?.lastName) contactScore += 3;
  if (data.personalInfo?.title) contactScore += 3;
  if (data.personalInfo?.email) contactScore += 3;
  if (data.personalInfo?.phone) contactScore += 2;
  if (data.personalInfo?.location) contactScore += 2;
  if (data.personalInfo?.linkedin || data.personalInfo?.website) contactScore += 2;
  breakdown.contact = contactScore;
  score += contactScore;

  // 2. Summary (Max 15 pts)
  let summaryScore = 0;
  if (data.summary && data.summary.trim().length > 0) {
    summaryScore += 5;
    const words = data.summary.trim().split(/\s+/).length;
    if (words >= 25 && words <= 120) summaryScore += 5;
    else if (words > 15) summaryScore += 3;
    
    // Check for metrics/numbers in summary
    if (/\d+[\w%$\+]*|\$\d+/.test(data.summary)) {
      summaryScore += 5;
      strengths.push('Summary includes quantifiable metrics');
    } else {
      improvements.push('Add quantifiable achievements in summary');
    }
  } else {
    improvements.push('Missing professional summary');
  }
  breakdown.summary = summaryScore;
  score += summaryScore;

  // 3. Work Experience (Max 30 pts)
  let expScore = 0;
  const experiences = data.experience || [];
  if (experiences.length > 0) {
    expScore += 10;
    
    // Check bullet points for action verbs and metrics
    let totalBullets = 0;
    let actionVerbBullets = 0;
    let metricBullets = 0;

    experiences.forEach(exp => {
      (exp.description || []).forEach(b => {
        totalBullets++;
        const firstWord = b.trim().split(/\s+/)[0]?.toLowerCase().replace(/[^\w]/g, '');
        if (ACTION_VERBS.has(firstWord)) actionVerbBullets++;
        if (/\d+[\w%$\+]*|\$\d+/.test(b)) metricBullets++;
      });
    });

    if (totalBullets > 0) {
      const actionRatio = actionVerbBullets / totalBullets;
      if (actionRatio >= 0.7) expScore += 10;
      else if (actionRatio >= 0.4) expScore += 6;
      else expScore += 3;

      const metricRatio = metricBullets / totalBullets;
      if (metricRatio >= 0.6) expScore += 10;
      else if (metricRatio >= 0.3) expScore += 6;
      else expScore += 3;
    }
  } else {
    // Fresher templates might rely on projects/education instead
    if (template.category === 'Fresher' || template.id.includes('fresher') || template.id === 'entry-level') {
      expScore += 20; // Compensated by Projects & Academics
    }
  }
  breakdown.experience = expScore;
  score += expScore;

  // 4. Skills & Keywords (Max 20 pts)
  let skillsScore = 0;
  const skills = data.skills || [];
  if (skills.length >= 8) skillsScore += 10;
  else if (skills.length >= 4) skillsScore += 6;
  else if (skills.length > 0) skillsScore += 3;

  const hasCategories = skills.some(s => s.category && s.category.trim().length > 0);
  const hasLevels = skills.some(s => s.level && s.level.trim().length > 0);
  if (hasCategories || hasLevels) skillsScore += 10;
  else skillsScore += 5;
  breakdown.skills = skillsScore;
  score += skillsScore;

  // 5. Education & Projects (Max 20 pts)
  let eduProjScore = 0;
  const education = data.education || [];
  if (education.length > 0) {
    eduProjScore += 10;
  }
  const projects = data.projects || [];
  if (projects.length > 0) {
    eduProjScore += 10;
  }
  breakdown.educationAndProjects = eduProjScore;
  score += eduProjScore;

  return {
    id: template.id,
    name: template.name,
    category: template.category,
    score: Math.min(100, score),
    breakdown,
    strengths,
    improvements
  };
}

console.log('='.repeat(90));
console.log('RESUME ATS READINESS & SCORECARD AUDIT');
console.log('='.repeat(90));

const results = templates.map(evaluateATSScore);

console.log(
  'Template Name'.padEnd(32) +
  'Category'.padEnd(16) +
  'Contact'.padEnd(10) +
  'Summary'.padEnd(10) +
  'Exp'.padEnd(8) +
  'Skills'.padEnd(10) +
  'Edu/Proj'.padEnd(10) +
  'Total Score'
);
console.log('-'.repeat(90));

let totalSum = 0;
results.forEach(r => {
  totalSum += r.score;
  const badge = r.score >= 90 ? '🌟 EXCELLENT' : r.score >= 80 ? '✅ GOOD' : '⚠️ FAIR';
  console.log(
    r.name.padEnd(32) +
    r.category.padEnd(16) +
    `${r.breakdown.contact}/15`.padEnd(10) +
    `${r.breakdown.summary}/15`.padEnd(10) +
    `${r.breakdown.experience}/30`.padEnd(8) +
    `${r.breakdown.skills}/20`.padEnd(10) +
    `${r.breakdown.educationAndProjects}/20`.padEnd(10) +
    `${r.score}/100  ${badge}`
  );
});

const avgScore = (totalSum / results.length).toFixed(1);
console.log('='.repeat(90));
console.log(`Audited ${results.length} Resume Templates | Average ATS Score: ${avgScore}/100`);
console.log('='.repeat(90));
