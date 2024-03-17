import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { title, author, publishyear } = req.body;
    if (!title || !author || !publishyear) {
      return res.status(400).send({ message: "Please provide title, author, and publish year" });
    }

    const newBook = { title, author, publishyear };
    const book = await Book.create(newBook);

    return res.status(200).send({ message: "Book created successfully", book });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: "Internal server error" });
  }
});

router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json(books);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).json(book);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publishyear } = req.body;
    if (!title || !author || !publishyear) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishyear',
      });
    }

    const updatedBook = { title, author, publishyear };
    const result = await Book.findByIdAndUpdate(id, updatedBook, { new: true });
    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book updated successfully", book: result });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: 'Book not found' });
    }
    return res.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: 'Internal server error' });
  }
});
export default router;
