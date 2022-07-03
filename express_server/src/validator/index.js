exports.userSignUpValidate = (req, res, next) =>{
    req.check('name', 'Name is required').notEmpty();
    req.check('email', 'Email must be between 3 to 32 characters')
        .isEmail()
        .withMessage('Email must contain @')
        .isLength({
            min: 4,
            max: 2000
        });

    req.check('password', 'Password is required').notEmpty();
    req.check('password')
        .isLength({min: 6})
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number');

    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
};