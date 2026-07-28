const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/students');

const validate = require('../middleware/validate');
const studentValidationRules = require('../validators/studentValidator');

const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', studentsController.getAll);

router.get('/:id', studentsController.getSingle);

router.post('/', isAuthenticated, studentValidationRules(), validate, studentsController.createStudent);

router.put('/:id', isAuthenticated, studentValidationRules(), validate, studentsController.updateStudent);

router.delete('/:id', isAuthenticated, studentsController.deleteStudent);

module.exports = router;