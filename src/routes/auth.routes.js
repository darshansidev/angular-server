const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validate } = require('express-validation');
const { createSignup, loginUser } = require('../validations/auth.validations');
const { upload } = require('../middlewares/multer.middleware');


//ejs get render route
router.get('/signup', (req, res) => {
    return res.render('signup');
})
router.get('/login', (req, res) => {
    return res.render('login');
})

//api route 
router.post('/signup', upload.single('photoProof'), validate(createSignup), authController.signupUser);
router.post('/login', validate(loginUser), authController.loginUsers);

module.exports = router