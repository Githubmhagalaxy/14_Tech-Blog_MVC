const router = require('express').Router();
const dashboardControllers = require('../../controllers/dashboardControllers');

// base URL => /dashboard

router.get('/', dashboardControllers.getIndex);

router.route('/newPost')
    .get(dashboardControllers.getNewPost)
    .post(dashboardControllers.postNewPost);

router.route('/post/:id')
    .get(dashboardControllers.getSinglePost)
    .put(dashboardControllers.putSinglePost)
    .delete(dashboardControllers.deleteSinglePost);


module.exports = router;