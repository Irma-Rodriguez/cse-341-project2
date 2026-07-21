const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => { 
    //#swagger.tags=['Teachers']
    try {
    const result = await mongodb.getDatabase().db().collection('teachers').find();
    const teachers = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(teachers)
    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Teachers']
    try {
    const teacherId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('teachers').find({ _id: teacherId });
    const teachers = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(teachers[0])
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const createTeacher = async (req, res) => {
    //#swagger.tags=['Teachers']
    try {
    const teacher = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        subject: req.body.subject,
        phone: req.body.phone,
        active: req.body.active
    };
    const response = await mongodb.getDatabase().db().collection('teachers').insertOne(teacher);
    if (response.acknowledged) {
        res.status(201).json({
            message: 'Teacher created successfully'
        });
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the teacher.');
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const updateTeacher = async (req, res) => {
    //#swagger.tags=['Teachers']
    try {
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
        res.status(500).json(response.error || 'Some error occurred while updating the teacher.');
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const deleteTeacher = async (req, res) => {
    //#swagger.tags=['Teachers']
    try {
    const teacherId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('teachers').deleteOne({ _id: teacherId });
    if (response.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the teacher.');
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
    createTeacher,
    updateTeacher,
    deleteTeacher
};