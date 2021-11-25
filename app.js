require('dotenv').config()
const connectDB = require('./database/connection')
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

// setting view engine 
app.set('view engine', 'ejs')

//
app.route('/')

.get((req, res) => {
    res.status(200).json({
        message: 'success'
    })
})

//
module.exports = app