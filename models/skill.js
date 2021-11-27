const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    language: {
        type: String
    }
})

module.exports = mongoose.model('Skill', schema)