const { body } = require('express-validator');

const teacherValidationRules = () => {
    return [
        body('firstName')
            .trim()
            .notEmpty()
            .withMessage('First name is required'),

        body('lastName')
            .trim()
            .notEmpty()
            .withMessage('Last name is required'),

        body('email')
            .trim()
            .isEmail()
            .withMessage('A valid email is required'),

        body('subject')
            .trim()
            .notEmpty()
            .withMessage('Subject is required'),

        body('phone')
            .trim()
            .notEmpty()
            .withMessage('Phone number is required'),

        body('active')
            .isBoolean()
            .withMessage('Active must be true or false')
    ];
};

module.exports = teacherValidationRules;
