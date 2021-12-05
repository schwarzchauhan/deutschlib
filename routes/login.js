const router = require('express').Router();
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const myCreateExpire = require('./../modules/myCreateExpire')
const myUserAccessToken = require('./../modules/myUserAccessToken')


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
            const expSecs = 60;
            const token = await myUserAccessToken(expSecs, u);
            // https://expressjs.com/en/api.html#res.cookie storing token in cookie
            res.cookie('access_token', `Bearer ${token}`, {
                maxAge: expSecs * 1000 // expires in 1hour
            });
            console.log(`Both cookie & jsonwebtoken`);
            myCreateExpire(Date.now(), expSecs * 1000);
            console.log(token);
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