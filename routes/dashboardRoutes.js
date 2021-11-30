const authController = require('../controller/authController')

const router = require('express').Router()

router
    .route('/')
    .get(authController.verifyGenuineUser, async(req, res) => {
        try {
            return res.send('successfully reached this protected route after authentication ⭐')
        } catch (err) {
            console.log(err);
            return res.send(`some error occurred, you can't see protected routes 💀`)
        }
    });

module.exports = router