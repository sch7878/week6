const express = require('express');
const router = express.Router();

const UsersController = require("../controllers/users.controllers.js")
const usersController = new UsersController();

router.post('/signup', usersController.signupUsers);
router.post('/login', usersController.loginUsers);

module.exports = router;
