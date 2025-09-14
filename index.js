const express = require('express')
const epxhbs = require('express-handlebars')
const mysql = require('mysql2')

const app = express();
app.engine('handlebars', epxhbs.engine())
app.set('view engine', 'handlebars')
app.set('views', './views');

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
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