const express = require('express')
const epxhbs = require('express-handlebars')
const pool = require('./db/conn')

const app = express();

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

app.engine('handlebars', epxhbs.engine())
app.set('view engine', 'handlebars')
app.set('views', './views');

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/books', (req, res) => {
    const query = "SELECT * FROM books";
    pool.query(query, function(err, data) {
        if (err) {
            console.log(err)
            return
        }
        const books = data
        res.render('books', { books })
    })
})

app.post('/books/insertbook', (req, res) => {
    const title = req.body.title
    const pageqtd = parseInt(req.body.pageqtd)
    const query = `INSERT INTO books (title, pages) VALUES ('${title}', ${pageqtd})`
    pool.query(query, function(err) {
        if (err) {
            console.log(err)
        }
        res.redirect('/books')
    })
})

app.get("/books/:id", (req, res) => {
    const id = req.params.id
    const query = `SELECT * FROM books WHERE id = ${id}`;
    pool.query(query, function(err, data) {
        if (err) {
            console.log(err)
        }
        const book = data[0]
        res.render("book", { book })
    })
})

app.get("/books/edit/:id", (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM books WHERE id = ${id}`
    pool.query(sql, function(err, data){
        if (err) {
            console.log(err)
            return
        }
        const book = data[0]
        res.render('editbook', { book })
    })
})

app.post("/books/updatebook", (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const pages = req.body.pageqtd

    const sql = `UPDATE books SET title = '${title}', pages = '${pages}' WHERE id = ${id}`
    pool.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/books')
    })
})

app.post("/books/remove/:id", (req, res) => {
    const id = req.params.id
    const sql = `DELETE FROM books WHERE id = ${id}`
    pool.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/books')
    })
})

app.listen(3000)