// https://expressjs.com/en/guide/routing.html#:~:text=Update%20the%20book%27)%0A%20%20%7D)-,express.Router,-Use%20the%20express
const router = require('express').Router();
const userController = require('./../controller/userController')



router.route('/')

.post(userController.createUser)

module.exports = router