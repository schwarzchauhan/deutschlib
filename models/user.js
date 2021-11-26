const mongoose = require('mongoose');

// https://masteringjs.io/tutorials/mongoose/mongoose-validate-unique-email
// https://mongoosejs.com/docs/validation.html#built-in-validators
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required 💀"],
        minlength: [1, 'name must have atleast one character 💀']
    },
    email: {
        type: String,
        required: [true, 'email is required 💀'],
        unique: [true, 'email already reistered 💀']
    },
    password: {
        type: String,
        required: [true, 'password is required 💀']
    },
    role: {
        type: String,
        enum: { values: ['admin', 'member'], message: '{VALUE} is not supported 💀' }
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User