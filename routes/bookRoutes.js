const express = require('express');
const Book = require('../models/Book');
const authMiddleware = require('../middleware/authMiddleware');
require('dotenv').config();
const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

router.get('/books', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

router.post('/add-book', authMiddleware, async (req, res) => {
    console.log("Received request body:", req.body); 

    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access Denied' });
    }

    if (!req.body.title || !req.body.author || !req.body.genre || !req.body.year || !req.body.description) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const book = new Book(req.body);
        await book.save();
        res.json({ message: 'Book Added' });
    } catch (error) {
        console.error("Error saving book:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = router;
