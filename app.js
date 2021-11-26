require('dotenv').config()
const connectDB = require('./database/connection')
connectDB()
const express = require('express')
const morgan = require('morgan')
const ejs = require('ejs')

const app = express()

// https://github.com/expressjs/morgan#use-custom-token-formats
morgan.token('id', function getId(req) {
    return req.id
})

app.use(assignId)
app.use(morgan(':id :method :url :status :res[content-length] - :response-time ms'));

function assignId(req, res, next) {
    req.id = '----------'
    next();
}

//
app.use(express.json())

// to properly get POST method req.body
// https://stackoverflow.com/questions/48726473/postman-raw-data-works-but-form-data-not-works-on-post-request-in-node
app.use(express.urlencoded({
    extended: true
}))

// setting view engine 
app.set('view engine', 'ejs')


// 
app.use('/user/register', require('./routes/register'))
app.use('/user/login', require('./routes/login'))

//
app.route('/')

.get((req, res) => {
    res.status(200).render('index')
})

//
module.exports = app