process.env.NODE_ENV = "test";

const db = require("../db");
const request = require("supertest");
const app = require("../app");
const axios = require("axios");
const Book = require("../models/book");

const sample_data = {
	isbn: "0691161518",
	amazon_url: "http://a.co/eobPtX2",
	author: "Matthew Lane",
	language: "english",
	pages: 264,
	publisher: "Princeton University Press",
	title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
	year: 2017,
};

let book;
beforeEach(async function () {
	await db.query("DELETE FROM books");
	let {
		isbn,
		amazon_url,
		author,
		language,
		pages,
		publisher,
		title,
		year,
	} = sample_data;
	const result = await db.query(
		`INSERT INTO books (isbn, amazon_url, author, language, pages, publisher, title, year)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING isbn, amazon_url, author, language, pages, publisher, title, year`,
		[isbn, amazon_url, author, language, pages, publisher, title, year]
	);
	book = result.rows[0];
});

describe("GET /", () => {
	test("Get all books", async () => {
		const response = await request(app).get("/books");
		expect(response.status).toEqual(200);
		expect(response.body.books).toEqual([sample_data]);
	});
});
describe("GET /:id", () => {
	test("Get book with valid isbn", async () => {
		const response = await request(app).get(`/books/${book.isbn}`);
		expect(response.status).toEqual(200);
		expect(response.body.book).toEqual(sample_data);
	});
	test("Get error with invalid isbn", async () => {
		const response = await request(app).get(`/books/invalid`);
		expect(response.status).toEqual(404);
		expect(response.body).toEqual({
			error: {
				message: "There is no book with an isbn 'invalid",
				status: 404,
			},
			message: "There is no book with an isbn 'invalid",
		});
	});
});
// describe("POST /", () => {
// 	test("Get proper response with valid request", () => {});
// 	test("Get error if isbn is missing", () => {});
// 	test("Get error if isbn is not a string", () => {});
// 	test("Get error if amazon_url is missing", () => {});
// 	test("Get error if amazon_url is not a string", () => {});
// 	test("Get error if author is missing", () => {});
// 	test("Get error if author is not a string", () => {});
// 	test("Get error if language is missing", () => {});
// 	test("Get error if language is not a string", () => {});
// 	test("Get error if pages is missing", () => {});
// 	test("Get error if pages is not an integer", () => {});
// 	test("Get error if publisher is missing", () => {});
// 	test("Get error if publisher is not a string", () => {});
// 	test("Get error if title is missing", () => {});
// 	test("Get error if title is not a string", () => {});
// 	test("Get error if year is missing", () => {});
// 	test("Get error if year is not an integer", () => {});
// });
// describe("PUT /:isbn", () => {
// 	test("Get proper response with valid request", () => {});
// 	test("Get error if isbn is missing", () => {});
// 	test("Get error if isbn is not a string", () => {});
// 	test("Get error if amazon_url is missing", () => {});
// 	test("Get error if amazon_url is not a string", () => {});
// 	test("Get error if author is missing", () => {});
// 	test("Get error if author is not a string", () => {});
// 	test("Get error if language is missing", () => {});
// 	test("Get error if language is not a string", () => {});
// 	test("Get error if pages is missing", () => {});
// 	test("Get error if pages is not an integer", () => {});
// 	test("Get error if publisher is missing", () => {});
// 	test("Get error if publisher is not a string", () => {});
// 	test("Get error if title is missing", () => {});
// 	test("Get error if title is not a string", () => {});
// 	test("Get error if year is missing", () => {});
// 	test("Get error if year is not an integer", () => {});
// });
// describe("DELETE /:isbn", () => {
// 	test("Delete book with valid id", () => {});
// 	test("Return error with invalid id", () => {});
// });

afterAll(async function () {
	await db.end();
});
