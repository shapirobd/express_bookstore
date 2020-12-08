process.env.NODE_ENV = "test";

const db = require("../db");

describe("GET /", () => {
	test("Get all books", () => {});
});
describe("GET /:id", () => {
	test("Get book with valid id", () => {});
	test("Get error with invalid id", () => {});
});
describe("POST /", () => {
	test("Get proper response with valid request", () => {});
	test("Get error if isbn is missing", () => {});
	test("Get error if isbn is not a string", () => {});
	test("Get error if amazon_url is missing", () => {});
	test("Get error if amazon_url is not a string", () => {});
	test("Get error if author is missing", () => {});
	test("Get error if author is not a string", () => {});
	test("Get error if language is missing", () => {});
	test("Get error if language is not a string", () => {});
	test("Get error if pages is missing", () => {});
	test("Get error if pages is not an integer", () => {});
	test("Get error if publisher is missing", () => {});
	test("Get error if publisher is not a string", () => {});
	test("Get error if title is missing", () => {});
	test("Get error if title is not a string", () => {});
	test("Get error if year is missing", () => {});
	test("Get error if year is not an integer", () => {});
});
describe("PUT /:isbn", () => {
	test("Get proper response with valid request", () => {});
	test("Get error if isbn is missing", () => {});
	test("Get error if isbn is not a string", () => {});
	test("Get error if amazon_url is missing", () => {});
	test("Get error if amazon_url is not a string", () => {});
	test("Get error if author is missing", () => {});
	test("Get error if author is not a string", () => {});
	test("Get error if language is missing", () => {});
	test("Get error if language is not a string", () => {});
	test("Get error if pages is missing", () => {});
	test("Get error if pages is not an integer", () => {});
	test("Get error if publisher is missing", () => {});
	test("Get error if publisher is not a string", () => {});
	test("Get error if title is missing", () => {});
	test("Get error if title is not a string", () => {});
	test("Get error if year is missing", () => {});
	test("Get error if year is not an integer", () => {});
});
describe("DELETE /:isbn", () => {
	test("Delete book with valid id", () => {});
	test("Return error with invalid id", () => {});
});
