/** Resume builder — URL + sessionStorage must agree so refresh/deep links work */
export const RESUME_BASE = '/resume';
export const RESUME_EDIT = '/resume/edit';
export const RESUME_PREVIEW = '/resume/preview';
export const RESUME_STORAGE_KEY = 'eco_resume_builder_draft';

/** Cover letter builder */
export const COVER_LETTER_BASE = '/cover-letter';
export const COVER_LETTER_EDIT = '/cover-letter/edit';
export const COVER_LETTER_PREVIEW = '/cover-letter/preview';
export const COVER_LETTER_STORAGE_KEY = 'eco_cover_letter_builder_draft';

export function stepFromResumePath(pathname: string): BuilderStep {
  if (pathname.endsWith('/preview')) return 'preview';
  if (pathname.endsWith('/edit')) return 'edit';
  return 'template';
}

export function stepFromCoverLetterPath(pathname: string): BuilderStep {
  if (pathname.endsWith('/preview')) return 'preview';
  if (pathname.endsWith('/edit')) return 'edit';
  return 'template';
}
