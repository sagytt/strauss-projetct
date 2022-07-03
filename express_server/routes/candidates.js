const express = require("express");
const {candidates, candidate} = require('../controllers/candidates');
const { userById } = require("../controllers/auth");
const {requireSignin} = require('../controllers/auth');
const router = express.Router();

router.get('/candidates', candidates);
router.get("/candidate/:userId", candidate);

//any route containing :userId, app will first execute userById() func
router.param('userId', userById);

module.exports = router;