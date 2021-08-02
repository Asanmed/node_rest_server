const Role = require('../models/role');
const User = require('../models/user');

const roleValidation = async (role = '') => {
    const roleExists = await Role.findOne({ role });
    if (!roleExists) {
        throw new Error(`the ${role} role does not exists`);
    }
};

const emailValidation = async (email = '') => {
    const emailExists = await User.findOne({ email });

    if (emailExists) {
        throw new Error(`email ${email} already in use`);
    }
};

const userByIdValidation = async (id) => {
    const idExists = await User.findById(id);

    if (!idExists) {
        throw new Error(`the id: ${id} does not exists`);
    }
};

module.exports = {
    roleValidation,
    emailValidation,
    userByIdValidation,
};
