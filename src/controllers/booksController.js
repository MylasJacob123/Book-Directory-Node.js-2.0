const { v4: uuidv4 } = require('uuid');
const { readBooksFromFile, writeBooksToFile } = require("../utils/fileManager");

const getAllBooks = (req, res) => {
    const books = readBooksFromFile();
    res.status(200).json(books);
};

const getBookByISBN = (req, res) => {
    const { isbn } = req.params;
    const books = readBooksFromFile();
    const book = books.find(b => b.isbn === isbn);

    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
};

const addBook = (req, res) => {
    const { title, author, publisher, publishedDate, isbn } = req.body;

    if (!title || !author || !isbn) {
        return res.status(400).json({ message: 'Title, Author, and ISBN are required' });
    }

    const newBook = {
        id: uuidv4(),
        title,
        author,
        publisher,
        publishedDate,
        isbn
    };

    const books = readBooksFromFile();
    books.push(newBook);
    writeBooksToFile(books);

    res.status(201).json({ message: 'Book created', book: newBook });
};

const updateBook = (req, res) => {
    const { isbn } = req.params;
    const { title, author, publisher, publishedDate } = req.body;
    const books = readBooksFromFile();
    const bookIndex = books.findIndex(b => b.isbn === isbn);

    if (bookIndex !== -1) {
        books[bookIndex] = { ...books[bookIndex], title, author, publisher, publishedDate };
        writeBooksToFile(books);
        res.status(200).json({ message: 'Book updated', book: books[bookIndex] });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
};

const deleteBook = (req, res) => {
    const { isbn } = req.params;
    const books = readBooksFromFile();
    const bookIndex = books.findIndex(b => b.isbn === isbn);

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        writeBooksToFile(books);
        res.status(200).json({ message: 'Book deleted' });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
};

module.exports = { getAllBooks, getBookByISBN, addBook, updateBook, deleteBook };

