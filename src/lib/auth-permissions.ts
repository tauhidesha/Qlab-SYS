// Ambil daftar email yang diizinkan dari environment variables
const getAllowedEmails = (): string[] => {
  const envEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAILS || '';
  console.log('[auth-permissions] NEXT_PUBLIC_ALLOWED_EMAILS env:', envEmails);
  return envEmails.split(',').map(email => email.trim()).filter(Boolean);
};

// Ambil daftar domain yang diizinkan dari environment variables
const getAllowedDomains = (): string[] => {
  const envDomains = process.env.NEXT_PUBLIC_ALLOWED_DOMAINS || '';
  console.log('[auth-permissions] NEXT_PUBLIC_ALLOWED_DOMAINS env:', envDomains);
  return envDomains.split(',').map(domain => domain.trim()).filter(Boolean);
};

// Fallback jika tidak ada environment variables
export const ALLOWED_EMAILS = getAllowedEmails().length > 0 ? getAllowedEmails() : [
  'admin@example.com',
  'boss@example.com', 
  'manager@example.com',
  // Tambahkan email default di sini jika perlu
];

export const ALLOWED_DOMAINS = getAllowedDomains().length > 0 ? getAllowedDomains() : [
  'yourdomain.com',
  'company.com',
  // Tambahkan domain default di sini jika perlu
];

console.log('[auth-permissions] Final ALLOWED_EMAILS:', ALLOWED_EMAILS);
console.log('[auth-permissions] Final ALLOWED_DOMAINS:', ALLOWED_DOMAINS);

// Function untuk cek apakah email diizinkan
export const isEmailAllowed = (email: string): boolean => {
  console.log('[auth-permissions] Checking email:', email);
  console.log('[auth-permissions] ALLOWED_EMAILS:', ALLOWED_EMAILS);
  console.log('[auth-permissions] ALLOWED_DOMAINS:', ALLOWED_DOMAINS);
  
  // Cek berdasarkan email spesifik
  if (ALLOWED_EMAILS.includes(email)) {
    console.log('[auth-permissions] Email found in ALLOWED_EMAILS');
    return true;
  }
  
  // Cek berdasarkan domain
  const emailDomain = email.split('@')[1];
  console.log('[auth-permissions] Email domain:', emailDomain);
  if (ALLOWED_DOMAINS.includes(emailDomain)) {
    console.log('[auth-permissions] Domain found in ALLOWED_DOMAINS');
    return true;
  }
  
  console.log('[auth-permissions] Email not allowed');
  return false;
};

// Function untuk cek apakah user diizinkan
export const isUserAllowed = (user: any): boolean => {
  if (!user?.email) {
    console.log('[auth-permissions] No email found in user object');
    return false;
  }
  
  console.log('[auth-permissions] Checking user email:', user.email);
  console.log('[auth-permissions] Against ALLOWED_EMAILS:', ALLOWED_EMAILS);
  console.log('[auth-permissions] Against ALLOWED_DOMAINS:', ALLOWED_DOMAINS);
  
  const result = isEmailAllowed(user.email);
  console.log('[auth-permissions] isEmailAllowed result:', result);
  
  return result;
};
