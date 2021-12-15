const express = require('express');
const router = express.Router();
const { signup,singin } = require('../../controllers/admin/adminController');
const {isRequestValidated, validateSignupRequest, validateSigninRequest } = require('../../validations/users');
 


router.post('/signup',validateSignupRequest,isRequestValidated, signup);
router.post('/signin', validateSigninRequest,isRequestValidated,singin);


module.exports = router;
