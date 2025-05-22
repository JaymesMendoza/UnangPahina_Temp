const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const config = require('../config');

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get book by ID
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new book
router.post('/', async (req, res) => {
    const book = new Book(req.body);
    try {
        const newBook = await book.save();
        // Publish book created event
        global.channel.publish(
            config.EXCHANGE_NAME,
            config.ROUTING_KEYS.BOOK_CREATED,
            Buffer.from(JSON.stringify(newBook))
        );
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update book
router.put('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        Object.assign(book, req.body);
        const updatedBook = await book.save();

        // Publish book updated event
        global.channel.publish(
            config.EXCHANGE_NAME,
            config.ROUTING_KEYS.BOOK_UPDATED,
            Buffer.from(JSON.stringify(updatedBook))
        );

        res.json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete book
router.delete('/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update book stock
router.patch('/:id/stock', async (req, res) => {
    try {
        const { stock } = req.body;
        const book = await Book.findById(req.params.id);
        
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        book.stock = stock;
        const updatedBook = await book.save();

        // Publish stock updated event
        global.channel.publish(
            config.EXCHANGE_NAME,
            config.ROUTING_KEYS.STOCK_UPDATED,
            Buffer.from(JSON.stringify({ bookId: book._id, stock }))
        );

        res.json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router; 