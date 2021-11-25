const mongoose = require('mongoose')
const { MONGO_URI } = process.env

const connectDB = async() => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`mongodb connected : ${MONGO_URI}`);
    } catch (err) {
        console.log(`mongodb connection failed 📛`);
        return console.log(err.message);
    }
}

module.exports = connectDB