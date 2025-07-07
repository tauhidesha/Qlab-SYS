// File: app/ai/lib/resolvers/formatDateTimeOutput.ts

const dayNames = [
  "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"
];

const monthNames = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

/**
 * Mengubah objek Date jadi format: "Sabtu, 6 Juli jam 10.00"
 */
export function formatDateTimeOutput(date: Date): string {
  const day = dayNames[date.getDay()];
  const dateNum = date.getDate();
  const month = monthNames[date.getMonth()];
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}, ${dateNum} ${month} jam ${hours}.${minutes}`;
}
