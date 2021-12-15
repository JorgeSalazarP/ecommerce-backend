'use strict';

const User = require('../../models/User');
const shortid = require('shortid');
const jwt = require ('jsonwebtoken');


exports.signup = async (req, res, next) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const user = await User.findOne({ email });
        if(user){
            const error = new Error('Admin already registered');
            error.status = 401;
            next(error);
            return;
        }
        const hash_password = await User.hasPassword(password);
        const _user = new User({
            firstName,
            lastName,
            email,
            hash_password,
            username: shortid.generate(),
            role:'admin'
        });
        const createdAdmin = await _user.save();
        res.status(201).json({result: createdAdmin});
    } catch (err) {
        next(err);
    }
   
};

exports.singin = async (req, res,next) =>{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user || !(await user.comparePassword(password)) && user.role !== 'admin' ){
            const error = new Error('Invalid credentials');
            error.status = 401;
            next(error);
            return;
        }

        jwt.sign({ _id:user._id },process.env.JWT_SECRET,{ expiresIn:'2h' },(err,jwtToken)=>{
            if(err){
                next(err);
                return;
            }
            res.json({ jwtToken: jwtToken });
        });

    } catch (err) {
        next(err);
    }

};                             