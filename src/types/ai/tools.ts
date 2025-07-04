/**
 * Mendefinisikan tipe-tipe data yang menjadi hasil kembalian (return types)
 * dari berbagai fungsi "tool" yang dipanggil oleh AI.
 * Menggunakan discriminated unions untuk type safety yang lebih baik.
 */

// --- Tipe untuk getMotorSizeDetails (DIPERBAIKI & KONSISTEN) ---
export interface SizeDetails {
  motor_model: string;
  general_size: string;
  repaint_size:string;
}

type MotorSizeSuccess = {
  details: SizeDetails;
  error?: undefined;
};

// Kumpulan semua kemungkinan error untuk ukuran motor
type MotorSizeError =
  | { error: 'ambiguous_motor'; ambiguous_options: string[]; }
  // HILIGHT: Menggunakan pola error generik yang sama seperti GetPriceResult
  | { error: 'generic_error'; message: string; };

export type GetMotorSizeResult = MotorSizeSuccess | MotorSizeError;


// --- Tipe untuk getSpecificServicePrice (Sudah Benar) ---
export interface PriceDetails {
    service_name: string;
    motor_model: string;
    motor_size: string;
    price: number;
    estimated_duration?: string;
    note?: string; // <-- TAMBAHKAN INI
}

type PriceSuccess = PriceDetails & { error?: undefined; };

// Perbaikan (Lengkap)
type PriceError =
  | { error: 'ambiguous_motor'; ambiguous_options: string[]; service_name_input: string; }
  | { error: 'price_not_available_for_size'; service_name: string; motor_size: string; }
  | { error: 'requires_human_assistance'; message: string; } // <-- TAMBAHKAN BARIS INI
  | { error: 'generic_error'; message: string; };

export type GetPriceResult = PriceSuccess | PriceError;