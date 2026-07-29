const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/students');

const validate = require('../middleware/validate');
const studentValidationRules = require('../validators/studentValidator');

const { isAuthenticated } = require("../middleware/authenticate");

// #swagger.tags = ['Students']
// #swagger.description = 'Returns all students.'
router.get('/', studentsController.getAll);

// #swagger.tags = ['Students']
// #swagger.description = 'Returns a student by ID.'
router.get('/:id', studentsController.getSingle);

// #swagger.tags = ['Students']
// #swagger.description = 'Creates a new student. Requires GitHub authentication.'
router.post('/', isAuthenticated, studentValidationRules(), validate, studentsController.createStudent);

// #swagger.summary = 'Update a student'
// #swagger.description = 'Requires GitHub authentication.'
router.put('/:id', isAuthenticated, studentValidationRules(), validate, studentsController.updateStudent);

// #swagger.summary = 'Delete a student'
// #swagger.description = 'Requires GitHub authentication.'
router.delete('/:id', isAuthenticated, studentsController.deleteStudent);

module.exports = router;