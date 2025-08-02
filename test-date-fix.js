// Test script to verify the date fix works
console.log('=== Testing Date Context Fix ===');

const currentDate = new Date();
const currentDateString = currentDate.toLocaleDateString('id-ID', {
  weekday: 'long',
  year: 'numeric', 
  month: 'long',
  day: 'numeric'
});
const currentDateIso = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD format

console.log(`Current Date: ${currentDateString} (${currentDateIso})`);

// Simulate tomorrow's date (what "besok" should resolve to)
const tomorrow = new Date(currentDate);
tomorrow.setDate(currentDate.getDate() + 1);
const tomorrowIso = tomorrow.toISOString().split('T')[0];

console.log(`Tomorrow ("besok") should resolve to: ${tomorrowIso}`);

console.log('\n=== Date Context Message ===');
const dateContextMessage = `[INFORMASI TANGGAL HARI INI]
Tanggal hari ini: ${currentDateString} (${currentDateIso})
Gunakan informasi ini untuk menghitung tanggal relatif seperti "besok", "lusa", "minggu depan", dll.`;

console.log(dateContextMessage);
console.log('\n=== Test Complete ===');
