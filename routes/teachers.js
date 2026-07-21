const express = require('express');
const router = express.Router();

const teachersController = require('../controllers/teachers');

const validate = require('../middleware/validate');
const teacherValidationRules = require('../validators/teacherValidator');

router.get('/', teachersController.getAll);

router.get('/:id', teachersController.getSingle);

router.post('/', teacherValidationRules(), validate, teachersController.createTeacher);

router.put('/:id', teacherValidationRules(), validate, teachersController.updateTeacher);

router.delete('/:id', teachersController.deleteTeacher);


module.exports = router;