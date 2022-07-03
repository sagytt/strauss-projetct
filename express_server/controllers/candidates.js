const jwt = require('jsonwebtoken');
require('dotenv').config();
const expressJwt = require('express-jwt');
var bcrypt = require('bcryptjs');
let db = require('../src/db/database');

exports.candidates = (req, res) => {
    let sql = `SELECT * from candidate`;
    db.all(sql, req.params.query, function(err, data) {
        if (err) {
            throw err;
        }else {
            res.status(200).json(data);
        }
    });
};

exports.candidate = (req, res) => {
    return res.json(req.profile);
};


