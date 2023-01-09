const express = require('express');
const router = express.Router();
const auth_middleware = require('../middleware/auth_middleware.js');



const PostsControllers = require("../controllers/posts.controllers.js");
const postsControllers = new PostsControllers;


router.get('/posts', postsControllers.getAllPosts);
router.get('/posts/:postId', postsControllers.getOnePost);
router.post('/posts', auth_middleware, postsControllers.createPost)
router.put('/posts/:postId', auth_middleware, postsControllers.updatePost);
router.delete('/posts/:postId', auth_middleware, postsControllers.deletePost);


module.exports = router;