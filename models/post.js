const mongoose = require('mongoose')
const Schema = mongoose.Schema


const schema = mongoose.Schema({
    postImgUrl: {
        type: String
    },
    postText: {
        type: String
    },
    postBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true }); // https://masteringjs.io/tutorials/mongoose/timestamps
// saving timing as UNIX epoch 

module.exports = mongoose.model('Post', schema)