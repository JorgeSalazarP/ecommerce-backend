'use strict';

const User = require('../models/User');
const shortid = require('shortid');

exports.signup = async (req, res, next) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const user = await User.findOne({ email });
        if(user){
            return res.status(400).json({
                error: "User already registered",
            });
        }
        const hash_password = await User.hasPassword(password);
        const _user = new User({
            firstName,
            lastName,
            email,
            hash_password,
            username: shortid.generate()
        });
        const createdUser = await _user.save();
        res.status(201).json({result: createdUser});
    } catch (err) {
        next(err);
    }
   
};

exports.singin = async (req, res,next) =>{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({
                error: "Invalid credentials"
            });
        }

    } catch (err) {
        next(err);
    }

};                             