const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Students']
    try {
    const result = await mongodb.getDatabase().db().collection('students').find();
    const students = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(students);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Students']
    try {
        const studentId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('students').find({ _id: studentId });
        const students = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(students[0]);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const createStudent = async (req, res) => {
    //#swagger.tags=['Students']
    try {
    const student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        phone: req.body.phone,
        grade: req.body.grade,
        gpa: req.body.gpa,
        active: req.body.active
    };
    const response = await mongodb.getDatabase().db().collection('students').insertOne(student);
    if (response.acknowledged) {
        res.status(201).json({
            message: 'Student created successfully'
        });

    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the student.');
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }   
};

const updateStudent = async (req, res) => {
    //#swagger.tags=['Students']
    try {
    const studentId = new ObjectId(req.params.id);
    const student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        phone: req.body.phone,
        grade: req.body.grade,
        gpa: req.body.gpa,
        active: req.body.active
    };
    const response = await mongodb.getDatabase().db().collection('students').replaceOne({ _id: studentId }, student);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the student.');
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const deleteStudent = async (req, res) => {
    //#swagger.tags=['Students']
    try {
    const studentId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('students').deleteOne({ _id: studentId });
    if (response.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the student.');
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    getAll,
    getSingle,
    createStudent,
    updateStudent,
    deleteStudent
};