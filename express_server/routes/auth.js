const express = require("express");
const {signup, signin, signout} = require('../controllers/auth');
const {candidates} = require('../controllers/candidates');
const {userSignUpValidate} = require('../src/validator/index');
const router = express.Router();

router.post('/signup', userSignUpValidate, signup);
router.post('/signin', signin);
router.get('/signout', signout);

module.exports = router;
