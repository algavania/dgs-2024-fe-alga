/**
 * Formats a given ISO date string to 'dd MMMM yyyy' format.
 * Example: '2024-09-08T12:09:55.268Z' -> '08 September 2024'
 *
 * @param isoString - The ISO date string to be formatted.
 * @returns A string representing the formatted date.
 */
export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const getCurrentFormattedDate = (): string => {
  const currentDate = new Date();
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(currentDate);
};
