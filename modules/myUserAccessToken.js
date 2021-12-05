const myCreateExpire = require('./../modules/myCreateExpire')
const jwt = require('jsonwebtoken')

const myUserAccessToken = async(expSecs, u) => { // here u is instance of User model
    try {
        // https://github.com/auth0/node-jsonwebtoken signing token
        const privateKey = process.env.JWT_KEY
        console.log(`privateKey: `, privateKey);
        const token = jwt.sign({ _id: u._id }, privateKey, { expiresIn: expSecs }) // A numeric value is interpreted as a seconds count. 
        console.log(`token: `, token);
        return token;
    } catch (err) {
        console.log(err);
        return new Error(err);
    }
}

module.exports = myUserAccessToken;