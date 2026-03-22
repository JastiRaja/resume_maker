/**
 * Single source of truth: which resume template id uses which layout family.
 * ResumePreview and ResumePDF must stay in sync — import from here only.
 */
export const RESUME_TWO_COLUMN_TEMPLATE_IDS = [
  'creative-designer',
  'tech-innovator',
  'entry-level',
  'navy-professional',
  'charcoal-executive',
  'forest-modern',
] as const;

export const RESUME_CENTERED_TEMPLATE_IDS = [
  'executive-premium',
  'minimalist-elegant',
  'academic-researcher',
  'marketing-specialist',
] as const;

export function isTwoColumnResumeTemplate(templateId: string): boolean {
  return (RESUME_TWO_COLUMN_TEMPLATE_IDS as readonly string[]).includes(templateId);
}

export function isCenteredResumeTemplate(templateId: string): boolean {
  return (RESUME_CENTERED_TEMPLATE_IDS as readonly string[]).includes(templateId);
}
