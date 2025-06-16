
# Firebase Studio

Ini adalah starter NextJS di Firebase Studio.

Untuk memulai, lihat `src/app/page.tsx`.

## Menjalankan Aplikasi Secara Lokal (di PC Anda)

Panduan ini untuk menjalankan aplikasi Next.js QLAB POS **langsung di PC Anda** dan menghubungkannya ke layanan Firebase Cloud.

**PENTING:** Untuk koneksi ke Firebase Cloud, pastikan Anda telah mengkonfigurasi variabel environment Firebase (seperti `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`, dll.) dengan benar di file `.env` atau `.env.local` di root proyek Anda. Variabel-variabel ini biasanya akan otomatis terisi jika Anda mengembangkan di Firebase Studio dan melakukan `firebase init hosting` (jika App Hosting) atau setup project Firebase lainnya. Namun, untuk PC lokal, Anda mungkin perlu menyalinnya dari konfigurasi Firebase project Anda secara manual.

Untuk menjalankan aplikasi QLAB POS secara lokal di PC Anda:

1.  **Pastikan Kode Project Ada di PC Anda:**
    *   Jika Anda mengembangkan di Firebase Studio, pastikan Anda telah men-download atau melakukan clone kode project QLAB POS ke direktori di PC Anda. Misalnya, `C:\Projects\QLAB-POS\` (ini hanya contoh path).

2.  **Buka Terminal di Direktori Root Project Next.js:**
    *   Buka Command Prompt (CMD) atau PowerShell atau terminal lainnya.
    *   Navigasi (gunakan perintah `cd`) ke **direktori root project QLAB POS Anda**, yaitu folder yang berisi file `package.json`, `next.config.ts`, folder `src`, dll.
    *   **PENTING:** Perintah `npm run dev` atau `yarn dev` HARUS dijalankan dari direktori root project ini.

3.  **Install Dependencies (jika belum):**
    *   Jika ini pertama kali atau Anda baru clone project, jalankan:
        ```bash
        yarn install
        ```
        atau jika Anda menggunakan npm:
        ```bash
        npm install
        ```

4.  **Jalankan Server Next.js Development:**
    *   Dari direktori root project QLAB POS di terminal, jalankan:
        ```bash
        yarn dev
        ```
        atau jika Anda menggunakan npm (dan script "dev" ada di `package.json`):
        ```bash
        npm run dev
        ```
    *   Perhatikan output di terminal. Server Next.js biasanya akan berjalan di `http://localhost:9002` (atau port lain yang dikonfigurasi di `package.json` Anda).
    *   Buka URL tersebut di browser Anda. Aplikasi akan mencoba terhubung ke Firebase Cloud berdasarkan konfigurasi di variabel environment Anda.

Jika Anda melihat error `Missing script: "dev"` saat menjalankan `npm run dev`, itu hampir pasti karena Anda menjalankan perintah tersebut dari direktori yang salah (bukan direktori root project QLAB POS yang berisi `package.json`).
