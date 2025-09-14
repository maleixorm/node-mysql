import e from "express";
import { ExpressHandlebars } from "express-handlebars";
import { MySQL } from "mysql";

const app = e();
app.engine('handlebars', ExpressHandlebars())
app.set('view engine', 'handlebars')

app.use(e.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})