const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/students');

const validate = require('../middleware/validate');
const studentValidationRules = require('../validators/studentValidator');

router.get('/', studentsController.getAll);

router.get('/:id', studentsController.getSingle);

router.post('/', studentValidationRules(), validate, studentsController.createStudent);

router.put('/:id', studentValidationRules(), validate, studentsController.updateStudent);

router.delete('/:id', studentsController.deleteStudent);

module.exports = router;