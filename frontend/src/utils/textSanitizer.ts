/**
 * Sanitizes text by replacing common encoding issues and special characters
 * with their standard ASCII equivalents
 */
export function sanitizeText(text: string | null | undefined): string {
  if (!text) return '';

  return text
    // Replace smart quotes with regular quotes
    .replace(/[\u2018\u2019]/g, "'")  // Single smart quotes
    .replace(/[\u201C\u201D]/g, '"')  // Double smart quotes
    // Replace em dash and en dash
    .replace(/[\u2013\u2014]/g, '-')
    // Replace ellipsis
    .replace(/\u2026/g, '...')
    // Replace non-breaking space
    .replace(/\u00A0/g, ' ')
    // Replace any remaining problematic characters that show as diamonds
    .replace(/\uFFFD/g, "'")
    // Clean up any other common encoding issues
    .replace(/�/g, "'");
}
