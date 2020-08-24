const router = require('express').Router();
const indexControllers = require('../../controllers/indexControllers');

router.get('/', indexControllers.getIndex);

router.route('/post/:id')
    .get(indexControllers.getSinglePost)
    .post(indexControllers.postCommentInSinglePost);

router.route('/signin')
    .get(indexControllers.getSignIn)
    .post(indexControllers.postSignIn);

router.route('/signup')
    .get(indexControllers.getSignUp)
    .post(indexControllers.postSignUp);

router.get('/signout', indexControllers.getSignOut)

module.exports = router;