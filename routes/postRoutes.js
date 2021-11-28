const router = require('express').Router()
const postController = require('./../controller/postController')


router
    .route('/:_id')
    .post(postController.postOnSite);

module.exports = router