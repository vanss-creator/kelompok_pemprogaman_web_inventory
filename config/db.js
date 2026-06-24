const mysql = require('mysql2');
require('dotenv').config();

// 1. Buat konfigurasi pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'inventori_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 2. Cara ngetes koneksi pool yang benar tanpa bikin crash di Vercel:
pool.getConnection((err, connection) => {
    if (err) {
        console.log("Database offline / tidak terhubung di cloud Vercel");
        return; // Hanya log di console, server Vercel tidak akan mati
    }
    console.log("MySQL Pool Terhubung dengan Sukses!");
    connection.release(); // Kembalikan koneksi ke pool setelah dites
});

// 3. Export menggunakan promise agar bisa pakai async/await di controller
module.exports = pool.promise();
