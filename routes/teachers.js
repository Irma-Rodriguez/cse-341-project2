const express = require('express');
const router = express.Router();

const teachersController = require('../controllers/teachers');

const validate = require('../middleware/validate');
const teacherValidationRules = require('../validators/teacherValidator');

const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', teachersController.getAll);

router.get('/:id', teachersController.getSingle);

router.post('/', isAuthenticated, teacherValidationRules(), validate, teachersController.createTeacher);

router.put('/:id', isAuthenticated, teacherValidationRules(), validate, teachersController.updateTeacher);

router.delete('/:id', isAuthenticated, teachersController.deleteTeacher);


module.exports = router;