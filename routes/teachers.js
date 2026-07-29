const express = require('express');
const router = express.Router();

const teachersController = require('../controllers/teachers');

const validate = require('../middleware/validate');
const teacherValidationRules = require('../validators/teacherValidator');

const { isAuthenticated } = require("../middleware/authenticate");

// #swagger.tags = ['Teachers']
// #swagger.description = 'Returns all teachers.'
router.get('/', teachersController.getAll);

// #swagger.tags = ['Teachers']
// #swagger.description = 'Returns a teacher by ID.'
router.get('/:id', teachersController.getSingle);

// #swagger.tags = ['Teachers']
// #swagger.description = 'Creates a new teacher. Requires GitHub authentication.'
router.post('/', isAuthenticated, teacherValidationRules(), validate, teachersController.createTeacher);

// #swagger.summary = 'Update a teacher'
// #swagger.description = 'Requires GitHub authentication.'
router.put('/:id', isAuthenticated, teacherValidationRules(), validate, teachersController.updateTeacher);

// #swagger.summary = 'Delete a teacher'
// #swagger.description = 'Requires GitHub authentication.'
router.delete('/:id', isAuthenticated, teachersController.deleteTeacher);


module.exports = router;