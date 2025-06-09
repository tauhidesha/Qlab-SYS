
export interface Motorcycle {
  name: string;
  licensePlate: string;
}

export interface Client {
  id: string; // Firestore document ID
  name: string;
  phone: string;
  motorcycles: Motorcycle[];
  loyaltyPoints: number;
  lastVisit: string; // Format YYYY-MM-DD
}

// Type for data used to create a new client (without Firestore ID)
export interface NewClientFormData {
  name: string;
  phone: string;
  motorcycles: Motorcycle[];
}
