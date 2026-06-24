const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const barangRoutes = require('./routes/barangRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// === MIDDLEWARE ===
app.use(cors());
app.use(express.json());

// === STATIS FILES ===
// Menyajikan folder 'public' (tempat index.html, login.html, cetak.html berada)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname))); // Backup jika file ditaruh di root luar folder public

// === ROUTES API ===
app.use('/api', barangRoutes);

// === LOGIKA ROUTING HALAMAN ===
// 1. Jalur Utama: Langsung buka halaman login.html saat web pertama kali diakses
app.get('/', (req, res) => {
    // Cek apakah login.html ada di dalam folder public atau root luar
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// 2. Jalur Alternatif: Pencegah error "Not Found". Jika rute acak diakses, balikkan ke login
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// === JALANKAN SERVER ===
// Hanya berjalan di lokal komputer. Vercel akan mengabaikan listen ini secara otomatis.
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server berjalan di http://localhost:${PORT}`);
    });
}

// === EXPORT UNTUK VERCEL (Wajib Berada di Paling Bawah File) ===
module.exports = app;
