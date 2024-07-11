
const config2 = require('config2.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Role = require('_helpers/role');

const users = [
    { id: 1, email: 'Admin', password: 'Admin', nom: 'Admin', prenom: 'Admin', tel:'111111',role: Role.Admin },
    { id: 2, email: 'Responsable de magasin', password: 'Responsable de magasin', nom: 'Normal', prenom: 'Responsable de magasin',tel:'111111', role: Role.Responsable },
    { id: 3, email: 'sous-administrateur', password: 'sous-administrateur', nom: 'Normal', prenom: 'sous-administrateur',tel:'111111', role: Role.SousAdministrateur },
    { id: 4, email: 'Responsable de dépôt', password: 'Responsable de dépôt', nom: 'Normal', prenom: 'Responsable de dépôt',tel:'111111', role: Role.ResponsableDepot },

];
module.exports = {
    authenticate,
    getAll,
    getAllResponsable,
    existeAdministrateur,
    getResponsableMagasin,
    getResponsableDepot,
    getById,
    create,
    update,
    delete: _delete,
    allAccess,
};
async function allAccess (id) {
    const user = await getUser(id);

  };
  
async function authenticate({ email, password }) {
    const user = await db.User.scope('withHash').findOne({ where: { email } });
    console.log(user)
    if (!user || !(await bcrypt.compare(password, user.password)))
        throw 'email or password is incorrect';

    // authentication successful
    const token = jwt.sign({ sub: user.id, role:user.role }, config2.secret, { expiresIn: '7d' });
    return { ...omitHash(user.get()), token };
}

async function getAll() {
    return await db.User.findAll();
}
async function getAllResponsable() {
    return await db.User.findAll(  { where :{ role: ["Responsable de magasin" ,"responsable de dépôt"]}});
}
async function getResponsableMagasin() {
    return await db.User.findAll({ where :{ role: ["Responsable de magasin"]}});
}
async function getResponsableDepot() {
    return await db.User.findAll({ where :{ role: ["Responsable de dépôt"]}});
}
async function existeAdministrateur() {
    return await db.User.findAll({ where :{ role: "Admin"}});
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { email: params.email } })) {
        throw 'email "' + params.email + '" est déjà existe';
    }

    // hash password
    if (params.password) {
        params.password = await bcrypt.hash(params.password, 10);
    }

    // save user
    await db.User.create(params);
}

async function update(id, params) {
    const user = await getUser(id);

    // validate
    const emailChanged = params.email && user.email !== params.email;
    if (emailChanged && await db.User.findOne({ where: { email: params.email } })) {
        throw 'email "' + params.email + '" est déja existe';
    }

    // hash password if it was entered
    if (params.password) {
        params.password = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();

    return omitHash(user.get());
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}

function omitHash(user) {
    const { password, ...userWithoutHash } = user;
    return userWithoutHash;
}