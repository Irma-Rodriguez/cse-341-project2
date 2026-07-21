const { body } = require('express-validator');

const studentValidationRules = () => {
    return [

        body('firstName')
            .trim()
            .notEmpty()
            .withMessage('First name is required'),

        body('lastName')
            .trim()
            .notEmpty()
            .withMessage('Last name is required'),

        body('age')
            .isInt({ min: 1 })
            .withMessage('Age must be a number'),

        body('email')
            .trim()
            .isEmail()
            .withMessage('Invalid email'),

        body('phone')
            .trim()
            .notEmpty()
            .withMessage('Phone is required'),

        body('grade')
            .trim()
            .notEmpty()
            .withMessage('Grade is required'),

        body('gpa')
            .isFloat({ min: 0, max: 4 })
            .withMessage('GPA must be between 0 and 4'),

        body('active')
            .isBoolean()
            .withMessage('Active must be true or false')
    ];
};

module.exports = studentValidationRules;
