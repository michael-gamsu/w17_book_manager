const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true, // Trims whitespace from the beginning and end
		},
		authors: [
			{
				type: Schema.Types.ObjectId,
				ref: "Author",
			},
		],
		averageRating: {
			type: Number,
			default: 0,
		},
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
		timestamps: true, // Automatically create createdAt and updatedAt fields
	}
);

// Create a model from the schema
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
