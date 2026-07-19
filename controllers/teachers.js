const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => { 
    //#swagger.tags=['Teachers']
    const result = await mongodb.getDatabase().db().collection('teachers').find();
    result.toArray().then((teachers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(teachers)
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Teachers']
    const studentId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('students').find({ _id: studentId });
    result.toArray().then((teachers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(teachers[0])
    });
};

const createTeacher = async (req, res) => {
    //#swagger.tags=['Teachers']
    const teachers = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        subject: req.body.subject,
        phone: req.body.phone,
        active: req.body.active
    };
    const response = await mongodb.getDatabase().db().collection('teachers').insertOne(teacher);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
};

const updateTeacher = async (req, res) => {
    //#swagger.tags=['Teachers']
    const teacherId = new ObjectId(req.params.id);
    const teacher = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        subject: req.body.subject,
        phone: req.body.phone,
        active: req.body.active
    };
    const response = await mongodb.getDatabase().db().collection('teachers').replaceOne({ _id: teacherId }, teacher);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
};

const deleteTeacher = async (req, res) => {
    //#swagger.tags=['Teachers']
    const studentId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('students').deleteOne({ _id: studentId });
    if (response.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while delating the contact.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createTeacher,
    updateTeacher,
    deleteTeacher
};