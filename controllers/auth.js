const response = require('express');

const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../utils/generateJWT');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        //Verificar si existe el correo

        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(400)
                .json({ msg: 'user/password not correct - email' });
        }

        //Verificar si el usuario está activo

        if (!user.status) {
            return res
                .status(400)
                .json({ msg: 'user/password not correct - active' });
        }

        //Verificar la contraseña

        const passwordMatches = bcryptjs.compareSync(password, user.password);

        if (!passwordMatches) {
            return res.status(400).json({
                msg: 'user/password not correct - password',
            });
        }

        //General JWT

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
