const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const userService = require('./user.service');
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');
//routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);
router.get('/',authorize(), getAll);
router.get('/getallresponsable', authorize(), getAllResponsable);
router.get('/getResponsableMagasin', authorize(), getResponsableMagasin);
router.get('/getResponsableDepot', authorize(), getResponsableDepot);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);
router.get('/all', authorize(), allAccess);
router.get('/existeAdministrateur', authorize(), existeAdministrateur);


module.exports = router;

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        nom:Joi.string().required(),
        prenom: Joi.string().required(),
        tel: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(6).required(),
        role:Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'Inscription réussi' }))
        .catch(next);
}
function allAccess(req, res, next) {
    res.status(200).send("Public Content.");

}

  
function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}
function getAllResponsable(req, res, next) {
    userService.getAllResponsable()
        .then(users => res.json(users))
        .catch(next);
}
function getResponsableMagasin(req, res, next) {
    userService.getResponsableMagasin()
        .then(users => res.json(users))
        .catch(next);
}
function getResponsableDepot(req, res, next) {
    userService.getResponsableDepot()
        .then(users => res.json(users))
        .catch(next);
}
function existeAdministrateur(req, res, next) {
    userService.existeAdministrateur()
        .then(users => res.json(users))
        .catch(next);
}
function getCurrent(req, res, next) {
    res.json(req.user);
}

function getById(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Admin ) {
        return res.status(401).json({ message: 'Unauthorized' });
    }


    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        nom: Joi.string().empty(''),
        prenom: Joi.string().empty(''),
        tel: Joi.string().empty(''),
        email: Joi.string().empty(''),
        password: Joi.string().min(6).empty(''),
        role: Joi.string().empty(''),

    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(next);
}