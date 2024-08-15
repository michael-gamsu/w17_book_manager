import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use("/books", booksRoute);

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

app.get("/", (req, res) => {
	res.send("Hello, this is Michael's Book Management Application");
});

mongoose
	.connect(DB_URI)
	.then(() => {
		console.log("Connected to the database");
		app.listen(PORT, () => {
			console.log(`App is listening on port: ${PORT}`);
		});
	})
	.catch((error) => {
		console.error("Failed to connect to the database", error);
	});
