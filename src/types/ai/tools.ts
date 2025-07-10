/**
 * Mendefinisikan tipe-tipe data yang menjadi hasil kembalian (return types)
 * dari berbagai fungsi "tool" yang dipanggil oleh AI.
 * Menggunakan discriminated unions untuk type safety yang lebih baik.
 */

// --- Tipe untuk getMotorSizeDetails ---
export interface SizeDetails {
  motor_model: string;
  general_size: string;
  repaint_size: string;
}

type MotorSizeSuccess = {
  success: true;
  details: SizeDetails;
  summary?: string;
  error?: undefined;
};

type MotorSizeError =
  | { success: false; error: 'ambiguous_motor'; message: string; ambiguous_options: string[]; }
  | { success: false; error: 'generic_error'; message: string; };

export type GetMotorSizeResult = MotorSizeSuccess | MotorSizeError;


// --- Tipe untuk getSpecificServicePrice ---
export interface PriceDetails {
  service_name: string;
  motor_model?: string;
  motor_size: string;
  price: number;
  estimated_duration?: string;
  note?: string;
}

// PERBAIKAN DI SINI
type PriceSuccess = PriceDetails & {
  success: true;
  summary?: string; // <-- TAMBAHKAN PROPERTI INI
  error?: undefined;
};

type PriceError =
  | { success: false; error: 'ambiguous_motor'; message: string; ambiguous_options: string[]; service_name_input: string; }
  | { success: false; error: 'price_not_available_for_size'; message: string; service_name: string; motor_size: string; }
  | { success: false; error: 'requires_human_assistance'; message: string; }
  | { success: false; error: 'generic_error'; message: string; };

export type GetPriceResult = PriceSuccess | PriceError;


// --- Tipe untuk findNextAvailableSlot ---
export interface FormattedSlot {
  date: string;
  time: string;
  day: string;
}

// Bentuk kembalian jika SUKSES
type FindSlotSuccess = {
  success: true;
  availableSlots: FormattedSlot[];
  requestedDate: string | null;
  reason?: undefined;
};

// Bentuk kembalian jika GAGAL
type FindSlotError = {
  success: false;
  reason: string;
  requestedDate: string | null; // <-- INI PERBAIKANNYA
  availableSlots?: undefined;
};

// Discriminated union yang aman berdasarkan properti 'success'
export type FindSlotResult = FindSlotSuccess | FindSlotError;