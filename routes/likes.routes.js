const express = require('express');
const router = express.Router();
const auth_middleware = require('../middleware/auth_middleware.js');

const LikesControllers = require('../controllers/likes.controllers.js');
const likesControllers = new LikesControllers;

router.put('/posts/:postsId/like', auth_middleware, likesControllers.setLikes);
router.get('/posts/like', auth_middleware, likesControllers.getAllLikes);


module.exports = router;