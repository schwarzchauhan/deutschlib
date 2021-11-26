const router = require('express').Router();
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



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

        // console.log('bcrypt callbak start');
        if (match == true) {
            // https://github.com/auth0/node-jsonwebtoken
            const privateKey = process.env.JWT_KEY
            console.log(privateKey);
            const token = jwt.sign({ _id: u._id }, privateKey, { expiresIn: 50 }) // A numeric value is interpreted as a seconds count. 
            const crt = new Date()
            const exp = new Date(Date.now() + 50 * 1000)
            console.log(`created on  ${crt.toLocaleString()}, will expire on ${exp.toLocaleString()}`);
            console.log(token)
            return res.json({ message: 'Login successfully' })
        } else {
            return res.json({ message: 'Wrong Credentials' })
        }
    } catch (error) {
        return console.log(error);
    }
    // console.log('POST /routes/login end');
})

module.exports = router