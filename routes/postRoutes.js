const router = require('express').Router()
const postController = require('./../controller/postController')
const authController = require('./../controller/authController')

router
    .route('/:_id')
    .post(postController.postOnSite);

router
    .route('/')
    .get(authController.verifyGenuineUser, postController.viewPost);


module.exports = router