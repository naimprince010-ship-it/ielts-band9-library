import DOMPurify from 'dompurify';

/**
 * Sanitize HTML before rendering via dangerouslySetInnerHTML.
 * Allows standard formatting tags but strips scripts, event handlers, etc.
 *
 * Usage:
 *   dangerouslySetInnerHTML={{ __html: sanitizeHtml(untrustedString) }}
 */
export function sanitizeHtml(dirty: string | undefined | null): string {
  if (!dirty) return '';
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'b', 'i', 'u', 's',
      'ul', 'ol', 'li',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'span', 'div', 'blockquote', 'pre', 'code',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'a', 'img',
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel'],
    FORBID_SCRIPTS: true,
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'style'],
  });
}
