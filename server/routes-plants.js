import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

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
        const plants = await req.db.all('SELECT * FROM plants');
        res.json(plants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/category/:categoryId', async (req, res) => {
    try {
        const plants = await req.db.all('SELECT * FROM plants WHERE category_id = ?', [req.params.categoryId]);
        res.json(plants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    const { name, category_id, description, details } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    try {
        const result = await req.db.run(
            'INSERT INTO plants (name, category_id, description, details, image) VALUES (?, ?, ?, ?, ?)',
            [name, category_id, description, details, image]
        );
        res.json({ id: result.lastID, name, category_id, description, details, image });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
