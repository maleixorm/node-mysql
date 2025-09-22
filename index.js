const express = require('express')
const epxhbs = require('express-handlebars')
const mysql = require('mysql2')

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
    conn.query(query, function(err, data) {
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
    conn.query(query, function(err) {
        if (err) {
            console.log(err)
        }
        res.redirect('/books')
    })
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'php',
    password: '123456',
    database: 'node_mysql'
})

conn.connect(function(err) {
    if (err) {
        console.log(err)
    }
    console.log('Conectado ao Banco de dados!')
    app.listen(3000)
})