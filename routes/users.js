const express = require('express');
const router = express.Router();
const { signup,singin } = require('../controllers/userController');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validations/users');


router.post('/signup',validateSignupRequest,isRequestValidated,signup);
router.post('/signin',validateSigninRequest,isRequestValidated,singin);

module.exports = router;
