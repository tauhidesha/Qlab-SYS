
# Firebase Studio

Ini adalah starter NextJS di Firebase Studio.

Untuk memulai, lihat `src/app/page.tsx`.

## Menjalankan Aplikasi Secara Lokal (di PC Anda)

Panduan ini untuk menjalankan aplikasi Next.js QLAB POS **langsung di PC Anda** (bukan di Firebase Studio) dan menghubungkannya ke Firebase Emulator lokal. Ini berguna untuk development yang lebih cepat dan testing tanpa biaya.

**Catatan:** Firebase Studio memiliki environment sendiri. Jika Anda menjalankan aplikasi di Firebase Studio, ia mungkin terhubung ke layanan Firebase Cloud atau memiliki cara sendiri untuk mengintegrasikan emulator.

Firebase Emulator Suite (seperti Firestore Emulator) TIDAK menjalankan aplikasi Next.js Anda. Emulator hanya mensimulasikan layanan backend Firebase. Aplikasi Next.js (QLAB POS) perlu dijalankan secara terpisah.

Untuk menjalankan aplikasi QLAB POS secara lokal di PC Anda dan menghubungkannya ke Firebase Emulator lokal:

1.  **Pastikan Kode Project Ada di PC Anda:**
    *   Jika Anda mengembangkan di Firebase Studio, pastikan Anda telah men-download atau melakukan clone kode project QLAB POS ke direktori di PC Anda. Misalnya, `C:\Projects\QLAB-POS\` (ini hanya contoh path).

2.  **Buka Terminal di Direktori Root Project Next.js:**
    *   Buka Command Prompt (CMD) atau PowerShell atau terminal lainnya.
    *   Navigasi (gunakan perintah `cd`) ke **direktori root project QLAB POS Anda**, yaitu folder yang berisi file `package.json`, `next.config.ts`, folder `src`, dll.
    *   **PENTING:** Perintah `npm run dev` atau `yarn dev` HARUS dijalankan dari direktori root project ini, bukan dari folder tempat Anda menginisialisasi emulator (misalnya `C:\wa\qlab emu>`), kecuali jika folder tersebut *memang* adalah root project Next.js Anda.

3.  **Install Dependencies (jika belum):**
    *   Jika ini pertama kali atau Anda baru clone project, jalankan:
        ```bash
        yarn install
        ```
        atau jika Anda menggunakan npm:
        ```bash
        npm install
        ```

4.  **Konfigurasi Emulator (jika ingin pakai emulator lokal):**
    *   Buat file `.env.local` di direktori root project QLAB POS Anda (jika belum ada).
    *   Isi file `.env.local` dengan:
        ```
        NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true
        ```
    *   Di terminal **lain**, dari direktori mana saja yang sudah terkonfigurasi Firebase CLI (atau dari root project juga bisa), jalankan Firebase Emulator Suite:
        ```bash
        firebase emulators:start
        ```
    *   Pastikan tidak ada bentrok port antara emulator (Firestore biasanya 8080, UI Emulator biasanya 4000) dan aplikasi Next.js (biasanya 9002).

5.  **Jalankan Server Next.js Development:**
    *   Dari direktori root project QLAB POS di terminal (yang berbeda dari terminal emulator), jalankan:
        ```bash
        yarn dev
        ```
        atau jika Anda menggunakan npm (dan script "dev" ada di `package.json`):
        ```bash
        npm run dev
        ```
    *   Perhatikan output di terminal. Server Next.js biasanya akan berjalan di `http://localhost:9002` (atau port lain yang dikonfigurasi di `package.json` Anda).
    *   Buka URL tersebut di browser Anda.

Jika Anda melihat error `Missing script: "dev"` saat menjalankan `npm run dev`, itu hampir pasti karena Anda menjalankan perintah tersebut dari direktori yang salah (bukan direktori root project QLAB POS yang berisi `package.json`).

