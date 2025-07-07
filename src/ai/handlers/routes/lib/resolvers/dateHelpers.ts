// File: app/ai/lib/resolvers/dateHelpers.ts

const dayNames: Record<number, string> = {
  0: 'Minggu',
  1: 'Senin',
  2: 'Selasa',
  3: 'Rabu',
  4: 'Kamis',
  5: 'Jumat',
  6: 'Sabtu',
};

const monthNames: Record<number, string> = {
  0: 'Januari',
  1: 'Februari',
  2: 'Maret',
  3: 'April',
  4: 'Mei',
  5: 'Juni',
  6: 'Juli',
  7: 'Agustus',
  8: 'September',
  9: 'Oktober',
  10: 'November',
  11: 'Desember',
};

export function getDayName(date: Date): string {
  return dayNames[date.getDay()];
}

export function formatDayName(date: Date): string {
  const day = getDayName(date);
  const dayNum = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day}, ${dayNum} ${month} ${year}`;
}
