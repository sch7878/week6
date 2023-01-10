const express = require('express');
const router = express.Router();
const auth_middleware = require('../middleware/auth_middleware.js');

const CommentControllers = require('../controllers/comments.controllers.js');
const commentControllers = new CommentControllers;

router.post('/comments/:postId', auth_middleware, commentControllers.createComments);
router.get('/comments/:postId', commentControllers.getAllComments);
router.put('/comments/:commentId', auth_middleware, commentControllers.updateComments);
router.delete('/comments/:commentId', auth_middleware, commentControllers.deleteComments)

module.exports = router;