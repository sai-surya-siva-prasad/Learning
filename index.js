import express from "express";
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from "./models/bookModel.js";

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Welcome to the MERN stack tutorial");
});

// Route to save a book
app.post('/books', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishyear) {
      return res.status(400).send({ message: "Please provide title, author, and publish year" });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishyear: req.body.publishyear,
    };

    const book = await Book.create(newBook);
    return res.status(200).send({ message: "Book created successfully", book });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: "Internal server error" });
  }
});

// Route to fetch all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json(books);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Route to fetch a specific book by ID
app.get('/books/:id', async (req, res) => {
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

// Route to update a book by ID
app.put('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.body.title || !req.body.author || !req.body.publishyear) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishyear',
      });
    }

    const updatedBook = {
      title: req.body.title,
      author: req.body.author,
      publishyear: req.body.publishyear,
    };

    const result = await Book.findByIdAndUpdate(id, updatedBook, { new: true });
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book updated successfully", book: result });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
});
app.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: 'Book not found' });
    }
    return res.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
});

mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("App is connected to the database");
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
