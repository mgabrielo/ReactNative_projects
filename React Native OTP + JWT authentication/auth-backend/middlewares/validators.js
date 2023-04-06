const { check, validationResult } = require('express-validator');

exports.validateUserCreate =
    [check('name').trim().not().isEmpty().withMessage('Name is Missing')
        .isLength({ min: 3, max: 20 }).withMessage('Name must be 3 to 20 characters Long'),
    check('email').normalizeEmail().isEmail().withMessage('Email is Invalid'),
    check('password').trim().not().isEmpty().withMessage('Password is Missing').isLength({ min: 8, max: 20 })
        .withMessage('Password must be 3 to 20 characters Long')
    ];

exports.validate = (req, res, next) => {
    const err = validationResult(req).array();

    if (!err.length) {
        return next()
    }

    res.status(400).json({ success: false, error: err[0].msg })
};
