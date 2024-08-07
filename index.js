const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Books = require("./models/books.model.js");
require("dotenv").config();

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello, this is Michael's Book Management Application");
});

app.get("/AllBooks", async (req, res) => {
	try {
		const Allbooks = await Books.find({});
		res.status(200).json(Allbooks);
		console.log("All Books returned");
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
});

app.post("/CreateBook", async (req, res) => {
	try {
		const book = await Books.create(req.body);
		res.status(200).json(book);
		console.log("Successfully Created");
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
});

app.get("/books/search/:query", async (req, res) => {
	const { query } = req.params;
	try {
		let book;
		if (mongoose.Types.ObjectId.isValid(query)) {
			book = await Books.findById(query);
		} else {
			book = await Books.findOne({ title: new RegExp(query, "i") });
		}

		if (book) {
			res.status(200).json(book);
		} else {
			res.status(404).json({ message: "No book found" });
		}
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
});

app.put("/books/edit/:query", async (req, res) => {
	try {
		const { query } = req.params;
		const book = await Books.findByIdAndUpdate(query, req.body);
		if (!book) {
			return res.status(404).json({ message: "Book not found" });
		}
		const updatedbook = await Books.findById(query);
		res.status(200).json(updatedbook);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
});

app.delete("/books/delete/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const deletedBook = await Books.findByIdAndDelete(id);
		if (deletedBook) {
			res.status(200).json({ message: "Book successfully deleted" });
		} else {
			res.status(404).send("Book not found");
		}
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
});

console.log("DB_URI:", process.env.DB_URI);
console.log("PORT:", process.env.PORT);

mongoose
	.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Connected to the database");
		app.listen(process.env.PORT, () => {
			console.log(`Server is running on port ${process.env.PORT}`);
		});
	})
	.catch((error) => {
		console.error("Failed to connect to the database", error);
	});
