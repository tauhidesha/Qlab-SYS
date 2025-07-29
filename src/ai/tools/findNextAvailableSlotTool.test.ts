
import dotenv from 'dotenv';
dotenv.config();
// Mock Firestore and admin dependencies
jest.mock('../../lib/firebase-admin', () => ({
  db: {
    collection: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      get: jest.fn(async function() {
        // Simulate Firestore snapshot for repaint and non-repaint bookings
        return {
          docs: [
            // For repaint test: 2 active repaint bookings
            { data: () => ({ category: 'repaint', serviceName: 'Repaint Fullbody', bookingDateTime: { toDate: () => new Date('2025-07-20T09:00:00Z') }, estimatedDuration: '2880' }) },
            { data: () => ({ category: 'repaint', serviceName: 'Repaint Partial', bookingDateTime: { toDate: () => new Date('2025-07-23T09:00:00Z') }, estimatedDuration: '2880' }) },
            // For non-repaint test: 1 detailing booking
            { data: () => ({ category: 'detailing', serviceName: 'Detailing', bookingDateTime: { toDate: () => new Date('2025-07-27T09:00:00Z') }, estimatedDuration: '180' }) },
          ]
        };
      })
    }))
  }
}));
jest.mock('firebase-admin', () => ({
  firestore: {
    Timestamp: {
      fromDate: (date: Date) => date
    }
  }
}));

import { findNextAvailableSlotTool } from '../tools/findNextAvailableSlotTool';

describe('findNextAvailableSlotTool', () => {
  it('should prioritize repaint if service_name contains repaint', async () => {
    const input = { service_name: 'repaint + detailing' };
    const result = await findNextAvailableSlotTool.implementation(input);
    console.log('Test repaint + detailing:', result);
    expect(result.success).toBe(true);
    expect(result.availableSlots).toBeDefined();
    expect(result.reason?.toLowerCase()).toContain('repaint');
  });

  it('should return slots for detailing only', async () => {
    const input = { service_name: 'detailing' };
    const result = await findNextAvailableSlotTool.implementation(input);
    console.log('Test detailing only:', result);
    expect(result.success).toBe(true);
    expect(result.availableSlots).toBeDefined();
    expect(result.reason?.toLowerCase()).not.toContain('repaint');
  });

  it('should handle missing service_name gracefully', async () => {
    const input = {};
    const result = await findNextAvailableSlotTool.implementation(input);
    console.log('Test missing service_name:', result);
    expect(result.success).toBe(true);
    expect(result.availableSlots).toBeDefined();
  });

  it('should handle preferred_date input', async () => {
    const input = { preferred_date: 'besok', service_name: 'coating' };
    const result = await findNextAvailableSlotTool.implementation(input);
    console.log('Test preferred_date + coating:', result);
    expect(result.success).toBe(true);
    expect(result.availableSlots).toBeDefined();
  });
});
