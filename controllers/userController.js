'use strict';

const User = require('../models/User');
const shortid = require('shortid');
const jwt = require ('jsonwebtoken');
const { restart } = require('nodemon');

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
            return res.status(401).json({
                error: "Invalid credentials"
            });
        }

        jwt.sign({ _id:user._id },process.env.JWT_SECRET,{ expiresIn:'2h' },(err,jwtToken)=>{
            if(err){
                next(err);
                return;
            }
            res.json({jwtToken: jwtToken});
        });

    } catch (err) {
        next(err);
    }

};                             