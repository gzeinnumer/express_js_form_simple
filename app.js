//npm install -S express ejs

const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('', (req, res) => {
    res.render('index')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', urlencodedParser, [
    check('username', 'This username must me 3+ characters long')
        .exists()
        .isLength({ min: 3 }),
    check('email', 'Email is not valid')
        .isEmail()
        .normalizeEmail()

], (req, res) => {
    console.log('Got body:', req.body);
})

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})