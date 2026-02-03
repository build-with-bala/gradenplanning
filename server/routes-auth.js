import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = 'your_super_secret_key_change_this'; // In production, use env var

// Init Admin User (Helper to be called on server start or via a special route, 
// strictly for demo purposes we check on every login request if no users exist, or just use a seed script)
// For simplicity, let's create a route to seed admin
router.post('/seed-admin', async (req, res) => {
    const db = req.db;
    try {
        const existing = await db.get('SELECT * FROM users WHERE username = ?', ['admin']);
        if (existing) {
            return res.status(400).json({ message: 'Admin already exists' });
        }
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await db.run('INSERT INTO users (username, password) VALUES (?, ?)', ['admin', hashedPassword]);
        res.json({ message: 'Admin user created (admin/admin123)' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const db = req.db;

    try {
        const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, username: user.username } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
