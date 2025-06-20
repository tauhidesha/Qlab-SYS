
# Firebase Studio

Ini adalah starter NextJS di Firebase Studio.

Untuk memulai, lihat `src/app/page.tsx`.

## Menjalankan Aplikasi Secara Lokal (di PC Anda)

Panduan ini untuk menjalankan aplikasi Next.js QLAB POS **langsung di PC Anda** dan menghubungkannya ke layanan Firebase Cloud atau Firebase Emulators (untuk database lokal).

**PENTING:**
*   Pastikan Anda telah mengkonfigurasi variabel environment Firebase (seperti `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`, dll.) dengan benar di file `.env` atau `.env.local` di root proyek Anda. Variabel-variabel ini biasanya akan otomatis terisi jika Anda mengembangkan di Firebase Studio dan melakukan `firebase init hosting` atau setup project Firebase lainnya. Untuk PC lokal, Anda mungkin perlu menyalinnya dari konfigurasi Firebase project Anda secara manual agar bisa terhubung ke Firebase Cloud jika tidak menggunakan emulator.
*   Untuk pengembangan dengan database dan layanan Firebase lokal, gunakan Firebase Emulators (lihat bagian di bawah).

Untuk menjalankan aplikasi QLAB POS secara lokal di PC Anda:

1.  **Pastikan Kode Project Ada di PC Anda:**
    *   Jika Anda mengembangkan di Firebase Studio, pastikan Anda telah men-download atau melakukan clone kode project QLAB POS ke direktori di PC Anda. Misalnya, `C:\Projects\QLAB-POS\` (ini hanya contoh path).

2.  **Buka Terminal di Direktori Root Project Next.js:**
    *   Buka Command Prompt (CMD) atau PowerShell atau terminal lainnya.
    *   Navigasi (gunakan perintah `cd`) ke **direktori root project QLAB POS Anda**, yaitu folder yang berisi file `package.json`, `next.config.ts`, folder `src`, dll.
    *   **PENTING:** Semua perintah `npm` dan `firebase` HARUS dijalankan dari direktori root project ini.

3.  **Install Dependencies (jika belum):**
    *   Jika ini pertama kali atau Anda baru clone project, jalankan:
        ```bash
        npm install
        ```

4.  **Jalankan Server Next.js Development:**
    *   Dari direktori root project QLAB POS di terminal, jalankan:
        ```bash
        npm run dev
        ```
    *   Perhatikan output di terminal. Server Next.js biasanya akan berjalan di `http://localhost:9002` (atau port lain yang dikonfigurasi di `package.json` Anda).
    *   Buka URL tersebut di browser Anda.

Jika Anda melihat error `Missing script: "dev"` saat menjalankan `npm run dev`, itu hampir pasti karena Anda menjalankan perintah tersebut dari direktori yang salah (bukan direktori root project QLAB POS yang berisi `package.json`).

### Menggunakan Firebase Emulators (Termasuk Database Lokal)

Untuk pengembangan yang menggunakan layanan Firebase seperti Firestore, Authentication, dan Functions secara lokal di PC Anda tanpa terhubung ke cloud, gunakan Firebase Emulators.

1.  **Pastikan Firebase CLI Terinstall dan Login:**
    *   Jika belum, install Firebase CLI: `npm install -g firebase-tools`
    *   Login ke Firebase: `firebase login`

2.  **Mulai Firebase Emulators:**
    *   Dari direktori root project QLAB POS di terminal, jalankan:
        ```bash
        firebase emulators:start
        ```
    *   Perintah ini akan menjalankan emulator untuk layanan yang dikonfigurasi di `firebase.json` (misalnya, Firestore di port 8080, Auth di 9099, dan UI Emulator di port 4000).
    *   Biarkan terminal ini tetap berjalan selama Anda menggunakan emulator.

3.  **Aplikasi Terhubung Otomatis ke Emulators:**
    *   Kode inisialisasi Firebase di `src/lib/firebase.ts` sudah dikonfigurasi untuk otomatis mendeteksi dan menggunakan Firebase Emulators jika mereka berjalan pada port default. Anda tidak perlu mengubah konfigurasi aplikasi secara manual untuk ini.
    *   Saat emulators berjalan, aplikasi Next.js Anda (`npm run dev`) akan menggunakan Firestore lokal, Auth lokal, dll.

4.  **(Opsional) Emulator UI:**
    *   Anda bisa membuka Emulator UI di browser (biasanya `http://localhost:4000`) untuk melihat data di Firestore emulator, mengelola pengguna Auth emulator, dll.

5.  **(Opsional) Seed Data ke Firestore Emulator Lokal:**
    *   Jika Anda ingin mengisi data awal ke Firestore emulator lokal (misalnya, data `vehicleTypes` dari `src/lib/vehicleTypesData.json`), jalankan script seed:
        ```bash
        npm run seed:firestore
        ```
    *   Pastikan Firebase Emulators sudah berjalan sebelum menjalankan script seed ini. Script ini menggunakan Firebase Admin SDK yang juga akan mencoba terhubung ke emulator Firestore jika variabel environment `FIRESTORE_EMULATOR_HOST` sudah di-set oleh `firebase emulators:start`.

Dengan cara ini, semua data akan tersimpan dan diakses dari PC lokal Anda selama emulators berjalan, memudahkan pengembangan dan pengujian tanpa mempengaruhi data di Firebase Cloud.
