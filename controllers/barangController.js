const db = require('../config/db');

// 1. CREATE - Tambah Barang Baru
exports.createBarang = async (req, res) => {
    try {
        const { nama_barang, kategori, stok, harga } = req.body;
        const [result] = await db.query(
            'INSERT INTO barang (nama_barang, kategori, stok, harga) VALUES (?, ?, ?, ?)',
            [nama_barang, kategori, stok, harga]
        );
        res.status(201).json({ message: 'Barang berhasil ditambahkan', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. READ - Ambil Semua Barang
exports.getAllBarang = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM barang');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// READ - Ambil Satu Barang Berdasarkan ID
exports.getBarangById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM barang WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Barang tidak ditemukan' });
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. UPDATE - Perbarui Data Barang
exports.updateBarang = async (req, res) => {
    try {
        const { nama_barang, kategori, stok, harga } = req.body;
        const [result] = await db.query(
            'UPDATE barang SET nama_barang = ?, kategori = ?, stok = ?, harga = ? WHERE id = ?',
            [nama_barang, kategori, stok, harga, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Barang tidak ditemukan' });
        res.status(200).json({ message: 'Barang berhasil diperbarui' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. DELETE - Hapus Barang
exports.deleteBarang = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM barang WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Barang tidak ditemukan' });
        res.status(200).json({ message: 'Barang berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};