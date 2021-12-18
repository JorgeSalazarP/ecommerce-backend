'use strict';

const Category = require('../models/Category');
const slugify = require('slugify');


exports.addCategory = async (req, res, next) => {
    try {
        const categoryObj = {
            name:req.body.name,
            slug:slugify(req.body.name)
        };

        if(req.body.parentId){
            categoryObj.parentId = req.body.parentId;
        }

        const newCategory = new Category(categoryObj);
        const categoryCreated = await newCategory.save();
        res.status(201).json({ result: categoryCreated });
        
    } catch (err) {
        next(err);
    }

};


exports.getCategories = async (req,res,next) =>{
    try {
        
        const categoriesFind = await Category.find();
        res.status(201).json({ result: categoriesFind });

    } catch (err) {
        next(err);
    }

};