/**
 * Formats a given number into Indonesian Rupiah currency format.
 * Example: 1500000 -> 'Rp1.500.000'
 *
 * @param amount - The number to be formatted.
 * @returns A string representing the formatted currency in Rupiah.
 */
export const formatRupiah = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0, // No decimal points for whole numbers
    }).format(amount);
  };
  