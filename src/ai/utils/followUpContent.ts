import deskripsiLayanan from "@/data/deskripsiLayanan";

// Tipe untuk objek layanan kita
interface Service {
    name: string;
    category: string;
    summary: string;
    description: string;
}

const services: Service[] = deskripsiLayanan;

// Fungsi untuk mengambil cuplikan edukasi
export function getEducationalSnippet(serviceName: string): string | null {
    if (!serviceName) return null;

    // --- PERBAIKAN: Bersihkan nama layanan dari karakter aneh ---
    const cleanedServiceName = serviceName.replace(/"/g, '').trim();
    // -----------------------------------------------------------

    const service = services.find(s => s.name === cleanedServiceName); // <-- Gunakan nama yang sudah bersih
    if (!service || !service.description) return null;

    const match = service.description.match(/Buat apa sih\? ([^.!?]+[.!?])/);
    return match ? match[1].trim() : service.summary;
}


// Fungsi untuk menentukan Plan B (Downsell)
export function getDownsellOption(serviceName: string): { name: string; category: string } | null {
    const service = services.find(s => s.name === serviceName);
    if (!service) return null;

    switch (service.category) {
        case 'coating':
            return { name: 'Full Detailing Glossy', category: 'detailing' };
        case 'repaint':
            // Jika repaint full body, tawarkan poles
            if (service.name.toLowerCase().includes('bodi halus')) {
                return { name: 'Poles Bodi Glossy', category: 'detailing' };
            }
            return null; // Tidak ada downsell untuk repaint kecil
        case 'detailing':
             // Jika Full Detailing, tawarkan yang lebih simpel
            if (service.name.toLowerCase().includes('full detailing')) {
                 return { name: 'Cuci Premium', category: 'cuci' };
            }
            return null;
        default:
            return null;
    }
}