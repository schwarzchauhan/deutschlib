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

router
    .route('/forgot-password')
    .post(userController.forgotPassword); // mails the password reset link to the user

router
    .route('/reset-password/:token/:_id')
    .get(userController.resetPassword) // to get password reset link  when user clicks on mail link received
    .post(userController.setNewPassword)

module.exports = router;