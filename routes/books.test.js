process.env.NODE_ENV = "test";

const db = require("../db");
const request = require("supertest");
const app = require("../app");
const axios = require("axios");
const Book = require("../models/book");

let sample_data_1;
let sample_data_1_update;
let sample_data_2;
let book;

beforeEach(async function () {
	sample_data_1 = {
		isbn: "0691161518",
		amazon_url: "http://a.co/eobPtX2",
		author: "Matthew Lane",
		language: "english",
		pages: 264,
		publisher: "Princeton University Press",
		title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
		year: 2017,
	};

	sample_data_1_update = {
		isbn: "0691161518",
		amazon_url: "http://a.co/eobPtX222",
		author: "Matt Layne",
		language: "french",
		pages: 269,
		publisher: "Princeton University Press",
		title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
		year: 2018,
	};

	sample_data_2 = {
		isbn: "4239058723",
		amazon_url: "http://a.co/eobPtX3",
		author: "Brian Shapiro",
		language: "spanish",
		pages: 567,
		publisher: "Princeton University Press",
		title: "Harry Potter and the Chamber of Secrets",
		year: 2000,
	};

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
	} = sample_data_1;
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
		expect(response.body.books).toEqual([sample_data_1]);
	});
});
describe("GET /:isbn", () => {
	test("Get book with valid isbn", async () => {
		const response = await request(app).get(`/books/${book.isbn}`);
		expect(response.status).toEqual(200);
		expect(response.body.book).toEqual(sample_data_1);
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
describe("POST /", () => {
	test("Get proper response with valid request", async () => {
		const response = await request(app).post("/books").send(sample_data_2);
		expect(response.status).toEqual(201);
		expect(response.body).toEqual({ book: sample_data_2 });
	});
	test("Get error if isbn is missing", async () => {
		delete sample_data_2["isbn"];
		const response = await request(app).post("/books").send(sample_data_2);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ['instance requires property "isbn"'],
				status: 400,
			},
			message: ['instance requires property "isbn"'],
		});
	});
	test("Get error if isbn is not a string", async () => {
		sample_data_2["isbn"] = 123;
		const response = await request(app).post("/books").send(sample_data_2);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ["instance.isbn is not of a type(s) string"],
				status: 400,
			},
			message: ["instance.isbn is not of a type(s) string"],
		});
	});
	test("Get error if amazon_url is missing", async () => {
		delete sample_data_2["amazon_url"];
		const response = await request(app).post("/books").send(sample_data_2);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ['instance requires property "amazon_url"'],
				status: 400,
			},
			message: ['instance requires property "amazon_url"'],
		});
	});
	test("Get error if amazon_url is not a string", async () => {
		sample_data_2["amazon_url"] = 123;
		const response = await request(app).post("/books").send(sample_data_2);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ["instance.amazon_url is not of a type(s) string"],
				status: 400,
			},
			message: ["instance.amazon_url is not of a type(s) string"],
		});
	});
	test("Get error if author is missing", async () => {
		delete sample_data_2["author"];
		const response = await request(app).post("/books").send(sample_data_2);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ['instance requires property "author"'],
				status: 400,
			},
			message: ['instance requires property "author"'],
		});
	});
	test("Get error if author is not a string", async () => {
		sample_data_2["author"] = 123;
		const response = await request(app).post("/books").send(sample_data_2);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ["instance.author is not of a type(s) string"],
				status: 400,
			},
			message: ["instance.author is not of a type(s) string"],
		});
	});
	test("Get error if language is missing", async () => {
		delete sample_data_2["language"];
		const response = await request(app).post("/books").send(sample_data_2);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ['instance requires property "language"'],
				status: 400,
			},
			message: ['instance requires property "language"'],
		});
	});
	test("Get error if language is not a string", async () => {
		sample_data_2["language"] = 123;
		const response = await request(app).post("/books").send(sample_data_2);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ["instance.language is not of a type(s) string"],
				status: 400,
			},
			message: ["instance.language is not of a type(s) string"],
		});
	});
	test("Get error if pages is missing", async () => {
		delete sample_data_2["pages"];
		const response = await request(app).post("/books").send(sample_data_2);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ['instance requires property "pages"'],
				status: 400,
			},
			message: ['instance requires property "pages"'],
		});
	});
	test("Get error if pages is not an integer", async () => {
		sample_data_2["pages"] = "string";
		const response = await request(app).post("/books").send(sample_data_2);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ["instance.pages is not of a type(s) integer"],
				status: 400,
			},
			message: ["instance.pages is not of a type(s) integer"],
		});
	});
	test("Get error if publisher is missing", async () => {
		delete sample_data_2["publisher"];
		const response = await request(app).post("/books").send(sample_data_2);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ['instance requires property "publisher"'],
				status: 400,
			},
			message: ['instance requires property "publisher"'],
		});
	});
	test("Get error if publisher is not a string", async () => {
		sample_data_2["publisher"] = 123;
		const response = await request(app).post("/books").send(sample_data_2);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ["instance.publisher is not of a type(s) string"],
				status: 400,
			},
			message: ["instance.publisher is not of a type(s) string"],
		});
	});
	test("Get error if title is missing", async () => {
		delete sample_data_2["title"];
		const response = await request(app).post("/books").send(sample_data_2);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ['instance requires property "title"'],
				status: 400,
			},
			message: ['instance requires property "title"'],
		});
	});
	test("Get error if title is not a string", async () => {
		sample_data_2["title"] = 123;
		const response = await request(app).post("/books").send(sample_data_2);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ["instance.title is not of a type(s) string"],
				status: 400,
			},
			message: ["instance.title is not of a type(s) string"],
		});
	});
	test("Get error if year is missing", async () => {
		delete sample_data_2["year"];
		const response = await request(app).post("/books").send(sample_data_2);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ['instance requires property "year"'],
				status: 400,
			},
			message: ['instance requires property "year"'],
		});
	});
	test("Get error if year is not an integer", async () => {
		sample_data_2["year"] = "string";
		const response = await request(app).post("/books").send(sample_data_2);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ["instance.year is not of a type(s) integer"],
				status: 400,
			},
			message: ["instance.year is not of a type(s) integer"],
		});
	});
});
describe("PUT /:isbn", () => {
	test("Get proper response with valid request", async () => {
		const response = await request(app)
			.put(`/books/${book.isbn}`)
			.send(sample_data_1_update);
		expect(response.status).toEqual(200);
		expect(response.body).toEqual({ book: sample_data_1_update });
	});
	test("Get error if isbn is missing", async () => {
		delete sample_data_1_update["isbn"];
		const response = await request(app)
			.put(`/books/${book.isbn}`)
			.send(sample_data_1_update);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ['instance requires property "isbn"'],
				status: 400,
			},
			message: ['instance requires property "isbn"'],
		});
	});
	test("Get error if isbn is not a string", async () => {
		sample_data_1_update["isbn"] = 123;
		const response = await request(app)
			.put(`/books/${book.isbn}`)
			.send(sample_data_1_update);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ["instance.isbn is not of a type(s) string"],
				status: 400,
			},
			message: ["instance.isbn is not of a type(s) string"],
		});
	});
	test("Get error if amazon_url is missing", async () => {
		delete sample_data_1_update["amazon_url"];
		const response = await request(app)
			.put(`/books/${book.isbn}`)
			.send(sample_data_1_update);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ['instance requires property "amazon_url"'],
				status: 400,
			},
			message: ['instance requires property "amazon_url"'],
		});
	});
	test("Get error if amazon_url is not a string", async () => {
		sample_data_1_update["amazon_url"] = 123;
		const response = await request(app)
			.put(`/books/${book.isbn}`)
			.send(sample_data_1_update);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ["instance.amazon_url is not of a type(s) string"],
				status: 400,
			},
			message: ["instance.amazon_url is not of a type(s) string"],
		});
	});
	test("Get error if author is missing", async () => {
		delete sample_data_1_update["author"];
		const response = await request(app)
			.put(`/books/${book.isbn}`)
			.send(sample_data_1_update);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ['instance requires property "author"'],
				status: 400,
			},
			message: ['instance requires property "author"'],
		});
	});
	test("Get error if author is not a string", async () => {
		sample_data_1_update["author"] = 123;
		const response = await request(app)
			.put(`/books/${book.isbn}`)
			.send(sample_data_1_update);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ["instance.author is not of a type(s) string"],
				status: 400,
			},
			message: ["instance.author is not of a type(s) string"],
		});
	});
	test("Get error if language is missing", async () => {
		delete sample_data_1_update["language"];
		const response = await request(app)
			.put(`/books/${book.isbn}`)
			.send(sample_data_1_update);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ['instance requires property "language"'],
				status: 400,
			},
			message: ['instance requires property "language"'],
		});
	});
	test("Get error if language is not a string", async () => {
		sample_data_1_update["language"] = 123;
		const response = await request(app)
			.put(`/books/${book.isbn}`)
			.send(sample_data_1_update);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ["instance.language is not of a type(s) string"],
				status: 400,
			},
			message: ["instance.language is not of a type(s) string"],
		});
	});
	test("Get error if pages is missing", async () => {
		delete sample_data_1_update["pages"];
		const response = await request(app)
			.put(`/books/${book.isbn}`)
			.send(sample_data_1_update);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ['instance requires property "pages"'],
				status: 400,
			},
			message: ['instance requires property "pages"'],
		});
	});
	test("Get error if pages is not an integer", async () => {
		sample_data_1_update["pages"] = "string";
		const response = await request(app)
			.put(`/books/${book.isbn}`)
			.send(sample_data_1_update);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ["instance.pages is not of a type(s) integer"],
				status: 400,
			},
			message: ["instance.pages is not of a type(s) integer"],
		});
	});
	test("Get error if publisher is missing", async () => {
		delete sample_data_1_update["publisher"];
		const response = await request(app)
			.put(`/books/${book.isbn}`)
			.send(sample_data_1_update);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ['instance requires property "publisher"'],
				status: 400,
			},
			message: ['instance requires property "publisher"'],
		});
	});
	test("Get error if publisher is not a string", async () => {
		sample_data_1_update["publisher"] = 123;
		const response = await request(app)
			.put(`/books/${book.isbn}`)
			.send(sample_data_1_update);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ["instance.publisher is not of a type(s) string"],
				status: 400,
			},
			message: ["instance.publisher is not of a type(s) string"],
		});
	});
	test("Get error if title is missing", async () => {
		delete sample_data_1_update["title"];
		const response = await request(app)
			.put(`/books/${book.isbn}`)
			.send(sample_data_1_update);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ['instance requires property "title"'],
				status: 400,
			},
			message: ['instance requires property "title"'],
		});
	});
	test("Get error if title is not a string", async () => {
		sample_data_1_update["title"] = 123;
		const response = await request(app)
			.put(`/books/${book.isbn}`)
			.send(sample_data_1_update);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ["instance.title is not of a type(s) string"],
				status: 400,
			},
			message: ["instance.title is not of a type(s) string"],
		});
	});
	test("Get error if year is missing", async () => {
		delete sample_data_1_update["year"];
		const response = await request(app)
			.put(`/books/${book.isbn}`)
			.send(sample_data_1_update);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ['instance requires property "year"'],
				status: 400,
			},
			message: ['instance requires property "year"'],
		});
	});
	test("Get error if year is not an integer", async () => {
		sample_data_1_update["year"] = "string";
		const response = await request(app)
			.put(`/books/${book.isbn}`)
			.send(sample_data_1_update);
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: {
				message: ["instance.year is not of a type(s) integer"],
				status: 400,
			},
			message: ["instance.year is not of a type(s) integer"],
		});
	});
});
describe("DELETE /:isbn", () => {
	test("Delete book with valid id", async () => {
		const response = await request(app).delete(`/books/${book.isbn}`);
		expect(response.status).toEqual(200);
		expect(response.body).toEqual({ message: "Book deleted" });
	});
	test("Return error with invalid id", async () => {
		const response = await request(app).delete(`/books/6612341254`);
		expect(response.status).toEqual(404);
		expect(response.body).toEqual({
			error: {
				message: `There is no book with an isbn '6612341254`,
				status: 404,
			},
			message: `There is no book with an isbn '6612341254`,
		});
	});
});

afterAll(async function () {
	await db.end();
});
