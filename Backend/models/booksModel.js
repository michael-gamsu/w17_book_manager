import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		authors: {
			type: [String],
			required: true,
			trim: true,
		},
		average_rating: {
			type: Number,
			min: 0,
			max: 5,
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
		language_code: {
			type: String,
			default: "eng",
		},
		num_pages: {
			type: Number,
			required: true,
		},
		ratings_count: {
			type: Number,
			default: 0,
		},
		text_reviews_count: {
			type: Number,
			default: 0,
		},
		publication_date: {
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

const Book = mongoose.model("Book", bookSchema);

export default Book;
