const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true, // Trims whitespace from the beginning and end
		},
		author: {
			type: String,
			required: true,
			trim: true,
		},
		genre: [
			{
				type: String,
				trim: true,
			},
		],
		price: {
			type: Number,
			required: true,
		},
		availability: {
			type: Boolean,
			default: true,
		},
		ratings: [
			{
				type: Number,
				min: 0,
				max: 10,
			},
		],
		isbn: {
			type: String,
			required: true,
		},
		isbn13: {
			type: String,
			required: true,
		},
		languageCode: {
			type: String,
			default: "eng",
		},
		numPages: {
			type: Number,
			required: true,
		},
		ratingsCount: {
			type: Number,
			default: 0,
		},
		textReviewsCount: {
			type: Number,
			default: 0,
		},
		publicationDate: {
			type: Date,
		},
		publisher: {
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

// Create a model from the schema
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
