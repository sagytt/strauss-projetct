const jwt = require('jsonwebtoken');
require('dotenv').config();
const expressJwt = require('express-jwt');
var bcrypt = require('bcryptjs');
let db = require('../src/db/database');

exports.signup = async (req, res) => {

    let email = req.body.email;

    //option 1
    //Validations
    // if(this.validateEmail(email) === null){
    //     return res.status(403).json({
    //         error: "Please provide a valid email address."
    //     });
    // }
    // if (!req.body.name) return res.status(403).json({
    //     error: "Name is required!"
    // });
    //
    // if (req.body.password.length < 6) return res.status(403).json({
    //     error: "Password must be over 6 characters"
    // });

    const sqlEmailCheck = `SELECT email from user where email= ?`;

    const sqlInsert = `insert into user (username, email, password) VALUES ($name, $email, $password)`;

    db.get(sqlEmailCheck, [email], (err, row) => {
        if (err) {
            return console.error(err.message);
        }

        if (row) return res.status(403).json({
            error: "Email is taken!"
        });

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync("B4c0/\/", salt);

        user = {
        $name: req.body.name,
        $email: req.body.email,
        $password: bcrypt.hashSync(req.body.password, hash)
        };

        db.run(sqlInsert, user, function(err) {
            if (err) {
                return console.error(err.message);
            }
            res.status(200).json({message: "SignUp success! Please login."});
        });

    });
};

exports.signin = (req, res) => {

    // find the user based on email
    const {email, password} = req.body;

    const sqlEmail = `SELECT username, email, password FROM user WHERE email= ?`;

    db.get(sqlEmail, [email], (err, row) => {

        if (!row) return res.status(200).json({
            error: "No such email registered"
        });
        var checkPass = bcrypt.compareSync(password, row.password);
        console.log(checkPass)
        if (err) {
            return console.error(err.message);
        }

        if (!checkPass) return res.status(200).json({
            error: "User with this credentials does not found"
        });

        //generate a token with user id and secret
        const token = jwt.sign({_id: row.id}, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        res.cookie('t', token, {expire: new Date() + 9999});
        // return response with user and token to frontend client
        const id = row.id;
        const name = row.username;
        const email = row.email;
        return res.json({token, user: {id, email, name}});
    })
};

exports.userById = (req, res, next, id) => {
    const sql = `SELECT * from candidate WHERE id= ?`;
    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = row;
        next();
    });
};

exports.signout = (req, res) => {
    res.clearCookie("t");
    return res.json({message: "Signout success!"})
};

exports.validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

exports.requireSignin = expressJwt({
    //if the token is valid, express jwt the verified users id
    //in an auth key to the request object
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: "auth"
});

