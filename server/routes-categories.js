import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Multer Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.get('/', async (req, res) => {
    try {
        const categories = await req.db.all('SELECT * FROM categories');
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    const { name, count } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    try {
        const result = await req.db.run(
            'INSERT INTO categories (name, image, count) VALUES (?, ?, ?)',
            [name, image, count]
        );
        res.json({ id: result.lastID, name, image, count });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
