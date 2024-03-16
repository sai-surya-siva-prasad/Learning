import express from "express";
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from "./models/bookModel.js";

const app = express();
app.use(express.json())
app.get('/', (req, res) => {
  return res.send("Welcome to the MERN stack tutorial");
});

// Route to save the book
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
    console.log(error.message);
    return res.status(500).send({ error: "Internal server error" });
  }
});

mongoose.connect(mongoDBURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
    console.log("App is connected to the database");
  })
  .catch((error) => {
    console.log(error);
  });
