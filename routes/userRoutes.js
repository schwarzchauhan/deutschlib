const express = require('express')
const router = express.Router()
const userController = require('../controller/userController');

router
    .route('/')
    .get((req, res) => {
        res.send('ok')
    });

router
    .route('/:_id')
    .delete(userController.deleteUser)
    .patch(userController.patchUser);

module.exports = router;