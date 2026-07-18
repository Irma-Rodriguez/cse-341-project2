const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Students']
    const result = await mongodb.getDatabase().db().collection('students').find();
    result.toArray().then((students) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(students)
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Students']
    const studentId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('students').find({ _id: studentId });
    result.toArray().then((students) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(students[0])
    });
};

const createStudent = async (req, res) => {
    //#swagger.tags=['Students']
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
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
};

const updateStudent = async (req, res) => {
    //#swagger.tags=['Contacts']
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
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
};

const deleteStudent = async (req, res) => {
    //#swagger.tags=['Contacts']
    const studentId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('students').deleteOne({ _id: studentId });
    if (response.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createStudent,
    updateStudent,
    deleteStudent
};