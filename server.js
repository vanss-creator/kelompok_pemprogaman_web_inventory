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

// === SERVING STATIC FILES ===
// Express akan membaca file dari folder root UTAMA dan folder PUBLIC sekaligus
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'public')));

// === ROUTES API ===
app.use('/api', barangRoutes);

// === LOGIKA ROUTING HALAMAN ===
// Fungsi bantu untuk mengecek file di beberapa lokasi agar tidak gampang 'Not Found'
const kirimHalaman = (res, namaFile) => {
    // Jalur pertama: coba cari di folder utama (root)
    res.sendFile(path.join(__dirname, namaFile), (err) => {
        if (err) {
            // Jalur kedua: jika di root tidak ada, coba cari di dalam folder public
            res.sendFile(path.join(__dirname, 'public', namaFile), (err2) => {
                if (err2) {
                    // Jika kedua tempat tidak ada, kirim pesan error yang jelas
                    res.status(404).send(`File ${namaFile} tidak ditemukan di root maupun di folder public.`);
                }
            });
        }
    });
};

// 1. Jalur Utama (Akses Web): Langsung buka login.html
app.get('/', (req, res) => {
    kirimHalaman(res, 'login.html');
});

// 2. Pencegah "Cannot GET": Jika user mengakses rute acak, arahkan ke login.html
app.get('*', (req, res) => {
    kirimHalaman(res, 'login.html');
});

// === JALANKAN SERVER LOKAL ===
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server berjalan di http://localhost:${PORT}`);
    });
}

// === EXPORT UNTUK VERCEL ===
module.exports = app;
