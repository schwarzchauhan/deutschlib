// https://expressjs.com/en/guide/routing.html#:~:text=Update%20the%20book%27)%0A%20%20%7D)-,express.Router,-Use%20the%20express
const router = require('express').Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/user')

// https://github.com/kelektiv/node.bcrypt.js#async-recommended
// https://github.com/kelektiv/node.bcrypt.js#api
const myCreateUser = async function(name, email, password, role) {
    try {
        // console.log(bcrypt.hash(password, saltRounds));
        const hash = await bcrypt.hash(password, saltRounds);
        console.log(hash);
        const u = new User({
            name,
            email,
            password: hash,
            role
        })
        await u.save()
        return console.log(u);
    } catch (err) {
        return console.log(err.message);
    }
}

router.route('/')

.post((req, res) => {
    console.log(req.body);
    const { name, email, password, role } = req.body;
    if (!(name && email && password && role)) {
        return res.status(200).send('Credentials Missing !')
    }
    User.findOne({ email: email }, (err, u) => {
        if (err) { return res.json(err) }
        if (u) {
            return res.send('user with this email already registered 💀')
        }
        // console.log('before call');
        myCreateUser(name, email, password, role)
            // console.log('after call');
        return res.status(200).send('Account created')
    })
})

module.exports = router