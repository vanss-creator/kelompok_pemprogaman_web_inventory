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

// === MENYEDIAKAN FILE STATIS ===
// Memastikan file dari root maupun dari folder 'public' bisa diakses dengan baik
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'public')));

// === ROUTES API ===
app.use('/api', barangRoutes);

// === LOGIKA ROUTING HALAMAN UTAMA ===
// Fungsi bantu agar pengiriman file html fleksibel dan aman dari 404
const kirimHalaman = (res, namaFile) => {
    res.sendFile(path.join(__dirname, 'public', namaFile), (err) => {
        if (err) {
            res.sendFile(path.join(__dirname, namaFile), (err2) => {
                if (err2) {
                    res.status(404).send(`File ${namaFile} tidak ditemukan.`);
                }
            });
        }
    });
};

// Akses utama langsung memanggil halaman login.html
app.get('/', (req, res) => {
    kirimHalaman(res, 'login.html');
});

// Cadangan rute menangkap alamat acak agar diarahkan kembali ke login
app.get('*', (req, res) => {
    kirimHalaman(res, 'login.html');
});

// === JALANKAN SERVER ===
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server berjalan di http://localhost:${PORT}`);
    });
}

// Export aplikasi untuk Vercel Serverless Function
module.exports = app;
