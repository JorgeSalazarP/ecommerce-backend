const express = require('express');
const router = express.Router();
const { signup,singin } = require('../controllers/userController');
const jwtAuth = require('../lib/jwtAuth');


router.post('/signup', signup);
router.post('/signin', singin);
router.post('/profile',jwtAuth, (req,res)=>{
    res.status(200).json({
        user: 'profile'
    });
});

module.exports = router;
