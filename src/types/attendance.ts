
import type { Timestamp } from 'firebase/firestore';

export interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export interface AttendanceRecord {
  id: string;
  staffId: string;
  staffName: string;
  date: string; // YYYY-MM-DD
  clockIn?: string; // HH:mm
  clockOut?: string; // HH:mm
  status: 'Hadir' | 'Absen' | 'Terlambat' | 'Cuti';
  notes?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  clockInLocation?: GeolocationCoordinates;
  clockOutLocation?: GeolocationCoordinates;
}
