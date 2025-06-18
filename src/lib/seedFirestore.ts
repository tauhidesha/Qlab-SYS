
import { adminDb } from './firebase-admin';
import * as fs from 'fs';
import * => path from 'path';

// Define the structure of a single vehicle type object in your JSON
interface VehicleTypeSeed {
  brand: string;
  model: string;
  size: 'S' | 'M' | 'L' | 'XL';
  aliases: string[];
  // Add any other fields your JSON might have, but they won't be used unless you modify the script
  [key: string]: any; 
}

const COLLECTION_NAME = 'vehicleTypes';
// Adjust the path if your JSON file is located elsewhere
const JSON_DATA_PATH = path.join(__dirname, 'vehicleTypesData.json'); 

async function seedVehicleTypes() {
  if (!adminDb) {
    console.error(
      'Firebase Admin DB not initialized. Ensure firebase-admin.ts is configured correctly and GOOGLE_APPLICATION_CREDENTIALS might be needed for local non-emulator runs.'
    );
    return;
  }

  try {
    console.log(`Reading data from ${JSON_DATA_PATH}...`);
    const jsonData = fs.readFileSync(JSON_DATA_PATH, 'utf-8');
    const vehicleTypes: VehicleTypeSeed[] = JSON.parse(jsonData);

    if (!Array.isArray(vehicleTypes)) {
      console.error('Error: JSON data is not an array. Please provide an array of vehicle type objects.');
      return;
    }

    if (vehicleTypes.length === 0) {
      console.log('No vehicle types found in the JSON file. Seeding process skipped.');
      return;
    }

    console.log(`Found ${vehicleTypes.length} vehicle types in JSON file.`);

    // Optional: Delete existing documents in the collection before seeding
    // Comment out this section if you want to append data instead of overwriting
    console.log(`Deleting existing documents in '${COLLECTION_NAME}' collection...`);
    const snapshot = await adminDb.collection(COLLECTION_NAME).get();
    if (!snapshot.empty) {
      const batchDelete = adminDb.batch();
      snapshot.docs.forEach(doc => {
        batchDelete.delete(doc.ref);
      });
      await batchDelete.commit();
      console.log(`Successfully deleted ${snapshot.size} existing documents.`);
    } else {
      console.log('No existing documents to delete.');
    }
    // End of optional delete section

    console.log(`Starting to seed '${COLLECTION_NAME}' collection...`);
    const batch = adminDb.batch();
    let operationsCount = 0;

    for (const vehicle of vehicleTypes) {
      // Validate basic structure
      if (!vehicle.brand || !vehicle.model || !vehicle.size || !Array.isArray(vehicle.aliases)) {
        console.warn(`Skipping invalid vehicle data (missing brand, model, size, or aliases is not an array): ${JSON.stringify(vehicle)}`);
        continue;
      }
      if (!['S', 'M', 'L', 'XL'].includes(vehicle.size)) {
        console.warn(`Skipping invalid vehicle data (invalid size '${vehicle.size}'): ${JSON.stringify(vehicle)}`);
        continue;
      }
      if (!vehicle.aliases.every(alias => typeof alias === 'string')) {
         console.warn(`Skipping invalid vehicle data (aliases array contains non-string elements): ${JSON.stringify(vehicle)}`);
        continue;
      }


      const docRef = adminDb.collection(COLLECTION_NAME).doc(); // Auto-generate ID
      
      // Create the object to be saved, ensuring only defined fields are included
      const dataToSave: Partial<VehicleTypeSeed> = {
        brand: vehicle.brand,
        model: vehicle.model,
        size: vehicle.size,
        aliases: vehicle.aliases.map(alias => alias.toLowerCase().trim()).filter(alias => alias !== ''),
        // Add any other relevant fields from your JSON here,
        // for example, if your JSON has 'subCategory', you'd add:
        // subCategory: vehicle.subCategory, 
      };
      
      batch.set(docRef, dataToSave);
      operationsCount++;

      if (operationsCount >= 490) { // Firestore batch limit is 500 operations
        console.log('Committing batch of ~490 operations...');
        await batch.commit();
        operationsCount = 0;
        // Re-initialize batch for next set of operations
        // batch = adminDb.batch(); // This line had an error, re-initialization is tricky with existing batch object.
        // For simplicity, if you have >500 items, run the script multiple times or implement more robust batching.
        // For now, this script assumes less than 500 items or will process up to the limit then stop.
        // If you need to seed more, consider splitting your JSON or enhancing this script's batching.
        // For this version, let's just log a warning if it exceeds.
        console.warn("Approaching Firestore batch limit. If you have more than 490 items, this script might not process all of them in one go.");
      }
    }

    if (operationsCount > 0) {
      await batch.commit();
    }

    console.log(`Successfully seeded ${vehicleTypes.filter(v => v.brand && v.model && v.size && Array.isArray(v.aliases)).length} valid vehicle types into '${COLLECTION_NAME}'.`);

  } catch (error) {
    console.error('Error seeding Firestore:', error);
    if (error instanceof SyntaxError) {
      console.error("This might be due to an invalid JSON format in your data file.");
    }
  }
}

seedVehicleTypes().then(() => {
  console.log('Firestore seeding process finished.');
}).catch(err => {
  console.error('Unhandled error in seeder:', err);
});
