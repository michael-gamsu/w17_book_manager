const fs = require("fs");
const AdmZip = require("adm-zip");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const path = require("path");
const Book = require("./models/books.model");
require("dotenv").config();

async function connectToMongoDB() {
	try {
		await mongoose.connect(process.env.DB_URI);
		console.log("Connected to MongoDB");
	} catch (err) {
		console.error("Error connecting to MongoDB:", err);
		process.exit(1);
	}
}

function unzipFile() {
	const zipFilePath = "./data/goodreadsbooks.zip";
	const outputDir = "./data";
	const csvFilePath = path.join(outputDir, "books.csv");

	console.log(`Starting unzip operation for ${zipFilePath}`);

	try {
		const zip = new AdmZip(zipFilePath);
		zip.extractAllTo(outputDir, true);

		if (fs.existsSync(csvFilePath)) {
			console.log("File 'books.csv' found.");
		} else {
			console.error("File 'books.csv' does not exist after unzipping.");
			process.exit(1);
		}
	} catch (error) {
		console.error("Error unzipping file with adm-zip:", error);
		process.exit(1);
	}
}

async function processCSV() {
	const filePath = "./data/books.csv";

	const results = [];
	console.log(`Processing CSV file at ${filePath}`);

	return new Promise((resolve, reject) => {
		fs.createReadStream(filePath)
			.pipe(csv())
			.on("data", (data) => {
				const publicationDate = new Date(data.publicationDate);

				if (isNaN(publicationDate.valueOf())) {
					console.warn(`Invalid publicationDate for record:`, data);
				}

				const book = {
					title: data.title || "Unknown Title",
					author: data.author || "Unknown Author",
					genre: data.genre ? data.genre.split(",") : [],
					price: parseFloat(data.price) || 0,
					availability: data.availability === "true",
					ratings: data.ratings ? data.ratings.split(",").map(Number) : [],
					isbn: data.isbn || "Unknown ISBN",
					isbn13: data.isbn13 || "Unknown ISBN13",
					languageCode: data.languageCode || "eng",
					numPages: parseInt(data.numPages, 10) || 0,
					ratingsCount: parseInt(data.ratingsCount, 10) || 0,
					textReviewsCount: parseInt(data.textReviewsCount, 10) || 0,
					publicationDate: isNaN(publicationDate.valueOf()) ? null : publicationDate,
					publisher: data.publisher || "Unknown Publisher",
				};

				results.push(book);
				if (results.length >= 50) {
					fs.createReadStream(filePath).destroy();
				}
			})
			.on("end", async () => {
				console.log("CSV processing completed.");
				try {
					if (results.length > 0) {
						await Book.insertMany(results);
						console.log("Data inserted into MongoDB");
					}
					await mongoose.connection.close();
					resolve();
				} catch (error) {
					console.error("Error inserting data into MongoDB:", error);
					reject(error);
				}
			})
			.on("error", (err) => {
				console.error("Error processing CSV file:", err);
				reject(err);
			});
	});
}

async function main() {
	await connectToMongoDB();
	unzipFile();
	await processCSV();
}

main();
