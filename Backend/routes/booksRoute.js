import Book from "../models/booksModel.js";
import express from "express";
const router = express.Router();

//Route to CREATE a new book
router.post("/", async (req, res) => {
	if (!req.body.title || !req.body.authors || !req.body.isbn || !req.body.isbn13 || !req.body.num_pages) {
		return res.status(400).json({ message: "Please fill all required fields." });
	}

	try {
		const book = await Book.create({
			title,
			authors,
			average_rating,
			isbn,
			isbn13,
			language_code,
			num_pages,
			ratings_count,
			text_reviews_count,
			publication_date,
			publisher,
		});
		console.log("Successfully Created");
		return res.status(201).json(book);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
});

//Route to GET all books
router.get("/", async (req, res) => {
	try {
		const books = await Book.find({});
		console.log("All Books returned");
		return res.status(200).json({
			count: books.length,
			data: books,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
});

//Route to GET a book by id
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const book = await Book.findById(id);
		console.log("Book found!");
		return res.status(200).json(book);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
});

//Route to UPDATE a book
router.put("/:id", async (req, res) => {
	try {
		if (!req.body.title || !req.body.authors || !req.body.isbn || !req.body.isbn13 || !req.body.num_pages) {
			return res.status(400).json({ message: "Please fill all required fields." });
		}

		const { id } = req.params;
		const result = await Books.findByIdAndUpdate(id, req.body);
		if (!result) {
			return res.status(404).json({ message: "Book not found" });
		}
		return res.status(200).json(book);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
});

//Route to DELETE a book
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const result = await Books.findByIdAndDelete(id);
		if (!result) {
			return res.status(404).send("Book not found");
		} else {
			return res.status(200).json({ message: "Book successfully deleted" });
		}
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
});

export default router;
