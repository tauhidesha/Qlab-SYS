// File: src/ai/tools/createBookingTool.ts
// File ini HANYA berisi definisi tool untuk AI.
'use server';

export const createBookingToolDefinition = {
    type: 'function',
    function: {
        name: 'createBooking',
        description: 'Membuat booking baru di sistem setelah ketersediaan dikonfirmasi.',
        parameters: {
            type: 'object',
            properties: {
                customerPhone: { type: 'string', description: 'Nomor telepon pelanggan' },
                serviceName: { type: 'string', description: 'Nama layanan yang dibooking' },
                bookingDate: { type: 'string', description: 'Tanggal booking, format YYYY-MM-DD' },
                bookingTime: { type: 'string', description: 'Jam booking, format HH:mm' },
                vehicleInfo: { type: 'string', description: 'Informasi kendaraan, cth: "Vario 160 Merah"' },
            },
            required: ['customerPhone', 'serviceName', 'bookingDate', 'bookingTime', 'vehicleInfo'],
        }
    }
};
