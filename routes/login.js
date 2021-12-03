const router = require('express').Router();
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const myCreateExpire = require('./../modules/myCreateExpire')


router.route('/')

.post(async(req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body
        if (!(email && password)) {
            return res.json({ message: 'Both email and password are required 💀' })
        }
        const u = await User.findOne({ email: email })
        if (!u) {
            return res.json({ message: 'email not registerd 💀' })
        }
        // https://github.com/kelektiv/node.bcrypt.js#with-promises
        const match = await bcrypt.compare(password, u.password)

        // console.log('bcrypt callback start');
        if (match == true) {
            // https://github.com/auth0/node-jsonwebtoken signing token
            const privateKey = process.env.JWT_KEY
            console.log(`privateKey: `, privateKey);
            const expSecs = 60;
            const token = jwt.sign({ _id: u._id }, privateKey, { expiresIn: expSecs }) // A numeric value is interpreted as a seconds count. 
            console.log(`token: `, token);
            // https://expressjs.com/en/api.html#res.cookie storing token in cookie
            res.cookie('access_token', `Bearer ${token}`, {
                maxAge: expSecs * 1000 // expires in 1hour
            });
            console.log(`Both cookie & jsonwebtoken`);
            myCreateExpire(Date.now(), expSecs * 1000)
            return res.json({ message: 'Login successfully ⭐' })
        } else {
            return res.json({ message: 'Wrong Credentials 💀' })
        }
    } catch (error) {
        return console.log(error);
    }
    // console.log('POST /routes/login end');
})

module.exports = router