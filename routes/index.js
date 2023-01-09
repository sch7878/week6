const express = require('express');
const router = express.Router();

const likesRouter = require('./likes.routes.js');
const postsRouter = require('./posts.routes.js');
const usersRouter = require('./users.routes.js');
const commentsRouter = require('./comments.routes.js');


router.use('/', likesRouter)
router.use('/', usersRouter)
router.use('/', postsRouter)
router.use('/', commentsRouter)



module.exports = router;