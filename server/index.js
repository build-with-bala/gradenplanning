import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Database Setup
let db;
(async () => {
    try {
        db = await open({
            filename: path.join(__dirname, 'database.sqlite'),
            driver: sqlite3.Database
        });

        console.log('Connected to SQLite database.');

        // Initialize Tables
        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                password TEXT
            );
            CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT UNIQUE,
                image TEXT,
                count TEXT
            );
            CREATE TABLE IF NOT EXISTS plants (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                category_id INTEGER,
                description TEXT,
                details TEXT,
                image TEXT,
                FOREIGN KEY(category_id) REFERENCES categories(id)
            );
        `);

        // Seed Admin User (if not exists)
        // Note: In real app, password should be hashed. For demo, we might use plain or hash it now.
        // Let's postpone seeding to a dedicated script or checking route.

    } catch (error) {
        console.error('Error connecting to database:', error);
    }
})();

// Pass DB to routes
app.use((req, res, next) => {
    req.db = db;
    next();
});

import authRoutes from './routes-auth.js';
import categoryRoutes from './routes-categories.js';
import plantRoutes from './routes-plants.js';

// ... (DB setup)

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/plants', plantRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Garden Guide API is running' });
});

// Serve Frontend in Production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
