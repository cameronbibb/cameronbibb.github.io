/**
 * Formats a work entry's year range.
 * An absent endYear means the work is ongoing.
 *
 *   formatYears(2024)        // "2024"
 *   formatYears(2022, 2023)  // "2022–2023"
 *   formatYears(2025)        // "2025–Present"
 */
export function formatYears(startYear: number, endYear?: number): string {
  if (endYear === undefined) return `${startYear}–Present`;
  if (endYear === startYear) return `${startYear}`;
  return `${startYear}–${endYear}`;
}
