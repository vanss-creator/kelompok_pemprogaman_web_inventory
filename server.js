const express = require('express');
const cors = require('cors');
const path = require('path'); // 1. TAMBAHKAN INI DI ATAS
require('dotenv').config();

const barangRoutes = require('./routes/barangRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); 

// 2. TAMBAHKAN ROUTE INI TEPAT DI BAWAH MIDDLEWARE
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Routes
app.use('/api', barangRoutes);

// Jalankan Server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
// ... kode kamu yang lain ...

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

// WAJIB TAMBAHKAN INI DI BARIS PALING BAWAH
module.exports = app;