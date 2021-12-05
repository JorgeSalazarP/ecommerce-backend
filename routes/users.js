const express = require('express');
const router = express.Router();
const { signup,singin } = require('../controllers/userController');


router.post('/signup', signup);
router.post('/signin', singin);


module.exports = router;
