const response = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../utils/generateJWT');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        //Verify if email exists

        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(400)
                .json({ msg: 'user/password not correct - email' });
        }

        //Verify if user is active

        if (!user.status) {
            return res
                .status(400)
                .json({ msg: 'user/password not correct - active' });
        }

        //Verify password

        const passwordMatches = bcryptjs.compareSync(password, user.password);

        if (!passwordMatches) {
            return res.status(400).json({
                msg: 'user/password not correct - password',
            });
        }

        //Generate JWT

        const token = await generateJWT(user._id);

        res.json({ user, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'server internal error' });
    }
};

module.exports = {
    login,
};
