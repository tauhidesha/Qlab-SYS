export function formatEstimatedDuration(duration: string): string {
  // Misalnya input: "3 jam", "2-3 jam", "45 menit", dsb
  // Kita hanya memastikan formatnya kapitalisasi aja
  return duration
    .split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}
