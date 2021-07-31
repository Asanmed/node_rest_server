const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Users = require('../models/user');

const tokenValidation = async (req = request, res = response, next) => {
    const token = req.header('token');

    if (!token) {
        return res.status(401).json({ msg: 'auth token not provided' });
    }
    try {
        const { id } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEYS);

        //find authenticated user
        const user = await Users.findById(id);

        if (!user) {
            return res.status(401).json({
                msg: 'user not found',
            });
        }

        req.user = user;

        //verify if user is active

        if (!user.status) {
            return res.status(401).json({
                msg: 'user is not active',
            });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: 'token not valid' });
    }
};

module.exports = {
    tokenValidation,
};
