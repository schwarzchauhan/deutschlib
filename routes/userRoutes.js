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


router
    .route('/change-password/:_id')
    .post(userController.changePassword);

module.exports = router;