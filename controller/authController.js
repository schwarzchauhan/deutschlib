const User = require('./../models/user')
const jwt = require('jsonwebtoken')

exports.verifyGenuineUser = async(req, res, next) => {
    try {
        // console.log(req.cookies);
        if (!req.cookies.access_token) {
            return res.send('session expired')
        }
        const token = (req.cookies.access_token).split(' ')[1]
        console.log(token);

        const privateKey = process.env.JWT_KEY;
        const decoded = jwt.verify(token, privateKey);
        console.log(decoded);

        const user = await User.findById(decoded._id)
        if (user) {
            console.log('verified ok ⭐');
            console.log(user);
            next()
        } else {
            return res.send('session expired')
        }

    } catch (err) {
        console.log(err);
        return res.send(`you are not a genuine user 💀`)
    }

    next();
}