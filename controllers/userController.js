'use strict';

const User = require('../models/User');

exports.signup = async (req,res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(user){
            return res.status(400).json({
                error: "User already registered",
            });
        }
    } catch (err) {
        next(err);
    }

    
};