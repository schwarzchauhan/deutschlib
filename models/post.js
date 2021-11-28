const mongoose = require('mongoose')


const schema = mongoose.Schema({
    postImgUrl: {
        type: String
    },
    postText: {
        type: String
    }
}, { timestamps: { currentTime: () => { Math.floor() / 1000 } } }); // https://masteringjs.io/tutorials/mongoose/timestamps
// saving timing as UNIX epoch 

module.exports = mongoose.model('Post', schema)