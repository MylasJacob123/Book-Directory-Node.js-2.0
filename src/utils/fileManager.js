const fs = require('fs');
const path = require('path');

const booksFilePath = path.join(__dirname, "../Data/books.json");

const readBooksFromFile = () => {
    if (!fs.existsSync(path.dirname(booksFilePath))) {
        fs.mkdirSync(path.dirname(booksFilePath), { recursive: true });
    }

    if (!fs.existsSync(booksFilePath)) {
        fs.writeFileSync(booksFilePath, JSON.stringify([])); 
    }

    return JSON.parse(fs.readFileSync(booksFilePath, 'utf8'));
};

const writeBooksToFile = (books) => {
    fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2));
};

module.exports = { readBooksFromFile, writeBooksToFile };