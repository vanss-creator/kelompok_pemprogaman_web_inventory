const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const barangRoutes = require('./routes/barangRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// 1. Sajikan folder 'public' secara statis menggunakan absolute path
app.use(express.static(path.join(__dirname, 'public')));

// 2. Kirim index.html yang berada di dalam folder public ke halaman utama '/'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Routes API
app.use('/api', barangRoutes);

// Jalankan Server (Hanya untuk lokal, Vercel akan mengabaikan listen ini)
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

// 3. Vercel bisa memperlakukan file ini sebagai Serverless Function
module.exports = app;


// 1. Pastikan Express bisa membaca folder utama tempat kamu menyimpan index.html, login.html, dan cetak.html
app.use(express.static(path.join(__dirname)));

// 2. Pastikan rute utama (/) langsung mengarah ke halaman login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});
