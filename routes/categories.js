'use strict';

const express = require('express');
const router = express.Router();
const { addCategory, getCategories } = require('../controllers/categoryController');

router.post('/create', addCategory);
router.get('/getcategory', getCategories);

module.exports = router;
