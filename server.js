const express = require('express');
const booksRoutes = require("./src/routes/booksRoutes");

const app = express();
const PORT = 3001;

app.use(express.json());  

app.get("/", (req, res) => {
    res.send("Welcome to the Book Directory API (*-*) , (>_<)");
});

app.use('/books', booksRoutes);  

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

